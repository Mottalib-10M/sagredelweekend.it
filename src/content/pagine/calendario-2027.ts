import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { tabMesi, tabEventi, tabComuni } from '../../lib/blocchi';

const A = { dal: '2027-01-01', al: '2027-12-31' };
// Comme l'outil : les événements qui COMMENCENT en 2027 (pas les marchés de Noël 2026 qui débordent sur janvier).
const tutti = K.ricerca({ periodo: 'a2027' }).lista;
const n27 = tutti.length;
const per = (r: string) => tutti.filter((x) => x.e.r === r).length;
const nRis = tutti.filter((x) => x.e.ris).length;
const nPasqua = K.conta({ ...A, testo: /pasqua|ostern/i });
const nCarnevale = K.conta({ ...A, testo: /carneval|fasching/i });
const nLomAnno = K.FONTI.lom.anno_dopo;

export default definePage({
  id: 'calendario-2027', group: 'mesi', order: 32,
  tool: { kind: 'trova', preset: { periodo: 'a2027' } },
  related: ['lombardia', 'fiere', 'dicembre'],
  sources: ['lom', 'odh', 'er'],
  it: {
    slug: 'calendario-sagre-2027', nav: 'Calendario sagre 2027', card: 'Le sagre e le fiere del 2027 già comunicate dai Comuni e dagli enti turistici.',
    title: 'Calendario sagre 2027: le date già comunicate dai Comuni',
    description: 'Calendario sagre 2027 con le date già comunicate dai Comuni lombardi e dagli enti turistici di Alto Adige ed Emilia-Romagna: Carnevale, Pasqua, sagre estive.',
    h1: 'Calendario sagre 2027, le date già fissate',
    intro: 'Il calendario sagre 2027 con le sole date già presenti nei file regionali: scegli la regione o il tipo.',
    resume: `Il calendario sagre 2027 contiene oggi ${n27} eventi che iniziano nel 2027, cioè le date che Comuni ed enti turistici avevano già comunicato quando abbiamo letto i file, il ${K.dl(K.LETTO_IL, 'it', false)}. È un calendario parziale per natura: ${per('lom')} eventi vengono dalla Lombardia, dove il file contiene ${nLomAnno} righe del 2027, ${per('aa')} dall’Alto Adige e ${per('er')} dall’Emilia-Romagna. Per il 2027 i Comuni lombardi comunicano soprattutto le feste patronali e le sagre storiche che hanno date fisse, come i tortelli di Crema in agosto o la Fiera dei Morti di Asola; ${nRis} di queste prevedono il ristoro. L’Alto Adige ha già inserito ${nCarnevale} eventi di Carnevale e ${nPasqua} mercatini di Pasqua. Il calendario crescerà a ogni nuova lettura dei file, soprattutto in primavera, quando i Comuni comunicano le sagre dell’estate.`,
    faqs: [
      { q: 'Perché il calendario 2027 ha così pochi eventi?', a: 'Perché contiene solo le date che i Comuni e gli enti turistici hanno già inserito nei file regionali. Le sagre estive vengono spesso comunicate in primavera, a programma deciso. Un mese che oggi sembra vuoto non è un mese senza sagre: è un mese di cui non sono ancora state comunicate le date.' },
      { q: 'Le date del 2027 possono cambiare?', a: 'Sì. Un Comune può spostare o annullare una sagra anche dopo averla comunicata, e le date lontane sono le più incerte. Usa il calendario 2027 per farti un’idea e segnare le feste che ti interessano, poi ricontrolla qualche settimana prima sul sito del Comune o della Pro Loco.' },
      { q: 'Quando escono le sagre dell’estate 2027?', a: 'Dipende dai Comuni. In Lombardia molte sagre di luglio e agosto vengono comunicate alla Regione fra marzo e giugno, quando parrocchie, alpini e Pro Loco hanno fissato il programma. Rileggiamo i file regionali e aggiorniamo il calendario; la data dell’ultima lettura è scritta sotto ogni ricerca.' },
    ],
    body: (h) => `
<h2>Calendario sagre 2027 mese per mese</h2>
${tabMesi(h, { senzaLunghi: true }, '2027-01', 12, 'Eventi del 2027 già nei file regionali, per mese')}
<p>Gennaio e febbraio contano soprattutto le feste di Sant’Antonio Abate con i falò e il Carnevale; marzo e aprile i mercatini di Pasqua altoatesini; l’estate le sagre lombarde con cucina, che a oggi sono solo una parte di quelle che si terranno.</p>
${h.mini('mese', { d: { reg: 1, mese: 8, cosa: 1 } })}
<h2>Le sagre del 2027 con date fisse</h2>
${tabEventi(h, { ...A, tipi: ['sagra', 'fiera'], regione: 'lom' }, 'Sagre e fiere lombarde del 2027 già comunicate', 30)}
<h2>I Comuni che hanno già comunicato</h2>
${tabComuni(h, { ...A, senzaLunghi: true }, 'Comuni con più eventi nel 2027', 8)}
<p>In testa ci sono Pontevico, nel Bresciano, e Siusi allo Sciliar, in Alto Adige; Asola e Castelcovati hanno già comunicato molte date del 2027. Se il tuo paese non c’è, non vuol dire che non abbia sagre: le comunicherà più avanti.</p>`,
  },
  en: {
    slug: 'sagre-calendar-2027', nav: 'Sagre calendar 2027', card: 'The 2027 sagre and fairs already filed by municipalities and tourist bodies.',
    title: 'Sagre Calendar 2027: Dates Already Filed by Italian Towns',
    description: 'Sagre calendar 2027 with the dates already filed by Lombard towns and by South Tyrol and Emilia-Romagna tourist bodies: Carnival, Easter and summer sagre.',
    h1: 'Sagre calendar 2027, the dates already set',
    intro: 'The sagre calendar 2027 with only the dates already in the regional files: choose the region or type.',
    resume: `The sagre calendar 2027 currently holds ${n27} events starting in 2027, meaning the dates towns and tourist bodies had already filed when we read the files on ${K.dl(K.LETTO_IL, 'en', false)}. It is partial by nature: ${per('lom')} events come from Lombardy, whose file has ${nLomAnno} rows for 2027, ${per('aa')} from South Tyrol and ${per('er')} from Emilia-Romagna. For 2027 Lombard towns mainly file patron saints’ feasts and historic sagre with fixed dates, such as Crema’s tortelli festival in August or Asola’s All Souls’ fair; ${nRis} of them include food service. South Tyrol has already entered ${nCarnevale} Carnival events and ${nPasqua} Easter markets. The calendar will grow with each new reading of the files, especially in spring, when towns file their summer sagre with the Region.`,
    faqs: [
      { q: 'Why does the 2027 calendar have so few events?', a: 'Because it only holds dates that towns and tourist bodies have already entered in the regional files. Summer sagre are often filed in spring, once the programme is set. A month that looks empty today is not a month without sagre: it is a month whose dates have not been filed yet.' },
      { q: 'Can 2027 dates change?', a: 'Yes. A town can move or cancel a sagra even after filing it, and distant dates are the least certain. Use the 2027 calendar to get an idea and note the festivals you like, then check again a few weeks before on the town’s or Pro Loco’s website.' },
      { q: 'When will the summer 2027 sagre be published?', a: 'It depends on the towns. In Lombardy many July and August sagre are filed with the Region between March and June, once parishes, Alpini and Pro Loco associations have set the programme. We re-read the regional files and update the calendar; the date of the last reading is shown under every search.' },
    ],
    body: (h) => `
<h2>Sagre calendar 2027 month by month</h2>
${tabMesi(h, { senzaLunghi: true }, '2027-01', 12, '2027 events already in the regional files, by month')}
<p>January and February are mostly St Anthony the Abbot bonfires and Carnival; March and April South Tyrol’s Easter markets; summer Lombardy’s sagre with food, of which only a share has been filed so far.</p>
${h.mini('mese', { d: { reg: 1, mese: 8, cosa: 1 } })}
<h2>2027 sagre with fixed dates</h2>
${tabEventi(h, { ...A, tipi: ['sagra', 'fiera'], regione: 'lom' }, 'Lombard sagre and fairs for 2027 already filed', 30)}
<h2>Towns that have already filed</h2>
${tabComuni(h, { ...A, senzaLunghi: true }, 'Towns with the most events in 2027', 8)}
<p>Pontevico, near Brescia, and Siusi allo Sciliar, in South Tyrol, lead; Asola and Castelcovati have already filed many of their 2027 dates. If your town is missing, that does not mean it has no sagre: it will file them later.</p>`,
  },
});
