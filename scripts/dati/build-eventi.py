#!/usr/bin/env python3
"""Calendario degli eventi a venire, costruito dagli open data delle Regioni (rigiocabile).

Uso :
  python3 scripts/dati/build-eventi.py --scarica <cartella-grezzi>   # scarica i file ufficiali, poi costruisce
  python3 scripts/dati/build-eventi.py <cartella-grezzi>             # costruisce dai file già scaricati
Scrive src/data/eventi.json (eventi che finiscono il giorno di lettura o dopo) e src/data/fonti-lette.json.

Fonti (nessuna promessa di aggiornamento automatico : il file si rigenera a mano, la data di lettura è nel JSON) :
  lom  Regione Lombardia, « Sagre e fiere su area pubblica » (LR 6/2010 art. 18 bis), CC0 1.0
  odh  Open Data Hub Alto Adige / Südtirol (NOI Techpark), API Event, licenza CC0 per scheda
  er   APT Servizi / Regione Emilia-Romagna, « Elenco degli eventi a tema turistico attivi », CC BY 4.0
  pug  Regione Puglia, « Cosa fare in Puglia - eventi e attività » (DMS), CC BY 4.0
"""
import csv, datetime as dt, glob, json, os, re, subprocess, sys, unicodedata
from collections import Counter

ARGS = [a for a in sys.argv[1:] if not a.startswith('--')]
RAW = ARGS[0] if ARGS else os.path.expanduser('~/Documents/GitHub/reports/niches-2026-11-13/sagre-data')
SITE = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
URL = {
  'lom': 'https://www.dati.lombardia.it/api/views/hs8z-dcey/rows.csv?accessType=DOWNLOAD',
  'er': 'https://emiliaromagnaturismo.it/opendata/v1/events?page={p}',
  'odh': 'https://tourism.api.opendatahub.com/v1/Event?pagesize=500&pagenumber={p}&begindate={d}&enddate={e}&language=it',
  'pug': 'https://osservatorio.dms.puglia.it/opendata/puglia_eventi_attivita/eventi_attivita.csv',
}

def curl(url, out):
  subprocess.run(['curl', '-sL', '-m', '300', '-o', out, url], check=True)

LETTO = os.environ.get('LETTO_IL') or dt.date.today().isoformat()
if '--scarica' in sys.argv:
  os.makedirs(RAW, exist_ok=True)
  curl(URL['lom'], f'{RAW}/lombardia.csv')
  curl(URL['pug'], f'{RAW}/puglia.csv')
  for p, f in ((1, 'er.json'), (2, 'er-2.json'), (3, 'er-3.json')): curl(URL['er'].format(p=p), f'{RAW}/{f}')
  y = int(LETTO[:4])
  for p in range(1, 9):
    curl(URL['odh'].format(p=p, d=LETTO, e=f'{y + 1}-12-31'), f'{RAW}/odh-{p}.json')

OGGI = LETTO
FINE = f'{int(OGGI[:4]) + 1}-12-31'
csv.field_size_limit(10**9)

PICCOLE = {'di', 'del', 'della', 'dei', 'delle', 'degli', 'da', 'e', 'in', 'a', 'al', 'alla', 'alle', 'ai', 'con', 'per', 'tra', 'fra', 'sul', 'sulla', 'nel', 'nella', 'la', 'il', 'lo', 'le', 'gli', 'un', 'una', 'd', 'l', 'dal', 'dalla', 'sotto', 'su'}
def titolo(s):
  """Nomi lombardi scritti in maiuscolo dal Comune : minuscole, poi maiuscola iniziale (tranne le parole brevi)."""
  s = re.sub(r'\s+', ' ', s.strip())
  if s.upper() != s: return s
  out = []
  for i, w in enumerate(re.split(r"(\s+|'|’|-|/|\()", s.lower())):
    out.append(w if (i and w in PICCOLE) else (w[:1].upper() + w[1:]))
  t = ''.join(out)
  t = re.sub(r'\b(S|Ss|Sant|San)\.(\w)', lambda m: f'{m.group(1)}. {m.group(2).upper()}', t)
  return re.sub(r'\b(Ii|Iii|Iv|Vi|Vii|Viii|Ix|Xi|Xii|Xx)\b', lambda m: m.group(0).upper(), t)

def comune(s):
  s = re.sub(r'\s+', ' ', s.strip())
  return titolo(s) if s.upper() == s else s

NATALE = re.compile(r'natal|christkind|weihnacht|advent|avvento', re.I)
MERCATO = re.compile(r'mercat|markt|market|bancarell', re.I)
ESCLUDI = re.compile(r'\b(santa messa|messa|concert|konzert|gospel|escursion|wander|ciaspol|corso\b|workshop|laborator|conferenz|vortrag|lettura|teatro|theater|kino|film|mostra|ausstellung|visita guidata|führung|gara|lauf\b|run\b|race|torneo|yoga|meditazion|tour\b|ski\b|sci\b|slalom|biathlon)', re.I)
FESTA = re.compile(r'sagra|sagre|festa|feste|fest\b|festl|törggel|torggel|kirchtag|degust|gastronom|castagn|kastanien|vino|wein|speck|formagg|käse|krampus|perchten|capodanno|silvester|carneval|fasching|fiera|fiere|polenta|tortell|tartufo|olio|salam|zampone|cotechino|bollito|gnocc|panettone|torrone|mostarda|zucca|cioccolat|birra|bier', re.I)

def tipo_da_nome(nome, base=None):
  if NATALE.search(nome) and MERCATO.search(nome): return 'natale'
  if MERCATO.search(nome) or re.search(r'flohmarkt|pulci|antiquariato|bauernmarkt|contadin', nome, re.I): return 'mercato'
  return base or 'festa'

ev = []
# --- Lombardia (CC0) -------------------------------------------------------------------------
def d_it(s):
  return dt.datetime.strptime(s.strip(), '%d/%m/%Y').date().isoformat()
lom = list(csv.DictReader(open(f'{RAW}/lombardia.csv', encoding='utf-8')))
for x in lom:
  try: dal, al = d_it(x['DATA_IN']), d_it(x['DATA_FINE'])
  except Exception: continue
  if al < OGGI or dal > FINE: continue
  nome = titolo(x['DENOM'])
  base = 'fiera' if x['TIPO'].strip().lower() == 'fiera' else 'sagra'
  t = 'natale' if (NATALE.search(nome) and MERCATO.search(nome)) else base
  try: lat, lon = round(float(x['GEO_Y']), 5), round(float(x['GEO_X']), 5)
  except Exception: lat = lon = None
  ora = ' – '.join(o for o in (x['ORA_IN'].strip(), x['ORA FINE'].strip()) if o and o != '00:00')
  ev.append({'id': f"lom-{x['ID']}", 'n': nome, 't': t, 'tl': x['TIPO'].strip(), 'dal': dal, 'al': al, 'ora': ora,
             'c': comune(x['COMUNE']), 'p': x['PROV'].strip(), 'r': 'lom', 'lat': lat, 'lon': lon,
             'ris': {'S': True, 'N': False}.get(x['SOMMINIS'].strip()), 'org': x['NOME_ORG'].strip(), 'src': 'lom', 'k': x['ID'].strip()})

# --- Alto Adige (Open Data Hub, CC0 per scheda) ------------------------------------------------
odh = []
for f in sorted(glob.glob(f'{RAW}/odh-*.json')):
  odh += (json.load(open(f)).get('Items') or [])
visti = set()
for i in odh:
  if i['Id'] in visti: continue
  visti.add(i['Id'])
  if (i.get('LicenseInfo') or {}).get('License') != 'CC0' or (i.get('LicenseInfo') or {}).get('ClosedData'): continue
  det = (i.get('Detail') or {})
  nome = ((det.get('it') or {}).get('Title') or (det.get('de') or {}).get('Title') or '').strip()
  if not nome: continue
  nome_de = ((det.get('de') or {}).get('Title') or '').strip()
  nome_en = ((det.get('en') or {}).get('Title') or '').strip()
  tags = ' '.join(i.get('SmgTags') or [])
  tutto = f'{nome} {nome_de} {tags}'
  if ESCLUDI.search(f'{nome} {nome_de}') or re.match(r'programma\b', nome, re.I): continue
  if not (FESTA.search(tutto) or MERCATO.search(tutto) or re.search(r'mercatini|maerkte|bauernmarkt|genuss|wein-event|traditions', tags)): continue
  dal, al = (i.get('DateBegin') or '')[:10], (i.get('DateEnd') or '')[:10]
  if not dal or al < OGGI or dal > FINE: continue
  # Jours réels : chaque EventDate couvre From..To ; « Cancelled » vaut la chaîne '0' quand l'entrée est valide.
  giorni = set()
  eds = [d for d in (i.get('EventDate') or []) if d.get('From') and str(d.get('Cancelled') or '0') == '0' and not d.get('IsCancelled') and d.get('Active') is not False]
  for d in eds:
    a = dt.date.fromisoformat(d['From'][:10]); b = dt.date.fromisoformat((d.get('To') or d['From'])[:10])
    while a <= b and len(giorni) < 800:
      giorni.add(a.isoformat()); a += dt.timedelta(days=1)
  giorni = sorted(g for g in giorni if OGGI <= g <= FINE)
  if eds and not giorni: continue  # toutes les dates déclarées sont passées
  if giorni: dal, al = max(dal, giorni[0]) if dal >= OGGI else giorni[0], min(al, giorni[-1])
  ci = ((i.get('ContactInfos') or {}).get('it') or {})
  citta = (ci.get('City') or '').strip()
  if not citta:
    mi = ((i.get('LocationInfo') or {}).get('MunicipalityInfo') or {}).get('Name') or {}
    citta = (mi.get('it') or '').strip()
  if not citta: continue
  lat, lon = i.get('Latitude') or None, i.get('Longitude') or None
  if not lat:
    gp = (i.get('GpsInfo') or [{}])[0] or {}
    lat, lon = gp.get('Latitude'), gp.get('Longitude')
  # Horaires par jour : la première date (souvent la soirée d'ouverture) n'est pas l'horaire de la saison
  # (testeurs naïfs du 2026-11-14 : Bolzano « 17:00 – 22:30 » lu comme l'horaire de tous les jours).
  hh = lambda b: ' – '.join(o[:5] for o in (b.get('Begin') or '', b.get('End') or '') if o and o[:5] not in ('00:00', '23:59'))
  eds_o = sorted(eds or (i.get('EventDate') or [{}])[:1], key=lambda d: (d.get('From') or '')[:10])
  ore = [(str(d.get('From') or '')[:10], hh(d or {})) for d in eds_o]
  fut = [o for d, o in ore if d >= OGGI] or [o for _, o in ore]
  apertura = ore[0][1] if len(ore) > 1 and ore[0][0] >= OGGI else ''
  resto = fut[1:] if apertura else fut
  ora = Counter(resto).most_common(1)[0][0] if resto else (fut[0] if fut else '')
  ora1 = apertura if apertura and apertura != ora else ''
  orv = 1 if len(set(resto)) > 1 else None
  t = tipo_da_nome(f'{nome} {nome_de}', 'fiera' if re.search(r'\bfiera\b|messe\b', nome, re.I) else 'festa')
  if re.search(r'mercatini nei dintorni|weihnachtsmaerkte', tags) and t == 'mercato': t = 'natale'
  ev.append({'id': f"odh-{i['Id'][:12]}", 'n': nome, 'en': nome_en if nome_en and nome_en != nome else None, 't': t, 'dal': dal, 'al': al,
             'g': giorni if giorni and len(giorni) < ((dt.date.fromisoformat(al) - dt.date.fromisoformat(dal)).days + 1) else None,
             'ora': ora, 'ora1': ora1, 'orv': orv, 'c': citta.split('|')[-1].strip(), 'p': 'BZ', 'r': 'aa', 'lat': round(lat, 5) if lat else None, 'lon': round(lon, 5) if lon else None,
             'ris': None, 'org': '', 'src': 'odh', 'k': i['Id']})

# --- Emilia-Romagna (CC BY 4.0) ----------------------------------------------------------------
er = []
for f in sorted(glob.glob(f'{RAW}/er*.json')):
  er += json.load(open(f))['data']
ER_PROV = {'Bologna': 'BO', 'Ferrara': 'FE', 'Forlì-Cesena': 'FC', 'Forli-Cesena': 'FC', 'Modena': 'MO', 'Parma': 'PR', 'Piacenza': 'PC', 'Ravenna': 'RA', 'Reggio Emilia': 'RE', "Reggio nell'Emilia": 'RE', 'Rimini': 'RN'}
for x in er:
  cats = ' '.join(c.get('name', '') for c in (x.get('category') or []))
  nome = x['title'].strip()
  if not re.search(r'enogastronom|Natale|Mercatini|tradizioni', cats) and not FESTA.search(nome) and not MERCATO.search(nome): continue
  if ESCLUDI.search(nome): continue
  d = x.get('dates') or {}
  dal, al = d.get('from') or '', d.get('to') or ''
  if not dal or al < OGGI or dal > FINE or al > '2040': continue
  giorni = sorted({g for g in (d.get('dates') or []) if OGGI <= g <= FINE})
  if sorted(d.get('dates') or []) == sorted({dal, al}): giorni = []  # seuls début et fin : un intervalle continu, pas des jours choisis
  locs = x.get('locations') or [{}]
  l0 = locs[0] if locs else {}
  t = tipo_da_nome(nome, 'sagra' if re.search(r'sagr', nome, re.I) else ('natale' if 'Mercati di Natale' in cats and MERCATO.search(nome) else 'festa'))
  if t == 'festa' and 'Mercatini' in cats: t = 'natale' if NATALE.search(nome + cats) else 'mercato'
  comuni = []
  for l in locs:
    c = (l.get('city') or (l.get('locality') or {}).get('name') or '').strip()
    if c and c not in comuni: comuni.append(c)
  if not comuni: continue
  ev.append({'id': f"er-{x['id']}", 'n': nome, 't': t, 'dal': dal, 'al': al,
             'g': giorni if 1 < len(giorni) < ((dt.date.fromisoformat(al) - dt.date.fromisoformat(dal)).days + 1) else None,
             'ora': '', 'c': comuni[0], 'cc': comuni[1:6] or None, 'p': ER_PROV.get(l0.get('province') or '', ''), 'r': 'er',
             'lat': round(l0['lat'], 5) if l0.get('lat') else None, 'lon': round(l0['lng'], 5) if l0.get('lng') else None,
             'ris': None, 'org': '', 'src': 'er', 'k': x['permalink'].rsplit('/', 1)[-1]})

# --- Puglia (CC BY 4.0) : solo sagre, feste, fiere e mercati a venire ------------------------------
PUG_T = {'Sagra': 'sagra', 'Festa/Serata': 'festa', 'Festa patronale/Festa dei santi': 'festa', 'Fiera/Salone': 'fiera', 'Mercato/Mercatino': 'mercato', 'Rievocazione storica': 'festa'}
for x in csv.DictReader(open(f'{RAW}/puglia.csv', encoding='utf-8', errors='replace')):
  if x['tipologia'] not in PUG_T: continue
  dal, al = x['data_inizio'][:10], x['data_fine'][:10]
  if not dal or al < OGGI or dal > FINE: continue
  if (dt.date.fromisoformat(al) - dt.date.fromisoformat(dal)).days > 120: continue
  try: lat, lon = round(float(x['latitudine']), 5), round(float(x['longitudine']), 5)
  except Exception: lat = lon = None
  nome = re.sub(r'\s+', ' ', x['nm_evento_it']).strip()
  ev.append({'id': f"pug-{x['id_periodo'] or len(ev)}", 'n': nome, 'en': (x['nm_evento_eng'] or '').strip() or None, 't': tipo_da_nome(nome, PUG_T[x['tipologia']]),
             'dal': dal, 'al': al, 'ora': (x['orario_apertura'] or '')[:5], 'c': x['comune'].strip(), 'p': x['sigla_provincia'].strip(), 'r': 'pug',
             'lat': lat, 'lon': lon, 'ris': None, 'org': '', 'src': 'pug', 'k': None})

# Doppioni (stesso nome, comune e date)
uniq, chiavi = [], set()
for e in sorted(ev, key=lambda e: (e['dal'], e['al'], e['r'], e['c'], e['n'])):
  ch = (unicodedata.normalize('NFKD', e['n'].lower())[:40], e['c'].lower(), e['dal'], e['al'])
  if ch in chiavi: continue
  chiavi.add(ch)
  uniq.append({k: v for k, v in e.items() if v not in (None, '', [])})
out = os.path.join(SITE, 'src', 'data', 'eventi.json')
json.dump({'letto_il': LETTO, 'eventi': uniq}, open(out, 'w'), ensure_ascii=False, separators=(',', ':'))
from collections import Counter
print(len(uniq), 'eventi ;', Counter(e['r'] for e in uniq), Counter(e['t'] for e in uniq))
lom_meta = {'righe': len(lom), 'sagre': sum(1 for x in lom if x['TIPO'].strip() == 'Sagra'), 'fiere': sum(1 for x in lom if x['TIPO'].strip() == 'Fiera'),
            'anno_dopo': sum(1 for x in lom if x['ANNO'].strip() == str(int(OGGI[:4]) + 1))}
json.dump({'letto_il': LETTO, 'lom': lom_meta, 'odh_schede': len(visti), 'er_schede': len(er)}, open(os.path.join(SITE, 'src', 'data', 'fonti-lette.json'), 'w'), ensure_ascii=False, indent=1)

# --- Città di riferimento per « vicino a » : mediana delle coordinate di TUTTE le righe dei file regionali
#     (anche passate) che portano quel comune. Nessuna base esterna.
CITTA = {
  'lom': ['Milano', 'Bergamo', 'Brescia', 'Como', 'Cremona', 'Lecco', 'Lodi', 'Mantova', 'Monza', 'Pavia', 'Sondrio', 'Varese', 'Crema', 'Vigevano', 'Livigno'],
  'aa': ['Bolzano', 'Merano', 'Bressanone', 'Brunico', 'Vipiteno', 'San Candido'],
  'er': ['Bologna', 'Modena', 'Parma', 'Reggio Emilia', 'Piacenza', 'Ferrara', 'Ravenna', 'Rimini', 'Forlì', 'Cesena'],
  'pug': ['Bari', 'Lecce', 'Foggia', 'Taranto', 'Brindisi'],
}
import statistics
pts = {}
def add(c, lat, lon):
  try: lat, lon = float(lat), float(lon)
  except Exception: return
  if not (35 < lat < 48 and 6 < lon < 19): return
  pts.setdefault(c, []).append((lat, lon))
for x in lom: add(('lom', comune(x['COMUNE'])), x['GEO_Y'], x['GEO_X'])
for i in odh:
  ci = ((i.get('ContactInfos') or {}).get('it') or {}).get('City') or ''
  add(('aa', ci.strip()), i.get('Latitude'), i.get('Longitude'))
for x in er:
  for l in x.get('locations') or []:
    c = (l.get('city') or '').strip()
    add(('er', 'Reggio Emilia' if c == "Reggio nell'Emilia" else c), l.get('lat'), l.get('lng'))
for x in csv.DictReader(open(f'{RAW}/puglia.csv', encoding='utf-8', errors='replace')):
  add(('pug', x['comune'].strip()), x['latitudine'], x['longitudine'])
citta = []
for r, nomi in CITTA.items():
  for n in nomi:
    p = pts.get((r, n))
    if not p or len(p) < 2: continue
    citta.append({'n': n, 'r': r, 'lat': round(statistics.median(a for a, _ in p), 4), 'lon': round(statistics.median(b for _, b in p), 4), 'righe': len(p)})
json.dump(citta, open(os.path.join(SITE, 'src', 'data', 'citta.json'), 'w'), ensure_ascii=False, indent=0)
print(len(citta), 'città', [c['n'] for c in citta])
