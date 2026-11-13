/**
 * Il motore di ricerca delle sagre : regione, periodo, tipo, e se la pagina lo chiede città e raggio.
 * Premier rendu = jour du build (__BUILD_DAY__), identique serveur/navigateur (RECETTE §17.5) ; le jour réel
 * et un lien partagé (?r=…&q=…) ne sont lus qu'après l'hydratation. L'URL ne change qu'après une action.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import NumberField from '../ui/NumberField';
import { cerca, weekend, addDays, fineMese, NOME_REGIONE, NOME_TIPO, PROVINCE, LETTO_IL, giorniTra, lungo, type Regione, type Tipo, type Evento } from '../../lib/engine/eventi';
import CITTA from '../../data/citta.json';
import { readParams, str, num, updateURL } from '../../lib/url-state';
import type { Preset, Periodo, Cosa } from './preset';

type Lang = 'it' | 'en';
const TAG: Record<Lang, string> = { it: 'it-IT', en: 'en-GB' };
const L = {
  it: { dove: 'Regione', tutte: 'Tutte le regioni coperte', quando: 'Quando', cosa: 'Che cosa', vicino: 'Vicino a', raggio: 'Entro', km: 'km',
    tutto: 'Tutto', feste: 'Sagre, feste e fiere', natale: 'Mercatini di Natale', mercati: 'Mercatini e mercati contadini', fiere: 'Solo fiere', ristoro: 'Con cucina o ristoro (Lombardia)', tartufo: 'Sagre del tartufo',
    weekend: 'Questo fine settimana', prossimo: 'Il fine settimana dopo', oggi: 'Oggi', domani: 'Domani', g7: 'Nei prossimi 7 giorni', g30: 'Nei prossimi 30 giorni', a2027: 'Tutto il 2027 (date già comunicate)',
    eventi: (n: number) => (n === 1 ? 'evento' : 'eventi'), nessuno: 'Nessun evento con questi filtri nei file regionali. Prova un periodo più lungo, un raggio più ampio o un’altra regione.',
    dal: 'dal', al: 'al', il: 'il', ore: 'ore', programma: 'Programma (Comune)', scheda: 'Scheda ufficiale', fonte: 'Fonte', letto: 'letto il', altri: 'Mostra altri', ristoroSi: 'con ristoro', posizione: 'La mia posizione', posizioneOk: 'Posizione del dispositivo', posizioneNo: 'Posizione non disponibile: scegli una città.', da: 'da',
    lunghi: 'Mercati e stagioni di più di 45 giorni', nascondi: (n: number) => `${n} mercati settimanali o stagioni lunghe nascosti`, mostraLunghi: 'Mostrali', giorniEv: 'giorni dichiarati', alcuni: 'solo alcuni giorni', km2: 'km' },
  en: { dove: 'Region', tutte: 'All covered regions', quando: 'When', cosa: 'What', vicino: 'Near', raggio: 'Within', km: 'km',
    tutto: 'Everything', feste: 'Sagre, festivals and fairs', natale: 'Christmas markets', mercati: 'Markets and farmers’ markets', fiere: 'Fairs only', ristoro: 'With food served (Lombardy)', tartufo: 'Truffle festivals',
    weekend: 'This weekend', prossimo: 'The weekend after', oggi: 'Today', domani: 'Tomorrow', g7: 'Next 7 days', g30: 'Next 30 days', a2027: 'All of 2027 (dates filed so far)',
    eventi: (n: number) => (n === 1 ? 'event' : 'events'), nessuno: 'No event matches these filters in the regional files. Try a longer period, a wider radius or another region.',
    dal: 'from', al: 'to', il: 'on', ore: 'time', programma: 'Programme (municipality)', scheda: 'Official listing', fonte: 'Source', letto: 'read on', altri: 'Show more', ristoroSi: 'food served', posizione: 'My location', posizioneOk: 'Your device’s location', posizioneNo: 'Location unavailable: pick a town.', da: 'from',
    lunghi: 'Markets and seasons longer than 45 days', nascondi: (n: number) => `${n} weekly markets or long seasons hidden`, mostraLunghi: 'Show them', giorniEv: 'declared days', alcuni: 'certain days only', km2: 'km' },
};
const FONTE: Record<string, { it: string; en: string }> = {
  lom: { it: 'Regione Lombardia, CC0', en: 'Lombardy Region, CC0' },
  odh: { it: 'Open Data Hub Alto Adige, CC0', en: 'Open Data Hub South Tyrol, CC0' },
  er: { it: 'Emilia-Romagna Turismo, CC BY 4.0', en: 'Emilia-Romagna Tourism, CC BY 4.0' },
  pug: { it: 'Regione Puglia, CC BY 4.0', en: 'Apulia Region, CC BY 4.0' },
};
const TIPI: Record<Cosa, Tipo[] | null> = { tutto: null, feste: ['sagra', 'festa', 'fiera'], natale: ['natale'], mercati: ['mercato', 'natale'], fiere: ['fiera'], ristoro: null, tartufo: null };
const LISTA = 20;

export const giornoLungo = (iso: string, lang: Lang) => new Date(`${iso}T12:00:00Z`).toLocaleDateString(TAG[lang], { weekday: 'short', day: 'numeric', month: 'long', timeZone: 'UTC' });
const giornoCorto = (iso: string, lang: Lang) => new Date(`${iso}T12:00:00Z`).toLocaleDateString(TAG[lang], { day: 'numeric', month: 'short', timeZone: 'UTC' });
const meseNome = (ym: string, lang: Lang) => { const s = new Date(`${ym}-15T12:00:00Z`).toLocaleDateString(TAG[lang], { month: 'long', year: 'numeric', timeZone: 'UTC' }); return s.charAt(0).toUpperCase() + s.slice(1); };
export function quando(e: Evento, lang: Lang) {
  const t = L[lang];
  return e.dal === e.al ? `${t.il} ${giornoLungo(e.dal, lang)}` : `${t.dal} ${giornoCorto(e.dal, lang)} ${t.al} ${giornoCorto(e.al, lang)}`;
}
/** Période → [dal, al] à partir du jour donné. */
export function intervallo(p: Periodo, oggi: string): { dal: string; al: string } {
  if (p === 'weekend') return weekend(oggi, 0);
  if (p === 'prossimo') return weekend(oggi, 1);
  if (p === 'oggi') return { dal: oggi, al: oggi };
  if (p === 'domani') { const d = addDays(oggi, 1); return { dal: d, al: d }; }
  if (p === '7') return { dal: oggi, al: addDays(oggi, 6) };
  if (p === '30') return { dal: oggi, al: addDays(oggi, 29) };
  if (p === 'a2027') return { dal: '2027-01-01', al: '2027-12-31' };
  const ym = p.slice(1);
  const dal = `${ym}-01` < oggi ? oggi : `${ym}-01`;
  return { dal, al: fineMese(ym) };
}
function mesi(oggi: string, n = 14) {
  const out: string[] = []; let y = +oggi.slice(0, 4), m = +oggi.slice(5, 7);
  for (let i = 0; i < n; i++) { out.push(`${y}-${String(m).padStart(2, '0')}`); m++; if (m > 12) { m = 1; y++; } }
  return out;
}
const oggiRoma = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());

interface Props { lang: Lang; preset?: Preset; idPrefix?: string; titolo?: string }

export default function Trova({ lang, preset = {}, idPrefix = 't', titolo }: Props) {
  const t = L[lang];
  const [oggi, setOggi] = useState<string>(__BUILD_DAY__ < LETTO_IL ? LETTO_IL : __BUILD_DAY__);
  const [regione, setRegione] = useState<string>(preset.regione ?? '');
  const [periodo, setPeriodo] = useState<string>(preset.periodo ?? 'weekend');
  const [cosa, setCosa] = useState<string>(preset.cosa ?? 'tutto');
  const [citta, setCitta] = useState<string>(preset.citta ?? 'Bolzano');
  const [raggio, setRaggio] = useState<number>(preset.raggio ?? 30);
  const [geo, setGeo] = useState<{ lat: number; lon: number } | null>(null);
  const [geoErr, setGeoErr] = useState(false);
  const [quanti, setQuanti] = useState(LISTA);
  const [conLunghi, setConLunghi] = useState(false);

  useEffect(() => {
    const d = oggiRoma(); if (d > LETTO_IL) setOggi(d);
    const u = readParams(window.location.search);
    setRegione(str(u, 'r', preset.regione ?? '')); setPeriodo(str(u, 'q', preset.periodo ?? 'weekend')); setCosa(str(u, 'c', preset.cosa ?? 'tutto'));
    if (preset.vicino) { setCitta(str(u, 'v', preset.citta ?? 'Bolzano')); setRaggio(num(u, 'km', preset.raggio ?? 30)); }
  }, []);
  const tocca = (k: string, v: string | number) => {
    const s = { r: regione, q: periodo, c: cosa, ...(preset.vicino ? { v: citta, km: raggio } : {}), [k]: v };
    updateURL(Object.fromEntries(Object.entries(s).filter(([, x]) => x !== '' && x !== undefined)));
    setQuanti(LISTA);
  };

  const elencoMesi = mesi(oggi);
  const periodi = [
    ['weekend', t.weekend], ['prossimo', t.prossimo], ['oggi', t.oggi], ['domani', t.domani], ['7', t.g7], ['30', t.g30],
    ...elencoMesi.map((m) => [`m${m}`, meseNome(m, lang)]), ['a2027', t.a2027],
  ].map(([value, label]) => ({ value, label }));
  if (!periodi.some((p) => p.value === periodo)) periodi.push({ value: periodo, label: periodo.startsWith('m') ? meseNome(periodo.slice(1), lang) : periodo });
  const regioni = [{ value: '', label: t.tutte }, ...(['lom', 'aa', 'er', 'pug'] as Regione[]).map((r) => ({ value: r, label: NOME_REGIONE[r][lang] }))];
  const cose = (['tutto', 'feste', 'natale', 'mercati', 'fiere', 'ristoro', 'tartufo'] as Cosa[]).map((c) => ({ value: c, label: t[c] }));
  const citta_ = (CITTA as Array<{ n: string; r: Regione; lat: number; lon: number }>);
  const opzCitta = [{ value: '__geo', label: t.posizione }, ...citta_.map((c) => ({ value: c.n, label: `${c.n} (${NOME_REGIONE[c.r][lang]})` }))];

  const { dal, al } = intervallo(periodo as Periodo, oggi);
  const centro = preset.vicino ? (citta === '__geo' ? geo : citta_.find((c) => c.n === citta) ?? null) : null;
  const tutti = useMemo(() => cerca({
    dal, al, regione: (regione || undefined) as Regione | undefined,
    tipi: TIPI[cosa as Cosa] ?? undefined, soloRistoro: cosa === 'ristoro',
    testo: cosa === 'tartufo' ? /tartuf|trüffel|truffle/i : undefined,
    vicino: centro ? { lat: centro.lat, lon: centro.lon, km: raggio } : undefined,
  }), [dal, al, regione, cosa, centro?.lat, centro?.lon, raggio]);
  const lunghiN = tutti.filter((x) => lungo(x.e)).length;
  const lista = conLunghi || cosa === 'mercati' || cosa === 'natale' ? tutti : tutti.filter((x) => !lungo(x.e));
  const n = lista.length;
  const chiediGeo = () => {
    if (!navigator.geolocation) { setGeoErr(true); return; }
    navigator.geolocation.getCurrentPosition((p) => { setGeo({ lat: p.coords.latitude, lon: p.coords.longitude }); setGeoErr(false); }, () => setGeoErr(true), { maximumAge: 600000, timeout: 10000 });
  };
  const periodoTesto = dal === al ? giornoLungo(dal, lang) : `${giornoLungo(dal, lang)} – ${giornoLungo(al, lang)}`;

  return (
    <div className="rounded-xl border border-accent-200 bg-white p-4 shadow-sm sm:p-5">
      {titolo && <p className="mb-3 text-base font-semibold text-navy-900">{titolo}</p>}
      <form onSubmit={(e) => e.preventDefault()} className={`grid gap-x-4 gap-y-3 sm:grid-cols-2 ${preset.vicino ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
        {preset.vicino
          ? <SelectField id={`${idPrefix}-citta`} label={t.vicino} value={citta} options={opzCitta} onChange={(v) => { setCitta(v); tocca('v', v); if (v === '__geo') chiediGeo(); }} />
          : <SelectField id={`${idPrefix}-regione`} label={t.dove} value={regione} options={regioni} onChange={(v) => { setRegione(v); tocca('r', v); }} />}
        {preset.vicino && <NumberField id={`${idPrefix}-km`} label={t.raggio} value={raggio} unit={t.km} max={200} onChange={(v) => { setRaggio(v); tocca('km', v); }} />}
        <SelectField id={`${idPrefix}-quando`} label={t.quando} value={periodo} options={periodi} onChange={(v) => { setPeriodo(v); tocca('q', v); }} />
        <SelectField id={`${idPrefix}-cosa`} label={t.cosa} value={cosa} options={cose} onChange={(v) => { setCosa(v); tocca('c', v); }} />
      </form>
      {preset.vicino && citta === '__geo' && <p className="mt-2 text-sm text-navy-600" role="status">{geo ? t.posizioneOk : geoErr ? t.posizioneNo : '…'}</p>}
      <div data-resultat aria-live="polite" className="mt-4 rounded-lg bg-navy-50 p-4">
        <p className="text-sm font-medium text-navy-600">{periodoTesto}{centro ? ` · ${t.raggio.toLowerCase()} ${raggio} ${t.km}` : ''}</p>
        <p className="tabular-nums mt-1 text-3xl font-bold text-navy-900">{n} {t.eventi(n)}</p>
        {n === 0 && <p className="mt-2 text-sm text-navy-700">{t.nessuno}</p>}
        {lunghiN > 0 && !conLunghi && cosa !== 'mercati' && cosa !== 'natale' && <div className="mt-2 text-xs text-navy-600">{t.nascondi(lunghiN)} · <button type="button" className="font-medium text-accent-700 underline" onClick={() => setConLunghi(true)}>{t.mostraLunghi}</button></div>}
      </div>
      {n > 0 && (
        <ul className="mt-4 divide-y divide-navy-100">
          {lista.slice(0, quanti).map(({ e, km }) => (
            <li key={e.id} className="py-3">
              <div className="font-semibold text-navy-900 [overflow-wrap:anywhere]">{lang === 'en' && e.en ? e.en : e.n}</div>
              <div className="text-sm text-navy-700">{quando(e, lang)}{e.g ? ` (${t.alcuni})` : ''}{e.ora ? ` · ${t.ore} ${e.ora}` : ''}</div>
              <div className="text-sm text-navy-700">{e.c}{e.p ? ` (${e.p})` : ''} · {NOME_TIPO[e.t][lang]}{e.ris ? ` · ${t.ristoroSi}` : ''}{km != null ? ` · ${Math.round(km)} ${t.km2}` : ''}</div>
              <div className="text-xs text-navy-500">
                {e.src === 'lom' && e.k && <><a className="text-accent-700 underline" href={'https://www.procedimenti.servizirl.it/sagre/public/programma/' + e.k} target="_blank" rel="nofollow noopener noreferrer">{t.programma}</a> · </>}
                {e.src === 'er' && e.k && <><a className="text-accent-700 underline" href={'https://emiliaromagnaturismo.it/it/eventi/' + e.k} target="_blank" rel="nofollow noopener noreferrer">{t.scheda}</a> · </>}
                {t.fonte}: {FONTE[e.src][lang]}, {t.letto} {giornoCorto(LETTO_IL, lang)} {LETTO_IL.slice(0, 4)}
              </div>
            </li>
          ))}
        </ul>
      )}
      {n > quanti && <button type="button" onClick={() => setQuanti((q) => q + 40)} className="mt-2 rounded-lg border border-navy-300 px-4 py-2 text-sm font-medium text-navy-800 hover:bg-navy-50">{t.altri} ({n - quanti})</button>}
    </div>
  );
}

export { PROVINCE, giorniTra };
