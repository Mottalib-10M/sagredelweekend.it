import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { tabRegioni, tabEventi } from '../../lib/blocchi';

const DIC = { dal: '2026-12-01', al: '2026-12-31', senzaLunghi: true };
const nDic = K.conta(DIC);
const conta = (re: RegExp) => K.conta({ ...DIC, testo: re });
const nLucia = conta(/lucia/i);
const nImm = K.conta({ dal: '2026-12-08', al: '2026-12-08', senzaLunghi: true });
const [top, nTop] = Array.from({ length: 31 }, (_, i) => K.addDays('2026-12-01', i)).map((d) => [d, K.conta({ dal: d, al: d, senzaLunghi: true })] as const).sort((a, b) => b[1] - a[1])[0];
const nCapo = conta(/capodanno|san silvestro|silvester|fiaccolat/i);
const nNatale = K.conta({ ...DIC, tipi: ['natale'] });
const nSagre = K.conta({ ...DIC, tipi: ['sagra'] });
const giorni = ['2026-12-05', '2026-12-06', '2026-12-08', '2026-12-12', '2026-12-13', '2026-12-19', '2026-12-20', '2026-12-24', '2026-12-26', '2026-12-31'];
const righe = (lang: 'it' | 'en') => giorni.map((d) => [K.dl(d, lang).replace(/ \d{4}$/, ''), K.conta({ dal: d, al: d, senzaLunghi: true, tipi: ['sagra', 'festa', 'fiera'] }), K.conta({ dal: d, al: d, tipi: ['natale'] })]);

export default definePage({
  id: 'dicembre', group: 'mesi', order: 31,
  tool: { kind: 'trova', preset: { periodo: 'm2026-12' } },
  related: ['natale-2026', 'novembre', 'calendario-2027'],
  sources: ['lom', 'odh', 'er'],
  it: {
    slug: 'sagre-dicembre-2026', nav: 'Sagre di dicembre 2026', card: 'Immacolata, Santa Lucia, mercatini, presepi e Capodanno in piazza.',
    title: 'Sagre dicembre 2026: Immacolata, Santa Lucia e Capodanno',
    description: 'Sagre dicembre 2026 nei file delle Regioni: feste dell’Immacolata e di Santa Lucia, mercatini di Natale, presepi viventi e Capodanno, giorno per giorno.',
    h1: 'Sagre di dicembre 2026, giorno per giorno',
    intro: 'Le sagre di dicembre 2026 e le feste di Natale nei file delle Regioni: scegli la regione o il tipo.',
    resume: `Le sagre di dicembre 2026 nei file regionali sono ${nDic} eventi fra sagre, feste, fiere e mercatini, il mese più pieno del calendario: ${nNatale} mercatini di Natale e ${nSagre} sagre comunicate dai Comuni lombardi ed emiliano-romagnoli, oltre alle feste altoatesine. Il giorno più ricco è ${K.dl(top, 'it')}, con ${nTop} eventi; l’8 dicembre, festa dell’Immacolata e giorno festivo in tutta Italia, ne conta ${nImm}. ${nLucia} eventi sono dedicati a Santa Lucia, che il 13 dicembre porta i doni ai bambini a Brescia, Bergamo, Cremona e Crema. A fine mese il calendario conta ${nCapo} feste di Capodanno e fiaccolate, in piazza in Emilia-Romagna e sulle piste in Alto Adige. In Lombardia gli eventi si diradano dopo il 20 dicembre e si riducono a meno della metà fra Natale e Capodanno; restano i mercatini altoatesini e i presepi.`,
    faqs: [
      { q: 'Perché l’8 dicembre ci sono tante feste?', a: 'Perché l’Immacolata Concezione è festa nazionale: molti Comuni scelgono quel giorno per il mercatino o la festa di paese, e in Lombardia è la data tradizionale per accendere l’albero e aprire il presepe. Nel 2026 l’8 dicembre è un martedì, e il lunedì 7 diventa un ponte.' },
      { q: 'Dove si festeggia Santa Lucia?', a: 'Nelle province di Brescia, Bergamo, Cremona, Lodi e Mantova Santa Lucia porta i regali ai bambini nella notte fra il 12 e il 13 dicembre, e molti paesi organizzano fiere e mercati. Nel file lombardo ci sono la fiera di Santa Lucia di Crema e la sagra di Santa Lucia di Lodi, fra le altre.' },
      { q: 'Ci sono sagre fra Natale e Capodanno?', a: 'Meno che a inizio mese. Nel file lombardo le sagre di dicembre si diradano dopo il 20; restano i mercatini dell’Alto Adige, che chiudono il 6 gennaio, i presepi viventi in Emilia-Romagna e le feste di Capodanno in piazza. Imposta il periodo «Nei prossimi 30 giorni» dalla vigilia per vederle.' },
    ],
    body: (h) => `
<h2>Sagre dicembre 2026: i giorni più pieni</h2>
${h.table(['Giorno', 'Sagre, feste e fiere', 'Mercatini di Natale'], righe('it'), 'Eventi nei giorni principali di dicembre 2026', ['l', 'r', 'r'])}
<p>I sabati e le domeniche prima di Natale e l’8 dicembre concentrano le feste di paese; il 24 e il 26 il conto scende, il 31 risale con il Capodanno.</p>
${h.mini('mese', { d: { reg: 0, mese: 1, cosa: 1 } })}
<h2>Dicembre per regione</h2>
${tabRegioni(h, DIC, 'Eventi di dicembre 2026, senza mercati settimanali')}
<h2>Santa Lucia e l’Immacolata</h2>
${tabEventi(h, { ...DIC, testo: /lucia|immacolata/i }, 'Feste di Santa Lucia e dell’Immacolata nei file regionali', 20)}
<p>Per i mercatini di Natale, con i giorni di chiusura dichiarati, apri ${h.a('natale-2026', 'la pagina dei mercatini di Natale 2026')}.</p>`,
  },
  en: {
    slug: 'sagre-december-2026', nav: 'Sagre in December 2026', card: 'Immaculate Conception, St Lucy, markets, nativity scenes and New Year.',
    title: 'Sagre December 2026: St Lucy, Advent and New Year’s Eve',
    description: 'Sagre December 2026 in the regional files: Immaculate Conception and St Lucy feasts, Christmas markets, living nativity scenes and New Year, day by day.',
    h1: 'Sagre in December 2026, day by day',
    intro: 'Sagre in December 2026 and Christmas festivals in the regional files: choose the region or type.',
    resume: `Sagre in December 2026 in the regional files total ${nDic} events across sagre, feasts, fairs and markets, the busiest month in the calendar: ${nNatale} Christmas markets and ${nSagre} sagre filed by Lombard and Emilia-Romagna municipalities, plus South Tyrol’s festivals. The fullest day is ${K.dl(top, 'en')}, with ${nTop} events; 8 December, the Immaculate Conception and a public holiday across Italy, has ${nImm}. ${nLucia} events are devoted to St Lucy, who brings children their presents on 13 December around Brescia, Bergamo, Cremona and Crema. At the end of the month the calendar counts ${nCapo} New Year’s Eve parties and torchlight processions, in town squares in Emilia-Romagna and on the ski slopes in South Tyrol. In Lombardy events thin out after 20 December and drop to under half between Christmas and New Year; South Tyrol markets and nativity scenes carry on.`,
    faqs: [
      { q: 'Why are there many festivals on 8 December?', a: 'Because the Immaculate Conception is a national holiday: many towns pick that day for their market or village feast, and in Lombardy it is the traditional date to light the tree and open the nativity scene. In 2026, 8 December is a Tuesday, so Monday the 7th becomes a bridge day.' },
      { q: 'Where is St Lucy celebrated?', a: 'In the provinces of Brescia, Bergamo, Cremona, Lodi and Mantua, St Lucy brings children their presents on the night of 12 to 13 December, and many towns hold fairs and markets. Lombardy’s file includes the St Lucy fair at Crema and the St Lucy sagra at Lodi, among others.' },
      { q: 'Are there sagre between Christmas and New Year?', a: 'Fewer than earlier in the month. In Lombardy’s file December sagre thin out after the 20th; there remain South Tyrol’s markets, which close on 6 January, Emilia-Romagna’s living nativity scenes and New Year’s Eve parties in the square. Set the period to “Next 30 days” from Christmas Eve to see them.' },
    ],
    body: (h) => `
<h2>Sagre December 2026: the busiest days</h2>
${h.table(['Day', 'Sagre, feasts and fairs', 'Christmas markets'], righe('en'), 'Events on the main days of December 2026', ['l', 'r', 'r'])}
<p>The Saturdays and Sundays before Christmas and 8 December hold the village feasts; on the 24th and 26th the count falls, and on the 31st it rises again with New Year.</p>
${h.mini('mese', { d: { reg: 0, mese: 1, cosa: 1 } })}
<h2>December by region</h2>
${tabRegioni(h, DIC, 'December 2026 events, without weekly markets')}
<h2>St Lucy and the Immaculate Conception</h2>
${tabEventi(h, { ...DIC, testo: /lucia|immacolata/i }, 'St Lucy and Immaculate Conception feasts in the regional files', 20)}
<p>For Christmas markets with their declared closed days, open ${h.a('natale-2026', 'the 2026 Christmas markets page')}.</p>`,
  },
});
