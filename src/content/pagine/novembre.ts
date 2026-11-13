import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { tabRegioni, tabEventi } from '../../lib/blocchi';

const G = K.OGGI;
const NOV = { dal: G, al: '2026-11-30', senzaLunghi: true };
const nNov = K.conta(NOV);
const conta = (re: RegExp) => K.conta({ ...NOV, testo: re });
const nMartino = conta(/martin/i);
const nRingr = conta(/ringraziament/i);
const nSpiedo = conta(/spied|casonc|polent|zupp|stinco|cicciol|fasulin/i);
const nTartufo = conta(/tartuf|truffle/i);
const nKrampus = conta(/krampus/i);
const W = (i: number) => K.weekend(K.addDays(G, 7 * i), 0);
const righeW = [0, 1, 2].map((i) => W(i)).filter((w) => w.dal <= '2026-11-30').map((w) => [w, K.conta({ ...w, senzaLunghi: true, tipi: ['sagra', 'festa', 'fiera'] }), K.conta({ ...w, tipi: ['natale'] })] as const);

export default definePage({
  id: 'novembre', group: 'mesi', order: 30,
  tool: { kind: 'trova', preset: { periodo: 'm2026-11' } },
  related: ['tartufo', 'dicembre', 'fiere'],
  sources: ['lom', 'odh', 'er'],
  it: {
    slug: 'sagre-novembre-2026', nav: 'Sagre di novembre 2026', card: 'San Martino, tartufo, spiedo, Krampus: tutto novembre 2026.',
    title: 'Sagre novembre 2026: San Martino, tartufo, spiedo e Krampus',
    description: 'Sagre novembre 2026 nei file delle Regioni: San Martino e Ringraziamento, sagre del tartufo, spiedo e polenta, sfilate dei Krampus, weekend per weekend.',
    h1: 'Sagre di novembre 2026, weekend per weekend',
    intro: 'Le sagre di novembre 2026 ancora in calendario dal giorno della lettura dei file regionali.',
    resume: `Le sagre di novembre 2026 nei file regionali, dal ${K.dl(G, 'it', false)} alla fine del mese, sono ${nNov} fra sagre, feste, fiere e mercatini, senza contare i mercati settimanali. Novembre è il mese della fine dei raccolti: in Lombardia ${nRingr} feste del Ringraziamento degli agricoltori e ${nMartino} eventi legati a San Martino, l’11 novembre, con fiere e polentate; ${nSpiedo} sagre ruotano attorno a un piatto, come lo spiedo bresciano, i casoncelli, le zuppe o la polenta. In Emilia-Romagna è la stagione del tartufo bianco, con ${nTartufo} feste ancora aperte. In Alto Adige la fine del mese porta ${nKrampus} sfilate dei Krampus e l’apertura dei mercatini di Natale il 26 e il 27 novembre. Il fine settimana è il momento giusto: quasi tutte le feste lombarde si tengono il sabato e la domenica.`,
    faqs: [
      { q: 'Che cos’è la festa del Ringraziamento in Lombardia?', a: 'È la festa con cui le comunità agricole ringraziano per il raccolto dell’anno, spesso una domenica di novembre, con la benedizione dei trattori e dei mezzi agricoli, una messa e spesso un pranzo. Nel file lombardo compare come sagra comunicata dal Comune, con l’orario della giornata.' },
      { q: 'Quali sagre del cibo ci sono a novembre?', a: 'Nel file lombardo ci sono soprattutto spiedi, casoncellate, polentate, zuppe e la festa del cicciolo di Gonzaga; in Emilia-Romagna le fiere del tartufo, del formaggio di fossa e dell’olio nuovo. Per vederle tutte imposta «Sagre, feste e fiere» nel campo «Che cosa» e il mese di novembre.' },
      { q: 'Quando aprono i mercatini di Natale a novembre?', a: 'In Alto Adige i grandi mercatini di Bolzano, Merano e Bressanone aprono giovedì 26 novembre 2026, Brunico e Vipiteno il 27. In Lombardia i primi mercatini di un giorno sono la domenica 22 novembre a Prata Camportaccio e Primaluna. In Emilia-Romagna Modena apre il 20 novembre.' },
    ],
    body: (h) => `
<h2>Sagre novembre 2026: i fine settimana</h2>
${h.table(['Weekend', 'Sagre, feste e fiere', 'Mercatini di Natale'], righeW.map(([w, a, b]) => [`${h.dm(w.dal)} – ${h.dm(w.al)}`, a, b]), 'Eventi nei fine settimana di novembre 2026', ['l', 'r', 'r'])}
<p>L’ultimo weekend di novembre cambia volto: le feste del raccolto lasciano spazio ai primi mercatini di Natale e alle sfilate dei Krampus in Alto Adige.</p>
${h.mini('weekend', { d: { reg: 0, w: 1 } })}
<h2>Novembre regione per regione</h2>
${tabRegioni(h, NOV, `Eventi dal ${h.day(G)} al 30 novembre 2026, senza mercati settimanali`)}
<h2>Le sagre gastronomiche del mese</h2>
${tabEventi(h, { ...NOV, tipi: ['sagra'] }, 'Sagre di novembre 2026 nei file regionali', 25)}
<p>Molte sagre lombarde di novembre sono pranzi o cene su prenotazione organizzati da alpini, pensionati, protezione civile o oratorio, a volte con asporto: se il nome dice «spiedo solidale» o «pranzo», chiama prima gli organizzatori.</p>`,
  },
  en: {
    slug: 'sagre-november-2026', nav: 'Sagre in November 2026', card: 'St Martin, truffles, spit roasts, Krampus: all of November 2026.',
    title: 'Sagre November 2026: St Martin, Truffles and Krampus',
    description: 'Sagre November 2026 in the regional files: St Martin and harvest feasts, truffle sagre, spit roast and polenta festivals, Krampus parades, weekend by weekend.',
    h1: 'Sagre in November 2026, weekend by weekend',
    intro: 'Sagre in November 2026 still in the calendar from the day the regional files were read.',
    resume: `Sagre in November 2026 in the regional files, from ${K.dl(G, 'en', false)} to the end of the month, number ${nNov} across sagre, feasts, fairs and markets, not counting weekly markets. November marks the end of the harvest: in Lombardy ${nRingr} farmers’ thanksgiving feasts (Ringraziamento) and ${nMartino} events for St Martin on 11 November, with fairs and polenta lunches; ${nSpiedo} sagre centre on one dish, such as Brescia’s spiedo spit roast, casoncelli pasta, soups or polenta. In Emilia-Romagna it is white truffle season, with ${nTartufo} festivals still open. In South Tyrol the end of the month brings ${nKrampus} Krampus parades and the opening of the Christmas markets on 26 and 27 November. Weekends are the time to go: almost all Lombard feasts are held on Saturday and Sunday.`,
    faqs: [
      { q: 'What is the Ringraziamento feast in Lombardy?', a: 'It is the feast at which farming communities give thanks for the year’s harvest, often on a Sunday in November, with a blessing of tractors and farm machinery, a mass and often a lunch. In Lombardy’s file it appears as a sagra filed by the municipality, with the day’s hours.' },
      { q: 'Which food sagre are on in November?', a: 'Lombardy’s file is mostly spit roasts, casoncelli dinners, polenta lunches, soups and Gonzaga’s pork crackling festival; Emilia-Romagna has truffle, fossa cheese and new olive oil fairs. To see them all, set “Sagre, festivals and fairs” in the “What” field and the month of November.' },
      { q: 'When do Christmas markets open in November?', a: 'In South Tyrol the big Bolzano, Merano and Bressanone markets open on Thursday 26 November 2026, Brunico and Vipiteno on the 27th. In Lombardy the first one-day markets are on Sunday 22 November at Prata Camportaccio and Primaluna. In Emilia-Romagna Modena opens on 20 November.' },
    ],
    body: (h) => `
<h2>Sagre November 2026: the weekends</h2>
${h.table(['Weekend', 'Sagre, feasts and fairs', 'Christmas markets'], righeW.map(([w, a, b]) => [`${h.dm(w.dal)} – ${h.dm(w.al)}`, a, b]), 'Events on the weekends of November 2026', ['l', 'r', 'r'])}
<p>The last weekend of November changes character: harvest feasts give way to the first Christmas markets and to Krampus parades in South Tyrol.</p>
${h.mini('weekend', { d: { reg: 0, w: 1 } })}
<h2>November region by region</h2>
${tabRegioni(h, NOV, `Events from ${h.day(G)} to 30 November 2026, without weekly markets`)}
<h2>The month’s food sagre</h2>
${tabEventi(h, { ...NOV, tipi: ['sagra'] }, 'November 2026 sagre in the regional files', 25)}
<p>Many Lombard November sagre are lunches or dinners by booking run by the Alpini, pensioners’ groups, civil protection volunteers or the parish, sometimes with takeaway: if the name says “spiedo solidale” (charity spit roast) or “pranzo” (lunch), call the organisers first.</p>`,
  },
});
