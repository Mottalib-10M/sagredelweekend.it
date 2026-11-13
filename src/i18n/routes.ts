import { makeRouter, type RouteDef } from './routes-core';
import { PAGES } from '../lib/pages';
/** Italien d'abord, anglais sur toutes les pages (RECETTE §3 : langue locale + anglais). */
export const LOCALES = ['it', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'it';
const R = (id: string, it: string, en: string, noindex = false) => ({ id, paths: { it: `/it/${it}/`, en: `/en/${en}/` }, ...(noindex ? { noindex } : {}) });
const CORE: RouteDef<Locale>[] = [
  { id: 'home', paths: { it: '/it/', en: '/en/' } },
  R('method', 'metodo', 'method'),
  R('about', 'chi-siamo', 'about'),
  R('widget', 'widget', 'widget', true),
  R('contact', 'contatti', 'contact', true),
  R('editorial', 'politica-editoriale', 'editorial-policy', true),
  R('privacy', 'privacy', 'privacy', true),
  R('terms', 'note-legali', 'legal-notice', true),
  R('cookies', 'cookie', 'cookies', true),
];
const P = (p: (typeof PAGES)[number]): RouteDef<Locale> => ({ id: p.id, paths: { it: `/it/${p.it.slug}/`, en: `/en/${p.en.slug}/` } });
export const ROUTES: RouteDef<Locale>[] = [CORE[0], ...PAGES.map(P), ...CORE.slice(1)];
export const { NOINDEX_PATHS, route, hasRoute, altPaths } = makeRouter(LOCALES, ROUTES);
