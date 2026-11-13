/**
 * Moteur du calendrier : fonctions pures sur les événements des open data régionaux (src/data/eventi.json,
 * produit par scripts/dati/build-eventi.py). Aucune date n'est écrite à la main : tout part de « oggi ».
 */
import DATI from '../../data/eventi.json';

export type Regione = 'lom' | 'aa' | 'er' | 'pug';
export type Tipo = 'sagra' | 'fiera' | 'festa' | 'natale' | 'mercato';
export type Fonte = 'lom' | 'odh' | 'er' | 'pug';
export interface Evento {
  id: string; n: string; en?: string; t: Tipo; tl?: string; dal: string; al: string; g?: string[]; ora?: string;
  c: string; cc?: string[]; p?: string; r: Regione; lat?: number; lon?: number; ris?: boolean; org?: string; src: Fonte; k?: string;
}
export const EVENTI: Evento[] = (DATI as { eventi: Evento[] }).eventi;
export const LETTO_IL: string = (DATI as { letto_il: string }).letto_il;

export const REGIONI: Regione[] = ['lom', 'aa', 'er', 'pug'];
export const NOME_REGIONE: Record<Regione, { it: string; en: string }> = {
  lom: { it: 'Lombardia', en: 'Lombardy' },
  aa: { it: 'Alto Adige', en: 'South Tyrol' },
  er: { it: 'Emilia-Romagna', en: 'Emilia-Romagna' },
  pug: { it: 'Puglia', en: 'Apulia' },
};
export const NOME_TIPO: Record<Tipo, { it: string; en: string }> = {
  sagra: { it: 'Sagra', en: 'Sagra (village festival)' },
  fiera: { it: 'Fiera', en: 'Fair' },
  festa: { it: 'Festa o evento', en: 'Festival or event' },
  natale: { it: 'Mercatino di Natale', en: 'Christmas market' },
  mercato: { it: 'Mercatino', en: 'Market' },
};
export const PROVINCE: Record<string, string> = {
  BG: 'Bergamo', BS: 'Brescia', CO: 'Como', CR: 'Cremona', LC: 'Lecco', LO: 'Lodi', MB: 'Monza e Brianza', MI: 'Milano', MN: 'Mantova', PV: 'Pavia', SO: 'Sondrio', VA: 'Varese',
  BZ: 'Bolzano', BO: 'Bologna', FE: 'Ferrara', FC: 'Forlì-Cesena', MO: 'Modena', PR: 'Parma', PC: 'Piacenza', RA: 'Ravenna', RE: 'Reggio Emilia', RN: 'Rimini',
  BA: 'Bari', BT: 'Barletta-Andria-Trani', BR: 'Brindisi', FG: 'Foggia', LE: 'Lecce', TA: 'Taranto',
};

// ---- dates (UTC, jours entiers) --------------------------------------------------------------
const MS = 864e5;
export const fromIso = (iso: string) => Math.round(Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10)) / MS);
export const toIso = (d: number) => new Date(d * MS).toISOString().slice(0, 10);
export const addDays = (iso: string, n: number) => toIso(fromIso(iso) + n);
/** 0 = lundi … 6 = dimanche */
export const weekday = (iso: string) => (fromIso(iso) + 3) % 7;
export const giorniTra = (a: string, b: string) => fromIso(b) - fromIso(a);

/** Le week-end : du vendredi au dimanche (les sagre ouvrent souvent le vendredi soir). « Questo » = celui de la
 *  semaine en cours, à partir d'aujourd'hui s'il a commencé ; « prossimo » = celui de la semaine suivante. */
export function weekend(oggi: string, quale: 0 | 1 = 0): { dal: string; al: string } {
  const w = weekday(oggi);
  const ven = addDays(oggi, 4 - w);
  const v = addDays(ven, quale * 7);
  return { dal: quale === 0 && oggi > v ? oggi : v, al: addDays(v, 2) };
}
export function fineMese(ym: string) { const y = +ym.slice(0, 4), m = +ym.slice(5, 7); return toIso(Math.round(Date.UTC(y, m, 0) / MS)); }

/** Un événement a lieu un jour donné : dans l'intervalle, et parmi ses jours déclarés s'il en a. */
export function attivoIl(e: Evento, giorno: string) {
  if (giorno < e.dal || giorno > e.al) return false;
  return e.g ? e.g.includes(giorno) : true;
}
/** Un événement touche une période [dal, al]. */
export function nelPeriodo(e: Evento, dal: string, al: string) {
  if (e.al < dal || e.dal > al) return false;
  if (!e.g) return true;
  return e.g.some((x) => x >= dal && x <= al);
}
/** Un événement étalé sur plus de 45 jours, sans liste de jours ou avec plus de 10 jours (marché hebdomadaire, dégustation répétée), est un marché ou une saison, pas une fête : on le classe à part. */
export const lungo = (e: Evento) => giorniTra(e.dal, e.al) > 45 && (!e.g || e.g.length > 10);

// ---- distance -----------------------------------------------------------------------------
export function km(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const R = 6371, rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad, dLon = (b.lon - a.lon) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// ---- ricerca --------------------------------------------------------------------------------
export interface Filtro { dal: string; al: string; regione?: Regione | ''; tipi?: Tipo[]; vicino?: { lat: number; lon: number; km: number }; soloRistoro?: boolean; senzaLunghi?: boolean; provincia?: string; testo?: RegExp }
export interface Trovato { e: Evento; km?: number }
export function cerca(f: Filtro, eventi: Evento[] = EVENTI): Trovato[] {
  const out: Trovato[] = [];
  for (const e of eventi) {
    if (f.regione && e.r !== f.regione) continue;
    if (f.provincia && e.p !== f.provincia) continue;
    if (f.tipi && f.tipi.length && !f.tipi.includes(e.t)) continue;
    if (f.soloRistoro && e.ris !== true) continue;
    if (f.senzaLunghi && lungo(e)) continue;
    if (f.testo && !f.testo.test(e.n)) continue;
    if (!nelPeriodo(e, f.dal, f.al)) continue;
    let d: number | undefined;
    if (f.vicino) {
      if (e.lat == null || e.lon == null) continue;
      d = km(f.vicino, { lat: e.lat, lon: e.lon });
      if (d > f.vicino.km) continue;
    }
    out.push({ e, km: d });
  }
  return out.sort((a, b) => (a.km != null && b.km != null && a.e.dal === b.e.dal ? a.km - b.km : 0) || a.e.dal.localeCompare(b.e.dal) || a.e.n.localeCompare(b.e.n));
}
export const conta = (f: Filtro) => cerca(f).length;

/** Nombre d'événements qui touchent chaque mois, de `da` (AAAA-MM) pour `n` mois. */
export function perMese(da: string, n: number, f: Omit<Filtro, 'dal' | 'al'> = {}) {
  const out: Array<{ mese: string; n: number }> = [];
  let y = +da.slice(0, 4), m = +da.slice(5, 7);
  for (let i = 0; i < n; i++) {
    const ym = `${y}-${String(m).padStart(2, '0')}`;
    out.push({ mese: ym, n: conta({ ...f, dal: `${ym}-01`, al: fineMese(ym) }) });
    m++; if (m > 12) { m = 1; y++; }
  }
  return out;
}

/** Les communes les plus actives d'une sélection. */
export function topComuni(lista: Trovato[], n = 8) {
  const c = new Map<string, number>();
  for (const { e } of lista) c.set(`${e.c}|${e.p ?? ''}`, (c.get(`${e.c}|${e.p ?? ''}`) ?? 0) + 1);
  return [...c.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, n).map(([k, v]) => ({ comune: k.split('|')[0], prov: k.split('|')[1], n: v }));
}

/** Un mercatino est-il aperto ce jour-là ? Et combien de jours avant l'ouverture ou la fermeture. */
export function stato(e: Evento, giorno: string): { aperto: boolean; traGiorni: number; prossimo?: string } {
  if (attivoIl(e, giorno)) return { aperto: true, traGiorni: giorniTra(giorno, e.al) };
  if (giorno < e.dal) return { aperto: false, traGiorni: giorniTra(giorno, e.g?.[0] ?? e.dal), prossimo: e.g?.[0] ?? e.dal };
  const nx = e.g?.find((x) => x > giorno);
  if (nx) return { aperto: false, traGiorni: giorniTra(giorno, nx), prossimo: nx };
  return { aperto: false, traGiorni: -1 };
}

/** Coordinate d'une commune : moyenne des événements géolocalisés qui y ont lieu (pas de base externe). */
export function centroComune(nome: string, eventi: Evento[] = EVENTI) {
  const pts = eventi.filter((e) => e.c === nome && e.lat != null && e.lon != null);
  if (!pts.length) return null;
  return { lat: pts.reduce((s, e) => s + e.lat!, 0) / pts.length, lon: pts.reduce((s, e) => s + e.lon!, 0) / pts.length, n: pts.length };
}
