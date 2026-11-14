import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { tabEventi, tabMesi } from '../../lib/blocchi';

const G = K.OGGI;
const FIERE = K.EVENTI.filter((e) => e.t === 'fiera');
const nF = FIERE.length;
const nLom = FIERE.filter((e) => e.r === 'lom').length;
const nRis = FIERE.filter((e) => e.ris).length;
const nSanti = FIERE.filter((e) => /\b(san|sant|santa|santo|s\.)\b|sant'/i.test(e.n)).length;
const nUnGiorno = FIERE.filter((e) => e.dal === e.al).length;
// Le chiffre de l'outil (30 jours) et sa période, écrits dans le texte à côté du total.
const PRESET = { cosa: 'fiere', periodo: '30' } as const;
const S = K.ricerca(PRESET);
const n30 = S.lista.length;
const ultima = FIERE.reduce((m, e) => (e.al > m ? e.al : m), G);

export default definePage({
  id: 'fiere', group: 'regioni', order: 14,
  tool: { kind: 'trova', preset: PRESET },
  related: ['lombardia', 'mercati', 'calendario-2027'],
  sources: ['lom', 'cc0'],
  it: {
    slug: 'fiere-di-paese', nav: 'Fiere di paese', card: 'Le fiere dei santi e di stagione comunicate dai Comuni lombardi.',
    title: 'Fiere di paese in Lombardia: Santa Caterina e Santa Lucia',
    description: 'Fiere di paese in Lombardia dal calendario dei Comuni alla Regione: Santa Caterina, Sant’Andrea, Santa Lucia e Sant’Antonio, con data, orario e ristoro.',
    h1: 'Fiere di paese, dal calendario dei Comuni lombardi',
    intro: 'Le fiere di paese su area pubblica comunicate dai Comuni: scegli il periodo, la regione o la città.',
    resume: `Nei prossimi 30 giorni, ${K.periodoParole(S.dal, S.al, 'it')}, le fiere di paese sono ${n30}; in tutto il calendario, ${K.periodoParole(G, ultima, 'it')}, sono ${nF}, di cui ${nLom} in Lombardia: è il file regionale lombardo a distinguere la fiera dalla sagra, perché la legge regionale sul commercio tratta la fiera come una manifestazione commerciale su area pubblica, con bancarelle di operatori, mentre la sagra è centrata sul cibo e sulla festa. ${nSanti} fiere portano il nome di un santo: sono le fiere patronali o di stagione, come Santa Caterina a fine novembre, Sant’Andrea, Santa Lucia il 13 dicembre e Sant’Antonio Abate a gennaio, spesso con secoli di storia. ${nUnGiorno} durano un solo giorno, per lo più di domenica. In ${nRis} casi il Comune dichiara anche un servizio di ristoro. Le date sono quelle comunicate alla Regione e lette il ${K.dl(K.LETTO_IL, 'it', false)}.`,
    faqs: [
      { q: 'Che differenza c’è fra una fiera e una sagra?', a: 'Nella legge lombarda la fiera è una manifestazione su area pubblica in cui operatori commerciali vendono merci di ogni tipo, spesso legata a un santo o a una stagione. La sagra è invece una festa centrata sul cibo e sulla promozione del territorio. Nella ricerca il tipo si legge accanto al nome dell’evento.' },
      { q: 'Perché tante fiere cadono fra novembre e dicembre?', a: 'Perché molte fiere storiche lombarde sono legate ai santi d’autunno e d’inverno: Martino l’11 novembre, Caterina il 25, Andrea il 30, Ambrogio il 7 dicembre a Milano e dintorni, Lucia il 13. Nascevano come mercati di fine raccolto e di scorte per l’inverno, e molti Comuni le tengono ancora la domenica più vicina.' },
      { q: 'Le fiere sono aperte anche la sera?', a: 'Di solito no: le bancarelle aprono al mattino e chiudono nel tardo pomeriggio. L’orario comunicato alla Regione compare accanto alla data. Quando la fiera ha anche un servizio di ristoro, la serata può proseguire con la cena negli stand: lo dice la voce «con ristoro».' },
    ],
    body: (h) => `
<h2>Le fiere più antiche</h2>
<p>La fiera di Santa Caterina a Gorgonzola, nel Milanese, è arrivata alla 242ª edizione secondo il nome comunicato dal Comune. A Crema la fiera di Santa Lucia si tiene l’11 e il 12 dicembre; a Brescia le fiere di quartiere, come quella di Cristo Re, durano una domenica.</p>
${h.mini('mese', { d: { reg: 1, mese: 1, cosa: 1 } })}
<h2>Fiere di paese mese per mese</h2>
${tabMesi(h, { tipi: ['fiera'] }, G.slice(0, 7), 12, 'Fiere in calendario per mese')}
<p>Dopo la stagione dei santi d’inverno le fiere si diradano: a primavera tornano le fiere di San Marco e dei fiori, in autunno le fiere dei Morti e di San Carlo nella bassa mantovana e cremonese. I mesi lontani si riempiono man mano che i Comuni comunicano le date dell’anno nuovo.</p>`,
  },
  en: {
    slug: 'village-fairs-lombardy', nav: 'Village fairs', card: 'Saints’ and seasonal fairs filed by Lombard municipalities.',
    title: 'Village Fairs in Lombardy: St Catherine, St Lucy and More',
    description: 'Village fairs in Lombardy from the calendar towns file with the Region: St Catherine, St Andrew, St Lucy and St Anthony fairs, with date, hours and food.',
    h1: 'Village fairs, from Lombardy’s municipal calendar',
    intro: 'Village fairs on public land filed by municipalities: choose the period, the region or a town.',
    resume: `In the next 30 days, ${K.periodoParole(S.dal, S.al, 'en')}, there are ${n30} village fairs; across the whole calendar, ${K.periodoParole(G, ultima, 'en')}, there are ${nF}, ${nLom} of them in Lombardy: it is Lombardy’s regional file that tells a fair from a sagra, because the regional trade law treats a fair (fiera) as a commercial event on public land with traders’ stalls, while a sagra centres on food and festivity. ${nSanti} fairs bear a saint’s name: these are patronal or seasonal fairs, such as St Catherine in late November, St Andrew, St Lucy on 13 December and St Anthony the Abbot in January, often centuries old. ${nUnGiorno} last a single day, mostly a Sunday. In ${nRis} cases the municipality also declares food service. Dates are those filed with the Region and read on ${K.dl(K.LETTO_IL, 'en', false)}, with the hours declared by each town.`,
    faqs: [
      { q: 'What is the difference between a fair and a sagra?', a: 'Under Lombard law a fair is an event on public land where traders sell all kinds of goods, often linked to a saint or a season. A sagra is a festival centred on food and promoting the local area. In the search the type appears next to the event’s name.' },
      { q: 'Why do so many fairs fall in November and December?', a: 'Because many historic Lombard fairs are tied to autumn and winter saints: Martin on 11 November, Catherine on the 25th, Andrew on the 30th, Ambrose on 7 December around Milan, Lucy on the 13th. They began as end-of-harvest markets for winter supplies, and many towns still hold them on the nearest Sunday.' },
      { q: 'Are fairs open in the evening?', a: 'Usually not: stalls open in the morning and close in the late afternoon. The hours filed with the Region appear next to the date. When the fair also has food service, the evening can continue with dinner at the stands: the “food served” label says so.' },
    ],
    body: (h) => `
<h2>The oldest fairs</h2>
<p>The St Catherine fair at Gorgonzola, near Milan, has reached its 242nd edition according to the name filed by the town. At Crema the St Lucy fair runs on 11 and 12 December; in Brescia neighbourhood fairs, such as Cristo Re, last one Sunday.</p>
${h.mini('mese', { d: { reg: 1, mese: 1, cosa: 1 } })}
<h2>Village fairs month by month</h2>
${tabMesi(h, { tipi: ['fiera'] }, G.slice(0, 7), 12, 'Fairs in the calendar by month')}
<p>After the winter saints’ season fairs thin out: spring brings the St Mark and flower fairs, autumn the All Souls’ and St Charles fairs in the plain around Mantua and Cremona. Distant months fill up as municipalities file the new year’s dates.</p>`,
  },
});
