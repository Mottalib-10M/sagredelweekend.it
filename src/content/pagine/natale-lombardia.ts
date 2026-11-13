import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { tabGiorniNatale, tabEventi } from '../../lib/blocchi';

const NAT = K.EVENTI.filter((e) => e.t === 'natale' && e.r === 'lom');
const nL = NAT.length;
const nUno = NAT.filter((e) => e.dal === e.al).length;
const prov = Object.entries(NAT.reduce<Record<string, number>>((m, e) => { if (e.p) m[e.p] = (m[e.p] ?? 0) + 1; return m; }, {})).sort((a, b) => b[1] - a[1]);
const nBS = prov.find(([p]) => p === 'BS')?.[1] ?? 0;
const top = NAT.reduce<Record<string, number>>((m, e) => { m[e.dal] = (m[e.dal] ?? 0) + 1; return m; }, {});
const [giornoTop, nTop] = Object.entries(top).sort((a, b) => b[1] - a[1])[0];
const FIERE_NAT = K.cerca({ dal: K.OGGI, al: '2027-01-06', regione: 'lom', tipi: ['fiera', 'sagra'], testo: /natal|babbo|santa lucia|immacolata|dicembre/i }).length;

export default definePage({
  id: 'natale-lombardia', group: 'natale', order: 22,
  tool: { kind: 'trova', preset: { cosa: 'natale', regione: 'lom', periodo: 'm2026-12' } },
  related: ['natale-2026', 'lombardia', 'fiere'],
  sources: ['lom', 'cc0'],
  it: {
    slug: 'mercatini-di-natale-lombardia', nav: 'Mercatini in Lombardia', card: 'I mercatini di Natale comunicati dai Comuni lombardi, domenica per domenica.',
    title: 'Mercatini di Natale in Lombardia 2026: paesi, date e orari',
    description: 'Mercatini di Natale in Lombardia 2026 dal calendario dei Comuni alla Regione: i paesi, le domeniche di dicembre e gli orari di ogni mercatino, con la fonte.',
    h1: 'Mercatini di Natale in Lombardia, domenica per domenica',
    intro: 'I mercatini di Natale in Lombardia comunicati dai Comuni alla Regione: scegli il giorno o la città vicina.',
    resume: `I mercatini di Natale in Lombardia del calendario sono ${nL}, comunicati dai Comuni alla Regione come eventi su area pubblica e letti il ${K.dl(K.LETTO_IL, 'it', false)}. ${nUno} durano un solo giorno: è il modello lombardo, una domenica di bancarelle in piazza organizzata dalla Pro Loco, dall’oratorio o dai commercianti, con orari dalla mattina alla sera. Il giorno con più mercatini è il ${K.dl(giornoTop, 'it')}, con ${nTop}. La provincia di Brescia ne conta ${nBS}. Oltre ai mercatini veri e propri, il file elenca ${FIERE_NAT} fiere e feste di dicembre legate al Natale, a Santa Lucia o all’Immacolata, come la Fiera di Natale di Lissone o il Villaggio di Babbo Natale di Assago. I grandi mercatini delle città capoluogo, quando non sono comunicati come sagra o fiera, non compaiono.`,
    faqs: [
      { q: 'Perché in Lombardia i mercatini durano un giorno solo?', a: 'Perché quasi tutti quelli del file sono mercatini di paese organizzati dal Comune, dalla Pro Loco o dall’oratorio, che occupano la piazza per una giornata. I mercatini di più giorni, come quello di Galbiate dal 29 novembre al 7 dicembre o quello di Urgnano a Basella, sono l’eccezione.' },
      { q: 'Ci sono i mercatini di Natale di Milano?', a: 'Nel file regionale non compaiono mercatini di Natale nel comune di Milano, perché la città li autorizza con altre procedure. Nella provincia ci sono feste e fiere di dicembre, come Assago e Paderno Dugnano. Per i mercatini milanesi il riferimento resta il sito del Comune di Milano.' },
      { q: 'Gli orari dei mercatini lombardi sono affidabili?', a: 'Sono quelli che il Comune ha comunicato alla Regione, con l’ora di inizio e di fine. Alcuni Comuni indicano orari tecnici, come fino alle 23.59, che coprono anche lo smontaggio. Per sapere quando le bancarelle sono davvero aperte, guarda il programma linkato sotto l’evento.' },
    ],
    body: (h) => `
<h2>Mercatini di Natale in Lombardia, tutti i giorni in calendario</h2>
${tabEventi(h, { dal: K.OGGI, al: '2027-01-06', regione: 'lom', tipi: ['natale'] }, 'Mercatini di Natale comunicati dai Comuni lombardi', 30)}
<p>La prima domenica di dicembre e l’8 dicembre sono i giorni più pieni. Quasi tutti i paesi sono piccoli: Sarezzo, Castegnato, Verolavecchia, Paitone nel Bresciano, Primaluna e Galbiate nel Lecchese, Varano Borghi e Caronno Varesino nel Varesotto.</p>
${h.mini('natale', { d: { reg: 1, g: 2 } })}
<h2>Quanti mercatini nei giorni chiave</h2>
${tabGiorniNatale(h, ['lom'], 'Mercatini lombardi aperti nei giorni chiave')}
<p>Dopo il 20 dicembre i mercatini lombardi del file finiscono: la stagione si chiude prima di Natale, al contrario dell’Alto Adige. Se cerchi un mercatino aperto durante le vacanze, ${h.a('natale-alto-adige', 'quelli altoatesini')} restano aperti fino all’Epifania.</p>`,
  },
  en: {
    slug: 'christmas-markets-lombardy', nav: 'Markets in Lombardy', card: 'Christmas markets filed by Lombard towns, Sunday by Sunday.',
    title: 'Christmas Markets in Lombardy 2026: Towns, Dates and Hours',
    description: 'Christmas markets in Lombardy 2026 from the calendar towns file with the Region: the towns, the Sundays in December and each market’s hours, with the source.',
    h1: 'Christmas markets in Lombardy, Sunday by Sunday',
    intro: 'Christmas markets in Lombardy filed by municipalities with the Region: choose the day or a nearby town.',
    resume: `The calendar holds ${nL} Christmas markets in Lombardy, filed by municipalities with the Region as events on public land and read on ${K.dl(K.LETTO_IL, 'en', false)}. ${nUno} last a single day: that is the Lombard pattern, one Sunday of stalls in the square run by the Pro Loco, the parish youth centre or local shops, open from morning to evening. The busiest day is ${K.dl(giornoTop, 'en')}, with ${nTop}. The province of Brescia accounts for ${nBS}. Besides the markets themselves, the file lists ${FIERE_NAT} December fairs and feasts tied to Christmas, St Lucy or the Immaculate Conception on 8 December, such as Lissone’s Christmas fair or the Santa Claus village at Assago. Large markets in provincial capitals do not appear unless filed as a sagra or fair.`,
    faqs: [
      { q: 'Why do Lombardy’s markets last just one day?', a: 'Because almost all those in the file are village markets run by the municipality, the Pro Loco or the parish, taking over the square for a day. Multi-day markets, such as Galbiate’s from 29 November to 7 December or Urgnano’s at Basella, are the exception.' },
      { q: 'Are Milan’s Christmas markets included?', a: 'No Christmas market in the municipality of Milan appears in the regional file, because the city licenses them under other procedures. The province has December fairs and feasts, such as Assago and Paderno Dugnano. For Milan’s markets, the City of Milan’s website remains the reference.' },
      { q: 'Are the hours of Lombard markets reliable?', a: 'They are the hours the municipality filed with the Region, with start and end times. Some towns give technical hours, such as until 23.59, which include dismantling. To know when the stalls are really open, look at the programme linked under the event.' },
    ],
    body: (h) => `
<h2>Christmas markets in Lombardy, every day in the calendar</h2>
${tabEventi(h, { dal: K.OGGI, al: '2027-01-06', regione: 'lom', tipi: ['natale'] }, 'Christmas markets filed by Lombard municipalities', 30)}
<p>The first Sunday of December and 8 December are the busiest days. Almost all the towns are small: Sarezzo, Castegnato, Verolavecchia and Paitone near Brescia, Primaluna and Galbiate near Lecco, Varano Borghi and Caronno Varesino near Varese.</p>
${h.mini('natale', { d: { reg: 1, g: 2 } })}
<h2>How many markets on key days</h2>
${tabGiorniNatale(h, ['lom'], 'Lombard markets open on key days')}
<p>After 20 December Lombardy’s markets in the file are over: the season ends before Christmas, unlike South Tyrol. For a market open during the holidays, ${h.a('natale-alto-adige', 'South Tyrol’s markets')} stay open until Epiphany.</p>`,
  },
});
