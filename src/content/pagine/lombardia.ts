import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { tabComuni, tabMesi } from '../../lib/blocchi';

const G = K.OGGI;
const LOM = K.EVENTI.filter((e) => e.r === 'lom');
const nLom = LOM.length;
const nRis = LOM.filter((e) => e.ris).length;
const nSagre = LOM.filter((e) => e.tl === 'Sagra').length;
const nFiere = LOM.filter((e) => e.tl === 'Fiera').length;
const n2027 = LOM.filter((e) => e.dal >= '2027-01-01').length;
const prov = Object.entries(LOM.reduce<Record<string, number>>((m, e) => { if (e.p) m[e.p] = (m[e.p] ?? 0) + 1; return m; }, {})).sort((a, b) => b[1] - a[1]);
const W = K.weekend(G, 0);
const nW = K.contaStrumento({ periodo: 'weekend', regione: 'lom' });
const righeProv = () => prov.map(([p, n]) => [`${K.PROVINCE[p] ?? p} (${p})`, n, LOM.filter((e) => e.p === p && e.ris).length]);

// Le chiffre de l'outil (30 jours), écrit en tête du texte avec sa période : un seul chiffre par objet.
const PRESET = { regione: 'lom', periodo: '30' } as const;
const S30 = K.ricerca(PRESET);

export default definePage({
  id: 'lombardia', group: 'regioni', order: 10,
  tool: { kind: 'trova', preset: PRESET },
  related: ['fiere', 'natale-lombardia', 'vicino'],
  sources: ['lom', 'cc0'],
  it: {
    slug: 'sagre-lombardia', nav: 'Sagre in Lombardia', card: 'Il calendario che i Comuni comunicano alla Regione, provincia per provincia.',
    title: 'Sagre in Lombardia: il calendario ufficiale dei Comuni',
    description: 'Sagre in Lombardia dal calendario che i Comuni comunicano alla Regione: date, orari, ristoro e provincia di ogni sagra e fiera, con la fonte open data.',
    h1: 'Sagre in Lombardia, dal calendario dei Comuni',
    intro: 'Le sagre in Lombardia come le comunicano i Comuni alla Regione: scegli il periodo e il tipo di evento.',
    resume: `Nei prossimi 30 giorni, ${K.periodoParole(S30.dal, S30.al, 'it')}, gli eventi in Lombardia in calendario sono ${S30.lista.length}. Le sagre in Lombardia sono l’unico caso in Italia in cui il calendario è un obbligo di legge: la legge regionale sul commercio chiede a ogni Comune di comunicare alla Regione le sagre e le fiere che si tengono su area pubblica. La Regione pubblica l’elenco in open data con licenza CC0, e lo abbiamo letto il ${K.dl(K.LETTO_IL, 'it', false)}: ${K.FONTI.lom.righe} righe in tutto, di cui ${nLom} con date a venire (${nSagre} sagre e ${nFiere} fiere). In ${nRis} casi il Comune dichiara un servizio di ristorazione, cioè stand gastronomici o cucina. ${n2027} eventi sono già fissati nel 2027. Ogni riga riporta il Comune, l’orario dichiarato e l’organizzatore. Il fine settimana del ${K.dl(W.dal, 'it', false)} gli eventi lombardi in calendario erano ${nW}.`,
    faqs: [
      { q: 'Perché in Lombardia ci sono più dati che nelle altre regioni?', a: 'Perché la legge regionale sul commercio obbliga i Comuni a comunicare alla Regione le sagre e le fiere su area pubblica, e la Regione pubblica quei dati in formato aperto. Nella maggior parte delle altre regioni non esiste un obbligo simile, o l’elenco non viene pubblicato come file aperto e aggiornato.' },
      { q: 'Cosa significa «con ristoro» accanto a una sagra lombarda?', a: 'Che nella comunicazione alla Regione il Comune ha indicato un servizio di somministrazione di alimenti e bevande, cioè stand gastronomici o una cucina. Non dice che cosa si mangia né se serve prenotare: per il menù e gli orari della cucina conviene leggere il programma del Comune o della Pro Loco.' },
      { q: 'Perché Milano ha così poche sagre nel calendario?', a: 'Perché l’elenco contiene solo le sagre e le fiere su area pubblica comunicate dai Comuni. Le grandi manifestazioni di Milano, i mercati comunali e gli eventi in spazi privati seguono altre regole e non compaiono. Nei Comuni piccoli la sagra della parrocchia o della Pro Loco si svolge spesso in piazza, ed è quindi comunicata.' },
      { q: 'Le date lombarde del 2027 sono definitive?', a: 'Sono quelle che i Comuni hanno già comunicato alla Regione al giorno della lettura. Un Comune può aggiungere, spostare o annullare una sagra anche pochi giorni prima. Per gli eventi lontani nel tempo, prendi la data come indicativa e ricontrolla il programma un paio di settimane prima.' },
    ],
    body: (h) => `
<h2>Sagre in Lombardia per provincia</h2>
<p>Brescia domina il calendario: i suoi Comuni comunicano da soli più eventi di quanti ne comunichino le province di Milano, Bergamo e Como messe insieme. La seconda colonna conta gli eventi a venire, la terza quelli con ristoro dichiarato.</p>
${h.table(['Provincia', 'Eventi a venire', 'Con ristoro'], righeProv(), `Sagre e fiere lombarde con date dal ${h.day(G)}`, ['l', 'r', 'r'])}
<p>La Valtellina, cioè la provincia di Sondrio, è seconda grazie alle feste di paese dell’alta valle, da Valdidentro a Livigno. Lodi e Pavia hanno pochissime righe: non vuol dire che non ci siano sagre, ma che i loro Comuni ne hanno comunicate poche per i mesi a venire.</p>
${h.mini('mese', { d: { reg: 1, mese: 0, cosa: 1 } })}
<h2>I Comuni con più sagre</h2>
${tabComuni(h, { dal: G, al: '2027-12-31', regione: 'lom' }, `Comuni lombardi con più eventi in calendario dal ${h.day(G)}`, 10)}
<p>Pontevico, nella bassa bresciana, comunica quasi un evento al mese: la festa del patrono, le sagre di quartiere, il Corpus Domini. È il tipico calendario di un paese in cui oratorio, alpini e Pro Loco organizzano a turno.</p>
<h2>Mese per mese</h2>
${tabMesi(h, { regione: 'lom' }, G.slice(0, 7), 12, 'Sagre e fiere lombarde per mese')}
<p>L’inverno lombardo è fatto soprattutto di fiere di Santa Lucia, di Sant’Antonio Abate e di mercatini di Natale; l’estate delle feste dell’oratorio e delle sagre gastronomiche. Molti Comuni comunicano gli eventi estivi solo in primavera: i mesi lontani si riempiono con le nuove letture del file.</p>`,
  },
  en: {
    slug: 'sagre-lombardy', nav: 'Sagre in Lombardy', card: 'The calendar municipalities file with the Region, province by province.',
    title: 'Sagre in Lombardy: the Official Calendar of Municipalities',
    description: 'Sagre in Lombardy from the calendar towns file with the Region: dates, hours, food served and province for every sagra and fair, with the open data source.',
    h1: 'Sagre in Lombardy, from the municipalities’ calendar',
    intro: 'Sagre in Lombardy as municipalities file them with the Region: choose the period and type of event.',
    resume: `In the next 30 days, ${K.periodoParole(S30.dal, S30.al, 'en')}, the calendar lists ${S30.lista.length} events in Lombardy. Sagre in Lombardy are the one case in Italy where the calendar is a legal duty: the regional trade law requires every municipality to file with the Region the sagre and fairs held on public land. The Region publishes the list as open data under CC0, and we read it on ${K.dl(K.LETTO_IL, 'en', false)}: ${K.FONTI.lom.righe} rows in all, ${nLom} of them with upcoming dates (${nSagre} sagre and ${nFiere} fairs). In ${nRis} cases the municipality declares food service, meaning food stands or a kitchen. ${n2027} events are already set for 2027. Each row gives the town, the declared hours and the organiser. On the weekend starting ${K.dl(W.dal, 'en', false)} there were ${nW} Lombard events in the calendar. A sagra is a local food festival, often run by the parish, the Alpini veterans or the Pro Loco.`,
    faqs: [
      { q: 'Why is there more data for Lombardy than other regions?', a: 'Because the regional trade law requires municipalities to file sagre and fairs on public land with the Region, and the Region publishes that data in open format. Most other regions have no such duty, or do not publish the list as an open, current file.' },
      { q: 'What does “food served” next to a Lombard sagra mean?', a: 'It means the municipality’s filing with the Region declares food and drink service, such as food stands or a kitchen. It does not say what is on the menu or whether booking is needed: for the menu and kitchen hours, read the programme of the municipality or the Pro Loco.' },
      { q: 'Why does Milan have so few sagre in the calendar?', a: 'Because the list only holds sagre and fairs on public land filed by municipalities. Milan’s large events, municipal markets and events in private venues follow other rules and do not appear. In small towns the parish or Pro Loco sagra is usually held in the square, so it is filed.' },
      { q: 'Are Lombardy’s 2027 dates final?', a: 'They are the dates municipalities had filed with the Region when we read the file. A town can add, move or cancel a sagra even a few days ahead. For events far off, treat the date as a guide and check the programme again a couple of weeks before.' },
    ],
    body: (h) => `
<h2>Sagre in Lombardy by province</h2>
<p>Brescia dominates the calendar: its municipalities file more events on their own than the provinces of Milan, Bergamo and Como combined. The second column counts upcoming events, the third those with food service declared.</p>
${h.table(['Province', 'Upcoming events', 'Food served'], righeProv(), `Lombard sagre and fairs dated from ${h.day(G)}`, ['l', 'r', 'r'])}
<p>Valtellina, the province of Sondrio, comes second thanks to the village feasts of the upper valley, from Valdidentro to Livigno. Lodi and Pavia have very few rows: that does not mean they have no sagre, only that their municipalities have filed few for the coming months.</p>
${h.mini('mese', { d: { reg: 1, mese: 0, cosa: 1 } })}
<h2>Towns with the most sagre</h2>
${tabComuni(h, { dal: G, al: '2027-12-31', regione: 'lom' }, `Lombard towns with the most events from ${h.day(G)}`, 10)}
<p>Pontevico, in the plain south of Brescia, files almost one event a month: the patron saint’s feast, neighbourhood sagre, Corpus Domini. It is the typical calendar of a town where the parish youth centre, the Alpini and the Pro Loco take turns organising.</p>
<h2>Month by month</h2>
${tabMesi(h, { regione: 'lom' }, G.slice(0, 7), 12, 'Lombard sagre and fairs by month')}
<p>Lombardy’s winter is mostly fairs for St Lucy and St Anthony the Abbot, plus Christmas markets; its summer is parish feasts and food sagre. Many towns only file summer events in spring, so distant months fill up with each new reading of the file.</p>`,
  },
});
