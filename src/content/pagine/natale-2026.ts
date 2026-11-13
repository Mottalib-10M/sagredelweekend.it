import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { tabGiorniNatale, tabGrandiMercatini } from '../../lib/blocchi';

const G = K.OGGI;
const NAT = K.EVENTI.filter((e) => e.t === 'natale');
const per = (r: 'aa' | 'lom' | 'er') => NAT.filter((e) => e.r === r).length;
const giorni = (e: (typeof NAT)[number]) => K.giorniTra(e.dal, e.al) + 1;
const nGrandi = NAT.filter((e) => giorni(e) >= 7 && !/intrattenimento|musica|inaugurazione|in autobus|stand gastronom/i.test(e.n)).length;
const nUnGiorno = NAT.filter((e) => e.dal === e.al).length;
const nLomUno = NAT.filter((e) => e.r === 'lom' && e.dal === e.al).length;
const n25 = K.conta({ dal: '2026-12-25', al: '2026-12-25', tipi: ['natale'] });
const n8 = K.conta({ dal: '2026-12-08', al: '2026-12-08', tipi: ['natale'] });

export default definePage({
  id: 'natale-2026', group: 'natale', order: 20,
  tool: { kind: 'trova', preset: { cosa: 'natale', periodo: 'm2026-12' } },
  related: ['natale-alto-adige', 'natale-aperto', 'natale-lombardia'],
  sources: ['odh', 'lom', 'er'],
  it: {
    slug: 'mercatini-di-natale-2026', nav: 'Mercatini di Natale 2026', card: 'Tutti i mercatini di Natale 2026-2027 dei file regionali, con apertura e chiusura.',
    title: 'Mercatini di Natale 2026: date, aperture e giorni chiusi',
    description: 'Mercatini di Natale 2026-2027 in Alto Adige, Lombardia ed Emilia-Romagna: apertura e chiusura, giorni chiusi e orari letti nei file ufficiali delle Regioni.',
    h1: 'Mercatini di Natale 2026, date e aperture',
    intro: 'I mercatini di Natale della stagione 2026-2027 nei file delle Regioni: scegli il mese, la regione o il giorno.',
    resume: `I mercatini di Natale del calendario 2026-2027 sono ${NAT.length}: ${per('aa')} in Alto Adige, ${per('lom')} in Lombardia e ${per('er')} in Emilia-Romagna, letti il ${K.dl(K.LETTO_IL, 'it', false)}. Quelli lunghi, aperti per almeno una settimana, sono ${nGrandi}: i grandi mercatini altoatesini di Bolzano, Merano, Bressanone, Brunico e Vipiteno aprono il 26 o il 27 novembre e chiudono il 6 gennaio. ${nUnGiorno} mercatini durano un solo giorno, e fra questi ${nLomUno} dei ${per('lom')} lombardi: in Lombardia il mercatino di Natale è quasi sempre una domenica in piazza, spesso l’8 dicembre o una domenica vicina. L’8 dicembre i mercatini aperti sono ${n8}; il 25 dicembre ${n25}, perché Bolzano, Bressanone e Brunico dichiarano la chiusura a Natale. Gli orari indicati sono quelli del file, e possono cambiare nei giorni festivi.`,
    faqs: [
      { q: 'Quando aprono i mercatini di Natale 2026 in Alto Adige?', a: 'Secondo l’Open Data Hub i mercatini di Bolzano, Merano e Bressanone aprono giovedì 26 novembre 2026, quelli di Brunico e Vipiteno venerdì 27 novembre. Chiudono tutti il 6 gennaio 2027. Le date vengono dalle schede inserite dalle associazioni turistiche, lette il giorno indicato in fondo alla ricerca.' },
      { q: 'I mercatini di Natale sono aperti il 25 dicembre?', a: 'Dipende dal mercatino. Bolzano, Bressanone e Brunico dichiarano nell’Open Data Hub la chiusura il 25 dicembre; altri non dichiarano giorni di chiusura, il che non garantisce che siano aperti. Per il 24, il 25 e il 31 dicembre, quando gli orari cambiano spesso, verifica sul sito del mercatino.' },
      { q: 'Perché i mercatini lombardi durano un giorno solo?', a: 'Perché in Lombardia il file regionale raccoglie i mercatini come eventi su area pubblica comunicati dai Comuni, e molti paesi organizzano una sola giornata di bancarelle in piazza, di solito una domenica di dicembre o l’8 dicembre. I grandi villaggi di Natale di Milano o di Bergamo non compaiono nel file.' },
      { q: 'Posso vedere i mercatini aperti in un giorno preciso?', a: 'Sì. Nella ricerca scegli il mese, oppure usa lo strumento «Il mercatino è aperto?» per controllare un mercatino in un giorno preciso: dice se è aperto o chiuso e fra quanti giorni apre o chiude, secondo le date e i giorni dichiarati nel file regionale.' },
    ],
    body: (h) => `
<h2>Mercatini di Natale 2026 aperti nei giorni chiave</h2>
<p>La tabella conta i mercatini aperti nei sabati, nelle domeniche e nelle feste della stagione. Si vede bene l’effetto della domenica in Lombardia e la tenuta dell’Alto Adige fino all’Epifania.</p>
${tabGiorniNatale(h, ['aa', 'lom', 'er'], 'Mercatini di Natale aperti, per giorno e regione')}
${h.mini('natale', { d: { reg: 0, g: 2 } })}
<h2>I grandi mercatini: apertura, chiusura e giorni chiusi</h2>
${tabGrandiMercatini(h, '', 'Mercatini di Natale aperti almeno una settimana', 20)}
<p>La colonna dei giorni di chiusura riporta quello che il file dichiara: quando un mercatino elenca i giorni effettivi, i giorni mancanti sono chiusi. «Nessuno dichiarato» vuol dire che il file dà solo la data di inizio e di fine; non è una garanzia di apertura a Natale o a Capodanno.</p>
<h2>Come scegliere</h2>
<p>Per un fine settimana lungo, i mercatini altoatesini sono aperti ogni giorno e ravvicinati: Bolzano, Merano e Bressanone stanno in meno di 50 km. Per una domenica vicino a casa in Lombardia conviene ${h.a('natale-lombardia', 'il calendario lombardo')}, che elenca i paesi giorno per giorno. In Emilia-Romagna i mercatini sono pochi ma durano tutta la stagione, come il villaggio tirolese di Modena.</p>`,
  },
  en: {
    slug: 'christmas-markets-italy-2026', nav: 'Christmas markets 2026', card: 'Every 2026-2027 Christmas market in the regional files, with opening and closing dates.',
    title: 'Christmas Markets in Italy 2026: Dates, Opening and Closures',
    description: 'Christmas markets in Italy 2026-2027 in South Tyrol, Lombardy and Emilia-Romagna: opening and closing dates, closed days and hours from the official files.',
    h1: 'Christmas markets in Italy 2026: dates and opening',
    intro: 'Christmas markets in Italy for the 2026-2027 season in the regional files: choose the month, region or day.',
    resume: `The calendar holds ${NAT.length} Christmas markets in Italy for 2026-2027: ${per('aa')} in South Tyrol, ${per('lom')} in Lombardy and ${per('er')} in Emilia-Romagna, read on ${K.dl(K.LETTO_IL, 'en', false)}. ${nGrandi} are long markets, open for at least a week: the big South Tyrol markets of Bolzano, Merano, Bressanone, Brunico and Vipiteno open on 26 or 27 November and close on 6 January. ${nUnGiorno} markets last a single day, including ${nLomUno} of the ${per('lom')} in Lombardy: there a Christmas market is usually one Sunday in the square, often 8 December or a nearby Sunday. On 8 December, a public holiday in Italy, ${n8} markets are open; on 25 December ${n25}, because Bolzano, Bressanone and Brunico declare they close on Christmas Day. Hours shown are those in the file.`,
    faqs: [
      { q: 'When do the 2026 Christmas markets in South Tyrol open?', a: 'According to the Open Data Hub, the Bolzano, Merano and Bressanone markets open on Thursday 26 November 2026, and Brunico and Vipiteno on Friday 27 November. All close on 6 January 2027. The dates come from listings entered by tourist associations, read on the day shown at the bottom of the search.' },
      { q: 'Are Christmas markets open on 25 December?', a: 'It depends on the market. Bolzano, Bressanone and Brunico declare in the Open Data Hub that they close on 25 December; others declare no closed days, which does not guarantee they are open. For 24, 25 and 31 December, when hours often change, check the market’s own website.' },
      { q: 'Why do Lombardy’s markets last only one day?', a: 'Because Lombardy’s regional file lists markets as events on public land filed by municipalities, and many towns hold a single day of stalls in the square, usually a Sunday in December or 8 December. Large Christmas villages in Milan or Bergamo do not appear in the file.' },
      { q: 'Can I see which markets are open on a given day?', a: 'Yes. In the search pick the month, or use the “Is the market open?” tool to check one market on a specific day: it says whether it is open or closed and how many days until it opens or closes, based on the dates and days declared in the regional file.' },
    ],
    body: (h) => `
<h2>Christmas markets in Italy open on key days</h2>
<p>The table counts markets open on the season’s Saturdays, Sundays and holidays. It shows the Sunday pattern in Lombardy and South Tyrol holding on until Epiphany.</p>
${tabGiorniNatale(h, ['aa', 'lom', 'er'], 'Christmas markets open, by day and region')}
${h.mini('natale', { d: { reg: 0, g: 2 } })}
<h2>The big markets: opening, closing and closed days</h2>
${tabGrandiMercatini(h, '', 'Christmas markets open for at least a week', 20)}
<p>The closed-days column shows what the file declares: when a market lists its actual days, the missing ones are closed. “None declared” means the file only gives start and end dates; it is no guarantee of opening on Christmas Day or New Year’s Day.</p>
<h2>How to choose</h2>
<p>For a long weekend, South Tyrol’s markets open daily and sit close together: Bolzano, Merano and Bressanone are less than 50 km apart. For a Sunday near home in Lombardy, use ${h.a('natale-lombardia', 'the Lombardy calendar')}, which lists towns day by day. Emilia-Romagna has few markets but they run all season, like the Tyrolean village in Modena.</p>`,
  },
});
