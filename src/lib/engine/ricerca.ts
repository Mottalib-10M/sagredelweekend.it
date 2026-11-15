/**
 * Ce que montre l'outil de recherche, partagé par l'outil (Trova.tsx) ET par les textes des pages : une page ne peut
 * pas écrire un autre chiffre que celui de son outil pour le même objet (testeurs naïfs du 2026-11-14 : 71 puis 86
 * pour le même week-end, 34, 79 et 95 mercatini, 7 puis « sono 8 »). Chaque chiffre s'écrit avec sa période en
 * toutes lettres (`periodoParole`). Contrôle : tests/coerenza.test.ts.
 */
import { cerca, weekend, addDays, fineMese, giorniTra, weekday, lungo, OGGI, REGIONI, NOME_REGIONE, type Evento, type Regione, type Tipo, type Trovato } from './eventi';

type Lang = 'it' | 'en';
export type Periodo = 'weekend' | 'prossimo' | 'oggi' | 'domani' | '7' | '30' | 'natale' | `m${string}` | 'a2027';
export type Cosa = 'tutto' | 'feste' | 'natale' | 'mercati' | 'fiere' | 'ristoro' | 'tartufo';
const TAG: Record<Lang, string> = { it: 'it-IT', en: 'en-GB' };

export const TIPI: Record<Cosa, Tipo[] | null> = { tutto: null, feste: ['sagra', 'festa', 'fiera'], natale: ['natale'], mercati: ['mercato', 'natale'], fiere: ['fiera'], ristoro: null, tartufo: null };
export const RE_TARTUFO = /tartuf|trüffel|truffle/i;

/** Fin de la saison des marchés de Noël : l'Épiphanie qui suit. */
export const fineStagioneNatale = (oggi: string) => `${+oggi.slice(0, 4) + (+oggi.slice(5, 7) >= 7 ? 1 : 0)}-01-06`;

/** Période → [dal, al] à partir du jour donné. */
export function intervallo(p: Periodo, oggi: string): { dal: string; al: string } {
  if (p === 'weekend') return weekend(oggi, 0);
  if (p === 'prossimo') return weekend(oggi, 1);
  if (p === 'oggi') return { dal: oggi, al: oggi };
  if (p === 'domani') { const d = addDays(oggi, 1); return { dal: d, al: d }; }
  if (p === '7') return { dal: oggi, al: addDays(oggi, 6) };
  if (p === '30') return { dal: oggi, al: addDays(oggi, 29) };
  if (p === 'natale') return { dal: oggi, al: fineStagioneNatale(oggi) };
  if (p === 'a2027') return { dal: '2027-01-01', al: '2027-12-31' };
  const ym = p.slice(1);
  const dal = `${ym}-01` < oggi ? oggi : `${ym}-01`;
  return { dal, al: fineMese(ym) };
}

export interface Stato { periodo: Periodo | string; regione?: Regione | ''; cosa?: Cosa | string; vicino?: { lat: number; lon: number; km: number }; conLunghi?: boolean }
export interface Risultato { dal: string; al: string; tutti: Trovato[]; lista: Trovato[]; lunghiN: number }
/** La recherche telle que l'outil la fait : la liste affichée (`lista`) et les marchés de longue durée mis à part. */
export function ricerca(s: Stato, oggi: string = OGGI): Risultato {
  const { dal, al } = intervallo(s.periodo as Periodo, oggi);
  const cosa = (s.cosa ?? 'tutto') as Cosa;
  const tutti = cerca({
    dal, al, regione: s.regione || undefined, tipi: TIPI[cosa] ?? undefined, soloRistoro: cosa === 'ristoro',
    testo: cosa === 'tartufo' ? RE_TARTUFO : undefined, vicino: s.vicino, iniziaNelPeriodo: s.periodo === 'a2027',
  });
  const mostraLunghi = s.conLunghi || cosa === 'mercati' || cosa === 'natale';
  const lista = mostraLunghi ? tutti : tutti.filter((x) => !lungo(x.e));
  return { dal, al, tutti, lista, lunghiN: tutti.length - lista.length };
}
/**
 * Premier jour où la même recherche trouve quelque chose après la période (« in Puglia nessuno questo weekend :
 * prossima data domenica 6 dicembre »), ou null si les fichiers n'ont rien après. Testeurs naïfs, 3e tour.
 */
export function prossimaData(s: Stato, oggi: string = OGGI): string | null {
  const { al } = intervallo(s.periodo as Periodo, oggi);
  const da = addDays(al, 1);
  const cosa = (s.cosa ?? 'tutto') as Cosa;
  const mostraLunghi = s.conLunghi || cosa === 'mercati' || cosa === 'natale';
  const dopo = cerca({
    dal: da, al: '9999-12-31', regione: s.regione || undefined, tipi: TIPI[cosa] ?? undefined, soloRistoro: cosa === 'ristoro',
    testo: cosa === 'tartufo' ? RE_TARTUFO : undefined, vicino: s.vicino, senzaLunghi: !mostraLunghi,
  });
  let min: string | null = null;
  for (const { e } of dopo) {
    const d = e.g ? e.g.find((x) => x >= da) : e.dal > da ? e.dal : da;
    if (d && (!min || d < min)) min = d;
  }
  return min;
}
/** Le chiffre que l'outil affiche pour ces réglages, au jour de référence. */
export const contaStrumento = (s: Stato, oggi: string = OGGI) => ricerca(s, oggi).lista.length;

// ---- mots ------------------------------------------------------------------------------------
const fmt = (iso: string, lang: Lang, o: Intl.DateTimeFormatOptions) => new Date(`${iso}T12:00:00Z`).toLocaleDateString(TAG[lang], { ...o, timeZone: 'UTC' });
const e_ = (l: string[], lang: Lang) => (l.length < 2 ? l.join('') : `${l.slice(0, -1).join(', ')} ${lang === 'it' ? 'e' : 'and'} ${l[l.length - 1]}`);

/**
 * Une période en toutes lettres : « sabato 14 e domenica 15 novembre », « venerdì 13 novembre »,
 * « dal 14 novembre al 13 dicembre 2026 », « dal 14 novembre 2026 al 6 gennaio 2027 ».
 */
export function periodoParole(dal: string, al: string, lang: Lang): string {
  const n = giorniTra(dal, al);
  if (n === 0) return fmt(dal, lang, { weekday: 'long', day: 'numeric', month: 'long' });
  if (n <= 2) {
    const giorni = Array.from({ length: n + 1 }, (_, i) => addDays(dal, i));
    const stessoMese = dal.slice(0, 7) === al.slice(0, 7);
    const parti = giorni.map((d, i) => fmt(d, lang, stessoMese && i < giorni.length - 1 ? { weekday: 'long', day: 'numeric' } : { weekday: 'long', day: 'numeric', month: 'long' }));
    return e_(parti, lang);
  }
  const stessoAnno = dal.slice(0, 4) === al.slice(0, 4);
  const a = fmt(dal, lang, stessoAnno ? { day: 'numeric', month: 'long' } : { day: 'numeric', month: 'long', year: 'numeric' });
  const b = fmt(al, lang, { day: 'numeric', month: 'long', year: 'numeric' });
  return lang === 'it' ? `dal ${a} al ${b}` : `from ${a} to ${b}`;
}
/** « 71 eventi sabato 14 e domenica 15 novembre » : le chiffre, son objet et sa période. */
export const eventiNelPeriodo = (n: number, dal: string, al: string, lang: Lang) =>
  `${n} ${lang === 'it' ? (n === 1 ? 'evento' : 'eventi') : n === 1 ? 'event' : 'events'} ${periodoParole(dal, al, lang)}`;

/** Les régions couvertes, en toutes lettres : « Lombardia, Alto Adige, Emilia-Romagna e Puglia ». */
export const regioniCoperte = (lang: Lang) => e_(REGIONI.map((r) => NOME_REGIONE[r][lang]), lang);

/** Horaire lisible : « 23:59 » seul n'est pas un horaire, « 08:00 – 23:59 » veut dire « à partir de 8 h ». */
export function orario(ora: string | undefined, lang: Lang): string {
  if (!ora) return '';
  const o = ora.trim();
  if (/^(23:59|00:00)$/.test(o) || /^00:00\s*–\s*23:59$/.test(o)) return '';
  const m = o.match(/^(\d\d:\d\d)\s*–\s*23:59$/);
  if (m) return lang === 'it' ? `dalle ${m[1]}` : `from ${m[1]}`;
  return lang === 'it' ? `ore ${o}` : `${o}`;
}

/**
 * Horaire d'une fiche : `ora` = horaire habituel, `ora1` = celui du seul jour d'ouverture quand il diffère, `orv` =
 * horaires qui changent selon les jours. Bolzano « ore 17:00 – 22:30 » était l'horaire de la soirée d'ouverture
 * affiché comme celui de toute la saison (testeurs naïfs, 3e tour du 2026-11-14).
 */
export function orarioScheda(e: Evento, lang: Lang): string {
  const base = orario(e.ora, lang);
  const parti: string[] = [];
  if (base) parti.push(e.orv || e.ora1 ? `${lang === 'it' ? 'di solito' : 'usually'} ${base}` : base);
  const o1 = orario(e.ora1, lang);
  if (o1) parti.push(`${lang === 'it' ? 'giorno d’apertura' : 'opening day'} (${corto(e.dal, lang)}) ${o1}`);
  return parti.join(' · ');
}

/** Titres génériques (« Mercatini di Natale ») : la commune s'ajoute pour les distinguer dans la liste. */
const GENERICO = /^(mercatin[oi]|mercato|fiera|sagra|festa)( (di|del|della) (natale|paese|settimanale|santa lucia))?( settimanale)?$/i;
export function nomeVisibile(e: Evento, lang: Lang): string {
  const n = (lang === 'en' && e.en ? e.en : e.n).trim();
  return GENERICO.test(n) ? `${n} – ${e.c}` : n;
}

const GIORNI_SETT: Record<Lang, string[]> = {
  it: ['lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato', 'domenica'],
  en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
};
const corto = (iso: string, lang: Lang) => fmt(iso, lang, { weekday: 'short', day: 'numeric', month: 'short' });
/**
 * Les jours d'ouverture d'un événement qui n'est ouvert que certains jours (`g`), dits en mots : « solo venerdì,
 * sabato e domenica, più 8 dic » ou « tutti i giorni tranne 25 dic ». Remplace « 29 giorni » de fermeture, lu
 * « fermé 29 jours » par les trois testeurs.
 */
export function schemaApertura(e: Evento, lang: Lang): string {
  if (!e.g) return lang === 'it' ? 'tutti i giorni (nessuna chiusura dichiarata)' : 'every day (no closed day declared)';
  const conta = Array(7).fill(0) as number[];
  for (const d of e.g) conta[weekday(d)]++;
  const base = conta.map((c, i) => (c >= 2 ? i : -1)).filter((i) => i >= 0);
  const chiusi: string[] = [];
  for (let d = e.dal; d <= e.al; d = addDays(d, 1)) if (!e.g.includes(d)) chiusi.push(d);
  if (!chiusi.length) return lang === 'it' ? 'tutti i giorni' : 'every day';
  if (chiusi.length <= 4) return `${lang === 'it' ? 'tutti i giorni tranne' : 'every day except'} ${e_(chiusi.map((d) => fmt(d, lang, { day: 'numeric', month: 'short' })), lang)}`;
  if (base.length === 0 || base.length === 7) return e.g.length <= 6 ? e_(e.g.map((d) => corto(d, lang)), lang) : `${e.g.length} ${lang === 'it' ? 'giorni' : 'days'}`;
  const extra = e.g.filter((d) => !base.includes(weekday(d)));
  const nomi = base.map((i) => GIORNI_SETT[lang][i]);
  const testo = `${lang === 'it' ? 'solo' : 'only'} ${e_(nomi, lang)}`;
  if (!extra.length) return testo;
  return extra.length <= 3
    ? `${testo}, ${lang === 'it' ? 'più' : 'plus'} ${e_(extra.map((d) => fmt(d, lang, { day: 'numeric', month: 'short' })), lang)}`
    : `${testo}, ${lang === 'it' ? 'più alcuni festivi' : 'plus some holidays'}`;
}
/** Sur une fiche : les jours d'ouverture dans la période affichée (« aperto sab 14 e dom 15 »). */
export function giorniNelPeriodo(e: Evento, dal: string, al: string, lang: Lang): string {
  if (!e.g) return '';
  const dentro = e.g.filter((d) => d >= dal && d <= al);
  if (dentro.length && dentro.length <= 4) return `${lang === 'it' ? 'aperto' : 'open'} ${e_(dentro.map((d) => corto(d, lang)), lang)}`;
  return `${lang === 'it' ? 'aperto' : 'open'} ${schemaApertura(e, lang)}`;
}
