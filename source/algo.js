/* *** RETOURNER LES PIONS *** */

/* 
fonction qui retourne les pions

Pour chaque direction
    pionCouleurJoueur=0;
    pionCouleurAdversaire=0;

    vérifier la présence d'un pion
        si oui
            vérifier la couleur du pion
                si pion = couleur du joueur
                    pionCouleurJoueur += 1

                    //on regarde le nombre de pion adversaire pour voir si c'est le premier pion de la position ou si la fin de la chaine de la position
                    si pionCouleurAdversaire > 0
                        dire qu'on peut retourner les pions des positions précédentes
                        on arrête d'aller voir les pions suivants
                        retournerPion=true

                    si pionCouleurAdversaire = 0
                        on ne peut pas retourner
                        on passe à la direction suivante
                        retournerPion=false
                
                si pion = couleur de l'adversaire
                    pionCouleurAdversaire += 1
                    vérifier la couleur de la position + 1 (recursivité)

                    si retourner = true (veut dire qu'on a trouvé un pion de le couleur du joueur plus loin)
                        class du pion = add couleur du joueur
                                      = remove couleur du joueur adverse
                        renvoyer true pour retourner les positions précédentes

                    si retourner = false
                        ==> on ne peut pas retourner

                si fin du cadre && pionCouleurJoueur=0
                    on ne peut pas retourner car on a pas trouver de pion de la couleur du joueur
                    renvoyer retourner = false
                    
        
        si non
            renvoyer position=false
            faire une autre direction


    si toutes les positions = false
        le pion ne peut pas être joué
        ne pas afficher le pion
        mettre une pop-up "coup impossible"

*/


/* *** RETOURNER LES PIONS V2*** */


/* 
fonction qui verifie qu'on peut retourner les pions

Pour chaque direction
    pionCouleurJoueur=0;
    pionCouleurAdversaire=0;
    position départ = position du pion

    verification = true
    position = 1

    tant que vérification = true

        si position n'a pas de pion 
            verification = false

        si position = bord du cadre
            verification = false

        si couleur du pion à la position = couleur joueur
            pionCouleurJoueur+=1;
            verification = false

        si couleur du pion à la position = couleur adversaire
            pionCouleurAdversaire+=1
            position + 1
            verification = true



    si pionCouleurAdversaire = 0
        on ne peut pas retourner

    si pionCouleurJoueur = 0
        on ne peut pas retourner

    si pionCouleurJoueur=1 && pionCouleurAdversaire >0
        on retourne les pions entre la position de départ et la position du pion final (entre les 2 pions du joueur)
        class du pion = add couleur du joueur
                      = remove couleur du joueur adverse


*/


/* *** Fonction qui retourne les pions *** */

/* 
on retourne les pions entre la position de départ et la position du pion final (entre les 2 pions du joueur)
        class du pion = add couleur du joueur
                      = remove couleur du joueur adverse


pion départ
pion arrivée
direction ligne
direction colonne

*/








/* *** VERIFIER SI CASE EST JOUABLE *** */

/* 
si toutes les positions autour de la case sont vides ==> on ne peut pas jouer

Pour chaque direction
    si le pion de la case est de la couleur du joueur
        si on avait des pions de l'adversaire avant ==> la direction est jouable
        si on n'avait pas de pion de l'adversaire avant ==> la direction n'est pas jouable

    si le pion est de la couleur de l'adversaire
        on vérifie la position suivante dans la direction

        si la direction est true ==> on peut jouer sur cette case
        si la direction est false ==> on en peut pas jouer la case



*/






/* ### anciennes fonctions plus utilisées ### */

function jouerCase_Old(){

    //mettre condition pour vérifier que la case est jouable ou non

    if(this.classList.contains("vide")==true){
        //console.log('je peux jouer');
        // si la condition est jouable
        this.classList.remove("vide");
        this.classList.add(joueur);

        if(joueur=="noir"){
            this.classList.remove("blanc");
            joueur="blanc";
        } else {
            this.classList.remove("noir");
            joueur="noir";
        }
        
        //appel à une fonction qui retourne les pions
        //console.log("je dois retourner les pions");
        verifieValidationPositionJouer(this);

        //afficher un message pour dire à quel joueur de jouer
        document.getElementById('messageText').innerHTML = `C'est au tour de ${joueur} de jouer`;

        //on calcul le score pour l'afficher en temps réel
        calculScore();
    }
   
}



function verifieValidationPositionJouer_Old(pion) {

//let positionPion = parseInt((pion.id).substring(4, 6));
let positionPion=Array.from(pion.id);
positionPion.splice(0, 4);
positionPion[0]=parseInt(positionPion[0]);
positionPion[1]=parseInt(positionPion[1]);

/* 
position 1 ==> ligne = -1 colonne = -1 ==> -11
position 2 ==> ligne = -1 colonne = 0 ==> -10
position 3 ==> ligne = -1 colonne = +1 ==> -9 
position 4 ==> ligne = 0 colonne = +1 ==> +1 
position 5 ==> ligne = +1 colonne = +1 ==> +11
position 6 ==> ligne = +1 colonne = 0 ==> +10
position 7 ==> ligne = +1 colonne = -1 ==> +9
position 8 ==> ligne = 0 colonne = -1 ==> -1
*/

//let deplacement = [-11, -10, -9, 1, 11, 10, 9, -1];
let deplacement = [ [-1,-1], 
                    [-1,0], 
                    [-1,1], 
                    [0,1],
                    [1,1], 
                    [1,0], 
                    [1,0], 
                    [0,-1] 
                ];

let verification = true;

//console.log(positionPion);

//position 1 ==> tant que position est possible
for (let i = 0; i< deplacement.length; i++) {
    let nbPionCouleurJoueur=0;
    let nbPionCouleurAdversaire=0;
    verification = true;

    let positionPionSuivant=[positionPion[0]+deplacement[i][0], positionPion[1]+deplacement[i][1]];

    //console.log(positionPionSuivant);

    while(verification==true) {
        console.log(`pion${positionPionSuivant[0]}${positionPionSuivant[1]}`);
        verification = false;

       /* if(`pion${positionPionSuivant[0]}${positionPionSuivant[1]}`){
            positionPionSuivant=[positionPion[0]+deplacement[i][0], positionPion[1]+deplacement[i][1]];   
            
        }  */     

    }


}


/*Pour chaque direction
    pionCouleurJoueur=0;
    pionCouleurAdversaire=0;
    position départ = position du pion

    verification = true
    position = 1

    tant que vérification = true

        si position = bord du cadre
            verification = false

        si position n'a pas de pion 
            verification = false

        si couleur du pion à la position = couleur joueur
            pionCouleurJoueur+=1;
            verification = false

        si couleur du pion à la position = couleur adversaire
            pionCouleurAdversaire+=1
            position + 1
            verification = true
*/


/* *** VERIFIER SI CASE EST JOUABLE *** */

/* 
si toutes les positions autour de la case sont vides ==> on ne peut pas jouer

Pour chaque direction
    si le pion de la case est de la couleur du joueur
        si on avait des pions de l'adversaire avant ==> la direction est jouable
        si on n'avait pas de pion de l'adversaire avant ==> la direction n'est pas jouable

    si le pion est de la couleur de l'adversaire
        on vérifie la position suivante dans la direction

        si la direction est true ==> on peut jouer sur cette case
        si la direction est false ==> on en peut pas jouer la case

*/


/* 
on retourne les pions entre la position de départ et la position du pion final (entre les 2 pions du joueur)
        class du pion = add couleur du joueur
                      = remove couleur du joueur adverse


pion départ
tableau avec les positions des pions joueurs
tableau avec les positions des pions de l'adversaire

pour chaque case du tableau des pions joueur


    si caseJoueur est vide
        on ne peut pas retourner

    si caseJoueur n'est pas vide et caseAdversaire est vide
        on ne peut pas retourner

    si caseJoueur n'est pas vide et caseAdversaire n'est pas vide
        on peut retourner
        on retourne chaque pion du tableau Adversaire
        les positions dans la grille deviennent de la couleur du joueur
        class du pion = add couleur du joueur
                      = remove couleur du joueur adverse


*/