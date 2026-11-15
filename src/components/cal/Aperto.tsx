/**
 * « Il mercatino è aperto ? » : un mercatino di Natale dei file regionali, un giorno → aperto o chiuso, e fra quanti
 * giorni apre o chiude. Premier rendu = jour du build (RECETTE §17.5), jour réel lu après l'hydratation.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { EVENTI, stato, addDays, weekday, giorniTra, NOME_REGIONE, OGGI, type Regione } from '../../lib/engine/eventi';
import { readParams, str, updateURL } from '../../lib/url-state';
import { giornoLungo, quando } from './Trova';
import { orarioScheda } from '../../lib/engine/ricerca';

type Lang = 'it' | 'en';
const L = {
  it: { mercatino: 'Mercatino di Natale', giorno: 'Giorno', aperto: 'Aperto', chiuso: 'Chiuso', oggi: 'oggi', domani: 'domani', sabato: 'sabato', domenica: 'domenica',
    chiude: (n: number) => (n === 0 ? 'Ultimo giorno' : `Chiude fra ${n} ${n === 1 ? 'giorno' : 'giorni'}`), apre: (n: number) => `Apre fra ${n} ${n === 1 ? 'giorno' : 'giorni'}`, finito: 'Edizione finita',
    date: 'Date', ore: 'Orario dichiarato', dove: 'Dove', nota: 'Date dal file regionale; orari e chiusure dei singoli giorni (24, 25 e 31 dicembre) vanno verificati sul sito del mercatino.', alcuni: 'aperto solo in alcuni giorni', vuoto: 'Nessun mercatino di Natale nei file per questa regione.' },
  en: { mercatino: 'Christmas market', giorno: 'Day', aperto: 'Open', chiuso: 'Closed', oggi: 'today', domani: 'tomorrow', sabato: 'Saturday', domenica: 'Sunday',
    chiude: (n: number) => (n === 0 ? 'Last day' : `Closes in ${n} ${n === 1 ? 'day' : 'days'}`), apre: (n: number) => `Opens in ${n} ${n === 1 ? 'day' : 'days'}`, finito: 'This edition is over',
    date: 'Dates', ore: 'Declared hours', dove: 'Where', nota: 'Dates from the regional file; hours and closures on single days (24, 25 and 31 December) should be checked on the market’s own website.', alcuni: 'open on certain days only', vuoto: 'No Christmas market in the files for this region.' },
};
const oggiRoma = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());

interface Props { lang: Lang; regione?: Regione | ''; scelto?: string; idPrefix?: string }

export default function Aperto({ lang, regione = '', scelto, idPrefix = 'a' }: Props) {
  const t = L[lang];
  const mercatini = useMemo(() => EVENTI.filter((e) => e.t === 'natale' && (!regione || e.r === regione) && giorniTra(e.dal, e.al) >= 2)
    .sort((a, b) => a.c.localeCompare(b.c) || a.n.localeCompare(b.n)), [regione]);
  const def = scelto && mercatini.some((e) => e.id === scelto) ? scelto : mercatini[0]?.id ?? '';
  const [oggi, setOggi] = useState<string>(OGGI);
  const [id, setId] = useState(def);
  const [g, setG] = useState('0');
  useEffect(() => {
    const d = oggiRoma(); if (d > OGGI) setOggi(d);
    const u = readParams(window.location.search);
    const m = str(u, 'm', def); if (mercatini.some((e) => e.id === m)) setId(m);
    setG(str(u, 'g', '0'));
  }, []);
  if (!mercatini.length) return <p className="rounded-lg bg-navy-50 p-4 text-sm text-navy-700">{t.vuoto}</p>;
  const w = weekday(oggi);
  const giorni: Array<[string, string]> = [
    ['0', t.oggi], ['1', t.domani],
    [String(w <= 5 ? 5 - w : 6), `${t.sabato} ${giornoLungo(addDays(oggi, w <= 5 ? 5 - w : 6), lang).replace(/^\S+\s/, '')}`],
    [String(6 - w), `${t.domenica} ${giornoLungo(addDays(oggi, 6 - w), lang).replace(/^\S+\s/, '')}`],
    ...['12-08', '12-24', '12-26', '12-31', '01-06'].map((md): [string, string] => {
      const y = md.startsWith('01') ? +oggi.slice(0, 4) + (oggi.slice(5) > '01-06' ? 1 : 0) : +oggi.slice(0, 4) + (oggi.slice(5) > '12-31' ? 1 : 0);
      const iso = `${y}-${md}`;
      return [String(giorniTra(oggi, iso)), giornoLungo(iso, lang)];
    }).filter(([k]) => +k > 1),
  ];
  const visti = new Set<string>(); const opzGiorni = giorni.filter(([k]) => (visti.has(k) ? false : (visti.add(k), true))).map(([value, label]) => ({ value, label }));
  if (!opzGiorni.some((o) => o.value === g)) opzGiorni.push({ value: g, label: giornoLungo(addDays(oggi, +g), lang) });
  const e = mercatini.find((x) => x.id === id) ?? mercatini[0];
  const giorno = addDays(oggi, +g);
  const s = stato(e, giorno);
  const riga = s.aperto ? t.chiude(s.traGiorni) : s.traGiorni >= 0 ? t.apre(s.traGiorni) : t.finito;
  return (
    <div className="rounded-xl border border-accent-200 bg-white p-4 shadow-sm sm:p-5">
      <form onSubmit={(ev) => ev.preventDefault()} className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
        <SelectField id={`${idPrefix}-mercatino`} label={t.mercatino} value={e.id} options={mercatini.map((x) => ({ value: x.id, label: `${x.c} · ${lang === 'en' && x.en ? x.en : x.n}` }))} onChange={(v) => { setId(v); updateURL({ m: v, g }); }} />
        <SelectField id={`${idPrefix}-giorno`} label={t.giorno} value={g} options={opzGiorni} onChange={(v) => { setG(v); updateURL({ m: e.id, g: v }); }} />
      </form>
      <div data-resultat aria-live="polite" className="mt-4 rounded-lg bg-navy-50 p-4">
        <p className="text-sm font-medium text-navy-600">{giornoLungo(giorno, lang)} · {e.c}</p>
        <p className={`mt-1 text-3xl font-bold ${s.aperto ? 'text-accent-800' : 'text-navy-900'}`}>{s.aperto ? t.aperto : t.chiuso}</p>
        <p className="mt-1 text-base font-medium text-navy-800">{riga}</p>
        <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
          <tr><td className="py-1.5 pr-3 text-navy-600">{t.date}</td><td className="py-1.5 text-right text-navy-900">{quando(e, lang)}{e.g ? ` (${t.alcuni})` : ''}</td></tr>
          {orarioScheda(e, lang) && <tr><td className="py-1.5 pr-3 text-navy-600">{t.ore}</td><td className="py-1.5 text-right text-navy-900">{orarioScheda(e, lang)}</td></tr>}
          <tr><td className="py-1.5 pr-3 text-navy-600">{t.dove}</td><td className="py-1.5 text-right text-navy-900">{e.c} ({NOME_REGIONE[e.r][lang]})</td></tr>
        </tbody></table>
        <p className="mt-2 text-xs text-navy-500">{t.nota}</p>
      </div>
    </div>
  );
}
