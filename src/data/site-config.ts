/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://sagredelweekend.it";
export const SITE_NAMES: Record<string, string> = {"it": "Sagre del Weekend", "en": "Sagre del Weekend"};
// Partie du nom affichée en couleur dans l'en-tête (RECETTE §10.3), « » pour aucune.
export const BRAND_ACCENT = "Weekend";
export const LANG_TAGS: Record<string, string> = {"it": "it-IT", "en": "en-IT"};
/** Nombres et dates : italien pour /it/, anglais britannique pour /en/ (RECETTE §4.1). */
export const NUM_TAGS: Record<string, string> = { it: 'it-IT', en: 'en-GB', 'it-IT': 'it-IT', 'en-IT': 'en-GB' };
export const OG_LOCALES: Record<string, string> = {"it": "it_IT", "en": "en_GB"};
export const LOCALE_TAG = 'it-IT';
export const CURRENCY = 'EUR';
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
export const LAST_UPDATED = '2026-11-13';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"it": "Editore indipendente di un calendario di sagre, fiere e mercatini di Natale costruito sugli open data delle Regioni: Lombardia, Alto Adige, Emilia-Romagna e Puglia, con la fonte e la data su ogni scheda", "en": "Independent publisher of a calendar of Italian food festivals (sagre), fairs and Christmas markets built on regional open data from Lombardy, South Tyrol, Emilia-Romagna and Apulia, with the source and date on every listing"};
export const AUTHOR_DESC: Record<string, string> = {"it": "Radif Partners scarica gli open data pubblicati dalle Regioni: il calendario delle sagre e fiere che i Comuni lombardi devono comunicare alla Regione (legge regionale 6/2010, licenza CC0), gli eventi dell’Alto Adige dell’Open Data Hub (CC0) e quelli di Emilia-Romagna Turismo (CC BY 4.0). Teniamo solo le date a venire, scriviamo su ogni scheda da quale file viene e quando l’abbiamo letto, e calcoliamo nel browser che cosa c’è questo fine settimana vicino a te. Non siamo un Comune né una Pro Loco, non vendiamo visibilità e non chiediamo dati di contatto.", "en": "Radif Partners downloads the open data published by Italian regions: the calendar of sagre and fairs that Lombardy’s municipalities must file with the Region (regional law 6/2010, CC0 licence), South Tyrol’s events from the Open Data Hub (CC0) and Emilia-Romagna Tourism’s events (CC BY 4.0). We keep only upcoming dates, write on every listing which file it comes from and when we read it, and work out in your browser what is on this weekend near you. We are not a municipality or a Pro Loco, we sell no visibility and ask for no contact details."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"it": ["Sagre e fiere su area pubblica in Lombardia (LR 6/2010 art. 18 bis)", "Mercatini di Natale in Alto Adige ed Emilia-Romagna", "Sagre del tartufo, della castagna e del vino", "Calendari regionali degli eventi in open data"], "en": ["Sagre and fairs on public land in Lombardy (regional law 6/2010)", "Christmas markets in South Tyrol and Emilia-Romagna", "Truffle, chestnut and wine festivals", "Regional open-data event calendars in Italy"]};
export const CONTACT_EMAIL = "contatti@sagredelweekend.it";
export const THEME_COLOR = '#0B6B3A';
export const LOGO_SYMBOL = 'SW';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime : 'none' pour tous les sites (RECETTE §15.6, décision de l'éditeur du 2026-10-06) :
 *  aucun bandeau ; Clarity chargé en mode sans cookie (consentv2 denied) ; GA4 avec cookies si GA4_ID.
 *  'opt-in' / 'notice' ne servent plus qu'aux sites anciens qui les portent encore. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
/** Propriété Google Analytics 4 (décision de l'éditeur du 2026-10-17, RECETTE §15.6) : GA4 normal,
 *  avec cookies _ga / _ga_<ID> (390 jours), sans bandeau, publicité refusée. Créée par
 *  `seo-platform/scripts/create-ga4.ts accounts/372759688` (RECETTE §15.3, étape 15), puis
 *  pages légales régénérées : `python3 scripts/gen-legal-pages.py .`. Vide = pas de GA4. */
export const GA4_ID = 'G-43X1JRS45B';
/** Projet Microsoft Clarity (compte amradif), chargé sans cookie. Vide = aucune mesure. */
export const CLARITY_ID = 'zdgdt7yakd';
export const INDEXNOW_KEY = 'c58d18c480a058ca557cd6b5fa0ae9f2';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',
  legalForm: '',  // vide : comme sur les autres sites du portefeuille (calendarioponti.it, bonusisee.it)
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "Francia / France",
  phone: '',                 // ligne de contact publiée
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "Partita IVA / TVA",
  vatNumber: '',             // laisser vide si non assujetti
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub Pages (GitHub, Inc.)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city'];

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;
