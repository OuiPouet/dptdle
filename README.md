# Départementdle

## Qu'est ce que Départementdle ?
Départementdle est un jeu qui consiste à trouver chaque jour un département français en moins d'essais possible. Pour cela le joueur saisit un nom de département dans le champ de texte puis selon la proximité avec le département cible, le département change de couleur : \[Du plus loin au plus proche\]
 - Rouge
 - Orange
 - Vert clair
 - Vert \(Département cible\)

Il est possible de jouer qu'une seule fois par jour car le département cible change quotidiennement.

La partie est automatiquement sauvegardée dans le navigateur, cela signifie qu'un joueur peut commencer une partie puis revenir plus tard dans la journée pour terminer si il n'a pas trouvé; les départements déja choisis au préalable seront automatiquement coloriés sur la carte et placés dans le champ des essais.
La progression est rénitialisée tout les jours.

## Modes de jeu
### Mode classique
Pour le moment seul ce mode de jeu est disponible, il s'agit du mode dans lequel le département s'éclaire selon la proximité avec le département cible.

## Fonctionnalités
- Présentation du jeu : En cliquant sur l'icone "?" une fenetre de présentation de Départementdle est affichée, elle est également affichée lorsqu'on arrive sur le site pour la première fois afin de présenter le jeu aux joueurs.

- Compte : Le compte permet de savoir en moyenne en combien de coups nous avons mis a trouver le département cible. Plus de statistiques arriveront dans les futures mises à jour

- Affichage d'une carte d'aide : L'icone en forme de carte permet d'ouvrir un nouvel onglet contenant une carte avec les départements pour aider les joueurs qui ne connaissent pas tous les départements.

- Éxécution de commandes : Des commandes peuvent etres éxécutés dans le champ de texte sous la forme /xxx. Une liste des commandes est disponible en cliquant sur l'icone en forme d'invite de commandes.

## Technologies utilisées
- HTML (Structure de la page)
- CSS (Style de la page)
- JavaScript (Fonctionnalités)
- JSON (Base de données)

## Contexte de développement
Ce jeu est un projet personnel réalisé pendant mon temps libre. J'ai eu envie de créer un jeu ou l'on devais deviner quelque chose tout les jours comme le [Surtom](https://surtom.yvelin.net) par exemple. Je n'avais pas de réelle bonne idée sur le thème de mon jeu et un soir pendant mon repas j'ai jeté un coup d'oeil à mes Départ'aiments fièrements disposés sur mon frigo et j'ai eu le déclic, Départementdle était né.


## Patch notes

### Version 1.2.5
- Changement du système de coloration des départements :  
    <- Système de coloration selon si le departement est limitrophe \[Vert\], limitrophe de limitrophe \[Orange\] ou non limitrophe \[Rouge\].
    -> Système de coloration selon la distance calculée entre les département. \[Vert\] = 0, \[Vert clair\] < 150, \[Orange\] < 300, \[Rouge\] > 300.
- Ajout des 95 départements en tant que cible.
- Ajout de l'atribut "pos\[x,y\]" dans la base de données ou x et y sont les coordonnées du département.
- Ajout de la commande /patchnotes qui redirige vers cette page.
- Ajout de la version du jeu avec redirection vers cette page dans l'affichage de l'aide.
- Suppression de l'auto-complétion du champ de texte.
- Correction de bugs et améliorations :
    - Correction d'un bug qui faisait que l'Isère n'était pas jouable.
    - Correction d'un bug qui faisait que le nombre d'essais augmentais de 1 si on avait gagné et que l'on raffraichissait la page.
    - Les Corse-du-Sud et Haute-Corse peuvent désormais etre des cibles.

### Version 1.2.0
- Ajout de la carte d'aide.
- Ajout de la liste des commandes.
- Commandes ajoutées :
    - /help : Affiche l'aide du jeu.
    - /kebab : Permet de commander un kebab.
    - /ricard : Redirige vers un [jeu ou l'on doit trouver un Ricard](https://ricard.ouipouet.tech).
    - /surtom : Redirige vers le [Surtom](https://surtom.yvelin.net).
    - /thon : Redirige vers un [thon qui tourne](https://thon.ouipouet.tech), littéralement.
    - /vendredi : Commande fonctionnement uniquement le vendredi, Notre président vous salue et vous indique le jour de la semaine.
- Ajout des sauvegardes de partie dans le navigateur.

### Version 1.1.0
- Corrections de bugs

### Version 1.0.0
- Changement de la carte de base au format PNG par une carte SVG, cela permet de n'avoir qu'une seule image et de changer facilement la couleur des départements.
- Ajout de la moyenne de coups par partie dans le compte

### Version 0.9.0
- Création du jeu de base

Note : Les patchs notes antérieures a la version 1.2.5 ne sont pas précises car je n'avais pas créé créé cette page et les patchs notes au moment de la sorties des dites versions.