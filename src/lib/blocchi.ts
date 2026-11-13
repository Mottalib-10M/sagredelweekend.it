/** Blocs calculés, partagés par plusieurs pages (tableaux : hors du contrôle d'unicité). */
import type { Helpers } from './page-types';
import { cerca, perMese, topComuni, NOME_TIPO, NOME_REGIONE, LETTO_IL, type Filtro, type Evento, type Regione } from './engine/eventi';

const nome = (e: Evento, h: Helpers) => (h.lang === 'en' && e.en ? e.en : e.n);
export const quando = (e: Evento, h: Helpers) => (e.dal === e.al ? h.dm(e.dal) : `${h.dm(e.dal < LETTO_IL ? LETTO_IL : e.dal)} – ${h.dm(e.al)}`);

/** Tableau d'événements : date, nom, commune, type. */
export function tabEventi(h: Helpers, f: Filtro, cap: string, max = 25) {
  const l = cerca(f).slice(0, max);
  if (!l.length) return `<p>${h.T('Nessun evento nei file regionali per questo periodo.', 'No event in the regional files for this period.')}</p>`;
  return h.table([h.T('Date', 'Dates'), h.T('Evento', 'Event'), h.T('Comune', 'Town'), h.T('Tipo', 'Type')],
    l.map(({ e }) => [quando(e, h), nome(e, h), `${e.c}${e.p ? ` (${e.p})` : ''}`, NOME_TIPO[e.t][h.lang]]), cap);
}
/** Mois par mois : nombre d'événements qui touchent chaque mois. */
export function tabMesi(h: Helpers, f: Omit<Filtro, 'dal' | 'al'>, da: string, n: number, cap: string) {
  const rows = perMese(da, n, f).map(({ mese, n: c }) => [h.my(mese), c]);
  return h.table([h.T('Mese', 'Month'), h.T('Eventi in calendario', 'Events in the calendar')], rows, cap, ['l', 'r']);
}
/** Communes les plus actives. */
export function tabComuni(h: Helpers, f: Filtro, cap: string, n = 10) {
  const rows = topComuni(cerca(f), n).map((c) => [c.comune, c.prov, c.n]);
  return h.table([h.T('Comune', 'Town'), h.T('Provincia', 'Province'), h.T('Eventi', 'Events')], rows, cap, ['l', 'l', 'r']);
}
/** Répartition par région. */
export function tabRegioni(h: Helpers, f: Omit<Filtro, 'regione'>, cap: string) {
  const rows = (['lom', 'aa', 'er', 'pug'] as Regione[]).map((r) => [NOME_REGIONE[r][h.lang], cerca({ ...f, regione: r }).length]);
  return h.table([h.T('Regione', 'Region'), h.T('Eventi', 'Events')], rows, cap, ['l', 'r']);
}
/** Mercatini di Natale aperti nei giorni chiave dell'Avvento, per regione. */
export const GIORNI_CHIAVE = ['2026-11-28', '2026-12-05', '2026-12-08', '2026-12-13', '2026-12-20', '2026-12-24', '2026-12-25', '2026-12-26', '2026-12-31', '2027-01-06'];
export function tabGiorniNatale(h: Helpers, regioni: Regione[], cap: string) {
  const rows = GIORNI_CHIAVE.filter((d) => d >= LETTO_IL).map((d) => [h.wday(d).replace(/ \d{4}$/, ''), ...regioni.map((r) => cerca({ dal: d, al: d, regione: r, tipi: ['natale'] }).length)]);
  return h.table([h.T('Giorno', 'Day'), ...regioni.map((r) => NOME_REGIONE[r][h.lang])], rows, cap, ['l', ...regioni.map(() => 'r' as const)]);
}
/** Grandi mercatini (almeno 3 giorni) : apertura, chiusura, giorni di chiusura dichiarati. */
export function tabGrandiMercatini(h: Helpers, regione: Regione | '', cap: string, max = 20) {
  const l = cerca({ dal: LETTO_IL, al: '2027-01-31', regione, tipi: ['natale'] }).map((x) => x.e).filter((e) => (Date.parse(e.al) - Date.parse(e.dal)) / 864e5 >= 6 && !/intrattenimento|musica|inaugurazione|in autobus|stand gastronom/i.test(e.n))
    .sort((a, b) => a.dal.localeCompare(b.dal) || a.c.localeCompare(b.c)).slice(0, max);
  const chiusi = (e: Evento) => {
    if (!e.g) return h.T('nessuno dichiarato', 'none declared');
    const out: string[] = []; for (let d = e.dal; d <= e.al; d = new Date(Date.parse(`${d}T12:00:00Z`) + 864e5).toISOString().slice(0, 10)) if (!e.g.includes(d)) out.push(h.dm(d));
    return out.length > 4 ? h.T(`${out.length} giorni`, `${out.length} days`) : out.join(', ') || h.T('nessuno', 'none');
  };
  return h.table([h.T('Mercatino', 'Market'), h.T('Comune', 'Town'), h.T('Apre', 'Opens'), h.T('Chiude', 'Closes'), h.T('Giorni di chiusura', 'Closed on')],
    l.map((e) => [nome(e, h), e.c, h.dm(e.dal < LETTO_IL ? LETTO_IL : e.dal), h.dm(e.al), chiusi(e)]), cap);
}
