/* ### JEU ### */

/* *** ACTION QUAND ON CLIQUE SUR UNE CASE *** */
function jouerCase(){

    let aJouer=false;

    //récupérer position du pion
    let positionPion=Array.from(this.id);
    positionPion.splice(0, 4);
    positionPion[0]=parseInt(positionPion[0]);
    positionPion[1]=parseInt(positionPion[1]);

    //console.log(jouer);
    //on regarde s'il n'y a pas de pion sur la case, sinon on ne peut pas jouer

    if(grilleOthello[positionPion[0]][positionPion[1]]==""){

         //appel à une fonction qui verifie que la position peut être jouée et qui retourne les pions
        //console.log("je dois retourner les pions");
        
        aJouer=verifiePositionJouer(positionPion); 
        //console.log(jouer);

        if (aJouer==true) {

            //on affiche le pion
            //console.log('je peux jouer');
            // si la condition est jouable
            this.classList.remove("vide");
            this.classList.add(joueur[indiceJoueur]);
            grilleOthello[positionPion[0]][positionPion[1]]=joueur[indiceJoueur];


            // on change les joueurs
            if(joueur[indiceJoueur]=="noir"){
                this.classList.remove("blanc");
                indiceJoueur=1; //"blanc"

            } else {
                this.classList.remove("noir");
                indiceJoueur=0; //"noir"
            }

            //afficher un message pour dire à quel joueur de jouer
            document.getElementById('messageText').innerHTML = `C'est au tour de ${joueur[indiceJoueur].toUpperCase()} de jouer`;

            //on calcule le score pour l'afficher en temps réel
            calculScore();
        }

    }
   
}



/* *** PASSER LE TOUR D'UN JOUEUR *** */

function passerTourJoueur(){
    console.log(`${joueur[indiceJoueur]} passe son tour`);

    // on change les joueurs
    if(joueur[indiceJoueur]=="noir"){
        indiceJoueur=1; //"blanc"

    } else {
        indiceJoueur=0; //"noir"
    }

    //afficher un message pour dire à quel joueur de jouer
    document.getElementById('messageText').innerHTML = `C'est au tour de ${joueur[indiceJoueur].toUpperCase()} de jouer`;
}


/* *** CALCULER LE SCORE *** */

function calculScore(){

    let scoreBlanc=0;
    let scoreNoir=0;
    let celluleVide=64;
    let couleurPion;

    //calculer les scores
    for(let i=0;i<8;i++) {        
        for (let j=0;j<8;j++) {
            
            couleurPion=grilleOthello[i][j];
            //couleurPion=document.getElementById(`pion${i}${j}`).classList;
            
            if(couleurPion=="blanc"){
            //if(couleurPion.contains("blanc")){
                scoreBlanc+=1;
            }
            else if(couleurPion=="noir"){
            //else if(couleurPion.contains("noir")){
                scoreNoir+=1;
            }
        }
    }

    //ecrire les scores au bon endroit
    document.getElementById('scoreBlanc').innerHTML = scoreBlanc;
    document.getElementById('scoreNoir').innerHTML = scoreNoir;

    //calculer le nombre de cellule vide
    celluleVide-=(scoreBlanc+scoreNoir);

    //s'il  n'y a plus de cellule vide, on compare les scores finaux pour savoir qui a gagné
    if(celluleVide==0) {
        if(scoreBlanc>scoreNoir) {
            document.getElementById('messageText').innerHTML = `Blanc à gagné`;
        } else if (scoreNoir>scoreBlanc) {
            document.getElementById('messageText').innerHTML = `Noir à gagné`;
        } else {
            document.getElementById('messageText').innerHTML = `Match nul`;
        }
    }

    return celluleVide;
}


/* *** VERIFIER POSITION JOUER ET RETOURNER LES PIONS SI VRAIE *** */

/* 
*** fonction qui verifie qu'on peut retourner les pions *** 
    entrée = position du pion joué
*/


function verifiePositionJouer(positionPion) {

/* 
    POSITION                           ==> DEPLACEMENT DE LA POSITION PAR RAPPORT AU PION POSE
    position 0 (centre - pion posé)    ==> ligne = 0    colonne = 0     ==> 0
    position 1 (diagonale haut gauche) ==> ligne = -1   colonne = -1    ==> -11
    position 2 (haut)                  ==> ligne = -1   colonne = 0     ==> -10
    position 3 (diagonale haut droite) ==> ligne = -1   colonne = +1    ==> -9 
    position 4 (droite)                ==> ligne = 0    colonne = +1    ==> +1 
    position 5 (diagonale bas droite)  ==> ligne = +1   colonne = +1    ==> +11
    position 6 (bas)                   ==> ligne = +1   colonne = 0     ==> +10
    position 7 (diagonale bas gauche)  ==> ligne = +1   colonne = -1    ==> +9
    position 8 (gauche)                ==> ligne = 0    colonne = -1    ==> -1
*/

    let deplacementPosition = [ [-1,-1], 
                                [-1,0], 
                                [-1,1], 
                                [0,1],
                                [1,1], 
                                [1,0], 
                                [1,-1], 
                                [0,-1] ];

    //position de départ = positionPion donné en entrée de la fonction
    let pion=document.getElementById(`pion${positionPion[0]}${positionPion[1]}`);
    let positionPionSuivant=[],
        positionPionJoueur=[ [],[],[],[],[],[],[],[] ],
        positionPionAdversaire=[ [],[],[],[],[],[],[],[] ];
    let ligne,
        colonne;
    let verification = true;

    //console.log(positionPion);
    //console.log('positionPion');

    //Pour toutes les positions du tableau de déplacement
    for (let i = 0; i< deplacementPosition.length; i++) {
        //on remet la vérification à true
        verification = true;

        //on clacule la position du pion suivant dans la direction donnée
        positionPionSuivant = [ positionPion[0] + deplacementPosition[i][0], positionPion[1] + deplacementPosition[i][1] ];

        //tant que la vérification est toujours en cours
        while(verification==true) {

            ligne=positionPionSuivant[0];
            colonne=positionPionSuivant[1];

            //console.log(positionPionSuivant);
            verification = false;

            //si la position sort du jeu
            if (positionPionSuivant[0]<0 || positionPionSuivant[1]<0 || positionPionSuivant[0]>7 || positionPionSuivant[1]>7){
                //console.log('bord');
                verification = false;
            }

            //si la case est vide
            else if (grilleOthello[ligne][colonne]==""){
                //console.log('vide');
                verification = false;
                //on passe à la position suivante
            }    

            //si le pion de la case est de la couleur du joueur
            else if (grilleOthello[ligne][colonne]==joueur[indiceJoueur]) {
                //console.log('joueur');
                positionPionJoueur[i].push(positionPionSuivant);
                verification = false;
            }

            //si le pion de la case est de la couleur de l'adversaire
            else {
                //console.log('adversaire');
                positionPionAdversaire[i].push(positionPionSuivant);
                positionPionSuivant=[ligne+deplacementPosition[i][0], colonne+deplacementPosition[i][1]];
                verification=true;
            }  
        }
    }

    let longueurTableauJoueur=0,
        longueurTableauAdversaire=0;

    for(let i=0; i<positionPionJoueur.length;i++) {
        longueurTableauJoueur=longueurTableauJoueur+positionPionJoueur[i].length;
        longueurTableauAdversaire=longueurTableauAdversaire+positionPionAdversaire[i].length;
    }

    
    if (longueurTableauJoueur==0 && longueurTableauAdversaire==0) {
        console.log("la case n'est pas jouable");
        grilleOthello[positionPion[0]][positionPion[1]]="";

        pion.classList.remove(joueur[indiceJoueur]);
        pion.classList.add("vide");
        return false;
    }

    else if (longueurTableauJoueur>0 && longueurTableauAdversaire==0) {
        console.log("la case n'est pas jouable");
        grilleOthello[positionPion[0]][positionPion[1]]="";

        pion.classList.remove(joueur[indiceJoueur]);
        pion.classList.add("vide");
        return false;
    }


    else if (longueurTableauJoueur==0 && longueurTableauAdversaire>0) {
        console.log("la case n'est pas jouable");
        grilleOthello[positionPion[0]][positionPion[1]]="";

        pion.classList.remove(joueur[indiceJoueur]);
        pion.classList.add("vide");
        return false;
    }

    else {
        return retournePion(positionPionJoueur, positionPionAdversaire);
    }  
}

/* 
*** Fonction qui retourne les pions *** 
    entrée = tableaux des positions des pions du joueur et des pions de l'adversaire

*/


function retournePion(positionPionJoueur, positionPionAdversaire){

    let pionAdversaire="";
    let ligne,
        colonne;
    let pionRetourne=0;

    let indiceAdversaire=(indiceJoueur+1)%2;

    for(let i=0; i<positionPionJoueur.length;i++) {

        //si case est vide, onne fait rien
        if(positionPionJoueur[i].length==0 && positionPionAdversaire[i].length==0) {
            //console.log('pas de pion joueur dans cette direction');
            continue;
        }

        else if(positionPionJoueur[i].length>0 && positionPionAdversaire[i].length==0){
           //console.log('pas de pion adversaire dans cette direction');
            continue;
        }

        else if(positionPionJoueur[i].length==0 && positionPionAdversaire[i].length>0){
            //console.log('pas de pion joueur dans cette direction');
            continue;
        }

        else{
            //console.log('on peu retourner');

            for(let j=0; j<positionPionAdversaire[i].length; j++) {

                ligne=positionPionAdversaire[i][j][0];
                colonne=positionPionAdversaire[i][j][1];

                pionAdversaire=document.getElementById(`pion${ligne}${colonne}`);
                
                grilleOthello[ligne][colonne]=joueur[indiceJoueur];

                pionAdversaire.classList.remove("vide");
                pionAdversaire.classList.remove(joueur[indiceAdversaire]);
                pionAdversaire.classList.add(joueur[indiceJoueur]);

                pionRetourne+=1;
            }

        }

    }

    if (pionRetourne>0) {
        return true
    }
    else { 
        return false;
    }
    

}
