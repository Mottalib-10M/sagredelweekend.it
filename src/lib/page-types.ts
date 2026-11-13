/**
 * Une page = UN fichier de contenu : `src/content/pagine/<id>.ts`, version italienne (`it`) et anglaise (`en`)
 * côte à côte. Routes, menus, sitemap, hreflang, schémas et liens internes lisent ces fichiers et rien d'autre.
 */
import type { Kit } from './kit';
import type { Lang } from './format';
import type { Preset } from '../components/cal/preset';

export interface FAQ { q: string; a: string }
export interface MiniOpts { t?: string; d?: Record<string, number>; locked?: string[] }

export interface Helpers extends Kit {
  lang: Lang;
  /** Lien interne par id de page, dans la langue de la page. */
  a: (id: string, text: string) => string;
  /** Tableau ; les nombres sont formatés dans la langue, les chaînes insérées en HTML. */
  table: (headers: string[], rows: Array<Array<string | number>>, caption?: string, align?: Array<'l' | 'r'>) => string;
  /** Lien vers une source de params-2026.json (clé). */
  src: (key: string, text?: string) => string;
  ext: (url: string, text: string) => string;
  box: (title: string, html: string) => string;
  /** Mini-simulateur bâti sur lib/mini-specs.ts. */
  mini: (kind: string, opts?: MiniOpts) => string;
  n: (x: number, d?: number) => string; day: (iso: string) => string; my: (ym: string) => string;
  wday: (iso: string) => string; dm: (iso: string) => string;
  T: (it: string, en: string) => string;
}

export type Group = 'weekend' | 'regioni' | 'natale' | 'mesi';

export interface LangPage {
  slug: string;
  nav: string; card: string;
  /** 50 à 60 caractères, terme clé d'abord (RECETTE §11). */
  title: string;
  /** 150 à 160 caractères. */
  description: string;
  h1: string; intro: string;
  /** UN paragraphe de 120 mots ou plus : la réponse directe, chiffrée (RECETTE §21). */
  resume: string;
  faqs: FAQ[];
  body: (h: Helpers) => string;
}
export interface PageDef {
  id: string; group: Group; order: number;
  /** Outil en tête : le moteur de recherche (preset) ou « aperto » (mercatino aperto ?). */
  tool: { kind: 'trova' | 'aperto'; preset?: Preset };
  related: string[];
  sources: string[];
  it: LangPage; en: LangPage;
}
export const definePage = (p: PageDef): PageDef => p;
