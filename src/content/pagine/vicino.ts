import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import CITTA from '../../data/citta.json';

const W = K.weekend(K.OGGI, 0);
const vicini = (nome: string, km: number) => {
  const c = (CITTA as Array<{ n: string; lat: number; lon: number }>).find((x) => x.n === nome)!;
  return K.cerca({ ...W, vicino: { lat: c.lat, lon: c.lon, km }, senzaLunghi: true }).length;
};
const CAMPIONE = ['Brescia', 'Monza', 'Sondrio', 'Bolzano', 'Merano', 'Bologna', 'Parma', 'Rimini'];
const righe = CAMPIONE.map((c) => [c, vicini(c, 15), vicini(c, 30), vicini(c, 60)]);
const nCitta = (CITTA as unknown[]).length;
const bs30 = vicini('Brescia', 30), bz30 = vicini('Bolzano', 30), bo30 = vicini('Bologna', 30);

export default definePage({
  id: 'vicino', group: 'weekend', order: 2,
  tool: { kind: 'trova', preset: { vicino: true, citta: 'Brescia', raggio: 30, periodo: 'weekend' } },
  related: ['oggi', 'lombardia', 'alto-adige'],
  sources: ['lom', 'odh', 'er'],
  it: {
    slug: 'sagre-vicino-a-me', nav: 'Sagre vicino a me', card: 'Scegli una città o la tua posizione e il raggio in km.',
    title: 'Sagre vicino a me questo weekend: cerca per città e km',
    description: 'Sagre vicino a me: scegli la città o la tua posizione e un raggio in km, e vedi le sagre, le fiere e i mercatini del weekend nei file ufficiali delle Regioni.',
    h1: 'Sagre vicino a me questo weekend, entro i km che vuoi',
    intro: 'Sagre vicino a me questo weekend: scegli una città o condividi la posizione, poi il raggio in chilometri e il periodo.',
    resume: `Per trovare le sagre vicino a me la ricerca misura la distanza in linea d’aria fra il centro della città scelta e il punto in cui il file regionale colloca l’evento. Nel weekend dal ${K.dl(W.dal, 'it', false)} al ${K.dl(W.al, 'it', false)}, entro 30 km, c’erano ${bs30} eventi attorno a Brescia, ${bz30} attorno a Bolzano e ${bo30} attorno a Bologna. Le città proposte sono ${nCitta}, scelte fra quelle con eventi nei file; con «La mia posizione» il browser usa invece il GPS o la rete del tuo dispositivo, senza inviarci nulla. Un raggio di 30 km corrisponde in pianura a una mezz’ora di auto, in montagna a molto di più: in Alto Adige la strada fra due valli vicine in linea d’aria può essere lunga il doppio.`,
    faqs: [
      { q: 'Come funziona «La mia posizione»?', a: 'Il browser ti chiede il permesso di leggere la posizione del dispositivo. Se accetti, le coordinate restano nel tuo telefono o computer e servono solo a calcolare la distanza da ogni evento. Non vengono inviate al sito né salvate. Se rifiuti, scegli una città dall’elenco: il risultato è lo stesso, misurato dal centro di quella città.' },
      { q: 'Perché la mia città non è nell’elenco?', a: 'L’elenco contiene solo città che hanno eventi nei file regionali letti, perché il loro centro è calcolato dalle coordinate di quegli eventi e non da una banca dati esterna. Se la tua città manca, scegli la più vicina e allarga il raggio, oppure usa la tua posizione.' },
      { q: 'La distanza è quella in auto?', a: 'No, è la distanza in linea d’aria. In pianura la strada è di solito più lunga del 20-30 per cento, in montagna anche del doppio, perché si passa per le valli. Per una gita di un giorno conviene partire da un raggio di 30 o 40 chilometri e poi controllare il percorso su una mappa.' },
    ],
    body: (h) => `
<h2>Sagre vicino a me questo weekend, attorno alle città principali</h2>
<p>La tabella conta gli eventi del weekend dal ${h.day(W.dal)} al ${h.day(W.al)} entro tre raggi diversi, per otto città delle regioni coperte. Mercati settimanali e stagioni lunghe sono esclusi, come nella ricerca predefinita.</p>
${h.table(['Città', 'Entro 15 km', 'Entro 30 km', 'Entro 60 km'], righe, `Eventi nel weekend dal ${h.day(W.dal)} al ${h.day(W.al)}, per distanza in linea d’aria`, ['l', 'r', 'r', 'r'])}
<p>Il salto fra 15 e 60 km dice quanto conviene spostarsi. Attorno a Brescia le sagre sono fitte perché i Comuni della provincia comunicano alla Regione più eventi di tutte le altre province lombarde; attorno a Bolzano e Merano pesano le feste e i mercati delle associazioni turistiche, spesso in paesi a meno di venti chilometri.</p>
${h.mini('weekend', { d: { reg: 0, w: 0 } })}
<h2>Fuori dalle regioni coperte</h2>
<p>Se abiti a Torino, Roma o Napoli la ricerca non trova nulla: per Piemonte, Lazio e Campania non disponiamo di un file aperto e aggiornato delle sagre, quindi il calendario non le copre. Non mostriamo eventi presi da altri siti perché non potremmo dire da dove vengono né quando sono stati confermati. In quei casi il riferimento resta la Pro Loco del paese o l’ufficio turistico.</p>
<p>Prima di partire guarda la riga «Programma» sotto l’evento: per la Lombardia porta al programma comunicato dal Comune, per l’Emilia-Romagna alla scheda di Emilia-Romagna Turismo.</p>`,
  },
  en: {
    slug: 'sagre-near-me', nav: 'Sagre near me', card: 'Pick a town or share your location and a radius in km.',
    title: 'Sagre Near Me This Weekend: Search by Town and Distance',
    description: 'Sagre near me: pick a town or share your location and a radius in km, then see the weekend’s sagre, fairs and markets in the Italian regions’ official files.',
    h1: 'Sagre near me this weekend, within the distance you choose',
    intro: 'Sagre near me this weekend: pick a town or share your location, then the radius in kilometres and the period.',
    resume: `To find sagre near me, the search measures the straight-line distance between the centre of the chosen town and the point where the regional file places the event. On the weekend from ${K.dl(W.dal, 'en', false)} to ${K.dl(W.al, 'en', false)}, within 30 km, there were ${bs30} events around Brescia, ${bz30} around Bolzano and ${bo30} around Bologna. The ${nCitta} towns offered are those with events in the files; “My location” uses your device’s GPS or network instead, and nothing is sent to us. A 30 km radius is about half an hour by car on the plain and much more in the mountains: in South Tyrol the road between two valleys that look close on a map can be twice as long. A sagra is a village food festival, usually run by the local Pro Loco association.`,
    faqs: [
      { q: 'How does “My location” work?', a: 'Your browser asks for permission to read the device’s location. If you agree, the coordinates stay on your phone or computer and are only used to work out the distance to each event. They are neither sent to the site nor stored. If you decline, pick a town from the list: the result is the same, measured from that town’s centre.' },
      { q: 'Why is my town not in the list?', a: 'The list only holds towns that have events in the regional files we read, because their centre is computed from those events’ coordinates rather than from an outside database. If your town is missing, choose the nearest one and widen the radius, or use your location.' },
      { q: 'Is the distance by road?', a: 'No, it is the straight-line distance. On the plain the road is usually 20 to 30 per cent longer, and in the mountains up to twice as long because routes follow the valleys. For a day trip, start with a 30 or 40 kilometre radius and then check the route on a map.' },
    ],
    body: (h) => `
<h2>Sagre near me this weekend, around the main towns</h2>
<p>The table counts events on the weekend from ${h.day(W.dal)} to ${h.day(W.al)} within three radii, for eight towns in the covered regions. Weekly markets and long seasons are left out, as in the default search.</p>
${h.table(['Town', 'Within 15 km', 'Within 30 km', 'Within 60 km'], righe, `Events on the weekend of ${h.day(W.dal)} to ${h.day(W.al)}, by straight-line distance`, ['l', 'r', 'r', 'r'])}
<p>The jump between 15 and 60 km shows how far it pays to drive. Around Brescia sagre are dense because the province’s municipalities file more events with the Region than any other Lombard province; around Bolzano and Merano the count is driven by tourist associations’ feasts and markets, often in villages less than twenty kilometres away.</p>
${h.mini('weekend', { d: { reg: 0, w: 0 } })}
<h2>Outside the covered regions</h2>
<p>If you live in Turin, Rome or Naples the search finds nothing: we have no open, current file of sagre for Piedmont, Lazio or Campania, so the calendar does not cover them. We show no events taken from other websites because we could not say where they come from or when they were confirmed. There, the village Pro Loco or tourist office remains the reference.</p>
<p>Before setting off, look at the “Programme” line under the event: for Lombardy it leads to the programme filed by the municipality, for Emilia-Romagna to the Emilia-Romagna Tourism listing.</p>`,
  },
});
