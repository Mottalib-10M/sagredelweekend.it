/** Accueil (page pilier) : texte italien et anglais. Tout chiffre vient du moteur (K). */
import type { FAQ, Helpers } from '../lib/page-types';
import { KIT as K } from '../lib/kit';

const W = K.weekend(K.OGGI, 0);
const nWe = K.conta({ ...W, senzaLunghi: true });
const nWeAa = K.conta({ ...W, regione: 'aa', senzaLunghi: true });
const nWeLom = K.conta({ ...W, regione: 'lom', senzaLunghi: true });
const nDic = K.conta({ dal: '2026-12-01', al: '2026-12-31', senzaLunghi: true });
const nNat = K.EVENTI.filter((e) => e.t === 'natale' && K.giorniTra(e.dal, e.al) >= 2).length;
const n27 = K.conta({ dal: '2027-01-01', al: '2027-12-31', senzaLunghi: true });
const lomTot = K.FONTI.lom.righe;
const lomFut = K.EVENTI.filter((e) => e.r === 'lom').length;
const lomRis = K.EVENTI.filter((e) => e.r === 'lom' && e.ris).length;
const lom27 = K.FONTI.lom.anno_dopo;

const dmx = (iso: string, tag: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString(tag, { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' });
const rng = (tag: string) => `${dmx(W.dal, tag)} a ${dmx(W.al, tag)}`;
const rngEn = () => `${dmx(W.dal, 'en-GB')} to ${dmx(W.al, 'en-GB')}`;

export const HOME_SOURCES = ['lom', 'odh', 'er', 'pug', 'datigov', 'cc0', 'ccby'];

type Lang = 'it' | 'en';
export interface HomeText {
  title: string; description: string; h1: string; intro: string; resume: string;
  facts: Array<{ k: string; v: string }>;
  listsTitle: string; foldTitle: string;
  why: (h: Helpers) => string;
  sections: (h: Helpers) => Array<{ title: string; html: string }>;
  faqs: FAQ[];
}

const giorni = (h: Helpers) => `${h.dm(W.dal)} – ${h.dm(W.al)}`;
const tabRegioni = (h: Helpers) => h.table(
  [h.T('Regione', 'Region'), h.T('Fonte', 'Source'), h.T('Licenza', 'Licence'), h.T('Eventi a venire', 'Upcoming events'), h.T(`Weekend ${giorni(h)}`, `Weekend ${giorni(h)}`)],
  (['lom', 'aa', 'er', 'pug'] as const).map((r) => [
    K.NOME_REGIONE[r][h.lang],
    { lom: h.T('Comuni, via Regione Lombardia', 'Municipalities, via the Lombardy Region'), aa: 'Open Data Hub (NOI Techpark)', er: 'APT Servizi Emilia-Romagna', pug: h.T('Osservatorio turistico Puglia', 'Apulia tourism observatory') }[r],
    r === 'lom' || r === 'aa' ? 'CC0' : 'CC BY 4.0',
    K.EVENTI.filter((e) => e.r === r && !K.lungo(e)).length,
    K.conta({ ...W, regione: r, senzaLunghi: true }),
  ]),
  h.T(`Le quattro regioni del calendario, file letti il ${h.day(K.LETTO_IL)}`, `The four regions in the calendar, files read on ${h.day(K.LETTO_IL)}`), ['l', 'l', 'l', 'r', 'r'],
);
const tabProvince = (h: Helpers) => {
  const c = new Map<string, number>();
  for (const e of K.EVENTI) if (e.r === 'lom') c.set(e.p ?? '', (c.get(e.p ?? '') ?? 0) + 1);
  const rows = [...c.entries()].sort((a, b) => b[1] - a[1]).map(([p, n]) => [K.PROVINCE[p] ?? p, n, K.EVENTI.filter((e) => e.r === 'lom' && e.p === p && e.ris).length]);
  return h.table([h.T('Provincia', 'Province'), h.T('Sagre e fiere a venire', 'Upcoming sagre and fairs'), h.T('Con cucina o ristoro', 'With food served')], rows, h.T('Lombardia: sagre e fiere comunicate dai Comuni, per provincia', 'Lombardy: sagre and fairs filed by municipalities, by province'), ['l', 'r', 'r']);
};

const it: HomeText = {
  title: 'Sagre questo weekend: calendario ufficiale delle Regioni',
  description: 'Sagre questo weekend e nei prossimi mesi in Lombardia, Alto Adige ed Emilia-Romagna, dai file open data delle Regioni: date, comune, programma e fonte.',
  h1: 'Sagre questo weekend, dai calendari ufficiali delle Regioni',
  intro: 'Le sagre di questo weekend vicino a te, lette nei file che i Comuni e le Regioni pubblicano in open data: scegli regione, periodo e tipo di festa, e il calendario si aggiorna sotto.',
  resume: `Nel fine settimana da ${rng('it-IT')} le sagre, le feste e i mercatini che si trovano nei file ufficiali sono ${nWe}: ${nWeAa} in Alto Adige, ${nWeLom} in Lombardia, il resto in Emilia-Romagna e in Puglia. Il calendario non nasce dalle segnalazioni degli organizzatori, come quasi tutti i siti di sagre, ma dai dati aperti delle Regioni: in Lombardia ogni Comune deve comunicare alla Regione le sagre e le fiere su area pubblica, e il file regionale ne conta ${lomTot}, di cui ${lomFut} ancora da svolgere e ${lom27} già fissate per il 2027. Per l’Alto Adige usiamo gli eventi dell’Open Data Hub, per l’Emilia-Romagna quelli di APT Servizi, per la Puglia quelli dell’osservatorio turistico regionale. Ogni scheda dice da quale file viene e quando l’abbiamo letto; per le altre sedici regioni non abbiamo trovato un file aperto e aggiornato, e qui non le inventiamo.`,
  facts: [],
  listsTitle: 'Tutte le pagine del calendario',
  foldTitle: 'Come leggere il calendario delle sagre',
  why: (h) => `
<h2>Sagre questo weekend: da dove vengono le date</h2>
<p>Chi cerca «sagre questo weekend» trova di solito elenchi compilati dagli organizzatori stessi, che pagano per comparire in alto o caricano l’evento quando se ne ricordano. Il risultato sono feste già finite, date dell’anno prima e paesi interi che mancano. Noi facciamo il contrario: partiamo dai file che le Regioni pubblicano su ${h.src('datigov', 'dati.gov.it')} e sui propri portali, e teniamo solo ciò che ha una data a venire.</p>
<p>La fonte più solida è la Lombardia. La legge regionale sul commercio (legge regionale n. 6 del 2010, articolo 18 bis) chiede a ogni Comune di comunicare alla Regione il calendario delle sagre e delle fiere che si svolgono su suolo pubblico: entro il 15 dicembre per l’anno dopo, e ogni settimana per le variazioni. La Regione pubblica tutto nel file ${h.src('lom', '«Sagre e fiere su area pubblica»')}, con licenza CC0. Per ogni sagra il file dice il comune, l’indirizzo, gli orari, l’ente organizzatore e se c’è somministrazione di cibo e bevande: su ${lomFut} eventi lombardi a venire, ${lomRis} hanno la cucina o il ristoro.</p>
${tabRegioni(h)}
<p>In Alto Adige le date arrivano dall’${h.src('odh', 'Open Data Hub')}, dove le associazioni turistiche caricano mercatini, feste di paese, Törggelen e sfilate dei Krampus, ciascuno con licenza CC0. In Emilia-Romagna usiamo l’${h.src('er', 'elenco degli eventi turistici attivi')} pubblicato da APT Servizi per la Regione, in Puglia il file ${h.src('pug', '«Cosa fare in Puglia»')}. Questi due sono in CC BY 4.0: citiamo l’autore su ogni pagina.</p>
${h.mini('weekend')}
<h2>Che cosa trovi su questo sito</h2>
<p>La ricerca in alto calcola nel tuo browser che cosa c’è in un periodo: oggi, domani, questo fine settimana (da venerdì a domenica, perché molte sagre aprono il venerdì sera), il successivo, i prossimi trenta giorni o un mese intero fino a dicembre 2027. Puoi limitare la ricerca alle sagre, ai mercatini di Natale, ai mercati o alle sole fiere, oppure alle feste lombarde con cucina. Per cercare intorno a una città vai su ${h.a('vicino', 'sagre vicino a me')}; per sapere se un mercatino è aperto in un giorno preciso c’è ${h.a('natale-aperto', 'il controllo «aperto oggi?»')}.</p>
<p>A dicembre gli eventi a calendario salgono a ${nDic}, contro i ${nWe} di questo fine settimana: è il mese dei mercatini di Natale (ne contiamo ${nNat} che durano almeno tre giorni) e delle feste di Santa Lucia, dell’Immacolata e di Capodanno in piazza. Per il 2027 ci sono già ${n27} date, e il numero crescerà a metà dicembre, quando i Comuni lombardi chiudono la comunicazione dell’anno nuovo.</p>
${tabProvince(h)}
<p>La provincia di Brescia è di gran lunga la più presente nel file lombardo: molti dei suoi Comuni comunicano anche le feste dell’oratorio, le fiaccolate e le serate degli alpini, che altrove restano fuori. Milano, Bergamo città e Como compaiono poco o nulla, perché le loro manifestazioni non passano da questa procedura.</p>`,
  sections: (h) => [
    { title: 'Perché non ci sono tutte le regioni', html: `<p>Una sagra si organizza in Comune, ma solo poche Regioni raccolgono e pubblicano il calendario in un formato aperto. Abbiamo letto i cataloghi di ${h.src('datigov', 'dati.gov.it')} il ${h.day(K.LETTO_IL)}: l’Umbria pubblica un file di eventi, ma le date più recenti sono del 2023 (${h.src('umbria', 'scheda del catalogo')}); le Marche hanno un file con pochi eventi a venire e nessuna sagra; il Trentino ha file comunali fermi al 2019. Usarli avrebbe voluto dire mostrare feste finite. Per questo il sito copre oggi Lombardia, Alto Adige, Emilia-Romagna e una piccola parte della Puglia, e lo dice in ogni pagina.</p><p>Quando una Regione pubblica un calendario aggiornato lo aggiungiamo, con la sua fonte e la sua licenza. Le segnalazioni dei singoli organizzatori non entrano: non possiamo verificarle e non vogliamo diventare l’ennesima bacheca a pagamento.</p>` },
    { title: 'Sagra, fiera, festa, mercatino: che differenza c’è', html: `<p>Nel file lombardo il Comune sceglie fra due tipi: <strong>sagra</strong>, la manifestazione che valorizza un prodotto o una tradizione locale, spesso con somministrazione di cibo; <strong>fiera</strong>, il mercato straordinario su area pubblica, legato a una ricorrenza o a un santo, con le bancarelle degli ambulanti. Riportiamo la scelta del Comune così com’è, anche quando chiama sagra una festa dell’oratorio. Negli altri file la categoria è nostra: chiamiamo «mercatino di Natale» un evento il cui nome parla di mercato e di Natale, «mercatino» i mercati contadini, delle pulci e dell’antiquariato, «festa o evento» tutto il resto che riguarda feste, cibo e tradizioni. Concerti, mostre, gare ed escursioni restano fuori.</p>` },
    { title: 'Perché alcuni eventi durano mesi', html: `<p>I mercati contadini settimanali e certe rassegne compaiono nei file con una data di inizio e una di fine lontane anche un anno. Per non riempire ogni fine settimana dello stesso mercato, la ricerca nasconde gli eventi che durano più di 45 giorni e li conta a parte; un clic li mostra. Quando un file elenca i giorni effettivi (in Emilia-Romagna e in Alto Adige succede spesso), contiamo solo quei giorni.</p>` },
    { title: 'Prima di partire', html: `<p>Il file regionale è l’ultima comunicazione del Comune o dell’associazione turistica, non una garanzia. Il maltempo, un’ordinanza o un cambio di programma possono spostare una sagra anche all’ultimo momento. Per le sagre lombarde il link «Programma» apre la scheda depositata dal Comune presso la Regione; per l’Emilia-Romagna il link porta alla scheda di Emilia-Romagna Turismo. Controlla lì orari, parcheggi e prenotazioni.</p><p>Ogni pagina riporta la data in cui abbiamo letto i file. Non promettiamo un aggiornamento automatico: rigeneriamo il calendario dai file ufficiali a mano, e la data cambia quando lo facciamo.</p>` },
  ],
  faqs: [
    { q: 'Come fate a sapere quali sagre ci sono questo weekend?', a: 'Leggiamo i file open data che Regione Lombardia, Open Data Hub Alto Adige, Regione Emilia-Romagna e Regione Puglia pubblicano con licenza libera, teniamo gli eventi che toccano il venerdì, il sabato o la domenica e li mostriamo con la fonte e la data di lettura. Nessuna sagra entra perché qualcuno ha pagato per comparire.' },
    { q: 'Perché nella mia regione non trovo niente?', a: 'Perché oggi solo quattro Regioni pubblicano un calendario di eventi aperto e aggiornato. Per Piemonte, Veneto, Toscana, Lazio, Campania e le altre non abbiamo trovato un file utilizzabile: per non mostrare feste vecchie o inventate, il sito non le copre. Le aggiungeremo appena una fonte regionale sarà disponibile.' },
    { q: 'Le date possono cambiare dopo la pubblicazione?', a: 'Sì. Il file regionale riporta l’ultima comunicazione del Comune o dell’organizzatore, che può modificare la data per maltempo, ordinanze o problemi organizzativi. In Lombardia le variazioni vengono comunicate ogni settimana. Prima di metterti in viaggio apri il programma o la scheda ufficiale indicati sotto ogni evento.' },
    { q: 'Che cosa significa «con cucina o ristoro»?', a: 'È l’informazione che il Comune lombardo indica nel campo sulla somministrazione di alimenti e bevande: sì o no. Se c’è il sì, alla sagra si mangia o si beve sul posto, in uno stand o in una tensostruttura. Le altre Regioni non lo indicano nei loro file, quindi il filtro funziona solo in Lombardia.' },
    { q: 'Posso usare la mia posizione per cercare le sagre vicine?', a: 'Sì, nella pagina sagre vicino a me. La posizione viene chiesta dal browser solo se scegli «La mia posizione», è usata nel tuo dispositivo per calcolare la distanza in linea d’aria e non viene inviata a noi né salvata. In alternativa scegli una delle città elencate.' },
    { q: 'Quando escono le sagre del 2027?', a: 'In Lombardia i Comuni comunicano alla Regione il calendario dell’anno successivo fra il 15 ottobre e il 15 dicembre, quindi la maggior parte delle date 2027 arriva a metà dicembre 2026. Alcune sono già nel file oggi. In Alto Adige ed Emilia-Romagna le date compaiono man mano che le associazioni turistiche le caricano.' },
    { q: 'Organizzo una sagra: come faccio a comparire?', a: 'Non serve scriverci né pagare. Se la festa si tiene in Lombardia su area pubblica, è il Comune a comunicarla alla Regione con l’applicativo regionale, e da lì arriva nel nostro calendario alla lettura successiva. In Alto Adige ed Emilia-Romagna l’evento va inserito tramite l’associazione turistica o l’ente del turismo locale.' },
  ],
};

const en: HomeText = {
  title: 'Sagre This Weekend in Italy: Official Regional Calendar',
  description: 'Sagre this weekend and in the coming months in Lombardy, South Tyrol and Emilia-Romagna, from the regions’ open data files: dates, town, programme, source.',
  h1: 'Sagre this weekend in Italy, from official regional calendars',
  intro: 'Italian sagre this weekend near you, taken from the files that municipalities and regions publish as open data: choose a region, a period and the kind of festival, and the calendar updates below.',
  resume: `Over the weekend from ${rngEn()} the official files list ${nWe} sagre, village festivals and markets: ${nWeAa} in South Tyrol, ${nWeLom} in Lombardy and the rest in Emilia-Romagna and Apulia. A sagra is a local food or harvest festival, usually run by the town or a volunteer association. This calendar does not rely on organisers sending in their events, as almost every sagre site does, but on regional open data: in Lombardy each municipality must report its sagre and fairs on public land to the Region, and the regional file holds ${lomTot} of them, ${lomFut} still to come and ${lom27} already set for 2027. South Tyrol comes from the Open Data Hub, Emilia-Romagna from the regional tourism board, Apulia from its tourism observatory. Every listing says which file it comes from and when we read it; for the other sixteen regions we have found no open, current file, and we do not make them up.`,
  facts: [],
  listsTitle: 'Every page of the calendar',
  foldTitle: 'How to read the sagre calendar',
  why: (h) => `
<h2>Sagre this weekend: where the dates come from</h2>
<p>Search for Italian sagre and you mostly land on lists filled in by the organisers themselves, who pay to be shown first or upload their event when they remember. The result is festivals that are already over, last year’s dates and whole villages missing. We work the other way round: we start from the files the regions publish on ${h.src('datigov', 'dati.gov.it')} and on their own portals, and keep only what still has a date ahead.</p>
<p>Lombardy is the strongest source. Its regional trade law (regional law 6/2010, article 18 bis) requires every municipality to report to the Region the sagre and fairs held on public land: by 15 December for the following year, then weekly for changes. The Region publishes the lot in the file ${h.src('lom', '“Sagre e fiere su area pubblica”')} under a CC0 licence. For each event the file gives the town, the address, the hours, the organiser and whether food and drink are served: of the ${lomFut} upcoming Lombard events, ${lomRis} serve food.</p>
${tabRegioni(h)}
<p>South Tyrol’s dates come from the ${h.src('odh', 'Open Data Hub')}, where the tourist associations upload Christmas markets, village feasts, Törggelen wine evenings and Krampus parades, each released under CC0. For Emilia-Romagna we use the ${h.src('er', 'list of active tourism events')} published by APT Servizi for the Region, for Apulia the file ${h.src('pug', '“Cosa fare in Puglia”')}. Those two are CC BY 4.0, so every page credits them.</p>
${h.mini('weekend')}
<h2>What this site does</h2>
<p>The search at the top works out in your browser what is on in a given period: today, tomorrow, this weekend (Friday to Sunday, because many sagre open on Friday evening), the next one, the next thirty days or any month up to December 2027. You can narrow it to sagre, Christmas markets, markets or fairs only, or to Lombard festivals that serve food. To search around a town, use ${h.a('vicino', 'sagre near me')}; to check whether a market is open on a given day, use ${h.a('natale-aperto', 'the “open today?” check')}.</p>
<p>In December the calendar climbs to ${nDic} events, against ${nWe} this weekend: it is the month of Christmas markets (we count ${nNat} that run for at least three days) and of the Saint Lucy, Immaculate Conception and New Year’s Eve street parties. There are already ${n27} dates for 2027, and the number will grow in mid-December, when Lombard municipalities close their filings for the new year.</p>
${tabProvince(h)}
<p>The province of Brescia dominates the Lombard file: many of its municipalities also report parish-club feasts, torchlight processions and Alpine-regiment evenings that elsewhere stay off the list. Milan, the city of Bergamo and Como barely appear, because their events do not go through this procedure.</p>`,
  sections: (h) => [
    { title: 'Why not every region is here', html: `<p>A sagra is organised at town level, but only a few regions collect and publish the calendar in an open format. We went through the catalogues on ${h.src('datigov', 'dati.gov.it')} on ${h.day(K.LETTO_IL)}: Umbria publishes an events file, but its latest dates are from 2023 (${h.src('umbria', 'catalogue entry')}); the Marche have a file with few upcoming events and no sagre; Trentino has municipal files frozen in 2019. Using them would mean showing festivals that are over. So the site covers Lombardy, South Tyrol, Emilia-Romagna and a small part of Apulia today, and says so on every page.</p><p>When a region publishes a current calendar we add it, with its source and licence. Submissions from individual organisers are not accepted: we cannot check them and we do not want to become one more paid noticeboard.</p>` },
    { title: 'Sagra, fiera, festa, mercatino: the difference', html: `<p>In the Lombard file the municipality picks one of two types: <strong>sagra</strong>, an event that celebrates a local product or tradition, often with food served; <strong>fiera</strong>, an extraordinary street market on public land tied to a feast day or a saint, with travelling stallholders. We report the municipality’s choice as it is, even when it calls a parish-club party a sagra. In the other files the category is ours: “Christmas market” for an event whose name mentions both a market and Christmas, “market” for farmers’, flea and antiques markets, “festival or event” for everything else about feasts, food and traditions. Concerts, exhibitions, races and hikes are left out.</p>` },
    { title: 'Why some events last for months', html: `<p>Weekly farmers’ markets and some seasonal programmes appear in the files with a start and an end date up to a year apart. So that the same market does not fill every weekend, the search hides events longer than 45 days and counts them separately; one click shows them. When a file lists the actual days (common in Emilia-Romagna and South Tyrol), only those days count.</p>` },
    { title: 'Before you set off', html: `<p>The regional file is the latest filing by the municipality or the tourist association, not a guarantee. Bad weather, a local order or a change of plan can move a sagra at short notice. For Lombard sagre the “Programme” link opens the sheet the municipality filed with the Region; for Emilia-Romagna it leads to the regional tourism listing. Check hours, parking and bookings there.</p><p>Every page shows the date we read the files. We promise no automatic updates: we rebuild the calendar from the official files by hand, and the date changes when we do.</p>` },
  ],
  faqs: [
    { q: 'How do you know which sagre are on this weekend?', a: 'We read the open data files that the Lombardy Region, the Open Data Hub South Tyrol, the Emilia-Romagna Region and the Apulia Region publish under open licences, keep the events that touch the Friday, Saturday or Sunday, and show each one with its source and the date we read it. No sagra is listed because someone paid for it.' },
    { q: 'Why is there nothing in my region?', a: 'Because only four regions currently publish an open, current events calendar. For Piedmont, Veneto, Tuscany, Lazio, Campania and the others we have found no usable file: rather than show old or invented festivals, the site leaves them out. We will add them as soon as a regional source exists.' },
    { q: 'Can dates change after they are published?', a: 'Yes. The regional file holds the latest filing by the municipality or organiser, who can move the date because of weather, a local order or organisational problems. Lombard municipalities report changes weekly. Before you travel, open the programme or official listing linked under each event.' },
    { q: 'What does “with food served” mean?', a: 'It is what the Lombard municipality enters in the food and drink field of its filing: yes or no. A yes means you can eat or drink on site, at a stand or under a marquee. The other regions do not record it in their files, so the filter only works in Lombardy.' },
    { q: 'Can I use my location to find nearby sagre?', a: 'Yes, on the sagre near me page. Your browser asks for your location only if you choose “My location”; it is used on your device to work out straight-line distances and is never sent to us or stored. Otherwise pick one of the listed towns.' },
    { q: 'When will the 2027 sagre be published?', a: 'Lombard municipalities report the following year’s calendar to the Region between 15 October and 15 December, so most 2027 dates arrive in mid-December 2026. Some are already in the file today. In South Tyrol and Emilia-Romagna dates appear as the tourist associations upload them.' },
    { q: 'I organise a sagra: how do I get listed?', a: 'There is no need to write to us or pay. If the festival is held on public land in Lombardy, the municipality reports it to the Region through the regional application, and it reaches this calendar at our next read. In South Tyrol and Emilia-Romagna the event goes in through the local tourist association or tourism board.' },
  ],
};

export const HOME: Record<Lang, HomeText> = { it, en };
export const HOME_WEEKEND = W;
