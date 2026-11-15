# Test naïf du 2026-11-14 (tour2), testeur 2 : sagredelweekend.it
**Persona :** Italien(ne) de 24 ans, très à l'aise avec les apps, impatient(e) : s'il/si elle ne comprend pas en quelques secondes ce que la page lui apporte, il/elle ferme et retourne sur Google. Il/elle a cliqué sur le résultat « Sagre questo weekend: calendario ufficiale delle Regioni » parce qu'il/elle cherche une sagra ce week-end. Découverte sur téléphone, première visite.

## 1. Concept

**Après 5 s** (01-accueil-1) : « Ok, une liste de sagre de ce week-end, tirée des calendriers officiels des Régions. » Le titre « Sagre questo weekend, dai calendari ufficiali delle Regioni » colle exactement à ce que j'ai cliqué sur Google. Trois menus (« Regione », « Quando », « Che cosa ») déjà remplis et un gros « 70 eventi / sabato 14 e domenica 15 novembre » : je comprends tout de suite qu'il y a des résultats pour moi, maintenant.

Premier accroc dans la même seconde : Google m'annonçait « Lombardia, Alto Adige ed Emilia-Romagna », et le site dit « in quattro regioni: Lombardia, Alto Adige, Emilia-Romagna e Puglia, le sole che pubblicano… ». Si j'habite à Rome, Naples, Turin, Florence ou Venise, je comprends en 5 s que le site **ne me concerne pas** et je repars. Le message est honnête, mais c'est un mur pour la majorité des Italiens.

**Après 2 min** : c'est un agrégateur de fichiers open data régionaux (sagre, fiere, mercatini di Natale), avec un filtre par région, période et type, des pages par thème (Natale, fiere, 2027) et une philosophie claire : « non vendiamo visibilità », « teniamo solo ciò che ha una data a venire ». Pour quelqu'un de Lombardie, du Haut-Adige ou d'Émilie-Romagne, le bénéfice est concret : « qu'est-ce qu'il y a ce week-end, où, à quelle heure, avec un lien officiel ». Pour les autres, rien.

Clair ? Oui pour le principe. Moins clair sur ce qu'est une « sagra » ici : la liste mélange vraies sagre (« Sagra del Tartufo »), marchés d'occasion (« Mercatino dell'usato a Riscone »), dégustations (« Degustazione di cioccolato artigianale bean to bar »), spectacles de drones, vols en montgolfière. Le mot « sagre » promet de la nourriture et de la fête de village, la liste est plus large.

## 2. « Tout le monde peut-il comprendre ? »

**Verdict : oui pour l'usage de base (regarder la liste), non pour tout ce qui est en dessous.**

Ça décroche :
- dès le premier écran pour toute personne hors des 4 régions (et on ne lui propose rien d'autre) ;
- à partir de 01-accueil-suite5 : les blocs « Regioni coperte 4 / Eventi dal 1 dicembre al 31 dicembre 2026 395 / Mercatini di Natale … 93 », puis des tableaux « Fonte / Licenza CC0 / CC BY 4.0 / Open Data Hub (NOI Techpark) », puis « Lombardia: sagre e fiere comunicate dai Comuni, per provincia » avec « Sagre e fiere a venire 112 / Con cucina o ristoro 95 ». « CC0 », « CC BY 4.0 », « open data », « NOI Techpark », « APT Servizi » : je ne sais pas ce que c'est et je m'en moque, je voulais une sagra ;
- sur les encadrés jaunes « Esempio: 20 novembre, tutte le regioni — scegli un'altra voce qui sopra per vedere il risultato » : le mot « Esempio » me fait croire que les chiffres sont fictifs ;
- sur les petits widgets de comptage (« Quanti eventi in un mese ») dont les chiffres ne s'additionnent pas (voir §6).

## 3. Parcours écran par écran

- **01-accueil-1** — Compris. Titre = ma recherche. Formulaire prérempli, « 70 eventi ». Bémol : 4 régions au lieu des 3 annoncées par Google, et pas de champ ville/position sur ce premier écran.
- **01-accueil-suite1** — Compris. Fiches lisibles : nom, dates, « aperto sab 14 nov e dom 15 nov », commune + province, type, « Scheda ufficiale · Fonte: Regione Emilia-Romagna ». « con ristoro » est très utile. « Non contati qui: 14 mercati di ogni settimana o eventi che durano mesi · Mostrali » : compris, plutôt rassurant. Hésitation : la première fiche (« Tartufesta… dal 10 ott al 15 nov ») est un événement commencé il y a un mois ; le tri n'est pas expliqué.
- **01-accueil-suite2 / suite3** — Compris. Mélange Lombardie, Émilie, Haut-Adige. « Festa o evento » est un type flou. Les fiches de Bolzano n'ont **aucun lien** (juste « Fonte: Provincia di Bolzano »), alors que les autres ont « Scheda ufficiale » ou « Programma (Comune) » : je ne peux pas vérifier.
- **01-accueil-suite4** — Compris. « Mostra altri (50) » : clair. « Cerca intorno alla tua città: sagre vicino a me → » : enfin ce que je voulais, mais je le trouve **après 20 fiches**. Puis les compteurs 4 / 395 / 93 / 13 novembre : pas utiles pour moi.
- **01-accueil-suite5** — Le texte dit « sono 70: 31 in Alto Adige, 27 in Lombardia, il resto in Emilia-Romagna e in Puglia » ; plus bas (suite7-8), le tableau donne Émilie 12 et **Puglia 0**. Donc « il resto … in Puglia » est faux. Je décroche dans le texte sur la loi régionale lombarde.
- **01-accueil-suite6 / suite7 / suite8** — Coince (ennui). Explication de la méthode, tableaux de licences. Un geste vers la confiance, mais trop long sur l'accueil d'un téléphone. Petit doute : les fiches disent « Fonte: Regione Emilia-Romagna » / « Provincia di Bolzano », le tableau dit « APT Servizi Emilia-Romagna » / « Open Data Hub (NOI Techpark) ».
- **01-accueil-suite9 / suite10** — « Prepara un fine settimana più avanti » : bonne idée (choisir le week-end suivant). Mais l'encadré « Esempio » me déstabilise, et je ne vois que des chiffres (66, « Aperti il sabato 36 », « Comune con più eventi Egna (4) »), pas la liste. « Apri la ricerca completa → » : je ne sais pas en quoi c'est différent du formulaire du haut. Le paragraphe « Che cosa trovi su questo sito » arrive tard ; c'est pourtant le meilleur résumé de la page.
- **01-accueil-suite11 / suite12** — Coince. Tableau par province lombarde (Brescia 112, Sondrio 47…) : aucun intérêt pour choisir ma sortie de samedi.
- **02-menu-1** — Compris. Menu propre : « Weekend » (Sagre questo weekend / oggi / vicino a me), « Regioni », « Natale », « Mesi ». « Il mercatino è aperto? » est intriguant et utile. Le menu s'affiche par-dessus la page sans fond opaque en bas (on voit « Tutto » et « 70 eventi » dessous), un peu brouillon.
- **03-it-calendario-sagre-2027-1** — Compris : « 155 eventi … dal 1 gennaio al 31 dicembre 2027 ». Le titre « le date già fissate » est honnête.
- **03-…-suite1 à suite4** — Compris mais déçu : un « calendario sagre » qui commence par « Show di Droni per Capodanno », « Dolomiti Balloonweek: voli giornalieri in mongolfiera », « Degustazione dell'aperitivo di mela "Sparkling Rocco" ». Très peu de sagre au sens où je l'entends.
- **03-…-suite5 / suite6** — Compris. Le tableau par mois est clair. Mais le texte dit « 52 eventi vengono dalla Lombardia … 95 dall'Alto Adige e 6 dall'Emilia-Romagna » = 153, pas 155 ; les Pouilles (j'ai vu « La Befana Miggianese … Fonte: Regione Puglia ») sont oubliées. « l'estate le sagre lombarde con cucina, che a oggi sono solo una parte » : bonne honnêteté.
- **04-it-chi-siamo-1 à suite3** — Compris. Rassurant : « non vendiamo visibilità e non chiediamo dati di contatto », « Cosa il sito non fa », e-mail de contact. Mais : le premier paragraphe cite 3 sources (Lombardia, Alto Adige, Emilia-Romagna), la suite en cite 4 avec la Puglia. Une adresse à Clermont-Ferrand pour un site de sagre italiennes m'étonne un peu ; ça ne me bloque pas.
- **05-it-fiere-di-paese-1** — Hésitation. Titre « Fiere di paese, dal calendario dei Comuni lombardi », mais filtre « Tutte e 4 le regioni » ; le sous-titre dit « scegli il periodo, la regione o la città » et je ne vois **aucun champ ville**.
- **05-…-suite1 à suite4** — Compris. Liste claire, beaucoup de « con ristoro ». Bizarreries : « Sagra di Via Prina … Monza (MB) · Fiera », « Mercatini Dell'Immacolata … · Fiera », « Antica Fiera di San Martino … ore 18:00 – 19:30 » (une fiera de 1 h 30 ?).
- **05-…-suite5 / suite6** — Texte instructif sur la différence fiera/sagra : bien. Widget « Quanti eventi in un mese » : « Eventi a dicembre 2026 **154** », puis « Sagre, feste e fiere **154** » et « Mercatini di Natale **24** » → le total égale une seule des lignes ; je ne comprends pas.
- **06-it-mercatini-di-natale-2026-1 à suite4** — Compris, page utile : « aperto tutti i giorni tranne 25 dic · ore 16:00 – 21:00 », c'est exactement l'info pratique. Mais les « mercatini » comptés incluent des concerts et inaugurations (« Avvento in Musica 2026/27 - Inaugurazione… ore 17:00 – 18:00 », « Sax Royal: un ensemble di sassofoni », « Anras Brass ») et des doublons (« Inaugurazione dei Mercatini di Natale » Merano + « Mercatini di Natale di Merano »). Le « 93 » me paraît gonflé.
- **06-…-suite5 / suite6** — Compris. Le tableau « aperti nei giorni chiave » (sabato 28 novembre, 8 dicembre…) est malin pour planifier.
- **07-it-mercatini-di-natale-alto-adige-1 à suite6** — Compris, la page la plus utile. Le texte explique que l'horaire 17:00 – 22:30 de Bolzano vaut pour la soirée d'ouverture : bien vu, sinon j'aurais cru que le marché n'ouvre que le soir. Incohérence : « Mercatino natalizio sotterraneo … dal 13 nov » dans la liste, « Apre 14 novembre » dans le tableau.
- **08-it-mercatini-di-natale-emilia-romagna-1 à suite6** — Compris. Contradiction nette : la fiche dit « Mercatini Natalizi nel Piacentino … aperto solo lunedì, martedì, mercoledì, sabato e domenica », le texte dit « a Piacenza e Salsomaggiore i sabati, le domeniche e i ponti ». Même décalage 13/14 nov pour « Magie di Natale ». Le widget « Mercatini aperti in un giorno » (mar 8 dicembre → 6, « Chiudono proprio quel giorno 1 », « Aperto più a lungo Cervia, 10 gen ») est compréhensible et utile.
- **09-it-mercatini-di-natale-lombardia-1 à suite6** — Compris. Le titre « domenica per domenica » et le tableau « giorno per giorno » sont parfaits pour le modèle lombard (un seul jour). Mais : des heures bizarres (« ore 08:00 – 17:59 », « ore 10:00 – 20:44 », « ore 08:00 – 17:14 ») qui sentent l'erreur de données, et « domenica 6 dicembre — Mercatini 8 » pour **7** villages listés (Sarezzo apparaît deux fois, avec deux horaires différents).

## 4. Chaque fonction

| Fonction | Trouvée ? | Comprise ? | Utile ? | Évidence /5 |
|---|---|---|---|---|
| Recherche Regione / Quando / Che cosa (accueil) | Oui, tout de suite | Oui | Oui (si j'habite dans les 4 régions) | 5 |
| Liste des événements + « Mostra altri » | Oui | Oui | Oui | 5 |
| « Non contati qui … Mostrali » | Oui | Oui | Moyen | 4 |
| Liens « Scheda ufficiale » / « Programma (Comune) » | Oui | Oui | Oui, mais absents pour l'Alto Adige | 3 |
| « Sagre vicino a me » | Tard (sous la liste, ou dans le menu) | Oui (par le nom) | Sûrement le plus utile | 2 |
| « Il mercatino è aperto oggi? » | Sous la liste + menu | Oui | Oui | 3 |
| « Prepara un fine settimana più avanti » | En scrollant beaucoup | Moyen (« Esempio », chiffres sans liste) | Moyen | 2 |
| « Quanti eventi in un mese » | En bas des pages | Non (154 = 154 + 24 ?) | Faible | 1 |
| « Mercatini aperti in un giorno » | En bas de la page Émilie | Oui | Oui | 3 |
| Tableaux « aperti nei giorni chiave » / « giorno per giorno » | Oui | Oui | Oui pour planifier | 4 |
| Tableaux sources / licences / provinces | Oui (impossible de les rater) | Partiellement | Non pour moi | 1 |
| Menu ☰ | Oui | Oui | Oui | 4 |
| Bouton EN | Oui | Oui | Pas pour moi | 4 |

## 5. Enchaînement et navigation

- Le fil d'Ariane (« Home / Mercatini di Natale / Mercatini in Alto Adige ») est clair, le même composant de recherche revient sur chaque page avec la bonne présélection : cohérent et rassurant.
- Le menu est logique (Weekend / Regioni / Natale / Mesi).
- L'accueil est trop long : après la liste, je fais 8 écrans de statistiques, de licences et de tableaux par province avant d'atteindre « Che cosa trovi su questo sito », qui aurait dû être plus haut, en version courte.
- Le chemin le plus important pour mon usage (« près de chez moi ») n'est ni sur le premier écran ni dans le formulaire ; il faut le deviner sous 20 fiches.
- Les pages Natale se ressemblent beaucoup (même structure : formulaire, liste, paragraphe replié, tableau), donc on s'y retrouve vite.

## 6. Difficultés classées

1. **01-accueil-1 — Couverture limitée et annoncée de façon incohérente.** Vécu : Google m'a promis 3 régions, le site en annonce 4 ; si je ne suis pas dans ces régions, je ferme immédiatement. Et la 4e (Puglia) a 0 événement ce week-end. Recommandation : aligner la description Google et le chapeau, et dire clairement dans le premier écran ce qu'on fait pour les autres. Texte : « Per ora copriamo Lombardia, Alto Adige ed Emilia-Romagna (e qualche evento in Puglia): sono le uniche Regioni che pubblicano un calendario aperto. Sei altrove? Qui non troverai la tua zona. »
2. **01-accueil-1 / suite4 — Pas de recherche par ville dans le premier écran.** Vécu : je veux « près de moi », je dois scroller 20 fiches pour trouver « sagre vicino a me ». Recommandation : ajouter un 4e champ « Vicino a » (ville ou « usa la mia posizione ») dans le formulaire, ou au minimum un lien visible juste sous le titre : « 📍 Cerca vicino alla tua città → ».
3. **Plusieurs écrans — Chiffres qui se contredisent.** Vécu : je perds confiance dans un site qui vante la rigueur des données. Exemples : « il resto in Emilia-Romagna e in Puglia » alors que Puglia = 0 (01-accueil-suite5 / suite8) ; 52+95+6 = 153 ≠ 155 (03-…-suite5) ; « Eventi a dicembre 2026 154 » = « Sagre, feste e fiere 154 » + « Mercatini di Natale 24 » (05-…-suite6) ; « Mercatini 8 » pour 7 villages (09-…-suite6) ; ouverture 13 nov dans la liste / 14 nov dans le tableau (07, 08). Recommandation : générer les phrases à partir des mêmes compteurs que les tableaux et ajouter un contrôle de cohérence. Texte (accueil) : « …sono 70: 31 in Alto Adige, 27 in Lombardia e 12 in Emilia-Romagna; in Puglia nessuno questo fine settimana. »
4. **08-…-suite5 — Contradiction sur les jours d'ouverture de Piacenza.** Vécu : la fiche dit lundi-mardi-mercredi-samedi-dimanche, le texte dit samedis, dimanches et ponts. Lequel croire pour y aller un lundi ? Recommandation : corriger le texte pour suivre la fiche. Texte : « a Piacenza tutti i giorni tranne giovedì e venerdì, a Salsomaggiore i sabati, le domeniche e il 7, l'8 dicembre e il 6 gennaio ».
5. **01-accueil-suite1 à suite4, 03, 06, 07 — « Sagre » et « mercatini » gonflés par des événements qui n'en sont pas.** Vécu : un spectacle de drones, une dégustation de chocolat, un concert de saxophones ou une inauguration d'une heure comptés comme « sagra » ou « mercatino ». Le « 93 mercatini » et le « calendario sagre 2027 » perdent en crédibilité. Recommandation : sortir les concerts et inaugurations du type « Mercatino di Natale » (ou les regrouper sous le marché principal) et renommer le type flou « Festa o evento » en « Altro evento ».
6. **01-accueil-suite9, 05-suite6, 08-suite6 — Encadré « Esempio ».** Vécu : je crois que les chiffres sont fictifs, et le widget ne montre qu'un total, pas la liste. Recommandation : remplacer par « Fine settimana del 20–22 novembre, tutte le regioni: cambia le voci qui sopra » et ajouter un lien « Vedi i 66 eventi → » directement sous le nombre.
7. **01-accueil-suite5 à suite12 — Accueil encombré de méthode, de licences et de tableaux par province.** Vécu : sur téléphone, 8 écrans qui ne m'aident pas à choisir ma sortie. Recommandation : sur l'accueil, garder 3 lignes de méthode + lien « Metodo e fonti », et déplacer les tableaux de licences et de provinces vers « Metodo e fonti » ou la page Lombardie. Remonter « Che cosa trovi su questo sito » juste après la liste.
8. **01-accueil-suite3, 07 — Pas de lien sur les fiches de l'Alto Adige, et heures étranges en Lombardie.** Vécu : impossible de vérifier un événement de Bolzano ; « 17:59 », « 20:44 », « 17:14 » font « bug ». Recommandation : pointer chaque fiche de l'Alto Adige vers la page de l'Open Data Hub ou de l'office du tourisme (« Scheda ufficiale ») ; arrondir les heures de fin manifestement saisies de travers (17:59 → 18:00) ou les afficher « fino alle 18 circa ».

## 7. À garder

- Le titre de l'accueil, identique à ma recherche Google, et le formulaire prérempli qui donne une réponse immédiate (« 70 eventi », « sabato 14 e domenica 15 novembre »).
- Le format des fiches : dates, « aperto sab 14 nov e dom 15 nov », commune + sigle de province, « con ristoro », source et lien officiel.
- « aperto tutti i giorni tranne 25 dic · ore 16:00 – 21:00 » : l'info pratique qu'on ne trouve jamais ailleurs.
- Les tableaux « Mercatini aperti nei giorni chiave » et « giorno per giorno », ainsi que le widget « Mercatini aperti in un giorno ».
- La transparence : « non vendiamo visibilità », « Cosa il sito non fa », « Leggi tutto il paragrafo » pour replier le texte.
- Le menu ☰ clair et le fil d'Ariane.

## 8. Notes

Clarté : 7/10
Facilité : 7/10
Utilité : 6/10
