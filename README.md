# Mode d'emploi

## Niveau _gradle_

### Utilisation

#### En ligne de commande

Sur linux, installer _gradle_ : `sudo apt-get install gradle` par exemple.
Ensuite, depuis la racine du projet, utiliser les commandes `gradle build`
pour compiler le projet et `gradle run` pour le lancer.

Pour voir tout ce que peut faire _gradle_ avec ce projet, il faut lancer
`gradle tasks`. Avec ça, il affiche une description assez précise avec
explication des différentes tâches possibles, par exemple pour générer
la javadoc extraite des fichiers source du projet, ou pour générer une
archive (_tar_ ou _zip_) permettant d'installer l'application.

#### Avec _NetBeans_

Il faut déjà avoir _NetBeans_ bien sûr, et ensuite installer le plugin
_gradle_ (faire une recherche dans le menu des plugins de _NetBeans_).

Pour ouvrir un projet _gradle_ déjà existant, il faut sélectionner
un truc genre `open gradle project` (disponible uniquement si le
plugin est installé).

Ensuite les boutons marchent bien pour tout ce qui est compilation et
tests.

### Fichiers de _gradle_

_Gradle_ n'a besoin que de 2 fichiers (à part les sources).
Ce sont les fichiers `build.gradle` et `settings.gradle` qui sont à la
racine du projet.

`settings.gradle` est le plus simple (en tout cas pour un fonctionnement
minimal) il ne contient qu'une affectation de variable de type _string_
qui contient le nom du projet. Il sera utilisé comme titre, mais il ne
correspond à aucun fichier ou quoi que ce soit d'autre.

`build.gradle` contient toutes les informations nécessaires à gradle
pour faire ce qu'il a a faire. Dans ce fichier, on peut ajouter des
librairies de dépendance, rajouter des tâches, et plein d'autres choses.
C'est un fichier écrit dans un langage que comprend _gradle_.
Tu peux regarder les commentaires que j'ai mis dedans.

Petite remarque : gradle génère des fichiers localement dans le
répertoire `.gradle` à la racine du projet. Il stocke des trucs ici pour
aller plus vite à la prochaine exécution, mais ce répertoire n'a pas
besoin d'être dans le git (il ne vaut même mieux pas l'y mettre).

### Architecture du projet

Dans un premier temps, java impose déjà une règle principale :
les classes doivent être rangées dans des répertoires correspondant
aux packages où elles se trouvent.
Donc par exemple pour la classe `org.ani.Sation`, le
chemin sera `org/ani/Sation.java`.

A cela, _gradle_ rajoute sa propre architecture (dérivée de celle
de _maven_... pour la culture).

En gros, à la racine du projet, il doit y avoir un répertoire `src`
où vont se trouver tous les fichiers source du projet, donc les
fichiers java, mais aussi d'éventuels fichiers de ressource (textes,
données, etc.) qui sont des ressources statiques, donc qui ne changent
pas pendant l'exécution du programme, mais dont le programme a besoin
pour fonctionner.

Dans de répertoire `src`, il y a deux répertoires possibles : `main`
et `test`. Le premier contient les fichiers du programme lui-même,
le second contient les fichiers de tests (sources et
éventuelles ressources).

Dans chacun des deux répertoires `src/main` et `src/test`, il peut
y avoir deux répertoires : `java` et `resources`. Le premier est
la base des sources java, le second est la base des ressources.
Dans les deux cas, les fichiers doivent être placés selon la règle
java, donc dans des répertoires ayant le nom des packages contenant
la classe ou la ressource.

L'avantage de _NetBeans_ est qu'il masque un peu tout ça et c'est
moins lourd pour éditer les fichiers, il propose une arborescence
_condensée_ du projet (parce que ça fait beaucoup de répertoires
imbriqués à taper à la ligne de commande, ça).

En gros, ce que je fais la plupart du temps, c'est utiliser
_NetBeans_ pour là où il est bon et simplifie la vie (donc
pour éditer les sources) et la ligne de commande pour
compiler/exécuter/créer l'archive à la fin.
Bon... j'avoue, ça m'arrive aussi d'appuyer sur le bouton _play_
dans _NetBeans_ :)

Lors de la compilation, _gradle_ génère un répertoire `build` à la
racine du projet. Ce répertoire ne doit pas être dans le git, c'est
des fichiers générés uniquement.
