import type { Locale } from './routes';
const it = {
  updatedOn: 'Aggiornato il', editorialPolicy: 'Politica editoriale', contactLabel: 'Contatti', reviewedBy: 'A cura di',
  skipToContent: 'Vai al contenuto', mainNav: 'Navigazione principale', breadcrumbLabel: 'Percorso', breadcrumbHome: 'Home', menuOpen: 'Apri il menu',
  faqTitle: 'Domande frequenti', relatedCalculators: 'Per continuare', sourcesTitle: 'Fonti ufficiali di questa pagina', writtenBy: 'A cura di',
  asOf: 'Calendario', lastUpdated: 'file regionali riletti il',
  footerValidated: 'Fonti: open data di Regione Lombardia (CC0), Open Data Hub Alto Adige (CC0), Regione Emilia-Romagna e Regione Puglia (CC BY 4.0)',
  footerBrowser: 'La ricerca gira nel tuo browser · nessun account · la posizione, se la chiedi, non lascia il dispositivo',
  footerDisclaimer: 'Sito indipendente pubblicato da Radif Partners, senza legami con le Regioni, i Comuni o le Pro Loco. Le date sono indicative e possono cambiare: prima di partire controlla sul sito del Comune o degli organizzatori.',
  footerLicence: 'Contiene dati di Regione Emilia-Romagna (APT Servizi) e Regione Puglia rilasciati con licenza <a href="https://creativecommons.org/licenses/by/4.0/deed.it" rel="nofollow noopener" target="_blank">CC BY 4.0</a>, e dati di Regione Lombardia e Open Data Hub Alto Adige in CC0; dati selezionati e adattati da Radif Partners.',
  footerPopular: 'Strumenti',
  notFound: 'A questo indirizzo non c’è nessuna pagina. Nella home trovi le sagre di questo fine settimana nelle regioni coperte.',
  readMore: 'Continua a leggere',
};
const en: typeof it = {
  updatedOn: 'Updated on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Prepared by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Common questions', relatedCalculators: 'Keep going', sourcesTitle: 'Official sources for this page', writtenBy: 'Prepared by',
  asOf: 'Calendar', lastUpdated: 'regional files re-read on',
  footerValidated: 'Sources: open data from the Lombardy Region (CC0), Open Data Hub South Tyrol (CC0), the Emilia-Romagna and Apulia Regions (CC BY 4.0)',
  footerBrowser: 'The search runs in your browser · no account · your location, if you share it, never leaves your device',
  footerDisclaimer: 'Independent site published by Radif Partners, not affiliated with any Italian region, municipality or Pro Loco. Dates are for guidance only and can change: check the municipality’s or organisers’ website before you set off.',
  footerLicence: 'Contains data from the Emilia-Romagna Region (APT Servizi) and the Apulia Region released under the <a href="https://creativecommons.org/licenses/by/4.0/" rel="nofollow noopener" target="_blank">CC BY 4.0</a> licence, and data from the Lombardy Region and Open Data Hub South Tyrol under CC0; selected and adapted by Radif Partners.',
  footerPopular: 'Tools',
  notFound: 'Nothing lives at this address. The home page lists the sagre on this weekend in the covered regions.',
  readMore: 'Read more',
};
const ALL = { it, en };
export function t(lang: Locale) { return ALL[lang] ?? it; }
