***************************** ÉBAUCHE 2.0 ***************************************

------------------------------ But du logiciel : --------------------------------

entrées de l'utilisateur au moment de créer une immobilisation (ou subvention) : 
	- d'un type/commentaire (txt),
	- un nom de commune (txt),
	- un numéro d'inventaire (alphanum + "-", "." ou "/"),
	- un indicateur subvention/immobilisation (type à choisir),
	- une valeur brute d'achat (euros),
	- une durée d'amortissement (années),
	- un numéro de compte(qui répertoriera l'immo)
	- un numéro de compte d'amortissement

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

Nouveauté !!! Il y a une nouvelle notion de subvention qui entre en jeu : idem qu'une immobilisation, au niveau des interactions compte/amortissement etc.. sauf qu'il faut séparer les immos des subv au moments des récapitulatifs

A) Une immobilisation : 
pk	un ID d'immo(int - BD uniquement)
	un type/commentaire (txt),
 	un numéro d'inventaire alphanumérique + ("-", "." ou "/"),
        un indicateur subvention/immobilisation (type à choisir)
 	un ID de compte(int)

	NOTES : - la durée d'amortissement n'a pas besoin d'être retracée : on la 			  retrouve en sommant les amortissements correspondant à l'immo.
		- Idem pour la valeur brute de l'immo.

B) Un compte :
	un ID de compte(int - BD uniquement),
	un numéro de compte(int),
	un ID de compte d'amortissement(int - BD uniquement),
	un numéro de compte d'amortissement,
	un nom de commune ou d'organisation (type "sierentz" ou communauté de 		communes de xxx"...)(txt)
	
	
B) Un Amortissement : 
pk-fk		un numéro d'inventaire alphanumérique + ("-", "." ou "/"),
pk-fk		un ID de compte
		un montant amorti précalculé mais modifiable(Euros),
pk		une année(date)


Note : Les immobilisations répertoriées par un compte ont toutes le même compte d'amortissement, et la réciproque est vraie.

------------------------------------ contraintes ----------------------------------

Le pc utilisateur n'est pas admin... => aucune install possible, aucun droit d'éxécution... le logiciel se doit d'être quasi transparent... 
Inutile de partager les données entre les différents utilisateurs, d'après mon client :P


