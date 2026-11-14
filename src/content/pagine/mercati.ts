import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { tabComuni } from '../../lib/blocchi';

const G = K.OGGI;
const MERC = K.EVENTI.filter((e) => e.t === 'mercato');
const conta = (re: RegExp) => MERC.filter((e) => re.test(e.n)).length;
const nMerc = MERC.length;
const nAA = MERC.filter((e) => e.r === 'aa').length;
const nContadini = conta(/contadin|bauern|agricol/i);
const nPulci = conta(/pulci|flohmarkt|usato|pöresc/i);
const nSett = conta(/settimanal|wochenmarkt|ogni (luned|marted|mercoled|gioved|venerd|sabato|domenica)/i);
const settimana = Array.from({ length: 7 }, (_, i) => K.addDays(G, i));
const perGiorno = (lang: 'it' | 'en') => settimana.map((d) => [K.dl(d, lang).replace(/ \d{4}$/, ''), K.cerca({ dal: d, al: d, tipi: ['mercato'] }).length, K.cerca({ dal: d, al: d, tipi: ['natale'] }).length]);
const nOggi = K.cerca({ dal: G, al: G, tipi: ['mercato'] }).length;
// L'outil de la page montre les marchés ET les mercatini de Noël : son chiffre est écrit tel quel.
const PRESET = { cosa: 'mercati', periodo: 'oggi' } as const;
const nStrumento = K.contaStrumento(PRESET);

export default definePage({
  id: 'mercati', group: 'regioni', order: 15,
  tool: { kind: 'trova', preset: PRESET },
  related: ['alto-adige', 'oggi', 'natale-aperto'],
  sources: ['odh', 'lom', 'er'],
  it: {
    slug: 'mercatini-oggi', nav: 'Mercatini oggi', card: 'Mercati contadini, delle pulci e settimanali aperti oggi o nei prossimi giorni.',
    title: 'Mercatini oggi: mercati contadini e delle pulci aperti',
    description: 'Mercatini oggi e nei prossimi giorni: mercati contadini, settimanali e delle pulci dei file regionali, soprattutto in Alto Adige, con orario, giorni e fonte.',
    h1: 'Mercatini oggi e nei prossimi giorni',
    intro: 'I mercatini di oggi nei file delle Regioni: mercati contadini, settimanali, delle pulci e mercatini di Natale.',
    resume: `I mercatini oggi in calendario sono quasi tutti altoatesini: su ${nMerc} mercati nei file regionali, ${nAA} vengono dall’Open Data Hub dell’Alto Adige, dove le associazioni turistiche inseriscono anche i mercati del contadino e quelli settimanali con i loro giorni effettivi. Ne contiamo ${nContadini} contadini o agricoli, ${nPulci} delle pulci o dell’usato e ${nSett} settimanali dichiarati. Il ${K.dl(G, 'it', false)} ne erano aperti ${nOggi}; con i mercatini di Natale, quel giorno la ricerca qui sopra ne mostra ${nStrumento}. I mercati si tengono quasi tutti al mattino, fra le 7.30 e le 13: l’orario compare accanto alla data. La ricerca qui sopra parte da oggi e include sia i mercati sia i mercatini di Natale; i mercati comunali ordinari delle città, che non sono nei file turistici, non ci sono: per quelli fa fede il sito del Comune.`,
    faqs: [
      { q: 'Il mercato settimanale è aperto oggi?', a: 'Se il file dell’Alto Adige indica i singoli giorni, la ricerca lo mostra solo in quei giorni: un mercato del venerdì compare il venerdì e sparisce il sabato. Imposta «Oggi» o «Domani» nel campo «Quando». Per i mercati comunali di Lombardia ed Emilia-Romagna, che non sono nei file, chiedi al Comune.' },
      { q: 'Che differenza c’è fra mercato contadino e mercatino delle pulci?', a: 'Al mercato contadino i produttori della zona vendono frutta, verdura, formaggi, speck e pane. Al mercatino delle pulci privati e rigattieri vendono oggetti usati e d’antiquariato. Nei file i due tipi si riconoscono dal nome; l’orario è di solito solo mattutino per i primi e più lungo per i secondi.' },
      { q: 'Perché ci sono così pochi mercati in Lombardia?', a: 'Perché il file lombardo contiene sagre e fiere, non i mercati settimanali, che seguono un’altra procedura comunale. Compaiono solo mercati occasionali comunicati come fiere, per esempio un mercato agricolo una domenica al mese. Per il mercato del tuo quartiere il riferimento resta il sito del Comune.' },
    ],
    body: (h) => `
<h2>Mercatini oggi e nei prossimi sette giorni</h2>
<p>La tabella conta, giorno per giorno, i mercati e i mercatini di Natale aperti nella settimana che parte dal ${h.day(G)}. Il sabato è il giorno più pieno, perché molti mercati contadini e delle pulci altoatesini si tengono il sabato mattina; la domenica i mercati sono pochi.</p>
${h.table(['Giorno', 'Mercati', 'Mercatini di Natale'], perGiorno('it'), `Mercati aperti nella settimana dal ${h.day(G)}`, ['l', 'r', 'r'])}
${h.mini('mese', { d: { reg: 2, mese: 0, cosa: 3 } })}
<h2>Dove si trovano i mercati</h2>
${tabComuni(h, { dal: G, al: '2027-12-31', tipi: ['mercato'] }, `Paesi con più mercati in calendario dal ${h.day(G)}`, 10)}
<p>Merano ha un grande mercato settimanale, un mercato contadino e due mercatini delle pulci; Lana e Caldaro alternano mercati del contadino nelle diverse frazioni. Fuori dall’Alto Adige troverai soprattutto mercatini medievali o dell’artigianato legati a una festa, come quello di Savignano sul Panaro.</p>
<p>Con l’Avvento i mercati contadini lasciano spazio ai mercatini di Natale: per sapere se uno di questi è aperto un giorno preciso c’è ${h.a('natale-aperto', 'lo strumento «il mercatino è aperto?»')}.</p>`,
  },
  en: {
    slug: 'markets-today-italy', nav: 'Markets today', card: 'Farmers’, flea and weekly markets open today or in the coming days.',
    title: 'Markets Today in Italy: Farmers’ and Flea Markets Open',
    description: 'Markets today and in the coming days: farmers’, weekly and flea markets from the regional files, mostly in South Tyrol, with opening hours, days and source.',
    h1: 'Markets today and in the coming days',
    intro: 'Today’s markets in the regional files: farmers’, weekly and flea markets, plus Christmas markets.',
    resume: `Markets today in the calendar are almost all in South Tyrol: of ${nMerc} markets in the regional files, ${nAA} come from the South Tyrol Open Data Hub, where tourist associations also enter farmers’ and weekly markets with their actual days. We count ${nContadini} farmers’ or produce markets, ${nPulci} flea or second-hand markets and ${nSett} declared as weekly. On ${K.dl(G, 'en', false)}, ${nOggi} were open; counting Christmas markets too, the search above shows ${nStrumento} that day. Almost all are held in the morning, roughly between 7.30 and 13.00, so go early: the time appears next to the date. The search above starts from today’s date and includes both regular markets and Christmas markets; ordinary municipal town markets, which are not in the tourism files, are not included: for those, check the town’s website.`,
    faqs: [
      { q: 'Is the weekly market open today?', a: 'When the South Tyrol file gives the individual days, the search shows the market on those days alone: a Friday market appears on Friday and disappears on Saturday. Set “Today” or “Tomorrow” in the “When” field. For municipal markets in Lombardy and Emilia-Romagna, which are not in the files, ask the town hall.' },
      { q: 'What is the difference between a farmers’ market and a flea market?', a: 'At a farmers’ market (mercato contadino) local producers sell fruit, vegetables, cheese, speck and bread. At a flea market (mercatino delle pulci) private sellers and dealers sell second-hand goods and antiques. In the files the two are told apart by name; farmers’ markets usually run in the morning only, flea markets longer.' },
      { q: 'Why are there so few markets in Lombardy?', a: 'Because Lombardy’s file holds sagre and fairs, not weekly markets, which follow a separate municipal procedure. Only occasional markets filed as fairs appear, such as a farmers’ market one Sunday a month. For your neighbourhood market, the town’s website remains the reference.' },
    ],
    body: (h) => `
<h2>Markets today and over the next seven days</h2>
<p>The table counts, day by day, the markets and Christmas markets open in the week starting ${h.day(G)}. Saturday is the busiest day, because many South Tyrol farmers’ and flea markets are held on Saturday mornings; on Sundays there are few markets.</p>
${h.table(['Day', 'Markets', 'Christmas markets'], perGiorno('en'), `Markets open in the week from ${h.day(G)}`, ['l', 'r', 'r'])}
${h.mini('mese', { d: { reg: 2, mese: 0, cosa: 3 } })}
<h2>Where the markets are</h2>
${tabComuni(h, { dal: G, al: '2027-12-31', tipi: ['mercato'] }, `Villages with the most markets from ${h.day(G)}`, 10)}
<p>Merano has a large weekly market, a farmers’ market and two flea markets; Lana and Caldaro alternate farmers’ markets across their districts. Outside South Tyrol you will mostly find medieval or craft markets tied to a festival, such as the one at Savignano sul Panaro.</p>
<p>With Advent, farmers’ markets give way to Christmas markets: to see whether one is open on a given day, use ${h.a('natale-aperto', 'the “is the market open?” tool')}.</p>`,
  },
});
