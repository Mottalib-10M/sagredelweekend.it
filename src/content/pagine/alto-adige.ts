import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { tabComuni, tabMesi, tabEventi } from '../../lib/blocchi';

const G = K.OGGI;
const AA = K.EVENTI.filter((e) => e.r === 'aa');
const conta = (re: RegExp) => AA.filter((e) => re.test(e.n)).length;
const nAA = AA.length;
const nKrampus = conta(/krampus|nicol[oò]|micur/i);
const nTorggelen = conta(/t[öo]rggelen/i);
const nMercati = AA.filter((e) => e.t === 'mercato').length;
const nNatale = AA.filter((e) => e.t === 'natale').length;
const nBreve = AA.filter((e) => !K.lungo(e)).length;
const dic = { dal: '2026-12-01', al: '2026-12-08' };
const nPrimiDic = K.cerca({ ...dic, regione: 'aa', testo: /krampus|nicol[oò]|micur/i }).length;

// Le chiffre de l'outil (30 jours), écrit en tête du texte avec sa période : un seul chiffre par objet.
const PRESET = { regione: 'aa', periodo: '30' } as const;
const S30 = K.ricerca(PRESET);

export default definePage({
  id: 'alto-adige', group: 'regioni', order: 11,
  tool: { kind: 'trova', preset: PRESET },
  related: ['natale-alto-adige', 'mercati', 'vicino'],
  sources: ['odh', 'cc0'],
  it: {
    slug: 'sagre-alto-adige', nav: 'Feste in Alto Adige', card: 'Feste di paese, Krampus, Törggelen e mercati contadini dell’Alto Adige.',
    title: 'Feste in Alto Adige: Krampus, Törggelen e feste di paese',
    description: 'Feste in Alto Adige dall’Open Data Hub della Provincia: sfilate dei Krampus, Törggelen, feste di paese e mercati contadini, con data, orario, paese e fonte.',
    h1: 'Feste in Alto Adige, paese per paese',
    intro: 'Le feste in Alto Adige pubblicate dalle associazioni turistiche: scegli il periodo e il tipo di evento.',
    resume: `Nei prossimi 30 giorni, ${K.periodoParole(S30.dal, S30.al, 'it')}, gli eventi in Alto Adige in calendario sono ${S30.lista.length}. Le feste in Alto Adige del calendario vengono dall’Open Data Hub, la banca dati pubblica della Provincia di Bolzano gestita dal NOI Techpark, dove le associazioni turistiche inseriscono i loro eventi con licenza CC0. Su ${K.FONTI.odh_schede} schede lette il ${K.dl(K.LETTO_IL, 'it', false)} ne abbiamo tenute ${nAA}: feste di paese, ${nNatale} mercatini di Natale e ${nMercati} mercati contadini o settimanali. ${nKrampus} eventi riguardano San Nicolò e i Krampus, i diavoli che sfilano nei paesi fra fine novembre e il 6 dicembre; ${nTorggelen} il Törggelen, la stagione autunnale delle castagne e del vino nuovo nei masi. Gli orari sono quasi sempre indicati. I nomi dei paesi sono in italiano quando la scheda li ha in italiano, altrimenti in tedesco o ladino, le tre lingue della provincia.`,
    faqs: [
      { q: 'Che cosa sono le sfilate dei Krampus?', a: 'Sono cortei serali in cui giovani travestiti da diavoli, con maschere di legno e campanacci, accompagnano San Nicolò per le vie del paese. Si tengono soprattutto fra fine novembre e il 6 dicembre. Nei file le trovi con il nome «Sfilata dei Krampus» o «San Nicolò»; l’orario indicato è quello di partenza del corteo.' },
      { q: 'Che cos’è il Törggelen?', a: 'È l’usanza autunnale altoatesina di andare nei masi e nelle cantine ad assaggiare il vino nuovo con castagne arrostite, speck e piatti contadini. Va da ottobre all’Avvento. Nell’Open Data Hub compare come evento di singole tenute o paesi, spesso con prenotazione: controlla la scheda prima di partire.' },
      { q: 'Perché alcuni eventi durano tutto l’anno?', a: 'Perché le associazioni turistiche inseriscono anche visite in cantina, degustazioni e mercati settimanali con una data di inizio e di fine molto lontane. Quando sono sparsi su più di 45 giorni la ricerca li nasconde di serie e li conta a parte: puoi mostrarli con un clic.' },
    ],
    body: (h) => `
<h2>Feste in Alto Adige per periodo dell’anno</h2>
<p>L’Alto Adige ha un calendario molto diverso da quello lombardo: meno sagre gastronomiche in piazza, più feste legate alla stagione, all’Avvento e al Carnevale. Dei ${nAA} eventi tenuti, ${nBreve} sono feste e mercatini concentrati in poche settimane; gli altri sono mercati settimanali e degustazioni ripetute per mesi.</p>
${tabMesi(h, { regione: 'aa', senzaLunghi: true }, G.slice(0, 7), 12, 'Eventi in Alto Adige per mese, senza mercati settimanali né stagioni lunghe')}
<p>Novembre e dicembre concentrano la maggior parte delle feste: nella prima settimana di dicembre, dal 1° all’8, i file contano ${nPrimiDic} sfilate e feste di San Nicolò. In primavera e in estate le associazioni inseriscono le date più tardi, per questo i mesi lontani sembrano vuoti.</p>
${h.mini('durata', { d: { reg: 2, mese: 1 } })}
<h2>I paesi più attivi</h2>
${tabComuni(h, { dal: G, al: '2027-12-31', regione: 'aa', senzaLunghi: true }, `Paesi altoatesini con più eventi dal ${h.day(G)}`, 10)}
<p>Lana, nella zona di Merano, conta molti eventi perché il suo mercatino di Natale pubblica ogni concerto e ogni lettura come scheda separata. San Candido fa lo stesso con la musica del mercatino. Il conteggio misura quindi anche quanto un’associazione turistica è attiva nell’inserire i dati.</p>
<h2>Le prossime sfilate di San Nicolò e dei Krampus</h2>
${tabEventi(h, { dal: G, al: '2026-12-13', regione: 'aa', testo: /krampus|nicol[oò]|micur/i }, 'San Nicolò e Krampus nei file dell’Open Data Hub', 25)}
<p>Molte sfilate sono serali e all’aperto: le strade del paese vengono chiuse e i bambini piccoli possono spaventarsi. Le schede dell’Open Data Hub indicano il punto di partenza quando l’associazione lo ha inserito.</p>`,
  },
  en: {
    slug: 'sagre-south-tyrol', nav: 'Festivals in South Tyrol', card: 'Village feasts, Krampus parades, Törggelen and farmers’ markets in South Tyrol.',
    title: 'Festivals in South Tyrol: Krampus, Törggelen, Village Feasts',
    description: 'Festivals in South Tyrol from the Province’s Open Data Hub: Krampus parades, Törggelen, village feasts and farmers’ markets, with date, time and source.',
    h1: 'Festivals in South Tyrol, village by village',
    intro: 'Festivals in South Tyrol published by local tourist associations: choose the period and type of event.',
    resume: `In the next 30 days, ${K.periodoParole(S30.dal, S30.al, 'en')}, the calendar lists ${S30.lista.length} events in South Tyrol. The calendar’s festivals in South Tyrol come from the Open Data Hub, the public database of the Province of Bolzano run by NOI Techpark, where tourist associations enter their events under a CC0 licence. Of ${K.FONTI.odh_schede} listings read on ${K.dl(K.LETTO_IL, 'en', false)} we kept ${nAA}: village feasts, ${nNatale} Christmas markets and ${nMercati} farmers’ or weekly markets. ${nKrampus} events concern St Nicholas and the Krampus, the devil figures who parade through villages from late November to 6 December; ${nTorggelen} concern Törggelen, the autumn season of chestnuts and new wine at farmhouses. Times are almost always given. Village names appear in Italian when the listing has them in Italian, otherwise in German or Ladin, the three languages of the province, so a village may appear as Siusi or Seis.`,
    faqs: [
      { q: 'What are Krampus parades?', a: 'They are evening processions in which young people dressed as devils, with carved wooden masks and cowbells, escort St Nicholas through the village streets. Most take place between late November and 6 December. In the files they appear as “Sfilata dei Krampus” or “San Nicolò”; the time given is when the procession sets off.' },
      { q: 'What is Törggelen?', a: 'It is South Tyrol’s autumn custom of visiting farmhouses and wineries to taste the new wine with roast chestnuts, speck and farm dishes. It runs from October to Advent. In the Open Data Hub it shows up as events at individual estates or villages, often requiring a booking: check the listing before you go.' },
      { q: 'Why do some events last all year?', a: 'Because tourist associations also enter winery visits, tastings and weekly markets with very distant start and end dates. When they are spread over more than 45 days the search hides them by default and counts them separately: you can show them with one click.' },
    ],
    body: (h) => `
<h2>Festivals in South Tyrol through the year</h2>
<p>South Tyrol’s calendar differs sharply from Lombardy’s: fewer food sagre in the square, more festivals tied to the season, Advent and Carnival. Of the ${nAA} events kept, ${nBreve} are festivals and markets packed into a few weeks; the rest are weekly markets and tastings repeated for months.</p>
${tabMesi(h, { regione: 'aa', senzaLunghi: true }, G.slice(0, 7), 12, 'South Tyrol events by month, without weekly markets or long seasons')}
<p>November and December hold most of the festivals: in the first week of December, from the 1st to the 8th, the files list ${nPrimiDic} St Nicholas parades and feasts. In spring and summer associations enter dates later, which is why distant months look empty.</p>
${h.mini('durata', { d: { reg: 2, mese: 1 } })}
<h2>The busiest villages</h2>
${tabComuni(h, { dal: G, al: '2027-12-31', regione: 'aa', senzaLunghi: true }, `South Tyrol villages with the most events from ${h.day(G)}`, 10)}
<p>Lana, near Merano, counts many events because its Christmas market posts every concert and reading as a separate listing. San Candido does the same with its market music. The count therefore also measures how active a tourist association is at entering data.</p>
<h2>Upcoming St Nicholas and Krampus parades</h2>
${tabEventi(h, { dal: G, al: '2026-12-13', regione: 'aa', testo: /krampus|nicol[oò]|micur/i }, 'St Nicholas and Krampus in the Open Data Hub files', 25)}
<p>Many parades are held outdoors in the evening: village streets are closed and small children may be frightened. Open Data Hub listings give the starting point when the association has entered it.</p>`,
  },
});
