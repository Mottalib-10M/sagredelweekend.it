import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { tabGrandiMercatini, tabEventi } from '../../lib/blocchi';

const ER = K.EVENTI.filter((e) => e.r === 'er');
const NAT = ER.filter((e) => e.t === 'natale');
const nN = NAT.length;
const nFeste = ER.filter((e) => e.t === 'festa' && /natal|presep|capodanno|befana|avvento|winter|inverno/i.test(e.n)).length;
const nPresepi = ER.filter((e) => /presep/i.test(e.n)).length;
const nGiorni = NAT.filter((e) => e.g).length;
const n31 = K.conta({ dal: '2026-12-31', al: '2026-12-31', regione: 'er' });

export default definePage({
  id: 'natale-emilia-romagna', group: 'natale', order: 23,
  tool: { kind: 'trova', preset: { cosa: 'natale', regione: 'er', periodo: 'm2026-12' } },
  related: ['emilia-romagna', 'natale-2026', 'dicembre'],
  sources: ['er', 'ccby'],
  it: {
    slug: 'mercatini-di-natale-emilia-romagna', nav: 'Natale in Emilia-Romagna', card: 'Mercatini, presepi viventi e feste di Capodanno dell’elenco regionale.',
    title: 'Mercatini di Natale in Emilia-Romagna 2026: Modena, Piacenza',
    description: 'Mercatini di Natale in Emilia-Romagna 2026-2027: Modena, Piacenza, Salsomaggiore, Cervia, Castell’Arquato, i presepi viventi e il Capodanno in piazza.',
    h1: 'Mercatini di Natale in Emilia-Romagna e feste d’inverno',
    intro: 'I mercatini di Natale in Emilia-Romagna promossi da APT Servizi, con i presepi e le feste di fine anno.',
    resume: `I mercatini di Natale in Emilia-Romagna nell’elenco regionale degli eventi turistici sono ${nN}, letti il ${K.dl(K.LETTO_IL, 'it', false)}: il villaggio tirolese di Modena, i mercatini del Piacentino, Salsomaggiore Terme, Cervia, Winterland a Castell’Arquato e il mercatino con la sagra della lumaca di Bobbio. Sono pochi ma lunghi: quasi tutti restano aperti fino all’Epifania, e ${nGiorni} indicano i giorni effettivi di apertura, per esempio i fine settimana e i ponti. L’elenco aggiunge ${nFeste} feste d’inverno, fra cui ${nPresepi} presepi, alcuni viventi, e le notti di Capodanno in piazza: il 31 dicembre gli eventi in calendario in regione sono ${n31}. L’elenco è una selezione curata da APT Servizi con licenza CC BY 4.0, non un censimento di tutti i mercatini dei Comuni emiliano-romagnoli.`,
    faqs: [
      { q: 'Quando apre il mercatino tirolese di Modena?', a: 'Secondo l’elenco regionale il Mercatino di Natale Tirolese di Modena apre il 20 novembre 2026 e chiude il 7 gennaio 2027, con giorni di apertura indicati nel file. La ricerca lo mostra solo nei giorni dichiarati; per gli orari esatti fa fede la scheda su Emilia-Romagna Turismo, raggiungibile dal link sotto l’evento.' },
      { q: 'Dove vedere un presepe vivente in Emilia-Romagna?', a: 'Nell’elenco regionale ci sono presepi viventi a Fanano, sull’Appennino modenese, la sera del 24 dicembre, e a Montefiore Conca, nell’entroterra riminese, dal 26 dicembre al 3 gennaio. Cesenatico allestisce il presepe della marineria sulle barche del porto canale, e Toano la Via dei presepi.' },
      { q: 'Perché mancano i mercatini di Bologna?', a: 'Perché l’elenco regionale è una selezione di eventi turistici scelta da APT Servizi, non l’elenco completo dei mercatini autorizzati dai Comuni. I mercatini storici di Bologna non compaiono nel file letto. Per quelli fa fede il sito del Comune di Bologna o di Bologna Welcome.' },
    ],
    body: (h) => `
<h2>Mercatini di Natale in Emilia-Romagna aperti per più giorni</h2>
${tabGrandiMercatini(h, 'er', 'Mercatini emiliano-romagnoli aperti almeno una settimana', 10)}
<p>Quando la colonna dei giorni di chiusura riporta un numero, il mercatino è aperto solo in alcuni giorni: a Piacenza e Salsomaggiore i sabati, le domeniche e i ponti dell’8 dicembre e di fine anno, a Modena tutti i giorni salvo il lunedì. La ricerca li mostra solo quei giorni.</p>
${h.mini('natale', { d: { reg: 3, g: 2 } })}
<h2>Presepi, feste e Capodanno in piazza</h2>
${tabEventi(h, { dal: '2026-12-01', al: '2027-01-06', regione: 'er', tipi: ['festa', 'natale'] }, 'Feste di dicembre e di inizio gennaio nell’elenco regionale', 30)}
<p>La Romagna punta sul Natale al mare, con le luci di Milano Marittima, Riccione e Cesenatico; l’Emilia sui borghi e sui castelli, come Castell’Arquato, Gropparello e Rivalta. Il 5 e il 6 gennaio chiudono la stagione la Nott de Bisò di Faenza e le feste della Befana.</p>`,
  },
  en: {
    slug: 'christmas-markets-emilia-romagna', nav: 'Christmas in Emilia-Romagna', card: 'Markets, living nativity scenes and New Year parties from the regional list.',
    title: 'Christmas Markets in Emilia-Romagna 2026: Modena, Piacenza',
    description: 'Christmas markets in Emilia-Romagna 2026-2027: Modena, Piacenza, Salsomaggiore, Cervia and Castell’Arquato, living nativity scenes and New Year in the square.',
    h1: 'Christmas markets in Emilia-Romagna and winter festivals',
    intro: 'Christmas markets in Emilia-Romagna promoted by APT Servizi, with nativity scenes and year-end parties.',
    resume: `There are ${nN} Christmas markets in Emilia-Romagna in the regional list of tourism events, read on ${K.dl(K.LETTO_IL, 'en', false)}: Modena’s Tyrolean village, the Piacenza area markets, Salsomaggiore Terme, Cervia, Winterland at Castell’Arquato and the market with the snail sagra at Bobbio. They are few but long: almost all stay open until Epiphany, and ${nGiorni} list their actual opening days, for instance weekends and bridge holidays. The list adds ${nFeste} winter festivals, including ${nPresepi} nativity scenes, some of them living, and New Year’s Eve parties in town squares: on 31 December the region has ${n31} events in the calendar. The list is a selection curated by APT Servizi under CC BY 4.0, not a census of every market licensed by the region’s municipalities.`,
    faqs: [
      { q: 'When does the Tyrolean market in Modena open?', a: 'According to the regional list, Modena’s Tyrolean Christmas Market opens on 20 November 2026 and closes on 7 January 2027, with opening days given in the file. The search shows it on the declared days only; for exact hours, the Emilia-Romagna Tourism listing linked under the event is the reference.' },
      { q: 'Where can I see a living nativity scene in Emilia-Romagna?', a: 'The regional list includes living nativity scenes at Fanano, in the Modena Apennines, on the evening of 24 December, and at Montefiore Conca, inland from Rimini, from 26 December to 3 January. Cesenatico sets its seafaring nativity on the boats of the canal port, and Toano runs a nativity trail.' },
      { q: 'Why are Bologna’s markets missing?', a: 'Because the regional list is a selection of tourism events chosen by APT Servizi, not the full list of markets licensed by municipalities. Bologna’s historic markets do not appear in the file we read. For those, the City of Bologna or Bologna Welcome website is the reference.' },
    ],
    body: (h) => `
<h2>Christmas markets in Emilia-Romagna open for several days</h2>
${tabGrandiMercatini(h, 'er', 'Emilia-Romagna markets open for at least a week', 10)}
<p>When the closed-days column shows a number, the market opens on certain days only: at Piacenza and Salsomaggiore on Saturdays, Sundays and the 8 December and year-end holidays, at Modena every day except Mondays. The search shows it on those days alone.</p>
${h.mini('natale', { d: { reg: 3, g: 2 } })}
<h2>Nativity scenes, festivals and New Year in the square</h2>
${tabEventi(h, { dal: '2026-12-01', al: '2027-01-06', regione: 'er', tipi: ['festa', 'natale'] }, 'December and early January festivals in the regional list', 30)}
<p>Romagna bets on Christmas by the sea, with the lights of Milano Marittima, Riccione and Cesenatico; Emilia on villages and castles, such as Castell’Arquato, Gropparello and Rivalta. On 5 and 6 January the season closes with Faenza’s Nott de Bisò and the Befana festivals.</p>`,
  },
});
