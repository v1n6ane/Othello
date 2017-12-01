window.onload = function() {
	prepareEventHandlers();
	let indicejoueur=creerNouveauJeuOthello();
}


function prepareEventHandlers() {
	/*
		Récupérez les éléments du DOM nécessaires ici, et écrivez le code
		d'initialisation des gestionnaires d'événement
	*/

	let startJeu=document.getElementById("startJeu");
	let passerTour=document.getElementById("passerTour");

	//startJeu.addEventListener("click", creerNouveauJeuOthello, false);
	startJeu.addEventListener("click", verifPartieEnCours, false);
	passerTour.addEventListener("click", passerTourJoueur, false);
}



/* *** AMELIORATIONS FUTURES *** */

/* 

A FAIRE
- améliorer le design des pions
- montrer où le joueur peut jouer
- faire un retournement avec animation (flip) et son ?
- mettre un joueur IA


FAIT
- demander au joueur si il est sur de vouloir quitter la partie en cours si il clique sur 'démarer une nouvelle partie'
- ne pas pouvoir passer le tour quand la partie est finie

*/