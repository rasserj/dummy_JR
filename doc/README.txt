***************************** ÉBAUCHE 2.0 ***************************************

------------------------------ But du logiciel : --------------------------------

1) répertorier les différentes immobilisations dans différents comptes et suivre leur amortissement(compte d'amortissement)

2) Calculer automatiquement le montant amorti dû chaque année, par "compte" (et donc par commune). (= division euclidienne vAchat par durée(en année) d'amortissement, le reste de la division euclidienne s'ajoute sur le montant de la dernière année d'amortissement) 

3) générer dans un fichier non modifiable et agréable à la lecture et compréhension de l'utilisateur, sur demande, des tableaux récapitulatifs avec les éléments suivant, en fonction des comptes et des communes : 
Nom de la commune,
Numéro du compte,
Année en cours,
Valeur brute du compte (= total des valeur brutes des immo qu'il retrace depuis sa création),
Numéro du compte d'amortissement,
Cumul (=somme)des amortissements depuis existence du compte d'amortissement, 
Total amorti pour une année donnée

4) pouvoir, sur demande de l'utilisateur, retrouver la valeur nette comptable d'une imobilisation en cours d'amortissement (vNetComptable = vAchat - Somme des amortissements depuis annéeAchat)



GESTION DES ERREURS PAR L'UTILISATEUR.....
A) Être capable, en tant qu'utilisateur bienveillant, de rectifier le montant d'un amortissement quelconque, préalablement calculé (cf 2) ), pour le faire coller au montant réellement amorti, dans le cas où un acquitteur commettrait une erreur.

B) Augmenter la durée d'amortissement (car il arrive que celà soit nécessaire) sans pour autant modifier les montants d'amortissements préalablement calculés (cf 2) )
Ce cas de figue est facilement imaginable lorsqu'on est en présence d'une ou plusieurs situations mentionnées au point A) 

GESTION DES ERREURS PAR LE LOGICIEL.....
Pour le moment je n'ai que pensé à vAchat = sommes des amortissements, à faire lorsque la dernière année d'amortissement est écoulée.. Autres idées bienvenues ! 


----------------------------- Différents "objets" à considérer ------------------


A) Une immobilisation : 
	définie par un type (txt),
(clé?)	un nom de commune ou d'organisation (type "sierentz" ou communauté de 		communes de xxx"...),
clé	un numéro d'inventaire alphanumérique + ("-", "." ou "/")),
	un coût total (euros),
	une durée d'amortissement (années),
	un montant d'amortissement (euros, sans centimes sauf dernière année)
	une référence unique vers un compte, 
	une référence unique vers un compte d'amortissement (cf plus loin)

B) Un compte : 
clé	défini par un numéro de compte (max 10 chiffres), 
clé	un nom de commune ou d'organisation (type "sierentz" ou communauté de 		communes de xxx"...),
	un ensemble d'immobilisations,
	un total en valeur brute depuis l'existence du compte(total par année aussi 		ou alors on fait une table avec 3 clés que seraient année et numéro de 		compte et commune (dernière option peut-être plus facile à gérer lors du 		passage d'une année sur l'autre, peut-être plus dégueulasse aussi ?)?),
	
C) Un compte d'amortissement :
clé	défini par un numéro de compte (max 10 chiffres),
clé	un nom de commune ou d'organisation (type "sierentz" ou communauté de 		communes de xxx"...),
	problématique identique à "compte" en ce qui concerne les années, 
	un ensemble d'immobilisations (= montant amorti pour l'année en cours),
	un total en valeur amortie pour l'année concernée.


Note : Les immobilisations répertoriées par un compte on toute le même compte d'amortissement, et la réciproque est vraie.

------------------------------------ contraintes ----------------------------------

Le pc utilisateur n'est pas admin... => aucune install possible, aucun droit d'éxécution... le logiciel se doit d'être quasi transparent... 
Inutile de partager les données entre les différents utilisateurs, d'après mon client :P


