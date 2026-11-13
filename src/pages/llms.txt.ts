/** llms.txt (RECETTE §21), généré depuis le registre des pages et les fichiers lus. */
import { PAGES } from '../lib/pages';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS } from '../i18n/nav';
import { KIT as K } from '../lib/kit';
export function GET() {
  const per = (r: string) => K.EVENTI.filter((e) => e.r === r).length;
  const lines = [
    `# ${SITE_NAMES.it}`, '',
    `> Calendar of Italian sagre (local food festivals), village fairs, feasts and Christmas markets, in Italian and English, built only from regional open data read on ${K.LETTO_IL}: Lombardy Region "Sagre e fiere su area pubblica" (CC0, filed by municipalities under regional law 6/2010; ${K.FONTI.lom.righe} rows read, ${per('lom')} upcoming), South Tyrol Open Data Hub events (CC0; ${per('aa')} kept), Emilia-Romagna Region tourism events by APT Servizi (CC BY 4.0; ${per('er')} kept) and Apulia "Cosa fare in Puglia" (CC BY 4.0; ${per('pug')} kept). ${K.EVENTI.length} events in total. Other regions publish no open, current calendar and are not covered. Search by weekend, month, region, type or distance from a town runs in the browser. Every listing shows its source file and reading date. Independent site by Radif Partners; no tickets, paid listings or affiliate links. Last updated ${LAST_UPDATED}.`, '',
    '## Search / Ricerca', `- [Sagre questo weekend](${SITE_URL}${route('home', 'it')})`, `- [Sagre this weekend](${SITE_URL}${route('home', 'en')})`, '',
    ...GROUPS.flatMap((g) => [`## ${g.label.en} / ${g.label.it}`, ...PAGES.filter((p) => p.group === g.id).flatMap((p) => [
      `- [${p.it.nav}](${SITE_URL}${route(p.id, 'it')}): ${p.it.card}`,
      `- [${p.en.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.en.card}`,
    ]), '']),
    '## About', `- [Metodo](${SITE_URL}${route('method', 'it')})`, `- [Method](${SITE_URL}${route('method', 'en')})`, `- [Chi siamo](${SITE_URL}${route('about', 'it')})`, `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
