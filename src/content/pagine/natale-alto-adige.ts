import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { tabGiorniNatale, tabGrandiMercatini, tabEventi } from '../../lib/blocchi';

const NAT = K.EVENTI.filter((e) => e.t === 'natale' && e.r === 'aa');
const nAA = NAT.length;
const nPaesi = new Set(NAT.map((e) => e.c)).size;
const bz = NAT.find((e) => e.c === 'Bolzano' && /mercatino di natale di bolzano/i.test(e.n));
const oraBz = bz?.ora ?? '';
const n6 = K.conta({ dal: '2027-01-06', al: '2027-01-06', regione: 'aa', tipi: ['natale'] });
const nSab = K.conta({ dal: '2026-12-12', al: '2026-12-12', regione: 'aa', tipi: ['natale'] });

export default definePage({
  id: 'natale-alto-adige', group: 'natale', order: 21,
  tool: { kind: 'trova', preset: { cosa: 'natale', regione: 'aa', periodo: 'm2026-12' } },
  related: ['natale-aperto', 'alto-adige', 'natale-2026'],
  sources: ['odh', 'cc0'],
  it: {
    slug: 'mercatini-di-natale-alto-adige', nav: 'Mercatini in Alto Adige', card: 'Bolzano, Merano, Bressanone, Brunico, Vipiteno e i mercatini dei paesi.',
    title: 'Mercatini di Natale in Alto Adige 2026: Bolzano e Merano',
    description: 'Mercatini di Natale in Alto Adige 2026-2027: Bolzano, Merano, Bressanone, Brunico, Vipiteno e i paesi, con orari, apertura, chiusura e giorni di chiusura.',
    h1: 'Mercatini di Natale in Alto Adige, città e paesi',
    intro: 'Tutti i mercatini di Natale in Alto Adige inseriti nell’Open Data Hub: scegli il giorno o il periodo.',
    resume: `I mercatini di Natale in Alto Adige del calendario sono ${nAA}, in ${nPaesi} località diverse, tutti letti nell’Open Data Hub della Provincia di Bolzano il ${K.dl(K.LETTO_IL, 'it', false)}. I cinque storici, Bolzano, Merano, Bressanone, Brunico e Vipiteno, aprono il 26 o il 27 novembre 2026 e restano aperti fino al 6 gennaio 2027; il mercatino di Bolzano dichiara l’orario ${oraBz} per la serata di apertura e la chiusura il giorno di Natale, come Bressanone e Brunico. Accanto ai grandi ci sono i mercatini di paese, che spesso durano un solo fine settimana: Nalles, Chienes, Parcines, Valas, Nova Ponente. Sabato 12 dicembre i mercatini altoatesini aperti sono ${nSab}; il 6 gennaio ${n6}. Molte schede elencano anche concerti, Krampus e letture al mercatino come eventi a parte.`,
    faqs: [
      { q: 'Quali sono i mercatini di Natale più grandi dell’Alto Adige?', a: 'I cinque mercatini storici dell’Alto Adige sono quelli di Bolzano, Merano, Bressanone, Brunico e Vipiteno. Sono aperti ogni giorno da fine novembre all’Epifania, salvo i giorni di chiusura dichiarati, e sono collegati dal treno della val d’Isarco e della val Pusteria. Nei paesi i mercatini sono più piccoli e spesso durano solo un weekend.' },
      { q: 'Il mercatino di Bolzano è aperto il 25 dicembre?', a: 'Secondo la scheda dell’Open Data Hub, il mercatino di Natale di Bolzano è aperto ogni giorno dal 26 novembre al 6 gennaio tranne il 25 dicembre. Lo stesso vale per Bressanone e Brunico. Gli orari del 24 e del 31 dicembre possono essere ridotti: controlla il sito del mercatino.' },
      { q: 'Perché alcune schede del mercatino sono concerti?', a: 'Perché le associazioni turistiche inseriscono nell’Open Data Hub anche gli eventi che si svolgono dentro il mercatino: concerti di ottoni, cori, letture per bambini, l’arrivo di San Nicolò. Li mostriamo perché aiutano a scegliere il giorno della visita, ma sono contati come eventi a parte.' },
    ],
    body: (h) => `
<h2>I mercatini di Natale in Alto Adige aperti per più giorni</h2>
${tabGrandiMercatini(h, 'aa', 'Mercatini altoatesini aperti almeno una settimana', 18)}
<p>Il mercatino di Merano non dichiara giorni di chiusura nella scheda: non sappiamo se resta aperto a Natale. Per Vipiteno vale lo stesso. Lagundo e il Trenatale del Renon hanno aperture solo in alcuni giorni della settimana, indicate nella ricerca.</p>
${h.mini('natale', { d: { reg: 2, g: 2 } })}
<h2>Giorno per giorno</h2>
${tabGiorniNatale(h, ['aa'], 'Mercatini altoatesini aperti nei giorni chiave')}
<p>Il calo del 25 dicembre è dovuto alle chiusure dichiarate dai mercatini maggiori; dopo Santo Stefano il numero torna a salire fino a Capodanno. I mercatini di paese di un solo giorno si concentrano nei sabati e nelle domeniche di fine novembre e dell’inizio di dicembre.</p>
<h2>I mercatini di un solo giorno nei paesi</h2>
${tabEventi(h, { dal: K.OGGI, al: '2026-12-31', regione: 'aa', tipi: ['natale'] }, 'Mercatini e appuntamenti di Natale in Alto Adige', 25)}
<p>Per una visita con i bambini, le schede del mercatino di Lana elencano anche il pony, la bottega dei biscotti e il teatro dei burattini, ognuna con il suo giorno e orario.</p>`,
  },
  en: {
    slug: 'christmas-markets-south-tyrol', nav: 'Markets in South Tyrol', card: 'Bolzano, Merano, Bressanone, Brunico, Vipiteno and the village markets.',
    title: 'Christmas Markets in South Tyrol 2026: Bolzano, Merano',
    description: 'Christmas markets in South Tyrol 2026-2027: Bolzano, Merano, Bressanone, Brunico, Vipiteno and the villages, with hours, opening, closing and closed days.',
    h1: 'Christmas markets in South Tyrol, towns and villages',
    intro: 'Every Christmas market in South Tyrol entered in the Open Data Hub: choose the day or period.',
    resume: `The calendar holds ${nAA} Christmas markets in South Tyrol, in ${nPaesi} different places, all read in the Province of Bolzano’s Open Data Hub on ${K.dl(K.LETTO_IL, 'en', false)}. The five historic ones, Bolzano (Bozen), Merano (Meran), Bressanone (Brixen), Brunico (Bruneck) and Vipiteno (Sterzing), open on 26 or 27 November 2026 and stay open until 6 January 2027; the Bolzano market declares ${oraBz} for its opening evening and closure on Christmas Day, as do Bressanone and Brunico. Beside the big ones are village markets that often last a single weekend: Nalles, Chienes, Parcines, Valas, Nova Ponente. On Saturday 12 December ${nSab} South Tyrol markets are open; on 6 January ${n6}. Many listings also post concerts, Krampus visits and readings at the market as separate events.`,
    faqs: [
      { q: 'Which are the largest Christmas markets in South Tyrol?', a: 'The five historic markets are Bolzano, Merano, Bressanone, Brunico and Vipiteno. They open daily from late November to Epiphany, apart from the declared closed days, and are linked by the Isarco and Pusteria valley railways. Village markets are smaller and often last one weekend.' },
      { q: 'Is the Bolzano market open on 25 December?', a: 'According to the Open Data Hub listing, the Bolzano Christmas market is open daily from 26 November to 6 January except 25 December. The same goes for Bressanone and Brunico. Hours on 24 and 31 December may be shorter: check the market’s website.' },
      { q: 'Why are some market listings concerts?', a: 'Because tourist associations also enter in the Open Data Hub the events held inside the market: brass bands, choirs, children’s readings, the arrival of St Nicholas. We show them because they help pick the day of your visit, but they are counted as separate events.' },
    ],
    body: (h) => `
<h2>Christmas markets in South Tyrol open for several days</h2>
${tabGrandiMercatini(h, 'aa', 'South Tyrol markets open for at least a week', 18)}
<p>The Merano market declares no closed days in its listing, so we do not know whether it opens on Christmas Day. The same applies to Vipiteno. Lagundo and the Renon Christmas train market open on certain weekdays only, shown in the search.</p>
${h.mini('natale', { d: { reg: 2, g: 2 } })}
<h2>Day by day</h2>
${tabGiorniNatale(h, ['aa'], 'South Tyrol markets open on key days')}
<p>The dip on 25 December comes from the closures declared by the larger markets; after St Stephen’s Day the number rises again until New Year. One-day village markets cluster on the Saturdays and Sundays of late November and early December.</p>
<h2>One-day markets in the villages</h2>
${tabEventi(h, { dal: K.OGGI, al: '2026-12-31', regione: 'aa', tipi: ['natale'] }, 'Christmas markets and events in South Tyrol', 25)}
<p>For a visit with children, the Lana market listings also include pony rides, a biscuit workshop and a puppet theatre, each with its own day and time.</p>`,
  },
});
