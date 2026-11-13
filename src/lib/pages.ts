/** Registre : chaque fichier de src/content/pagine est chargé ici. */
import type { PageDef } from './page-types';

const base = (file: string) => file.split('/').pop()!.replace(/\.ts$/, '');
const g = import.meta.glob<{ default: PageDef }>(['../content/pagine/*.ts', '!../content/pagine/_*.ts'], { eager: true });
export const PAGES: PageDef[] = Object.entries(g).map(([f, m]) => {
  if (m.default.id !== base(f)) throw new Error(`${f}: id "${m.default.id}" differs from the file name`);
  return m.default;
}).sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
export const pageById = (id: string) => PAGES.find((p) => p.id === id);
