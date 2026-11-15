/**
 * Un seul chiffre par objet (testeurs naïfs du 2026-11-14) : 71 dans l'outil puis 86 dans le texte pour le même
 * week-end (l'outil partait du jour du build, le texte du jour de lecture), 34, 79 et 95 mercatini (trois définitions),
 * 7 puis « sono 8 » (décembre dans l'outil, saison dans le texte), 295 contre 300 (marchés longs ôtés d'un côté).
 * Ici : le chiffre que montre l'outil de chaque page se retrouve dans son texte, les régions s'additionnent, et le
 * HTML construit montre le même nombre dans l'outil et dans la réponse repliée.
 */
import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { EVENTI, OGGI, LETTO_IL, REGIONI, lungo, type Regione } from '../src/lib/engine/eventi';
import { contaStrumento, ricerca, periodoParole, orario, orarioScheda, prossimaData, schemaApertura, nomeVisibile, intervallo } from '../src/lib/engine/ricerca';
import { PAGES } from '../src/lib/pages';
import { HOME, nNatHome } from '../src/content/home';
import CITTA from '../src/data/citta.json';

const contiene = (testo: string, n: number) => new RegExp(`(^|[^\\d.,])${n}([^\\d]|$)`).test(testo);
const presetStato = (p: NonNullable<(typeof PAGES)[number]['tool']['preset']>) => {
  const c = p.vicino ? (CITTA as Array<{ n: string; lat: number; lon: number }>).find((x) => x.n === p.citta) : undefined;
  return { periodo: p.periodo ?? 'weekend', regione: p.regione ?? '', cosa: p.cosa ?? 'tutto', vicino: c ? { lat: c.lat, lon: c.lon, km: p.raggio ?? 30 } : undefined };
};

describe('un seul chiffre par objet', () => {
  it('le jour de référence est le même pour les textes et pour le premier rendu des outils', () => {
    expect(OGGI >= LETTO_IL).toBe(true);
    expect(EVENTI.every((e) => e.al >= OGGI)).toBe(true);
  });

  for (const p of PAGES.filter((x) => x.tool.kind === 'trova')) {
    it(`${p.id} : le chiffre de l'outil est écrit dans la réponse (it et en)`, () => {
      const n = contaStrumento(presetStato(p.tool.preset ?? {}));
      expect(contiene(p.it.resume, n), `${p.id} it : ${n} absent`).toBe(true);
      expect(contiene(p.en.resume, n), `${p.id} en : ${n} absent`).toBe(true);
    });
  }

  it('accueil : le week-end de la réponse est celui de l’outil, et les régions s’additionnent', () => {
    const n = contaStrumento({ periodo: 'weekend' });
    expect(contiene(HOME.it.resume, n)).toBe(true);
    expect(contiene(HOME.en.resume, n)).toBe(true);
    const somma = REGIONI.reduce((s, r) => s + contaStrumento({ periodo: 'weekend', regione: r }), 0);
    expect(somma).toBe(n);
  });

  it('mercatini di Natale : accueil = page nationale = somme des pages régionales', () => {
    const naz = contaStrumento({ periodo: 'natale', cosa: 'natale' });
    expect(nNatHome).toBe(naz);
    const reg = (REGIONI as Regione[]).reduce((s, r) => s + contaStrumento({ periodo: 'natale', cosa: 'natale', regione: r }), 0);
    expect(reg).toBe(naz);
  });

  it('calendrier 2027 : seulement ce qui commence en 2027, sans marché hebdomadaire', () => {
    const l = ricerca({ periodo: 'a2027' }).lista;
    expect(l.every((x) => (x.e.g?.[0] ?? x.e.dal) >= '2027-01-01')).toBe(true);
    expect(l.some((x) => /settimanal/i.test(x.e.n))).toBe(false);
  });

  it('pas de doublon satellite (« Inaugurazione… », « …stand gastronomici ») à côté de son mercatino', () => {
    const lana = EVENTI.filter((e) => e.c === 'Lana' && /polvere di stelle/i.test(e.n) && e.dal !== e.al);
    expect(lana.filter((e) => /inaugurazione|stand gastronom/i.test(e.n))).toHaveLength(0);
  });

  it('les marchés hebdomadaires déclarés comme tels sont comptés à part', () => {
    const merano = EVENTI.find((e) => /grande mercato settimanale di merano/i.test(e.n));
    if (merano) expect(lungo(merano)).toBe(true);
  });
});

describe('mots', () => {
  it('période en toutes lettres', () => {
    expect(periodoParole('2026-11-14', '2026-11-15', 'it')).toBe('sabato 14 e domenica 15 novembre');
    expect(periodoParole('2026-11-13', '2026-11-15', 'it')).toBe('venerdì 13, sabato 14 e domenica 15 novembre');
    expect(periodoParole('2026-11-14', '2027-01-06', 'it')).toBe('dal 14 novembre 2026 al 6 gennaio 2027');
    expect(periodoParole('2026-11-14', '2026-11-14', 'en')).toBe('Saturday 14 November');
    expect(intervallo('natale', '2026-11-14')).toEqual({ dal: '2026-11-14', al: '2027-01-06' });
  });
  it('horaires : 23:59 n’est pas une heure de début', () => {
    expect(orario('23:59', 'it')).toBe('');
    expect(orario('08:00 – 23:59', 'it')).toBe('dalle 08:00');
    expect(orario('10:00 – 18:00', 'it')).toBe('ore 10:00 – 18:00');
  });
  it('jours d’ouverture dits en mots, jamais « 29 giorni »', () => {
    const g: string[] = [];
    for (let d = Date.UTC(2026, 10, 20); d <= Date.UTC(2027, 0, 6); d += 864e5) {
      const iso = new Date(d).toISOString().slice(0, 10); const w = new Date(d).getUTCDay();
      if (w === 0 || w === 6 || iso === '2026-12-08') g.push(iso);
    }
    const e = { id: 'x', n: 'Mercatino', t: 'natale', dal: g[0], al: g[g.length - 1], g, c: 'Piacenza', r: 'er', src: 'er' } as const;
    expect(schemaApertura({ ...e, g: [...g] }, 'it')).toBe('solo sabato e domenica, più 8 dic');
  });
  it('titres génériques distingués par la commune', () => {
    expect(nomeVisibile({ id: 'x', n: 'Mercatini di Natale', t: 'natale', dal: '2026-12-06', al: '2026-12-06', c: 'Sarezzo', r: 'lom', src: 'lom' }, 'it')).toBe('Mercatini di Natale – Sarezzo');
  });
});

describe('HTML construit (après npm run build)', () => {
  const dist = join(__dirname, '..', 'dist');
  const pagina = (rel: string) => readFileSync(join(dist, rel), 'utf8');
  const testo = (html: string) => html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;| | /g, ' ').replace(/\s+/g, ' ');
  it.skipIf(!existsSync(join(dist, 'index.html')))('le chiffre de l’outil (premier rendu) est dans la réponse repliée, sur chaque page', () => {
    const fichiers = ['index.html', ...PAGES.filter((p) => p.tool.kind === 'trova').map((p) => `${p.it.slug}/index.html`)];
    let viste = 0;
    for (const f of fichiers) {
      const chemin = existsSync(join(dist, 'it', f)) ? join('it', f) : existsSync(join(dist, f)) ? f : null; // / = renvoi vers /it/
      if (!chemin) continue;
      const html = pagina(chemin);
      const m = html.match(/data-resultat[^>]*>\s*<p[^>]*>(\d+)/);
      expect(m, `${f} : outil sans chiffre`).toBeTruthy();
      const clamp = html.match(/<div class="clamp[^"]*">([\s\S]*?)<\/div>/);
      expect(clamp, `${f} : réponse repliée absente`).toBeTruthy();
      expect(contiene(testo(clamp![1]), +m![1]), `${f} : ${m![1]} absent de la réponse`).toBe(true);
      viste++;
    }
    expect(viste).toBeGreaterThan(5);
  });
});

// 3e tour (2026-11-14) : l'horaire de la soirée d'ouverture n'est plus présenté comme celui de la saison ;
// une recherche vide donne la prochaine date du fichier.
describe('orario di apertura e prossima data', () => {
  it('Bolzano : orario abituale + serata di apertura etichettata', () => {
    const e = { id: 'x', n: 'Mercatino di Natale di Bolzano', t: 'natale', dal: '2026-11-26', al: '2027-01-06', ora: '10:00 – 22:30', ora1: '17:00 – 22:30', orv: 1, c: 'Bolzano', r: 'aa', src: 'odh' } as const;
    const s = orarioScheda(e as never, 'it');
    expect(s).toMatch(/^di solito ore 10:00 – 22:30 · giorno d’apertura \(.*26.*\) ore 17:00 – 22:30$/);
    expect(orarioScheda({ ...e, ora1: undefined, orv: undefined } as never, 'it')).toBe('ore 10:00 – 22:30');
  });
  it('prossimaData : dopo il periodo, coerente con la ricerca', () => {
    for (const r of REGIONI) {
      const d = prossimaData({ periodo: 'weekend', regione: r });
      if (!d) continue;
      expect(d > intervallo('weekend', OGGI).al).toBe(true);
      expect(contaStrumento({ periodo: `m${d.slice(0, 7)}`, regione: r })).toBeGreaterThan(0);
    }
  });
});
