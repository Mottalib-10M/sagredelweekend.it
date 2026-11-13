/** Réglages de départ du moteur de recherche, fixés par chaque page. */
import type { Regione } from '../../lib/engine/eventi';

export type Periodo = 'weekend' | 'prossimo' | 'oggi' | 'domani' | '7' | '30' | `m${string}` | 'a2027';
export type Cosa = 'tutto' | 'feste' | 'natale' | 'mercati' | 'fiere' | 'ristoro' | 'tartufo';
export interface Preset {
  periodo?: Periodo;
  regione?: Regione | '';
  cosa?: Cosa;
  /** Montre le choix de la ville et du rayon (page « vicino a me »). */
  vicino?: boolean;
  citta?: string;
  raggio?: number;
}
