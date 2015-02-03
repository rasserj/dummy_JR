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
