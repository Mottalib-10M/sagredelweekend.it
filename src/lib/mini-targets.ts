/** Où mène le bouton d'un mini-simulateur : la page qui porte l'outil complet. */
import { route } from '../i18n/routes';
import type { Lang } from './format';
export const miniHref = (_kind: string, lang: Lang, _fallback: string) => route('home', lang);
