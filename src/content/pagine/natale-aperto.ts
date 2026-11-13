import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { tabGiorniNatale } from '../../lib/blocchi';

const MULTI = K.EVENTI.filter((e) => e.t === 'natale' && K.giorniTra(e.dal, e.al) >= 2);
const nM = MULTI.length;
const nConGiorni = MULTI.filter((e) => e.g).length;
const chiusi25 = MULTI.filter((e) => e.g && e.dal <= '2026-12-25' && e.al >= '2026-12-25' && !e.g.includes('2026-12-25')).map((e) => e.c);
const elenco25 = [...new Set(chiusi25)].join(', ');
const nOre = MULTI.filter((e) => e.ora).length;

export default definePage({
  id: 'natale-aperto', group: 'natale', order: 24,
  tool: { kind: 'aperto' },
  related: ['natale-2026', 'natale-alto-adige', 'mercati'],
  sources: ['odh', 'er', 'lom'],
  it: {
    slug: 'mercatino-di-natale-aperto-oggi', nav: 'Il mercatino è aperto?', card: 'Un mercatino e un giorno: aperto o chiuso, e fra quanti giorni apre o chiude.',
    title: 'Mercatino di Natale aperto oggi? Verifica giorno per giorno',
    description: 'Il mercatino di Natale è aperto oggi, il 25 o il 31 dicembre? Scegli mercatino e giorno: aperto o chiuso, orario e giorni che mancano, dai file regionali.',
    h1: 'Il mercatino di Natale è aperto oggi?',
    intro: 'Scegli un mercatino di Natale e un giorno: lo strumento dice se è aperto oggi o chiuso, e fra quanti giorni cambia.',
    resume: `Per sapere se un mercatino di Natale è aperto oggi lo strumento confronta il giorno scelto con le date dichiarate nel file regionale. Copre ${nM} mercatini che durano almeno tre giorni, in Alto Adige, Lombardia ed Emilia-Romagna. Per ${nConGiorni} di questi il file elenca i giorni effettivi di apertura, quindi lo strumento sa anche quando sono chiusi in mezzo alla stagione: il 25 dicembre risultano chiusi ${elenco25}. Per gli altri il file dà solo la data di apertura e quella di chiusura: lo strumento li considera aperti ogni giorno dell’intervallo, ed è per questo che per il 24, il 25 e il 31 dicembre conviene una verifica sul sito del mercatino. ${nOre} mercatini dichiarano anche un orario, mostrato sotto il risultato. Il giorno di partenza è quello del tuo dispositivo, sul fuso orario di Roma.`,
    faqs: [
      { q: 'Come fa lo strumento a sapere se il mercatino è chiuso?', a: 'Legge i giorni di apertura dichiarati nel file regionale. Se il file elenca i singoli giorni, un giorno assente è un giorno di chiusura. Se il file dà solo l’inizio e la fine, lo strumento considera il mercatino aperto in tutto l’intervallo, e lo segnala con la nota sotto il risultato.' },
      { q: 'Il mercatino è aperto il 24 e il 31 dicembre?', a: 'Dipende dal mercatino, e in questi giorni capita che l’orario sia ridotto. I file regionali raramente indicano gli orari dei singoli giorni: lo strumento dice se il giorno è fra quelli di apertura, l’orario mostrato è quello generale. Per la vigilia e San Silvestro controlla il sito del mercatino.' },
      { q: 'Perché alcuni mercatini non sono nell’elenco dello strumento?', a: 'Lo strumento mostra solo i mercatini di Natale che durano almeno tre giorni, perché per un mercatino di una sola domenica la domanda «è aperto?» ha una risposta ovvia. Quelli di un giorno, molto comuni in Lombardia, sono nella ricerca generale dei mercatini di Natale 2026.' },
    ],
    body: (h) => `
<h2>Mercatino di Natale aperto oggi: i giorni con più chiusure</h2>
<p>La tabella conta i mercatini aperti nei giorni in cui le chiusure sono più frequenti. Il calo del 25 dicembre viene dai mercatini che dichiarano la chiusura nel file; quello dopo il 6 gennaio dalla fine della stagione.</p>
${tabGiorniNatale(h, ['aa', 'lom', 'er'], 'Mercatini aperti nei giorni chiave, per regione')}
${h.mini('natale', { d: { reg: 0, g: 5 } })}
<h2>Come leggere il risultato</h2>
<p>«Aperto» con «Chiude fra 12 giorni» vuol dire che il giorno scelto è un giorno di apertura e che l’ultima data dichiarata è fra dodici giorni. «Chiuso» con «Apre fra 3 giorni» indica il prossimo giorno di apertura, non necessariamente l’inizio della stagione: per un mercatino aperto solo nei fine settimana, il mercoledì il risultato rimanda al venerdì o al sabato. «Edizione finita» compare dopo l’ultima data in calendario.</p>
<p>L’indirizzo della pagina conserva il mercatino e il giorno scelti dopo il primo cambio: puoi mandarlo a chi viene con te. Per vedere tutti i mercatini aperti in un giorno, apri ${h.a('natale-2026', 'il calendario dei mercatini di Natale 2026')}.</p>`,
  },
  en: {
    slug: 'christmas-market-open-today', nav: 'Is the market open?', card: 'One market and one day: open or closed, and how many days until that changes.',
    title: 'Is the Christmas Market Open Today? Check It Day by Day',
    description: 'Is the Christmas market open today, on 25 or 31 December? Pick the market and the day: open or closed, hours and days to go, from Italy’s regional files.',
    h1: 'Is the Christmas market open today?',
    intro: 'Pick a Christmas market and a day: the tool says whether the Christmas market is open today or closed, and when that changes.',
    resume: `To tell whether a Christmas market is open today, the tool compares the chosen day with the dates declared in the regional file. It covers ${nM} markets lasting at least three days in South Tyrol, Lombardy and Emilia-Romagna. For ${nConGiorni} of them the file lists the actual opening days, so the tool also knows when they close mid-season: on 25 December ${elenco25} show as closed. For the others the file only gives the opening and closing dates: the tool treats them as open every day in between, which is why 24, 25 and 31 December are worth checking on the market’s own website. ${nOre} markets also declare hours, shown under the result. The starting day is your device’s date, on Rome time.`,
    faqs: [
      { q: 'How does the tool know a market is closed?', a: 'It reads the opening days declared in the regional file. When the file lists individual days, a missing day is a closed day. When the file only gives the start and end, the tool treats the market as open throughout, and says so in the note under the result.' },
      { q: 'Is the market open on 24 and 31 December?', a: 'It depends on the market, and hours are sometimes shorter on those days. Regional files rarely give hours for single days: the tool says whether the day is an opening day, and the hours shown are the general ones. For Christmas Eve and New Year’s Eve, check the market’s website.' },
      { q: 'Why are some markets missing from the tool?', a: 'The tool only lists Christmas markets lasting at least three days, because for a one-Sunday market the question “is it open?” has an obvious answer. One-day markets, very common in Lombardy, are listed in the general Christmas markets 2026 search.' },
    ],
    body: (h) => `
<h2>Christmas market open today: the days with most closures</h2>
<p>The table counts markets open on the days when closures are most common. The dip on 25 December comes from markets declaring closure in the file; the one after 6 January from the end of the season.</p>
${tabGiorniNatale(h, ['aa', 'lom', 'er'], 'Markets open on key days, by region')}
${h.mini('natale', { d: { reg: 0, g: 5 } })}
<h2>How to read the result</h2>
<p>“Open” with “Closes in 12 days” means the chosen day is an opening day and the last declared date is twelve days away. “Closed” with “Opens in 3 days” gives the next opening day, not necessarily the start of the season: for a weekend-only market, on a Wednesday the result points to Friday or Saturday. “This edition is over” appears after the last date in the calendar.</p>
<p>After your first change, the page address keeps the chosen market and day: you can send it to whoever is coming with you. To see every market open on a given day, open ${h.a('natale-2026', 'the 2026 Christmas markets calendar')}.</p>`,
  },
});
