import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { tabEventi, tabMesi } from '../../lib/blocchi';

const G = K.OGGI;
const ER = K.EVENTI.filter((e) => e.r === 'er');
const nER = ER.length;
const conta = (re: RegExp) => ER.filter((e) => re.test(e.n)).length;
const nTartufo = conta(/tartuf|truffle|tart[oó]fla/i);
const nPresepi = conta(/presep/i);
const nCapodanno = conta(/capodanno/i);
const nFossa = conta(/fossa/i);
const nGiorni = ER.filter((e) => e.g).length;
const prov = Object.entries(ER.reduce<Record<string, number>>((m, e) => { if (e.p) m[e.p] = (m[e.p] ?? 0) + 1; return m; }, {})).sort((a, b) => b[1] - a[1]).map(([p, n]) => [`${K.PROVINCE[p] ?? p} (${p})`, n]);

// Le chiffre de l'outil (30 jours), écrit en tête du texte avec sa période : un seul chiffre par objet.
const PRESET = { regione: 'er', periodo: '30' } as const;
const S30 = K.ricerca(PRESET);

export default definePage({
  id: 'emilia-romagna', group: 'regioni', order: 12,
  tool: { kind: 'trova', preset: PRESET },
  related: ['tartufo', 'natale-emilia-romagna', 'dicembre'],
  sources: ['er', 'ccby'],
  it: {
    slug: 'sagre-emilia-romagna', nav: 'Sagre in Emilia-Romagna', card: 'Tartufo, formaggio di fossa, presepi e Capodanno dal file di APT Servizi.',
    title: 'Sagre in Emilia-Romagna: tartufo, fossa, presepi e feste',
    description: 'Sagre in Emilia-Romagna dall’elenco ufficiale degli eventi turistici: fiere del tartufo, formaggio di fossa, presepi viventi e Capodanno, con giorni e fonte.',
    h1: 'Sagre in Emilia-Romagna, dall’elenco della Regione',
    intro: 'Le sagre in Emilia-Romagna scelte da APT Servizi per l’elenco regionale degli eventi: periodo, tipo, provincia.',
    resume: `Nei prossimi 30 giorni, ${K.periodoParole(S30.dal, S30.al, 'it')}, gli eventi in Emilia-Romagna in calendario sono ${S30.lista.length}. Le sagre in Emilia-Romagna del calendario vengono dall’«Elenco degli eventi a tema turistico attivi» che la Regione pubblica in open data con licenza CC BY 4.0, curato da APT Servizi, l’agenzia regionale del turismo. È un elenco breve e selezionato: ${K.FONTI.er_schede} schede lette il ${K.dl(K.LETTO_IL, 'it', false)}, ${nER} tenute dopo aver tolto concerti, mostre e gare. Non contiene tutte le sagre di paese, ma quelle che la Regione promuove: in autunno ${nTartufo} feste del tartufo e ${nFossa} legate al formaggio di fossa, d’inverno ${nPresepi} presepi e ${nCapodanno} feste di Capodanno. Per ${nGiorni} eventi il file elenca i singoli giorni di apertura, per esempio solo i fine settimana: la ricerca ne tiene conto e mostra l’evento solo in quei giorni, con il link alla scheda ufficiale.`,
    faqs: [
      { q: 'Perché l’Emilia-Romagna ha meno sagre della Lombardia?', a: 'Perché il file emiliano-romagnolo non è un elenco completo comunicato dai Comuni, ma una selezione degli eventi turistici fatta da APT Servizi. Molte sagre parrocchiali o di frazione non vi compaiono. Quelle presenti sono in genere le più grandi e quelle con una scheda su Emilia-Romagna Turismo, a cui la ricerca rimanda.' },
      { q: 'Che cos’è il formaggio di fossa?', a: 'È un pecorino o un formaggio misto stagionato in fosse scavate nel tufo, aperte a fine novembre, soprattutto a Sogliano al Rubicone e nelle vallate fra Romagna e Marche. Le fiere dedicate si tengono fra la fine di novembre e l’inizio di dicembre, quasi sempre nei fine settimana.' },
      { q: 'Cosa significa la licenza CC BY 4.0 per questi dati?', a: 'Che la Regione permette di riusarli a condizione di citare la fonte. Per questo ogni scheda emiliano-romagnola indica «Emilia-Romagna Turismo, CC BY 4.0» e il piè di pagina del sito riporta l’attribuzione completa, con l’avviso che i dati sono stati selezionati e adattati.' },
    ],
    body: (h) => `
<h2>Sagre in Emilia-Romagna per provincia</h2>
<p>Piacenza è in testa per i mercatini e le feste nei castelli e nei borghi della Val Tidone e della Val d’Arda. Seguono Ravenna, Forlì-Cesena e Rimini, dove APT Servizi promuove soprattutto il Natale e il Capodanno delle località di mare; Bologna e Modena hanno pochi eventi nell’elenco.</p>
${h.table(['Provincia', 'Eventi a venire'], prov, `Eventi dell’elenco regionale per provincia, dal ${h.day(G)}`, ['l', 'r'])}
${h.mini('mese', { d: { reg: 3, mese: 0, cosa: 1 } })}
<h2>Autunno: tartufo e formaggio di fossa</h2>
${tabEventi(h, { dal: G, al: '2026-12-06', regione: 'er', testo: /tartuf|truffle|tart[oó]fla|fossa|formaggio|olio|oliva|porc/i }, 'Fiere gastronomiche autunnali nell’elenco regionale', 15)}
<p>Le fiere del tartufo dell’Appennino si chiudono quasi tutte entro la seconda metà di novembre; dopo restano le feste del formaggio di fossa e dell’olio nuovo in Romagna. Gli eventi con giorni precisi sono aperti solo il sabato e la domenica: lo strumento in alto lo mostra nella scheda.</p>
<h2>Inverno: presepi, Natale nei borghi e Capodanno</h2>
${tabMesi(h, { regione: 'er' }, G.slice(0, 7), 4, 'Eventi emiliano-romagnoli per mese')}
<p>Da dicembre l’elenco si riempie di presepi viventi, come quelli di Fanano e di Montefiore Conca, e delle feste di Capodanno in piazza a Ferrara, Faenza, Ravenna e Piacenza. La Befana chiude la stagione il 6 gennaio. Per i mercatini di Natale veri e propri apri ${h.a('natale-emilia-romagna', 'la pagina dedicata')}.</p>`,
  },
  en: {
    slug: 'sagre-emilia-romagna', nav: 'Sagre in Emilia-Romagna', card: 'Truffles, pit-aged cheese, nativity scenes and New Year from APT Servizi’s file.',
    title: 'Sagre in Emilia-Romagna: Truffles, Fossa Cheese and Feasts',
    description: 'Sagre in Emilia-Romagna from the official list of tourism events: truffle fairs, fossa cheese, living nativity scenes and New Year’s Eve, with days and source.',
    h1: 'Sagre in Emilia-Romagna, from the Region’s list',
    intro: 'Sagre in Emilia-Romagna chosen by APT Servizi for the regional events list: period, type, province.',
    resume: `In the next 30 days, ${K.periodoParole(S30.dal, S30.al, 'en')}, the calendar lists ${S30.lista.length} events in Emilia-Romagna. The calendar’s sagre in Emilia-Romagna come from the “list of active tourism events” the Region publishes as open data under CC BY 4.0, curated by APT Servizi, the regional tourism agency. It is a short, selected list: ${K.FONTI.er_schede} listings read on ${K.dl(K.LETTO_IL, 'en', false)}, ${nER} kept after removing concerts, exhibitions and races. It does not hold every village sagra, only those the Region promotes: in autumn ${nTartufo} truffle festivals and ${nFossa} linked to fossa cheese, in winter ${nPresepi} nativity scenes and ${nCapodanno} New Year’s Eve parties. For ${nGiorni} events the file lists the individual opening days, such as weekends only: the search takes this into account and shows the event on those days alone, with a link to the official listing.`,
    faqs: [
      { q: 'Why does Emilia-Romagna have fewer sagre than Lombardy?', a: 'Because Emilia-Romagna’s file is not a complete list filed by municipalities but a selection of tourism events made by APT Servizi. Many parish or hamlet sagre do not appear. Those listed are generally the largest and those with an Emilia-Romagna Tourism page, which the search links to.' },
      { q: 'What is fossa cheese?', a: 'It is a pecorino or mixed-milk cheese aged in pits dug into tuff rock and opened in late November, mainly at Sogliano al Rubicone and in the valleys between Romagna and the Marche. The fairs devoted to it run from late November to early December, almost always at weekends.' },
      { q: 'What does the CC BY 4.0 licence mean for this data?', a: 'It means the Region allows reuse provided the source is credited. That is why each Emilia-Romagna listing shows “Emilia-Romagna Tourism, CC BY 4.0” and the site footer carries the full attribution, with a note that the data were selected and adapted.' },
    ],
    body: (h) => `
<h2>Sagre in Emilia-Romagna by province</h2>
<p>Piacenza leads for markets and feasts in the castles and villages of the Tidone and Arda valleys. Ravenna, Forlì-Cesena and Rimini follow, where APT Servizi mainly promotes Christmas and New Year at the seaside resorts; Bologna and Modena have few events in the list.</p>
${h.table(['Province', 'Upcoming events'], prov, `Regional list events by province, from ${h.day(G)}`, ['l', 'r'])}
${h.mini('mese', { d: { reg: 3, mese: 0, cosa: 1 } })}
<h2>Autumn: truffles and fossa cheese</h2>
${tabEventi(h, { dal: G, al: '2026-12-06', regione: 'er', testo: /tartuf|truffle|tart[oó]fla|fossa|formaggio|olio|oliva|porc/i }, 'Autumn food fairs in the regional list', 15)}
<p>The Apennine truffle fairs almost all close in the second half of November; after that come the fossa cheese and new olive oil festivals in Romagna. Events with specific days open on Saturdays and Sundays only: the tool at the top shows this on the listing.</p>
<h2>Winter: nativity scenes, Christmas villages and New Year</h2>
${tabMesi(h, { regione: 'er' }, G.slice(0, 7), 4, 'Emilia-Romagna events by month')}
<p>From December the list fills with living nativity scenes, such as those at Fanano and Montefiore Conca, and New Year’s Eve parties in the squares of Ferrara, Faenza, Ravenna and Piacenza. The Befana, the Epiphany witch, closes the season on 6 January. For actual Christmas markets, open ${h.a('natale-emilia-romagna', 'the dedicated page')}.</p>`,
  },
});
