# Synthèse du test naïf du 2026-11-14 : sagredelweekend.it

Notes du 1er tour (version f521f49) : testeur 1 = 7/7/7, testeur 2 = 7/8/8, testeur 3 = 6/7/7.

| # | Difficulté relevée | Testeurs | Décision | Raison / correction |
|---|---|---|---|---|
| 1 | Chiffres contradictoires pour le même objet : 71 puis 86 événements du week-end, 34/79/95 mercatini, 30/47 fiere, 48/60 Alto Adige, 7/8 Emilia-Romagna, 295/300 Lombardie | 1, 2, 3 | **corrigé** | Cause dans le code : l'outil comptait à partir du jour du build (samedi 14), les textes à partir du jour de lecture des fichiers (vendredi 13) ; les pages Noël avaient « décembre » dans l'outil et « toute la saison » dans le texte ; les marchés longs n'étaient exclus que d'un côté. Un seul jour de référence (`OGGI`, src/lib/engine/eventi.ts) et un module commun outil + textes (src/lib/engine/ricerca.ts : recherche, comptage, période en toutes lettres, régions). Les pages à 30 jours écrivent le chiffre et la période de l'outil ; l'accueil ne répète plus le compte du week-end. Test ajouté : tests/coerenza.test.ts (le chiffre du premier rendu de l'outil figure dans la réponse repliée de chaque page). |
| 2 | Couverture géographique invisible au premier écran (« Tutte le regioni coperte », « vicino a te ») ; Puglia absente de l'encadré « A cura di » | 1, 2, 3 | **corrigé** | Chapeau de l'accueil avec les quatre régions, option « Tutte e 4 le regioni », « vicino a te » retiré, ligne de résultat « N eventi [période] in Lombardia, Alto Adige, Emilia-Romagna e Puglia », Puglia ajoutée à l'encadré et à la description de la page « oggi ». |
| 3 | « (solo alcuni giorni) » sans dire si c'est ouvert ce week-end | 1, 2, 3 | **corrigé** | Chaque fiche donne ses jours d'ouverture dans la période choisie. |
| 4 | Horaires qui ressemblent à des bugs (« ore 23:59 » seul, fins à 23:59) | 1, 2, 3 | **corrigé** | 23:59 seul masqué ; « 08:00 – 23:59 » devient « dalle 08:00 ». Les fins à la minute (17:14, 20:44) sont celles des fichiers régionaux : laissées telles quelles. |
| 5 | Page « Calendario sagre 2027 » qui liste des événements de 2026 et un marché hebdomadaire censé être masqué | 1, 2, 3 | **corrigé** | La page ne liste que les événements qui commencent en 2027 ; les marchés « settimanale » sont comptés à part. |
| 6 | « … mercati settimanali o stagioni lunghe nascosti » incompris ; « 1 mercati » | 1, 2, 3 | **corrigé** | Formulation reprise, singulier géré. |
| 7 | Bandeau « cambi una cifra per vedere il suo risultato » : aucun chiffre à taper, vouvoiement | 1, 2, 3 | **corrigé** | Italien : « scegli un’altra voce qui sopra per vedere il risultato » (src/lib/libelles-trame.ts). L'anglais garde le texte de trame, figé par le test de trame. Défaut de trame signalé : le libellé suppose des champs numériques et vouvoie. |
| 8 | Jargon des licences sur chaque fiche (CC BY 4.0, CC0, Open Data Hub) ; références de loi dans le texte | 1, 2, 3 | **corrigé** | Une seule note de source sous la liste ; références de loi retirées des phrases. |
| 9 | Doublons (Polvere di Stelle à Lana ×3) et titres génériques (« Mercatini di Natale » ×10) | 1, 2, 3 | **corrigé** | Doublons de Lana retirés ; titres génériques suivis de la commune (« Mercatini di Natale – Sarezzo »). |
| 10 | Pages Noël réglées sur « Dicembre 2026 » : marchés de novembre absents de la liste | 1, 2, 3 | **corrigé** | Les pages Noël comptent toute la saison jusqu'au 6 janvier ; le mini-outil Noël compte comme le tableau. |
| 11 | « Giorni di chiusura 29 giorni » lu comme 29 jours de fermeture ; « All'ultimo giorno 1 » incompris | 1, 2, 3 | **corrigé** | La colonne donne les jours d'ouverture en toutes lettres ; « All'ultimo giorno » renommé. |
| 12 | Tableaux du bas qui répètent la liste du haut (fiere, Lombardia) | 1, 2 | **corrigé** | Tableaux retirés ou remplacés. |
| 13 | Lien « sagre vicino a me » enfoui en bas de l'accueil | 1, 2 | **corrigé** | Lien placé sous l'outil. |
| 14 | Deux outils presque identiques sur l'accueil | 1, 2, 3 | **non retenu** | Le mini-outil par page est une règle de la factory (§9.3) ; il choisit un autre week-end, et son bandeau dit maintenant quoi faire (n° 7). |
| 15 | Société française à Clermont-Ferrand pour un site italien | 1, 2 | **non retenu** | Identité réelle de l'éditeur (Radif Partners), obligatoire dans les mentions. |
| 16 | Texte long (sources, tableaux par région/province) avant le mode d'emploi | 2, 3 | **non retenu** | Textes déjà repliés (« Leggi tutto il paragrafo ») ; ils portent la preuve des sources. |
| 17 | Puglia affichée avec 0 événement ce week-end | 1 | **non retenu** | Information vraie, un seul testeur. |
| 18 | « Pietralba / Petralba » sur la même fiche | 2 | **non retenu** | Graphies du fichier régional ; le site n'invente rien. |
| 19 | Le site disait être relu « à la main » alors que la mise à jour est quotidienne et automatique | (relecture) | **corrigé** | Accueil, metodo et method : « ogni mattina uno script scarica di nuovo i file delle Regioni ». |
