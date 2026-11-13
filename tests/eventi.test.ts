import { describe, it, expect } from 'vitest';
import { weekend, attivoIl, nelPeriodo, stato, km, lungo, cerca, weekday, addDays, giorniTra, EVENTI, LETTO_IL, type Evento } from '../src/lib/engine/eventi';
import { intervallo } from '../src/components/cal/Trova';

const ev = (o: Partial<Evento>): Evento => ({ id: 'x', n: 'Test', t: 'sagra', dal: '2026-12-01', al: '2026-12-10', c: 'Paese', r: 'lom', src: 'lom', ...o } as Evento);

describe('dates', () => {
  it('weekday: 0 = lundi', () => {
    expect(weekday('2026-11-16')).toBe(0);
    expect(weekday('2026-11-13')).toBe(4);
    expect(weekday('2026-11-15')).toBe(6);
  });
  it('weekend du vendredi au dimanche, à partir du jour même', () => {
    expect(weekend('2026-11-13')).toEqual({ dal: '2026-11-13', al: '2026-11-15' });
    expect(weekend('2026-11-15')).toEqual({ dal: '2026-11-15', al: '2026-11-15' }); // dimanche : il reste aujourd'hui
    expect(weekend('2026-11-16')).toEqual({ dal: '2026-11-20', al: '2026-11-22' });
    expect(weekend('2026-11-13', 1)).toEqual({ dal: '2026-11-20', al: '2026-11-22' });
  });
  it('addDays et giorniTra traversent les années', () => {
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
    expect(giorniTra('2026-11-26', '2027-01-06')).toBe(41);
  });
  it('intervallo du mois en cours part du jour', () => {
    expect(intervallo('m2026-11', '2026-11-13')).toEqual({ dal: '2026-11-13', al: '2026-11-30' });
    expect(intervallo('m2026-12', '2026-11-13')).toEqual({ dal: '2026-12-01', al: '2026-12-31' });
    expect(intervallo('a2027', '2026-11-13')).toEqual({ dal: '2027-01-01', al: '2027-12-31' });
  });
});

describe('ouverture', () => {
  const sab = ev({ dal: '2026-12-05', al: '2026-12-13', g: ['2026-12-05', '2026-12-06', '2026-12-12', '2026-12-13'] });
  it('les jours déclarés comptent seuls', () => {
    expect(attivoIl(sab, '2026-12-06')).toBe(true);
    expect(attivoIl(sab, '2026-12-09')).toBe(false);
    expect(nelPeriodo(sab, '2026-12-07', '2026-12-11')).toBe(false);
    expect(nelPeriodo(sab, '2026-12-07', '2026-12-12')).toBe(true);
  });
  it('stato : prochain jour ouvert, fin de saison', () => {
    expect(stato(sab, '2026-12-09')).toEqual({ aperto: false, traGiorni: 3, prossimo: '2026-12-12' });
    expect(stato(sab, '2026-12-12').aperto).toBe(true);
    expect(stato(sab, '2026-12-12').traGiorni).toBe(1);
    expect(stato(sab, '2026-12-20').traGiorni).toBe(-1);
    expect(stato(sab, '2026-12-01')).toEqual({ aperto: false, traGiorni: 4, prossimo: '2026-12-05' });
  });
  it('lungo : marché hebdomadaire sur des mois, pas un marché de Noël de six semaines', () => {
    expect(lungo(ev({ dal: '2026-01-01', al: '2026-12-31' }))).toBe(true);
    const settimanale = Array.from({ length: 20 }, (_, i) => addDays('2026-11-13', i * 7));
    expect(lungo(ev({ dal: '2026-11-13', al: settimanale[19], g: settimanale }))).toBe(true);
    expect(lungo(ev({ dal: '2026-11-26', al: '2027-01-06' }))).toBe(false);
  });
});

describe('distance et recherche', () => {
  it('km : Bolzano–Merano environ 24 km à vol d’oiseau', () => {
    const d = km({ lat: 46.4983, lon: 11.3548 }, { lat: 46.6713, lon: 11.1594 });
    expect(d).toBeGreaterThan(20);
    expect(d).toBeLessThan(28);
  });
  it('cerca respecte région, types et rayon', () => {
    const f = { dal: LETTO_IL, al: '2027-12-31' };
    const tutti = cerca(f).length;
    expect(tutti).toBe(EVENTI.filter((e) => nelPeriodo(e, f.dal, f.al)).length);
    expect(cerca({ ...f, regione: 'aa' }).every((x) => x.e.r === 'aa')).toBe(true);
    expect(cerca({ ...f, tipi: ['natale'] }).every((x) => x.e.t === 'natale')).toBe(true);
    const vicini = cerca({ ...f, vicino: { lat: 46.4983, lon: 11.3548, km: 10 } });
    expect(vicini.length).toBeGreaterThan(0);
    expect(vicini.every((x) => (x.km ?? 99) <= 10)).toBe(true);
  });
  it('données : aucun événement terminé avant la lecture, sources connues', () => {
    expect(EVENTI.length).toBeGreaterThan(500);
    expect(EVENTI.every((e) => e.al >= LETTO_IL && e.dal <= e.al)).toBe(true);
    expect(EVENTI.every((e) => ['lom', 'odh', 'er', 'pug'].includes(e.src))).toBe(true);
    expect(EVENTI.every((e) => !e.g || e.g.every((d) => d >= e.dal && d <= e.al))).toBe(true);
  });
  it('Bolzano déclare la fermeture le 25 décembre', () => {
    const bz = EVENTI.find((e) => /mercatino di natale di bolzano/i.test(e.n))!;
    expect(stato(bz, '2026-12-25').aperto).toBe(false);
    expect(stato(bz, '2026-12-24').aperto).toBe(true);
  });
});
