# Test naïf du 2026-11-14, testeur 1 : sagredelweekend.it

**Persona :** Italien(ne) de 45 ans, salarié(e), à l'aise avec son téléphone, aucune connaissance particulière du sujet, ne lit pas les longs paragraphes. Il/elle a tapé sa question dans Google (« sagre questo weekend ») et a cliqué sur le résultat « Sagre questo weekend: calendario ufficiale delle Regioni » parce qu'il/elle cherche vraiment une sortie pour ce week-end.

## 1. Concept

**Après 5 secondes (01-accueil-1) :** « C'est une liste des sagre de ce week-end. » Le titre « Sagre questo weekend, dai calendari ufficiali delle Regioni » reprend exactement le résultat Google : rassurant, elle sait qu'elle est au bon endroit. Les trois menus « Regione / Quando / Che cosa » et le gros « 71 eventi » sous « sab 14 novembre – dom 15 novembre » disent tout de suite « voilà ce qu'il y a samedi et dimanche ». Très bon premier écran.

**Après 2 minutes :** elle a compris que c'est un agenda de sagre, fiere et mercatini de Noël, avec un filtre par région, période et type, et que les dates viennent de fichiers publics des Régions. Elle a aussi compris, plus tard et à moitié, que **le site ne couvre que quelques régions** (Lombardia, Alto Adige, Emilia-Romagna, et un peu de Puglia). Elle ne l'a pas vu sur le premier écran : « Tutte le regioni coperte » ne dit pas lesquelles.

**Clair ?** Oui pour l'usage (« qu'est-ce qu'il y a ce week-end »). Non pour la couverture géographique, découverte tard.
**Pour qui ?** Quelqu'un qui habite ou se déplace en Lombardie, au Trentin-Haut-Adige/Sud-Tyrol ou en Émilie-Romagne. Pour une personne de Rome, Naples ou Turin, la promesse « vicino a te » ne tient pas, et elle le comprend seulement en lisant le tableau des sources.
**Bénéfice concret :** une liste à jour (« letto il 13 nov 2026 »), avec commune, dates, horaires et un lien « Scheda ufficiale » / « Programma (Comune) » pour vérifier. C'est concret et utile.

## 2. « Tout le monde peut-il comprendre ? »

**Verdict : oui pour l'essentiel, avec des décrochages.** La liste est lisible par n'importe qui. Ça décroche :
- sur le **jargon technique** répété sur chaque fiche : « CC BY 4.0 », « CC0 », « open data », « Open Data Hub (NOI Techpark) », « somministrazione » ; elle ne sait pas ce que c'est et ça alourdit chaque carte ;
- sur la ligne « **13 mercati settimanali o stagioni lunghe nascosti · Mostrali** » : elle ne comprend pas pourquoi on lui cache des choses ni ce qu'est une « stagione lunga » ;
- sur les **chiffres qui ne concordent pas** d'un bloc à l'autre (71, puis 86 ; 34, 79 puis 95 mercatini) ;
- sur le bandeau jaune « **Esempio: 13 novembre, tutte le regioni — cambi una cifra per vedere il suo risultato** » : il n'y a aucune « cifra » à changer, seulement des menus déroulants.

## 3. Parcours écran par écran

| Écran | Compris | Coince |
|---|---|---|
| 01-accueil-1 | Titre = sa question ; les 3 menus ; « 71 eventi » ce week-end. | « Tutte le regioni coperte » : lesquelles ? « 13 mercati settimanali o stagioni lunghe nascosti » : pourquoi cachés ? |
| 01-accueil-suite1 | Fiches nettes : nom, dates, commune (province), type, lien « Scheda ufficiale ». | « dal 10 ott al 15 nov (solo alcuni giorni) » : est-ce ouvert **ce** samedi ou pas ? Elle ne peut pas savoir. « Fonte: Emilia-Romagna Turismo, CC BY 4.0, letto il 13 nov 2026 » sur chaque fiche = bruit. |
| 01-accueil-suite2 | Suite de la liste, mélange Ferrara, Parma, Brescia. | Aucune notion de distance : Bolzano, Parma, Brescia dans le désordre. « Festa o evento » = étiquette vague. |
| 01-accueil-suite3 | « Antica Fiera di San Martino… con ristoro » : « con ristoro » plaît (on mange). | « Il Regno delle Eccellenze Sabaudi… ore 23:59 » : une sagra qui commence à minuit moins une ? Ça fait « donnée cassée ». « Autunno è tempo di vino » n'a pas de lien officiel, contrairement aux autres. |
| 01-accueil-suite4 | « Mostra altri (51) » clair. | Juste après : « Eventi 13 novembre – 15 novembre **86** » alors que le haut disait « **71** eventi ». Elle se demande lequel est juste (le 13 = vendredi, mais il faut le deviner). |
| 01-accueil-suite5 | Bloc de chiffres, « File regionali letti il 13 novembre » rassure sur la fraîcheur. | Le paragraphe parle de « **Puglia** », absente du résultat Google. « 2899… 300 ancora da svolgere e 52 già fissate per il 2027 » : trop de chiffres, elle décroche. « Leggi tutto il paragrafo » bien vu. |
| 01-accueil-suite6 | Message compris : les autres sites sont pleins d'événements périmés, ici c'est la source officielle. | « legge regionale n. 6 del 2010, articolo 18 bis », « licenza CC0 », « somministrazione » : texte pour juriste, elle saute. |
| 01-accueil-suite7 | Tableau par région : elle découvre enfin **quelles régions** sont couvertes. | « Eventi a venire 295 » en Lombardie alors que le texte au-dessus disait « 300 eventi lombardi a venire ». Petite incohérence de plus. |
| 01-accueil-suite8 | Puglia : « Weekend… 0 ». | Pourquoi afficher une région qui n'a rien ce week-end et seulement 5 événements ? Ça fait vide. |
| 01-accueil-suite9 | Deuxième outil « Un fine settimana a scelta » : choisir un autre week-end, compris. « Aperti il sabato 51 / la domenica 43 », « Comune con più eventi Merano (6) » : sympa. | Bandeau jaune « cambi una cifra » incompréhensible. Elle croit d'abord que c'est la même chose que le premier outil. |
| 01-accueil-suite10 | « Apri la ricerca completa → », liens « sagre vicino a me » et « aperto oggi? » : utiles. | « La ricerca in alto calcola nel tuo browser » : elle s'en moque. Le lien « sagre vicino a me », qui répond à son vrai besoin, est enfoui au milieu d'un paragraphe en bas de page. |
| 01-accueil-suite11/12 | Tableau Lombardie par province. | Long, sans intérêt pour elle si elle n'est pas lombarde. Elle arrête de défiler. |
| 02-menu-1 | Menu clair : « Weekend / Regioni / Natale / Mesi », « Sagre oggi », « Sagre vicino a me », « Il mercatino è aperto? ». Très bien. | « Regioni » est replié : elle ne voit toujours pas la liste des régions couvertes. |
| 03-calendario-sagre-2027-1 | Titre clair « Calendario sagre 2027, le date già fissate ». | « ven 1 gennaio – ven 31 dicembre » sans année. « 50 mercati settimanali… nascosti ». |
| 03-…-suite1 à suite5 | Liste lisible. | **Incohérence forte** : une page « 2027 » qui commence par des événements de **novembre 2026** (« dal 13 nov al 8 gen », Merano ; mercatini de Noël 2026). Et le « Grande mercato settimanale di Merano » s'affiche alors qu'on vient de dire que les marchés hebdomadaires sont cachés. |
| 03-…-suite6 | Tableau mois par mois 2027 : très clair et utile. | Rien. |
| 04-chi-siamo-1 à suite3 | Qui : Radif Partners, éditeur indépendant, ne vend pas de visibilité, ne demande pas de données. Rassurant. « Scrivici… se una data… ti sembrano sbagliati » : bien. | Adresse à **Clermont-Ferrand, France** pour un site de sagre italiennes : elle trouve ça étrange (« qui sont ces gens ? »). L'encadré final dit « Lombardia, Alto Adige ed Emilia-Romagna » sans la Puglia, qui est pourtant citée deux paragraphes plus haut. |
| 05-fiere-di-paese-1 | Titre clair, filtre « Solo fiere », « Nei prossimi 30 giorni », « 30 eventi ». | Le titre dit « dei Comuni lombardi » mais le menu dit « Tutte le regioni coperte ». « **1 mercati** settimanali… nascosti » : faute d'accord. |
| 05-…-suite1 à suite4 | Liste par date, lisible. | « Fiera di Novembre… ore 23:59 », « Fiera Madunina di Custù… ore 23:59 », « Fiera Cristo Re… ore 23:59 » : horaire absurde, récurrent. |
| 05-…-suite5/6 | Explication fiera / sagra : utile pour elle. | « 47 fiere » dans le texte contre « 30 eventi » en haut. Le tableau du bas (« Fiere nei 60 giorni ») répète la liste du haut en moins lisible ; on y voit « Mercatino del Brocantage », absent de la liste du haut. |
| 06-mercatini-di-natale-2026-1 à suite4 | Page Noël claire : décembre, tous les mercatini. Horaires des grands marchés (Bolzano, Merano) : exactement ce qu'elle veut. | « 79 eventi » ici, « 34 » mercatini sur l'accueil, « 95 » dans le texte de cette même page. Les **doublons** de Lana : « Inaugurazione… Polvere di Stelle », « Mercatino di Natale Polvere di Stelle », « …Gli stand gastronomici » = trois fiches pour le même marché. |
| 06-…-suite5/6 | Tableau « aperti nei giorni chiave » (28 nov, 5 déc, 8 déc…) : très utile pour planifier. | Rien de bloquant. |
| 07-mercatini-alto-adige-1 à suite6 | Clair, les cinq grands marchés « storici » bien expliqués ; tableau « Apre / Chiude / Giorni di chiusura 25 dicembre » excellent. | « 48 eventi » en haut, « sono 60 » dans le texte. |
| 08-mercatini-emilia-romagna-1 à suite6 | Liste courte et claire ; outil « Mercatini aperti in un giorno » (8 dicembre → 6) parlant. « Aperto più a lungo: Cervia, 10 gen » : bien. | « Giorni di chiusura: **29 giorni** » : lesquels ? Le texte l'explique plus bas, mais sur le tableau elle croit que c'est fermé 29 jours de suite. « All'ultimo giorno 1 » : incompris. Encore « cambi una cifra ». « 7 eventi » en haut, « sono 8 » dans le texte. |
| 09-mercatini-lombardia-1 à suite6 | Liste par dimanche : colle au titre « domenica per domenica ». | Préréglé sur « Dicembre 2026 » : les marchés du 22 et du 28 novembre (Prata Camportaccio, Primaluna, Gazoldo) n'apparaissent que dans le tableau du bas. Une douzaine de fiches s'appellent toutes « Mercatini di Natale » : il faut lire la commune pour les distinguer. « ore 08:00 – 17:14 », « 10:00 – 20:44 » : horaires bizarres. |

## 4. Chaque fonction

| Fonction | Trouvée ? | Comprise ? | Utile ? | Évidence /5 |
|---|---|---|---|---|
| Recherche « Regione / Quando / Che cosa » (accueil) | Oui, tout de suite | Oui | Oui, c'est le cœur | 5 |
| Compteur « 71 eventi » + liste | Oui | Oui, sauf le décalage 71/86 | Oui | 4 |
| « … nascosti · Mostrali » | Oui | Non (« stagioni lunghe ») | Moyen | 2 |
| « Mostra altri (51) » | Oui | Oui | Oui | 5 |
| Liens « Scheda ufficiale » / « Programma (Comune) » | Oui | Oui | Très (vérifier avant de partir) | 4 |
| « Un fine settimana a scelta » | Oui en défilant | À moitié (doublon apparent du premier outil, bandeau « cifra ») | Oui pour planifier | 3 |
| Tableau des sources par région | Oui | Oui | Utile surtout pour savoir quelles régions sont couvertes | 3 |
| Menu ☰ (Sagre oggi, vicino a me, aperto?) | Oui | Oui | Oui | 4 |
| « Sagre vicino a me » | Dans le menu oui ; sur l'accueil, caché dans un paragraphe | Oui | Très, c'est son vrai besoin | 3 |
| Calendario 2027 | Oui | Le tableau mensuel oui, la liste non (événements 2026) | Moyen en novembre | 2 |
| Mercatini di Natale (national + 3 régions) | Oui | Oui | Très en novembre | 4 |
| « Mercatini aperti in un giorno » | Oui | Oui, sauf « All'ultimo giorno » | Oui | 3 |
| Tableaux « Apre / Chiude / Giorni di chiusura » | Oui | Ambigu quand c'est un nombre (« 29 giorni ») | Oui | 3 |

## 5. Enchaînement et navigation

- Le header (logo, EN, ☰) est constant et propre ; le fil d'Ariane (« Home / Mercatini di Natale / … ») aide à se repérer.
- Le menu ☰ est bien organisé par usage (Weekend, Regioni, Natale, Mesi). « Regioni » replié par défaut cache l'information la plus importante pour elle : quelles régions sont couvertes.
- Chaque page suit le même modèle (titre, outil, liste, texte replié, tableau) : on prend vite l'habitude. Mais le tableau du bas répète souvent la liste du haut en moins lisible (fiere, Lombardia).
- Les chiffres changent d'une page et d'un bloc à l'autre (71/86, 34/79/95 mercatini, 30/47 fiere, 48/60 Alto Adige, 7/8 Emilia-Romagna, 295/300 Lombardie). Chaque chiffre a sans doute son explication (vendredi compris ou non, période, type), mais elle ne la voit pas et finit par douter de tous.

## 6. Difficultés classées

1. **Couverture géographique invisible au premier écran** (01-accueil-1, 02-menu-1).
   *Vécu :* « vicino a te », « Tutte le regioni coperte »… elle habite à Rome et défile 71 événements à Bolzano, Parme ou Brescia avant de comprendre, dans un tableau en bas de page, que sa région n'y est pas.
   *Reco :* dire les régions dans le chapeau et dans le menu déroulant. Chapeau : « Le sagre di questo weekend in **Lombardia, Alto Adige, Emilia-Romagna e Puglia**, lette nei file ufficiali delle Regioni. » Option du menu : « Tutte (Lombardia, Alto Adige, Emilia-Romagna, Puglia) ». Ouvrir « Regioni » par défaut dans le menu ☰.

2. **Chiffres contradictoires sur la même page** (01-accueil-1 vs suite4/5, 06, 07, 08, 05).
   *Vécu :* « 71 eventi » puis « 86 » quelques centimètres plus bas, « 34 » mercatini sur l'accueil, « 79 » puis « 95 » sur la page Noël. Elle se demande lequel croire.
   *Reco :* nommer la période ou le périmètre à côté de chaque chiffre : « 86 eventi **da venerdì 13 a domenica 15** (71 sabato e domenica) » ; « 95 mercatini nella stagione, **79 aperti a dicembre** ». Sur l'accueil, remplacer « Mercatini di Natale 34 » par « Mercatini di Natale lunghi (3 giorni o più) 34 », ou donner le même total que la page Noël.

3. **« (solo alcuni giorni) » sans dire si c'est ouvert ce week-end** (01-accueil-suite1 à suite4).
   *Vécu :* « Tartufesta… dal 10 ott al 15 nov (solo alcuni giorni) » : elle ne sait pas si elle peut y aller samedi.
   *Reco :* sur la vue « Questo fine settimana », afficher les jours concernés : « **aperta sab 14 e dom 15** (dal 10 ott al 15 nov, solo alcuni giorni) ».

4. **Horaires absurdes « ore 23:59 », « 17:14 », « 20:44 »** (01-accueil-suite3, 05-…-suite1/2/3, 09-…-suite1/4).
   *Vécu :* « Il Regno delle Eccellenze Sabaudi… ore 23:59 » : la donnée a l'air cassée et ça entame la confiance dans tout le reste.
   *Reco :* quand l'heure vaut 23:59 seule, ne rien afficher ou écrire « orario non indicato dal Comune » ; afficher « 08:00 – sera » pour les fins à 23:59.

5. **Page « Calendario sagre 2027 » qui liste des événements de 2026** (03-…-1 à suite5).
   *Vécu :* titre « le date già fissate » 2027, puis « dal 13 nov al 8 gen » Merano et tous les mercatini de Noël 2026.
   *Reco :* ne garder que ce qui commence en 2027, ou le dire : « Inclusi gli eventi iniziati nel 2026 che proseguono a gennaio 2027 ». Ajouter l'année au compteur : « ven 1 gennaio 2027 – ven 31 dicembre 2027 ».

6. **« … mercati settimanali o stagioni lunghe nascosti · Mostrali »** (01-accueil-1, 03, 05).
   *Vécu :* « Pourquoi on me cache des choses ? C'est quoi une stagione lunga ? » Et « 1 mercati » est une faute.
   *Reco :* « **Esclusi 13 mercati di ogni settimana ed eventi che durano mesi** · Mostrali » ; au singulier, « Escluso 1 mercato… ».

7. **Bandeau « Esempio… cambi una cifra per vedere il suo risultato »** (01-accueil-suite9, 08-…-suite5).
   *Vécu :* il n'y a aucun chiffre à saisir, seulement des menus.
   *Reco :* « Esempio: 13 novembre, tutte le regioni — **scegli un altro weekend o un'altra regione qui sopra** ».

8. **Jargon des licences sur chaque fiche et doublons** (toutes les listes ; 06/07 Lana).
   *Vécu :* « Fonte: Open Data Hub Alto Adige, CC0, letto il 13 nov 2026 » répété 70 fois ; trois fiches pour « Polvere di Stelle ».
   *Reco :* sur la fiche, garder « Fonte: Alto Adige · 13 nov » et renvoyer les licences à la page « Metodo e fonti ». Regrouper les fiches du même lieu aux mêmes dates sous un seul titre (« Polvere di Stelle, Lana — anche inaugurazione e stand gastronomici »). Dans les tableaux « Giorni di chiusura », remplacer « 29 giorni » par « aperto solo sab, dom e ponti ».

## 7. À garder

- Le titre d'accueil identique au résultat Google : on sait qu'on est au bon endroit.
- Le premier écran : trois menus préréglés sur « Questo fine settimana » et un gros compteur. Réponse immédiate, sans rien taper.
- Les fiches courtes : nom, dates, horaires, commune (province), type, « con ristoro », lien officiel pour vérifier.
- « letto il 13 nov 2026 » : la fraîcheur affichée rassure, c'est l'argument face aux sites « périmés ».
- La page « Chi siamo » : « non vendiamo visibilità e non chiediamo dati di contatto », « Cosa il sito non fa » (« se il tempo è brutto… lo sa solo la Pro Loco »). Honnête et rassurant.
- Les textes longs repliés (« Leggi tutto il paragrafo ») : on n'est pas noyé.
- Les tableaux Noël « Apre / Chiude / Giorni di chiusura 25 dicembre » et « aperti nei giorni chiave » (28 nov, 8 dic…) : très pratiques pour organiser une sortie.
- Le menu ☰ organisé par usage : « Sagre oggi », « Sagre vicino a me », « Il mercatino è aperto? ».

## 8. Notes

Clarté : 7/10
Facilité : 7/10
Utilité : 7/10
