import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { tabEventi, tabRegioni } from '../../lib/blocchi';

const G = K.OGGI;
const nOggi = K.conta({ dal: G, al: G, senzaLunghi: true });
const nDom = K.conta({ dal: K.addDays(G, 1), al: K.addDays(G, 1), senzaLunghi: true });
const nLunghi = K.cerca({ dal: G, al: G }).filter((x) => K.lungo(x.e)).length;

export default definePage({
  id: 'oggi', group: 'weekend', order: 1,
  tool: { kind: 'trova', preset: { periodo: 'oggi' } },
  related: ['vicino', 'mercati', 'fiere'],
  sources: ['lom', 'odh', 'er', 'pug'],
  it: {
    slug: 'sagre-oggi', nav: 'Sagre oggi', card: 'Eventi, fiere e mercatini aperti oggi, dai file delle Regioni.',
    title: 'Sagre oggi: feste, fiere e mercatini aperti oggi in Italia',
    description: 'Sagre oggi in Lombardia, Alto Adige, Emilia-Romagna e Puglia: feste, fiere e mercatini aperti oggi secondo i file ufficiali delle Regioni, con orari e fonte.',
    h1: 'Sagre oggi: cosa è aperto adesso',
    intro: 'Le sagre di oggi e degli altri eventi in calendario: la ricerca parte dalla data del tuo dispositivo e legge i file delle Regioni.',
    resume: `Il giorno dell’ultimo aggiornamento di questa pagina, ${K.dl(G, 'it')}, le sagre, feste, fiere e mercatini in corso erano ${nOggi}, e il giorno dopo ${nDom}. Il numero cambia ogni giorno, per questo la ricerca qui sopra usa la data del tuo telefono o del tuo computer e non quella di questa pagina. Contiamo un evento «di oggi» se la data di oggi cade fra l’inizio e la fine indicati nel file regionale; quando il file elenca i giorni effettivi, come spesso fanno Emilia-Romagna e Alto Adige, oggi deve essere fra quei giorni. I mercati settimanali e le rassegne che durano mesi (oggi ${nLunghi}) sono nascosti e contati a parte, così l’elenco resta fatto di feste vere. Gli orari compaiono quando il Comune o l’organizzatore li hanno scritti nel file.`,
    faqs: [
      { q: 'Perché il numero di sagre oggi cambia rispetto a ieri?', a: 'Perché ogni giorno alcune feste finiscono e altre cominciano: il conteggio prende solo gli eventi che hanno oggi fra la data di inizio e quella di fine, o fra i giorni effettivi quando il file li elenca. Il calcolo usa la data del tuo dispositivo, quindi a mezzanotte l’elenco passa al giorno dopo.' },
      { q: 'Le sagre di oggi sono aperte anche di sera?', a: 'Dipende dall’evento. Per le sagre lombarde il file riporta l’ora di inizio e di fine dichiarata dal Comune, e la mostriamo accanto alla data. Molte feste aprono nel tardo pomeriggio e restano aperte fino a sera, soprattutto il venerdì e il sabato. Se l’orario manca, controlla il programma ufficiale.' },
      { q: 'Cosa vuol dire «solo alcuni giorni» accanto a un evento?', a: 'Che il file regionale elenca i singoli giorni in cui l’evento si tiene, per esempio solo i fine settimana di un mese. In quel caso la ricerca lo mostra oggi solo se oggi è uno di quei giorni, anche se la data di oggi è compresa fra l’inizio e la fine della manifestazione.' },
    ],
    body: (h) => `
<h2>Sagre oggi nelle quattro regioni coperte</h2>
<p>Un evento entra nell’elenco di oggi solo se una Regione lo ha pubblicato in un file aperto. Per questo la ricerca copre ${h.a('lombardia', 'la Lombardia')}, ${h.a('alto-adige', 'l’Alto Adige')}, ${h.a('emilia-romagna', 'l’Emilia-Romagna')} e pochi eventi pugliesi, e non il resto d’Italia. La tabella dice com’era la giornata del ${h.day(G)}, il giorno della lettura.</p>
${tabRegioni(h, { dal: G, al: G, senzaLunghi: true }, h.T(`Eventi in corso il ${h.day(G)}, per regione`, `Events on ${h.day(G)}, by region`))}
<p>Il venerdì e il sabato sono i giorni più pieni: molte sagre lombarde durano un fine settimana e cominciano il venerdì sera, mentre in Alto Adige i mercati contadini e le serate di degustazione si spalmano anche in settimana. Se cerchi qualcosa per domani o per il weekend, cambia il campo «Quando» o apri ${h.a('home', 'le sagre di questo weekend')}.</p>
${h.mini('durata', { d: { reg: 0, mese: 0 } })}
<h2>Gli eventi del giorno della lettura</h2>
<p>Ecco i primi eventi in corso il ${h.day(G)}, così come li descrivono i file: la data, il nome scelto dal Comune o dall’associazione turistica, il paese e il tipo. È una fotografia: per oggi fa fede la ricerca in alto.</p>
${tabEventi(h, { dal: G, al: G, senzaLunghi: true }, h.T(`Eventi in corso il ${h.day(G)}`, `Events on ${h.day(G)}`), 20)}
<p>Un consiglio pratico: le sagre con stand gastronomici spesso chiudono la cucina prima della fine della serata. Se nel programma è scritto «su prenotazione» o «posti limitati», chiama prima l’organizzatore indicato nel programma del Comune.</p>`,
  },
  en: {
    slug: 'sagre-today', nav: 'Sagre today', card: 'Festivals, fairs and markets open today, from the regional files.',
    title: 'Sagre Today: Italian Festivals, Fairs and Markets Open Now',
    description: 'Sagre today in Lombardy, South Tyrol, Emilia-Romagna and Apulia: festivals, fairs and markets open today in the regions’ official files, with hours and source.',
    h1: 'Sagre today: what is on right now',
    intro: 'Today’s sagre and the other events on the calendar: the search starts from your device’s date and reads the regional files.',
    resume: `On the day this page was last updated, ${K.dl(G, 'en')}, ${nOggi} sagre, festivals, fairs and markets were running, and ${nDom} the next day. The number changes daily, which is why the search above uses the date on your phone or computer rather than the date of this page. An event counts as “today” when today falls between the start and end dates in the regional file; when the file lists the actual days, as Emilia-Romagna and South Tyrol often do, today must be one of those days. Weekly markets and programmes that run for months (${nLunghi} today) are hidden and counted separately, so the list stays made of real festivals. Hours appear when the municipality or organiser wrote them in the file. A sagra, for visitors new to Italy, is a village food or harvest festival run by the town or local volunteers.`,
    faqs: [
      { q: 'Why does the number of sagre today change from yesterday?', a: 'Because some festivals end and others begin every day: the count takes only events with today between their start and end date, or among their actual days when the file lists them. It uses your device’s date, so at midnight the list moves to the next day.' },
      { q: 'Are today’s sagre open in the evening?', a: 'It depends on the event. For Lombard sagre the file gives the start and end time declared by the municipality, and we show it next to the date. Many festivals open in the late afternoon and run into the evening, especially on Fridays and Saturdays. If no time is given, check the official programme.' },
      { q: 'What does “certain days only” next to an event mean?', a: 'It means the regional file lists the individual days the event is held, for example only the weekends of a month. The search then shows it today only if today is one of those days, even when today falls between the festival’s first and last date.' },
    ],
    body: (h) => `
<h2>Sagre today in the four covered regions</h2>
<p>An event makes today’s list only if a region has published it in an open file. That is why the search covers ${h.a('lombardia', 'Lombardy')}, ${h.a('alto-adige', 'South Tyrol')}, ${h.a('emilia-romagna', 'Emilia-Romagna')} and a few Apulian events, and not the rest of Italy. The table shows the day we read the files, ${h.day(G)}.</p>
${tabRegioni(h, { dal: G, al: G, senzaLunghi: true }, h.T(`Eventi in corso il ${h.day(G)}, per regione`, `Events on ${h.day(G)}, by region`))}
<p>Fridays and Saturdays are the busiest days: many Lombard sagre last one weekend and start on Friday evening, while South Tyrol’s farmers’ markets and tasting evenings spread across the week. For tomorrow or the weekend, change the “When” field or open ${h.a('home', 'this weekend’s sagre')}.</p>
${h.mini('durata', { d: { reg: 0, mese: 0 } })}
<h2>Events on the day we read the files</h2>
<p>Here are the first events running on ${h.day(G)}, as the files describe them: the date, the name chosen by the municipality or tourist association, the town and the type. It is a snapshot: for today, rely on the search at the top.</p>
${tabEventi(h, { dal: G, al: G, senzaLunghi: true }, h.T(`Eventi in corso il ${h.day(G)}`, `Events on ${h.day(G)}`), 20)}
<p>A practical tip: sagre with food stands often close the kitchen before the evening ends. If the programme says “su prenotazione” (booking required) or “posti limitati” (limited places), call the organiser named in the municipality’s programme first.</p>`,
  },
});
