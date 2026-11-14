# Test naïf du 2026-11-14, testeur 2 : sagredelweekend.it

**Persona :** Italien(ne) de 24 ans, très à l'aise avec les apps, impatient(e) : s'il/si elle ne comprend pas en quelques secondes ce que la page lui apporte, il/elle ferme et retourne sur Google. Il/elle a cliqué sur le résultat « Sagre questo weekend: calendario ufficiale delle Regioni » parce qu'il/elle cherche une sagra pour ce week-end. Découverte sur téléphone.

## 1. Concept

**Après 5 s :** « Une liste des sagre de ce week-end. » Le titre « Sagre questo weekend, dai calendari ufficiali delle Regioni » colle exactement au résultat Google, et le bloc « sab 14 novembre – dom 15 novembre / 71 eventi » plus le début de la liste visible dès le premier défilement confirment que je suis au bon endroit. Pas besoin de cliquer pour avoir une réponse : très bon point.

**Après 2 min :** c'est un agenda de sagre, fiere et mercatini de Noël construit à partir des fichiers officiels des Régions, avec des filtres (région, période, type) et une fiche par événement (dates, horaires, commune, type, « con ristoro », lien « Scheda ufficiale » / « Programma (Comune) »). Il ne couvre que quelques régions (Lombardia, Alto Adige, Emilia-Romagna, un peu de Puglia).

**Clair ?** Oui pour le « quoi ». Moins pour le « où » : le site s'appelle « Sagre del Weekend » sans dire nulle part en haut que seules 3 ou 4 régions sont couvertes. « Tutte le regioni coperte » dans le menu déroulant est le seul indice ; si j'habite à Rome ou à Naples, je le découvre trop tard.
**Pour qui ?** Les gens du Nord (Lombardie, Haut-Adige, Émilie-Romagne) qui veulent sortir ce week-end ou préparer les marchés de Noël.
**Bénéfice concret :** une liste à jour, sans événements périmés, avec la source et un lien officiel pour vérifier. Les horaires et « con ristoro » sont très utiles pour décider vite.

## 2. « Tout le monde peut-il comprendre ? »

**Verdict : oui pour l'usage de base (lire la liste du week-end), non pour les chiffres.** On décroche à trois endroits :
- **Les chiffres ne concordent pas d'un bloc à l'autre** : « 71 eventi » (sab 14 – dom 15) en haut, puis « Eventi 13 novembre – 15 novembre 86 » juste en dessous, puis « 86 » dans « Un fine settimana a scelta ». Même chose pour Noël : « Mercatini di Natale 34 » sur l'accueil, « 79 eventi » puis « sono 95 » sur la page Mercatini 2026. On se demande lequel est le bon.
- **Le jargon des sources** : « open data », « CC BY 4.0 », « CC0 », « Open Data Hub (NOI Techpark) », « letto il 13 nov 2026 » répété sous chaque événement. Pour un jeune de 24 ans, ça fait bruit administratif.
- **Les phrases d'outil** : « cambi una cifra per vedere il suo risultato » alors qu'il n'y a aucun chiffre à changer (que des menus déroulants), et passage au « Lei » alors que tout le reste du site me tutoie (« scegli », « vicino a te »).

## 3. Parcours écran par écran

| Écran | Compris / coince |
|---|---|
| 01-accueil-1 | **Compris.** Titre = promesse Google. Les trois menus « Regione / Quando / Che cosa » sont limpides. « 71 eventi » rassure. Petite gêne : « 13 mercati settimanali o stagioni lunghe nascosti · Mostrali » (c'est quoi une « stagione lunga » ?). |
| 01-accueil-suite1 à suite4 | **Compris.** Liste nette : nom, dates, commune, type. « dal 10 ott al 15 nov (solo alcuni giorni) » : je ne sais pas quels jours, donc je ne sais pas si c'est ouvert samedi. « ore 23:59 » seul (« Il Regno delle Eccellenze Sabaudi ») ressemble à un bug. « Manuart… dal 13 nov al 14 nov » : finit samedi, OK. Le bouton « Mostra altri (51) » est clair. |
| 01-accueil-suite4 / suite5 | **Coince.** Sous la liste de 71 : « Eventi 13 novembre – 15 novembre **86** ». Pourquoi 86 et pas 71 ? Le texte parle ensuite de « venerdì 13 », mais le haut de page disait « sab 14 ». Puis « Puglia » apparaît alors que Google annonçait Lombardia, Alto Adige, Emilia-Romagna. |
| 01-accueil-suite5 à suite8 | **Compris mais trop long.** Explication des sources, loi régionale n. 6 del 2010, tableaux Fonte/Licenza par région. Intéressant pour la confiance, mais je ne suis pas venu(e) pour ça ; je défile vite. |
| 01-accueil-suite8 / suite9 | **Coince.** Deuxième outil « Un fine settimana a scelta » : encore Regione + Fine settimana, avec un bandeau jaune « Esempio: 13 novembre, tutte le regioni — cambi una cifra per vedere il suo risultato ». Je ne comprends pas pourquoi il y a deux outils presque identiques, ni quelle « cifra » changer. « Aperti il sabato 51 / Aperti la domenica 43 / Comune con più eventi Merano (6) » : sympa mais sans liste derrière. |
| 01-accueil-suite10 | **Compris.** « Che cosa trovi su questo sito » : enfin l'explication claire (oggi, domani, weekend, 30 giorni, mese ; liens « sagre vicino a me », « aperto oggi? »). Elle arrive bien trop bas. |
| 01-accueil-suite11 / suite12 | **Compris, peu utile.** Tableau par province lombarde (Brescia 112…). Statistiques, pas d'action possible. |
| 02-menu-1 | **Compris.** Menu clair : Weekend (questo weekend / oggi / vicino a me), Regioni, Natale (5 entrées), Mesi. « Il mercatino è aperto? » est accrocheur. Rien sur « Chi siamo » ici (visible seulement en pied de page). |
| 03-calendario-sagre-2027-1 | **Compris** : « Calendario sagre 2027, le date già fissate », « 220 eventi ». |
| 03-…-suite1 à suite5 | **Coince.** Page « 2027 » mais la liste commence par « Grande mercato settimanale di Merano dal 13 nov al 8 gen » et des marchés de Noël de novembre 2026. Et juste au-dessus : « 50 mercati settimanali o stagioni lunghe nascosti » alors que le premier affiché EST un « mercato settimanale ». Contradiction directe. « Mercatino delle pulci ad Egna dal 21 nov al 17 lug » : 8 mois, « solo alcuni giorni » sans dire lesquels. |
| 03-…-suite6 | **Compris.** Tableau mois par mois clair (gennaio 86… dicembre 4). Utile pour voir que 2027 est encore peu rempli, et le texte l'admet honnêtement (« calendario parziale per natura »). |
| 04-chi-siamo-1 à suite3 | **Compris.** Qui, pourquoi, sources, « I tuoi dati », « Cosa il sito non fa ». Rassurant (« non vendiamo visibilità »). Mais : société française à Clermont-Ferrand pour un site de sagre italiennes, ça surprend un peu. Et incohérence : la section « Da dove vengono i dati » cite la Puglia, l'encadré « A cura di Radif Partners » ne cite que « Lombardia, Alto Adige ed Emilia-Romagna ». |
| 05-fiere-di-paese-1 à suite4 | **Compris.** Titre limpide, filtre déjà réglé sur « Solo fiere » et « Nei prossimi 30 giorni », « 30 eventi ». « 1 mercati settimanali… nascosti » : faute d'accord. Plusieurs « ore 23:59 » seuls (Ardenno, Brescia ×2, Concesio) : on dirait une donnée cassée. « Sagra di Via Prina … · Fiera » : une sagra classée fiera, bizarre. |
| 05-…-suite4 à suite6 | **Coince légèrement.** Texte : « Le fiere di paese del calendario sono 47 » contre « 30 eventi » en haut. Puis « Le prossime fiere di paese – Fiere nei 60 giorni » : la même liste une deuxième fois, en format tableau, sur 60 jours au lieu de 30. Doublon inutile sur mobile. |
| 06-mercatini-di-natale-2026-1 à suite5 | **Compris.** Filtre réglé sur « Dicembre 2026 / Mercatini di Natale », « 79 eventi ». Liste riche. Mais « Polvere di Stelle » à Lana apparaît 3 fois (inauguration, mercatino, stand gastronomici) avec des dates différentes (27 dic / 31 dic) : ça gonfle le compte. Et texte : « sono 95 », alors que l'accueil disait 34. |
| 06-…-suite6 | **Compris.** Tableau « aperti nei giorni chiave » (28 nov, 5 dic, 8 dic, 13 dic) par région : bonne idée, lisible. |
| 07-alto-adige-1 à suite6 | **Compris.** Région pré-sélectionnée, « 48 eventi » en décembre, puis « sono 60 » dans le texte (là, l'écart s'explique peut-être par décembre vs saison, mais ce n'est pas dit). « Mercatino di Natale a Pietralba » / « Santuario della Madonna di Petralba » : orthographe différente sur la même fiche. Tableau « Apre / Chiude / Giorni di chiusura 25 dicembre » : très utile. |
| 08-emilia-romagna-1 à suite6 | **Coince sur un mot.** « 7 eventi » puis « sono 8 ». Tableau « Giorni di chiusura : 29 giorni / 25 giorni / 7 giorni » : je ne sais pas quels jours, et je pense d'abord « fermé 29 jours ?! ». L'explication vient après le tableau. Deuxième outil « Mercatini aperti in un giorno » : réponse « 6 », « All'ultimo giorno 1 » (incompréhensible), « Aperto più a lungo Cervia, 10 gen » (clair). Re-bandeau « cambi una cifra ». Le sous-titre promet « presepi e feste di fine anno » mais le filtre est sur Mercatini di Natale. |
| 09-lombardia-1 à suite6 | **Compris mais piège.** Sous-titre « scegli il giorno o la città vicina » : aucun choix de ville visible. Filtre « Dicembre 2026 » → « 24 eventi », mais le tableau en bas montre des marchés le 22 et le 28 novembre (Prata Camportaccio, Primaluna, Gazoldo) que la liste du haut n'affiche pas : je les aurais ratés. Liste très répétitive (« Mercatini di Natale » ×10 sans autre nom) ; horaires étranges « 10:00 – 20:44 », « 08:00 – 17:14 ». Texte « sono 27 » vs « 24 eventi ». |

## 4. Chaque fonction

| Fonction | Trouvée ? | Comprise ? | Utile ? | Évidence /5 |
|---|---|---|---|---|
| Recherche principale (Regione / Quando / Che cosa + liste) | Oui, dès l'écran 1 | Oui | Très | 5 |
| Liste d'événements avec dates, horaires, « con ristoro » | Oui | Oui (sauf « solo alcuni giorni ») | Très | 4 |
| Lien « Scheda ufficiale » / « Programma (Comune) » | Oui | Oui | Oui (vérifier avant de partir) | 4 |
| « Mostrali » (mercati settimanali nascosti) | Oui | À moitié (« stagioni lunghe » flou) | Moyen | 3 |
| « Mostra altri (N) » | Oui | Oui | Oui | 5 |
| Outil « Un fine settimana a scelta » (2e calculateur) | Oui en défilant | Mal (doublon + « cambi una cifra ») | Faible, il ne donne que des totaux | 2 |
| Outil « Mercatini aperti in un giorno » | Oui (page ER) | Partiellement (« All'ultimo giorno 1 ») | Oui pour le 8 dicembre | 3 |
| Tableaux statistiques (par province, par mois, par région) | Oui | Oui | Faible pour moi (pas d'action) | 3 |
| Tableau « Apre / Chiude / Giorni di chiusura » | Oui | Oui pour Alto Adige, non pour « 29 giorni » | Oui | 3 |
| Menu ☰ | Oui | Oui | Oui | 5 |
| Bouton EN | Oui | Oui | Non testé | 4 |
| « Sagre vicino a me » / « aperto oggi? » | Vus en lien et menu | Oui par le nom | Promet beaucoup (non ouverts ici) | 4 |
| « Leggi tutto il paragrafo » | Oui | Oui | Moyen | 4 |

## 5. Enchaînement et navigation

- La structure est cohérente : chaque page reprend le même outil, pré-réglé sur le sujet (fiere → « Solo fiere », Alto Adige → région, Natale → « Dicembre 2026 »). C'est bien pensé, on n'a rien à refaire.
- Fil d'Ariane présent partout (« Home / Mercatini di Natale / … »), utile.
- Mais l'ordre de chaque page est toujours : outil → longue liste → texte → tableau qui répète la liste. Sur mobile, ça fait 6 à 12 écrans dont la moitié redit la même chose en format différent.
- L'accueil met « Che cosa trovi su questo sito » (le vrai mode d'emploi) au 11e écran, après les licences et la loi lombarde.
- Pas de bouton « remonter » ni de rappel des filtres quand on est au milieu de la liste ; pour changer de période il faut tout remonter.
- Le passage d'une page à l'autre change les chiffres du même objet (34 / 79 / 95 marchés de Noël ; 71 / 86 événements du week-end), ce qui casse la confiance construite par le discours « dati ufficiali ».

## 6. Difficultés classées

1. **Chiffres contradictoires pour la même chose** (01-accueil-1 vs suite4/suite5/suite9 ; 06 ; 08 ; 09). Vécu : « 71 eventi » puis « 86 » pour le même week-end, « 34 » puis « 79 » puis « 95 » mercatini, « 7 eventi » puis « sono 8 » : je doute de tout le site, alors que sa promesse est justement la fiabilité. Recommandation : un seul chiffre par objet et toujours préciser la fenêtre. Remplacer « Eventi 13 novembre – 15 novembre 86 » par « Da venerdì 13 a domenica 15: 86 eventi (71 sabato e domenica) », et sur l'accueil « Mercatini di Natale 34 » par « Mercatini di Natale aperti almeno 3 giorni: 34 (95 in tutto) ».

2. **Couverture régionale non annoncée en haut** (01-accueil-1). Vécu : le nom « Sagre del Weekend » et « vicino a te » laissent croire à toute l'Italie ; un Romain repart déçu au 5e écran. Recommandation : ajouter sous le titre une ligne visible. Texte : « Per ora: Lombardia, Alto Adige, Emilia-Romagna e Puglia. » Et aligner la Puglia partout (encadré « A cura di », snippet Google).

3. **« solo alcuni giorni » sans dire lesquels** (01-accueil-suite1 à suite4, 03, 06, 07). Vécu : « Sagra del Tartufo dal 6 nov al 15 nov (solo alcuni giorni) » — c'est ouvert dimanche ou pas ? C'est LA question du week-end. Recommandation : afficher les jours d'ouverture dans la période choisie. Texte : « aperto sab 14 e dom 15 » ou « aperto ven-sab-dom ».

4. **Page 2027 qui affiche surtout des événements de novembre 2026 et contredit son propre filtre** (03-…-1/suite1). Vécu : « 50 mercati settimanali … nascosti » puis le premier résultat est « Grande mercato settimanale di Merano » ; et je vois Noël 2026 sur une page 2027. Recommandation : ne lister que les événements qui commencent en 2027 (ou trier par première date 2027), et vraiment masquer les marchés hebdomadaires. Texte d'en-tête : « 220 eventi con almeno una data nel 2027 ».

5. **Deuxième outil redondant + phrase incompréhensible** (01-accueil-suite8/suite9, 08-…-suite5). Vécu : « cambi una cifra per vedere il suo risultato » — il n'y a aucun chiffre à changer, et le « Lei » détonne. Recommandation : remplacer par « Esempio: 13 novembre, tutte le regioni. Cambia regione o fine settimana per aggiornare. » et, sur l'accueil, fusionner ce bloc avec l'outil du haut (ou l'enlever).

6. **Le filtre « Dicembre 2026 » fait rater les mercatini de novembre** (09-lombardia-1 vs suite6). Vécu : la liste du haut dit 24 événements à partir du 1er décembre, mais le tableau du bas montre des marchés le 22 et le 28 novembre. Recommandation : sur les pages Noël, régler par défaut « Da oggi al 6 gennaio ». Libellé : « Tutta la stagione (fino al 6 gennaio) ». Et retirer « o la città vicina » du sous-titre s'il n'y a pas de choix de ville sur la page, ou ajouter le champ.

7. **Données brutes qui ressemblent à des bugs** (05, 09, 07). Vécu : « ore 23:59 » seul, « 10:00 – 20:44 », « 08:00 – 17:14 », « 1 mercati settimanali », « Pietralba / Petralba », « Polvere di Stelle » ×3, dix fiches « Mercatini di Natale » identiques. Recommandation : masquer l'horaire quand c'est 23:59 seul (« orario non indicato »), arrondir ou laisser tel quel mais sans fins à la minute incohérentes, gérer le singulier (« 1 mercato settimanale nascosto »), regrouper les doublons d'un même lieu, et préfixer les titres génériques par la commune (« Mercatini di Natale – Sarezzo »).

8. **« Giorni di chiusura 29 giorni » et « All'ultimo giorno 1 »** (08-…-suite3/suite5). Vécu : je lis « fermé 29 jours » et je m'inquiète ; « All'ultimo giorno 1 » ne veut rien dire pour moi. Recommandation : remplacer la colonne par « Aperto: solo sab, dom e ponti » / « tutti i giorni tranne il lunedì » ; remplacer « All'ultimo giorno » par « Chiudono quel giorno: 1 ».

## 7. À garder

- Le titre qui reprend mot pour mot la promesse Google, et la réponse immédiate (« 71 eventi » + liste) sans rien avoir à cliquer.
- Les trois menus « Regione / Quando / Che cosa », pré-réglés selon la page.
- La fiche événement compacte : nom, dates, horaires, commune (province), type, « con ristoro ».
- Le lien « Scheda ufficiale » / « Programma (Comune) » pour vérifier.
- « Cosa il sito non fa » et « non vendiamo visibilità » : honnête, rassurant.
- Le tableau « Apre / Chiude / Giorni di chiusura 25 dicembre » des grands marchés du Haut-Adige.
- Le tableau des « giorni chiave » (5 dic, 8 dic…) par région.
- Le menu ☰ clair, avec « Il mercatino è aperto? » et « Sagre vicino a me ».

## 8. Notes

Clarté : 7/10
Facilité : 8/10
Utilité : 8/10
