***************************** ÉBAUCHE *******************************************

------------------------------ But du logiciel : --------------------------------

1) répertorier différents amortissements selon des critères variables. 
2) Calculer des sommes d'amortissements, par compte, par commune, par année, par commune, année et par compte...
3) Sortir différents résumés PDF permettant d'obtenir des montants correspondants à ces amortissements, permettant d'indiquer aux communes/associations quel budget allouer aux amortissements pour une année donnée, un compte donné...
Calcul de totaux par comptes, de totaux par communes....

----------------------------- Différents "objets" à considérer ------------------


 A) Une immobilisation : 
	définie par un type (txt), un numéro d'inventaire, un coût (euros), une 	durée d'amortissement (années), un montant d'amortissement annuel (calculé 		en prenant la partie entière de cout/durée, sauf la dernière année ou on a 		la partie entière plus le reste), un renvoi vers un compte d'amortissement 		(cf plus loin), une valeur nette comptable...
	UN TABLEAU D'AMORTISSEMENT ?

B) Un compte : 
	définie par un numéro de compte,
	un ensemble d'immobilisations,
	un total (total par année aussi ou alors on fait une table avec 2 clés que 		seraient année et numéro de compte (dernière option peut-être plus facile à 		gérer lors du passage d'une année sur l'autre, peut-être plus dégueulasse 		aussi ?)?),
	
C) Un compte d'amortissement :
	défini par un numéro de compte,
	problématique identique à "compte" en ce qui concerne les années, 
	un ensemble d'immobilisations (= montant amorti pour l'année en cours)


NOTE : Il n'y a aucun lien entre compte et compte d'amortissement a priori ! Besoin 	   d'éclaircir ce qu'est précisément un compte d'amortissement.

------------------------------------ contraintes ----------------------------------

Le pc utilisateur n'est pas admin... => aucune install possible, aucun droit d'éxécution... le logiciel se doit d'être quasi transparent... mais de générer des pdf ^^




