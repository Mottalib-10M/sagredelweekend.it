import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { tabEventi } from '../../lib/blocchi';

const G = K.OGGI;
const RE_T = /tartuf|trüffel|truffle/i;
const tutti = K.cerca({ dal: G, al: '2027-12-31', testo: RE_T });
const nT = tutti.length;
const nER = tutti.filter((x) => x.e.r === 'er').length;
const nW = K.cerca({ ...K.weekend(G, 0), testo: RE_T }).length;
const ultimo = tutti.reduce((m, x) => (x.e.al > m ? x.e.al : m), G);
const nGiorni = tutti.filter((x) => x.e.g).length;

// Le chiffre de l'outil (30 jours), écrit en tête du texte avec sa période : un seul chiffre par objet.
const PRESET = { cosa: 'tartufo', periodo: '30' } as const;
const S30 = K.ricerca(PRESET);

export default definePage({
  id: 'tartufo', group: 'regioni', order: 13,
  tool: { kind: 'trova', preset: PRESET },
  related: ['emilia-romagna', 'novembre', 'vicino'],
  sources: ['er', 'lom'],
  it: {
    slug: 'sagra-del-tartufo', nav: 'Sagre del tartufo', card: 'Fiere e sagre del tartufo nei file regionali, con i giorni di apertura.',
    title: 'Sagra del tartufo: le fiere di novembre nei file regionali',
    description: 'Sagra del tartufo vicino a te: fiere e feste del tartufo in Emilia-Romagna e in Lombardia nei file ufficiali delle Regioni, con giorni di apertura e fonte.',
    h1: 'Sagra del tartufo: dove e in quali giorni',
    intro: 'Ogni sagra del tartufo presente nei file delle Regioni coperte, con i giorni in cui è aperta: scegli il periodo.',
    resume: `Nei prossimi 30 giorni, ${K.periodoParole(S30.dal, S30.al, 'it')}, gli eventi sul tartufo in calendario sono ${S30.lista.length}. Una sagra del tartufo nei file regionali è quasi sempre emiliano-romagnola: dal ${K.dl(G, 'it', false)} ne contiamo ${nT}, di cui ${nER} nell’elenco di APT Servizi, fra l’Appennino bolognese e reggiano, il Ferrarese e la Romagna. La stagione nel calendario finisce il ${K.dl(ultimo, 'it', false)}. Nel weekend della lettura erano aperte ${nW} feste. ${nGiorni} di queste fiere sono aperte solo in giorni precisi, di solito il sabato e la domenica: la ricerca le mostra solo in quei giorni. Le fiere più note d’Italia, come Alba in Piemonte, Acqualagna nelle Marche o San Miniato in Toscana, si tengono in regioni di cui non abbiamo un file aperto e aggiornato: non compaiono qui, e non le copiamo da altri siti senza una fonte ufficiale.`,
    faqs: [
      { q: 'Perché non trovo la fiera del tartufo di Alba?', a: 'Perché Alba è in Piemonte, e per il Piemonte non disponiamo di un file aperto e aggiornato degli eventi. Il sito pubblica solo eventi letti nei file regionali, con la fonte. Per Alba, Acqualagna o San Miniato fa fede il sito ufficiale della fiera o del Comune.' },
      { q: 'Il tartufo bianco si trova in Emilia-Romagna?', a: 'Sì. Il tartufo bianco pregiato si raccoglie anche nell’Appennino emiliano-romagnolo, per esempio nella valle del Bidente in Romagna, dove si tiene una delle sagre del file regionale. Le fiere di questa zona si concentrano fra ottobre e novembre, nella stagione di raccolta del bianco.' },
      { q: 'Le sagre del tartufo sono aperte tutti i giorni?', a: 'Spesso no. Molte durano tre o quattro fine settimana di fila e restano chiuse dal lunedì al venerdì. Quando il file regionale elenca i giorni, la ricerca ne tiene conto: se un evento non compare in un mercoledì, è perché quel giorno non è fra quelli dichiarati.' },
    ],
    body: (h) => `
<h2>Ogni sagra del tartufo in calendario</h2>
${tabEventi(h, { dal: G, al: '2027-12-31', testo: RE_T }, `Sagre e fiere del tartufo dal ${h.day(G)}`, 20)}
<p>Le date vanno lette come intervallo: la prima e l’ultima giornata della manifestazione. Una fiera che va dal 6 al 22 novembre con giorni precisi è aperta solo nei fine settimana compresi. La riga «Scheda ufficiale» sotto ogni evento della ricerca porta al programma su Emilia-Romagna Turismo.</p>
${h.mini('tartufo', { d: { mese: 0 } })}
<h2>Quando cercare una sagra del tartufo</h2>
<p>Nel calendario le fiere del tartufo si concentrano nell’autunno, fra la metà di ottobre e la fine di novembre, quando si raccoglie il tartufo bianco. Dopo, l’elenco resta vuoto fino all’anno seguente: le Pro Loco comunicano le date della nuova stagione in estate, quindi una ricerca sul 2027 fatta oggi trova poco o niente. Ripassa da settembre.</p>
<p>Se cerchi altro cibo d’autunno nelle stesse settimane, ${h.a('emilia-romagna', 'l’Emilia-Romagna')} ha le fiere del formaggio di fossa e dell’olio nuovo, e ${h.a('novembre', 'il calendario di novembre')} riunisce tutte le sagre del mese.</p>`,
  },
  en: {
    slug: 'truffle-festivals-italy', nav: 'Truffle festivals', card: 'Truffle fairs and sagre in the regional files, with opening days.',
    title: 'Truffle Festivals in Italy: November Fairs in Regional Data',
    description: 'Truffle festivals in Italy near you: the truffle fairs and feasts of Emilia-Romagna and Lombardy in the official regional files, with opening days and source.',
    h1: 'Truffle festivals in Italy: where and on which days',
    intro: 'Every truffle festival in the covered regions’ files, with the days it is open: choose the period.',
    resume: `In the next 30 days, ${K.periodoParole(S30.dal, S30.al, 'en')}, the calendar lists ${S30.lista.length} events about truffles. Truffle festivals in Italy’s regional open data are almost all in Emilia-Romagna: from ${K.dl(G, 'en', false)} we count ${nT}, ${nER} of them in APT Servizi’s list, across the Bologna and Reggio Apennines, the Ferrara area and Romagna. The calendar’s season ends on ${K.dl(ultimo, 'en', false)}. On the weekend we read the files, ${nW} were open. ${nGiorni} of these fairs open only on specific days, usually Saturday and Sunday: the search shows them on those days alone. Italy’s best-known fairs, such as Alba in Piedmont, Acqualagna in the Marche or San Miniato in Tuscany, are in regions for which we have no open, current file: they do not appear here, and we do not copy them from other websites without an official source.`,
    faqs: [
      { q: 'Why can’t I find the Alba truffle fair?', a: 'Because Alba is in Piedmont, and we have no open, current events file for Piedmont. The site only publishes events read in regional files, with their source. For Alba, Acqualagna or San Miniato, the fair’s or the town’s official website is the reference.' },
      { q: 'Is white truffle found in Emilia-Romagna?', a: 'Yes. The prized white truffle is also gathered in the Emilia-Romagna Apennines, for example in the Bidente valley in Romagna, home to one of the sagre in the regional file. Fairs in this area cluster in October and November, the white truffle season.' },
      { q: 'Are truffle festivals open every day?', a: 'Often not. Many run for three or four weekends in a row and stay closed Monday to Friday. When the regional file lists the days, the search follows them: if an event does not appear on a Wednesday, that day is not among those declared.' },
    ],
    body: (h) => `
<h2>Every truffle festival in the calendar</h2>
${tabEventi(h, { dal: G, al: '2027-12-31', testo: RE_T }, `Truffle sagre and fairs from ${h.day(G)}`, 20)}
<p>Read the dates as a range: the first and last day of the event. A fair running from 6 to 22 November with specific days is open only on the weekends in between. The “Official listing” line under each event in the search leads to the programme on Emilia-Romagna Tourism.</p>
${h.mini('tartufo', { d: { mese: 0 } })}
<h2>When to look for a truffle festival</h2>
<p>In the calendar, truffle fairs cluster in autumn, from mid-October to late November, when white truffles are gathered. After that the list stays empty until the next year: Pro Loco associations announce the new season’s dates in summer, so a search on 2027 made today finds little or nothing. Come back from September.</p>
<p>For other autumn food in the same weeks, ${h.a('emilia-romagna', 'Emilia-Romagna')} has the fossa cheese and new olive oil fairs, and ${h.a('novembre', 'the November calendar')} gathers every sagra of the month.</p>`,
  },
});
