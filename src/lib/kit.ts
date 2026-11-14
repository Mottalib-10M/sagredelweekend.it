/**
 * Trousse de rédaction : tout chiffre et toute date écrits dans une page viennent d'ici, jamais tapés à la main.
 *   K.P            paramètres et sources (params-2026.json)
 *   K.EVENTI …     moteur (engine/eventi.ts) : cerca, conta, perMese, weekend, topComuni, stato
 *   K.OGGI         jour de référence (build ou lecture des données) : textes ET premier rendu des outils comptent à partir de lui
 *   K.ricerca …    ce que montre l'outil (engine/ricerca.ts) : contaStrumento, periodoParole, eventiNelPeriodo
 */
import P from '../data/params-2026.json';
import FONTI from '../data/fonti-lette.json';
import * as E from './engine/eventi';
import * as R from './engine/ricerca';
import { LAST_UPDATED } from '../data/site-config';

/** Date en toutes lettres dans un texte : « venerdì 13 novembre 2026 » / « Friday 13 November 2026 ». */
const dl = (iso: string, lang: 'it' | 'en', wd = true) => new Date(`${iso}T12:00:00Z`).toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-GB', { ...(wd ? { weekday: 'long' as const } : {}), day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export const KIT = { P, FONTI, ...E, ...R, OGGI: E.OGGI, LETTO_IL: E.LETTO_IL, AGGIORNATO: LAST_UPDATED, dl };
export type Kit = typeof KIT;
