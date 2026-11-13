/**
 * Mini-simulateurs des pages (RECETTE §9.3) : chacun interroge le même moteur que l'outil principal
 * (engine/eventi.ts) sur le calendrier lu le jour de LETTO_IL. Les choix sont des listes : les dates
 * proposées partent du jour de lecture des fichiers, identiques au build et dans le navigateur.
 */
import type { MiniSpec } from './mini-types';
import { cerca, weekend, addDays, fineMese, topComuni, NOME_REGIONE, LETTO_IL, giorniTra, lungo, attivoIl, EVENTI, type Regione, type Tipo } from './engine/eventi';

type Lang = 'it' | 'en';
const TAG: Record<Lang, string> = { it: 'it-IT', en: 'en-GB' };
const REG: Array<Regione | ''> = ['', 'lom', 'aa', 'er', 'pug'];
const regOpts = (lang: Lang) => REG.map((r, i) => ({ value: String(i), label: r ? NOME_REGIONE[r][lang] : (lang === 'it' ? 'Tutte le regioni coperte' : 'All covered regions') }));
const COSA: Array<{ it: string; en: string; tipi?: Tipo[] }> = [
  { it: 'Tutto', en: 'Everything' },
  { it: 'Sagre, feste e fiere', en: 'Sagre, festivals and fairs', tipi: ['sagra', 'festa', 'fiera'] },
  { it: 'Mercatini di Natale', en: 'Christmas markets', tipi: ['natale'] },
  { it: 'Mercatini e mercati', en: 'Markets', tipi: ['mercato', 'natale'] },
];
const fmtG = (iso: string, lang: Lang, o: Intl.DateTimeFormatOptions) => new Date(`${iso}T12:00:00Z`).toLocaleDateString(TAG[lang], { ...o, timeZone: 'UTC' });
const mesi = (n: number) => { const out: string[] = []; let y = +LETTO_IL.slice(0, 4), m = +LETTO_IL.slice(5, 7); for (let i = 0; i < n; i++) { out.push(`${y}-${String(m).padStart(2, '0')}`); m++; if (m > 12) { m = 1; y++; } } return out; };
const MESI = mesi(14);
const nomeMese = (ym: string, lang: Lang) => { const s = fmtG(`${ym}-15`, lang, { month: 'long', year: 'numeric' }); return s.charAt(0).toUpperCase() + s.slice(1); };
const WEEKEND = Array.from({ length: 8 }, (_, i) => weekend(addDays(LETTO_IL, i * 7), 0));
const letto = (lang: Lang) => (lang === 'it' ? `Calendario dei file regionali letto il ${fmtG(LETTO_IL, lang, { day: 'numeric', month: 'long', year: 'numeric' })}.` : `Calendar from the regional files read on ${fmtG(LETTO_IL, lang, { day: 'numeric', month: 'long', year: 'numeric' })}.`);
const GIORNI_NATALE = ['2026-11-28', '2026-12-05', '2026-12-08', '2026-12-13', '2026-12-20', '2026-12-24', '2026-12-26', '2026-12-31', '2027-01-06'].filter((d) => d >= LETTO_IL);

const SPECS: Record<string, (lang: Lang) => MiniSpec> = {
  /** Quante sagre in un mese, per regione e tipo. */
  mese: (lang) => ({
    title: lang === 'it' ? 'Quanti eventi in un mese' : 'How many events in a month',
    cta: lang === 'it' ? 'Vedi l’elenco completo' : 'See the full list',
    inputs: [
      { id: 'reg', label: lang === 'it' ? 'Regione' : 'Region', def: 0, options: regOpts(lang) },
      { id: 'mese', label: lang === 'it' ? 'Mese' : 'Month', def: 1, options: MESI.map((m, i) => ({ value: String(i), label: nomeMese(m, lang) })) },
      { id: 'cosa', label: lang === 'it' ? 'Che cosa' : 'What', def: 1, options: COSA.map((c, i) => ({ value: String(i), label: c[lang] })) },
    ],
    exemple: (v) => (lang === 'it' ? `Esempio: ${nomeMese(MESI[v.mese] ?? MESI[0], lang)}, ${REG[v.reg] ? NOME_REGIONE[REG[v.reg] as Regione].it : 'tutte le regioni'}` : `Example: ${nomeMese(MESI[v.mese] ?? MESI[0], lang)}, ${REG[v.reg] ? NOME_REGIONE[REG[v.reg] as Regione].en : 'all regions'}`),
    run: (v) => {
      const ym = MESI[v.mese] ?? MESI[0];
      const dal = `${ym}-01` < LETTO_IL ? LETTO_IL : `${ym}-01`, al = fineMese(ym);
      const r = (REG[v.reg] || undefined) as Regione | undefined;
      const tutti = cerca({ dal, al, regione: r, tipi: COSA[v.cosa]?.tipi, senzaLunghi: v.cosa !== 3 });
      const top = topComuni(tutti, 1)[0];
      const fs = cerca({ dal, al, regione: r, tipi: ['sagra', 'festa', 'fiera'], senzaLunghi: true }).length;
      const nat = cerca({ dal, al, regione: r, tipi: ['natale'] }).length;
      return {
        head: [lang === 'it' ? `Eventi a ${nomeMese(ym, lang).toLowerCase()}` : `Events in ${nomeMese(ym, lang)}`, String(tutti.length)],
        rows: [
          [lang === 'it' ? 'Sagre, feste e fiere' : 'Sagre, festivals and fairs', String(fs)],
          [lang === 'it' ? 'Mercatini di Natale' : 'Christmas markets', String(nat)],
          [lang === 'it' ? 'Comune con più date' : 'Busiest town', top ? `${top.comune} (${top.n})` : '–'],
        ],
        note: letto(lang),
      };
    },
  }),
  /** Un fine settimana preciso : quanti eventi, e dove. */
  weekend: (lang) => ({
    title: lang === 'it' ? 'Un fine settimana a scelta' : 'Pick a weekend',
    cta: lang === 'it' ? 'Apri la ricerca completa' : 'Open the full search',
    inputs: [
      { id: 'reg', label: lang === 'it' ? 'Regione' : 'Region', def: 0, options: regOpts(lang) },
      { id: 'w', label: lang === 'it' ? 'Fine settimana' : 'Weekend', def: 0, options: WEEKEND.map((w, i) => ({ value: String(i), label: `${fmtG(w.dal, lang, { day: 'numeric', month: 'short' })} – ${fmtG(w.al, lang, { day: 'numeric', month: 'short', year: 'numeric' })}` })) },
    ],
    exemple: (v) => `${lang === 'it' ? 'Esempio' : 'Example'}: ${fmtG((WEEKEND[v.w] ?? WEEKEND[0]).dal, lang, { day: 'numeric', month: 'long' })}, ${(REG[v.reg] ? NOME_REGIONE[REG[v.reg] as Regione][lang] : (lang === 'it' ? 'tutte le regioni' : 'all regions'))}`,
    run: (v) => {
      const w = WEEKEND[v.w] ?? WEEKEND[0];
      const r = (REG[v.reg] || undefined) as Regione | undefined;
      const tutti = cerca({ dal: w.dal, al: w.al, regione: r, senzaLunghi: true });
      const sab = tutti.filter((x) => attivoIl(x.e, addDays(w.al, -1))).length;
      const dom = tutti.filter((x) => attivoIl(x.e, w.al)).length;
      const top = topComuni(tutti, 1)[0];
      return {
        head: [lang === 'it' ? 'Eventi nel fine settimana' : 'Events that weekend', String(tutti.length)],
        rows: [
          [lang === 'it' ? 'Aperti il sabato' : 'On the Saturday', String(sab)],
          [lang === 'it' ? 'Aperti la domenica' : 'On the Sunday', String(dom)],
          [lang === 'it' ? 'Comune con più eventi' : 'Busiest town', top ? `${top.comune} (${top.n})` : '–'],
        ],
        note: letto(lang),
      };
    },
  }),
  /** Quanti mercatini di Natale sono aperti un giorno preciso. */
  natale: (lang) => ({
    title: lang === 'it' ? 'Mercatini aperti in un giorno' : 'Markets open on a given day',
    cta: lang === 'it' ? 'Controlla un mercatino' : 'Check one market',
    inputs: [
      { id: 'reg', label: lang === 'it' ? 'Regione' : 'Region', def: 0, options: regOpts(lang).slice(0, 4) },
      { id: 'g', label: lang === 'it' ? 'Giorno' : 'Day', def: 2, options: GIORNI_NATALE.map((d, i) => ({ value: String(i), label: fmtG(d, lang, { weekday: 'short', day: 'numeric', month: 'long' }) })) },
    ],
    exemple: (v) => `${lang === 'it' ? 'Esempio' : 'Example'}: ${fmtG(GIORNI_NATALE[v.g] ?? GIORNI_NATALE[0], lang, { day: 'numeric', month: 'long' })}, ${(REG[v.reg] ? NOME_REGIONE[REG[v.reg] as Regione][lang] : (lang === 'it' ? 'tutte le regioni' : 'all regions'))}`,
    run: (v) => {
      const d = GIORNI_NATALE[v.g] ?? GIORNI_NATALE[0];
      const r = (REG[v.reg] || undefined) as Regione | undefined;
      const aperti = EVENTI.filter((e) => e.t === 'natale' && (!r || e.r === r) && giorniTra(e.dal, e.al) >= 2 && attivoIl(e, d));
      const ult = aperti.filter((e) => e.al === d).length;
      const piuLungo = [...aperti].sort((a, b) => b.al.localeCompare(a.al))[0];
      return {
        head: [lang === 'it' ? 'Mercatini di Natale aperti' : 'Christmas markets open', String(aperti.length)],
        rows: [
          [lang === 'it' ? 'All’ultimo giorno' : 'On their last day', String(ult)],
          [lang === 'it' ? 'Aperto più a lungo' : 'Stays open longest', piuLungo ? `${piuLungo.c}, ${fmtG(piuLungo.al, lang, { day: 'numeric', month: 'short' })}` : '–'],
        ],
        note: letto(lang),
      };
    },
  }),
  /** Sagre del tartufo per mese. */
  tartufo: (lang) => ({
    title: lang === 'it' ? 'Sagre del tartufo in calendario' : 'Truffle festivals in the calendar',
    cta: lang === 'it' ? 'Cerca per data' : 'Search by date',
    inputs: [{ id: 'mese', label: lang === 'it' ? 'Mese' : 'Month', def: 0, options: MESI.map((m, i) => ({ value: String(i), label: nomeMese(m, lang) })) }],
    exemple: (v) => `${lang === 'it' ? 'Esempio' : 'Example'}: ${nomeMese(MESI[v.mese] ?? MESI[0], lang)}`,
    run: (v) => {
      const ym = MESI[v.mese] ?? MESI[0];
      const dal = `${ym}-01` < LETTO_IL ? LETTO_IL : `${ym}-01`, al = fineMese(ym);
      const tutti = cerca({ dal, al, testo: /tartuf|trüffel|truffle/i });
      const reg = (r: Regione) => String(tutti.filter((x) => x.e.r === r).length);
      return {
        head: [lang === 'it' ? 'Eventi sul tartufo' : 'Truffle events', String(tutti.length)],
        rows: [['Emilia-Romagna', reg('er')], [NOME_REGIONE.lom[lang], reg('lom')], [NOME_REGIONE.aa[lang], reg('aa')]],
        note: letto(lang),
      };
    },
  }),
  /** Durata di un mercatino o di una sagra : in quanti giorni del periodo è aperto. */
  durata: (lang) => ({
    title: lang === 'it' ? 'Quanto durano gli eventi del mese' : 'How long this month’s events last',
    cta: lang === 'it' ? 'Vedi le date' : 'See the dates',
    inputs: [
      { id: 'reg', label: lang === 'it' ? 'Regione' : 'Region', def: 1, options: regOpts(lang).slice(0, 4) },
      { id: 'mese', label: lang === 'it' ? 'Mese' : 'Month', def: 0, options: MESI.map((m, i) => ({ value: String(i), label: nomeMese(m, lang) })) },
    ],
    exemple: (v) => `${lang === 'it' ? 'Esempio' : 'Example'}: ${(REG[v.reg] ? NOME_REGIONE[REG[v.reg] as Regione][lang] : (lang === 'it' ? 'tutte le regioni' : 'all regions'))}, ${nomeMese(MESI[v.mese] ?? MESI[0], lang)}`,
    run: (v) => {
      const ym = MESI[v.mese] ?? MESI[0];
      const dal = `${ym}-01` < LETTO_IL ? LETTO_IL : `${ym}-01`, al = fineMese(ym);
      const r = (REG[v.reg] || undefined) as Regione | undefined;
      const tutti = cerca({ dal, al, regione: r, senzaLunghi: true });
      const uno = tutti.filter((x) => x.e.dal === x.e.al).length;
      const due3 = tutti.filter((x) => { const g = giorniTra(x.e.dal, x.e.al); return g >= 1 && g <= 2; }).length;
      const piu = tutti.length - uno - due3;
      return {
        head: [lang === 'it' ? 'Eventi nel mese' : 'Events in the month', String(tutti.length)],
        rows: [
          [lang === 'it' ? 'Un giorno solo' : 'Single day', String(uno)],
          [lang === 'it' ? 'Due o tre giorni' : 'Two or three days', String(due3)],
          [lang === 'it' ? 'Quattro giorni o più' : 'Four days or more', String(piu)],
          [lang === 'it' ? 'Stagioni lunghe escluse' : 'Long seasons left out', String(cerca({ dal, al, regione: r }).filter((x) => lungo(x.e)).length)],
        ],
        note: letto(lang),
      };
    },
  }),
};

export function getSpec(kind: string, lang = 'it'): MiniSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`Unknown mini-sim ${kind}`);
  return f((lang === 'en' ? 'en' : 'it') as Lang);
}
export const MINI_KINDS = Object.keys(SPECS);
