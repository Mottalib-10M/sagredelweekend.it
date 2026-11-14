/** Réglages de départ du moteur de recherche, fixés par chaque page. */
import type { Regione } from '../../lib/engine/eventi';
import type { Periodo, Cosa } from '../../lib/engine/ricerca';

export type { Periodo, Cosa };
export interface Preset {
  periodo?: Periodo;
  regione?: Regione | '';
  cosa?: Cosa;
  /** Montre le choix de la ville et du rayon (page « vicino a me »). */
  vicino?: boolean;
  citta?: string;
  raggio?: number;
}
