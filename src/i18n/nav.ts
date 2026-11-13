import { route, hasRoute, type Locale } from './routes';
import { PAGES, pageById } from '../lib/pages';
import type { Group } from '../lib/page-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<Locale, Record<string, string>> = {
  it: { home: 'Sagre questo weekend', method: 'Metodo e fonti', about: 'Chi siamo', widget: 'Strumenti da incorporare', contact: 'Contatti', editorial: 'Politica editoriale', privacy: 'Privacy', terms: 'Note legali', cookies: 'Cookie' },
  en: { home: 'Sagre this weekend', method: 'Method and sources', about: 'About', widget: 'Embed the tools', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' },
};
/** `short` : intitulé du menu du haut (un ou deux mots, RECETTE §10.3) ; `label` : intitulé complet. */
export const GROUPS: Array<{ id: Group; label: Record<Locale, string>; short: Record<Locale, string> }> = [
  { id: 'weekend', label: { it: 'Questo weekend e oggi', en: 'This weekend and today' }, short: { it: 'Weekend', en: 'Weekend' } },
  { id: 'regioni', label: { it: 'Sagre per regione e per tipo', en: 'Sagre by region and type' }, short: { it: 'Regioni', en: 'Regions' } },
  { id: 'natale', label: { it: 'Mercatini di Natale', en: 'Christmas markets' }, short: { it: 'Natale', en: 'Christmas' } },
  { id: 'mesi', label: { it: 'Sagre mese per mese', en: 'Sagre month by month' }, short: { it: 'Mesi', en: 'Months' } },
];
export const label = (id: string, lang: Locale) => CORE[lang][id] ?? pageById(id)?.[lang]?.nav ?? id;
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id, lang) });
export const inGroup = (g: Group, lang: Locale): NavLink[] => PAGES.filter((p) => p.group === g && hasRoute(p.id, lang)).map((p) => link(p.id, lang));
export function navCategories(lang: Locale, short = true): NavCategory[] {
  return GROUPS.map((g) => ({ label: (short ? g.short : g.label)[lang], links: g.id === 'weekend' ? [link('home', lang), ...inGroup(g.id, lang)] : inGroup(g.id, lang) })).filter((c) => c.links.length);
}
export const navDirect = (_lang: Locale): NavLink[] => [];
export const footerColumns = (lang: Locale): NavCategory[] => {
  const site = { label: { it: 'Questo sito', en: 'This site' }[lang], links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) };
  return [
    { label: GROUPS[1].label[lang], links: inGroup('regioni', lang) },
    { label: GROUPS[2].label[lang], links: inGroup('natale', lang) },
    { label: `${GROUPS[0].label[lang]} · ${GROUPS[3].label[lang]}`, links: [link('home', lang), ...inGroup('weekend', lang), ...inGroup('mesi', lang)] },
    site,
  ];
};
/** Les outils, à un clic de chaque page (RECETTE §18.2). */
export const popularLinks = (lang: Locale): NavLink[] => [link('home', lang), ...inGroup('weekend', lang)];
