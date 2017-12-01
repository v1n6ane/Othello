/* ### INITIALISER LES VARIABLES DU JEU ### */
let indiceJoueur,
    joueur=["noir", "blanc"],
    celluleVide=0, 
    grilleOthello = [],
    partieEnCours=false;


/* ### INITIALISER LE PLATEAU DE JEU ### */

function verifPartieEnCours(){
    //verifier qu'une partie n'est pas en cours
    if (partieEnCours==true) {

        //demander aux joueurs si'ils sont sur de vouloir recommencer une nouvelle partie
        if(confirm("Une partie est en cours, êtes vous sur de vouloir recommencer ?")){
            creerNouveauJeuOthello()
        } else {
            console.log("vous pouvez continuer la partie");
        }

    } else {
        creerNouveauJeuOthello()
    }

}


function creerNouveauJeuOthello(){

    //créer la grille sur le document
    creerGrilleDocument(); 

    //créer la grille dans le code
    creerGrilleTableau();
   
    //calculer les scores initiaux et les afficher
    celluleVide=calculScore();

    //initier le premier joueur à noir
    indiceJoueur=0;
    partieEnCours=true;

    document.getElementById('messageText').innerHTML = `${joueur[indiceJoueur].toUpperCase()} doit jouer pour démarrer la partie`;

    return indiceJoueur;

}


/* *** Fonction qui créer la grille sur le document *** */
function creerGrilleDocument(){
     //supprimer grille du document si existante
    supprimerElementEnfant("plateauJeu");

    //recreer la grille sur le document
    let plateauJeu=document.getElementById("plateauJeu");
    
    let table=document.createElement("table");
    let tbody=document.createElement("tbody");
    
    for(let i=0;i<8;i++) {
        let tr=document.createElement("tr")
        
        for (let j=0;j<8;j++) {
            let td=document.createElement("td");
            td.setAttribute("class", `ligne${i} colonne${j}`);
            
            let pion=document.createElement("div");
            pion.setAttribute("id", `pion${i}${j}`);


            /* initialiser le jeu central */
            if(`pion${i}${j}`=="pion33" || `pion${i}${j}`=="pion44"){
                pion.setAttribute("class", "pion blanc");
            }

            else if(`pion${i}${j}`=="pion34" || `pion${i}${j}`=="pion43"){
                pion.setAttribute("class", "pion noir");
            }

            else {
                pion.setAttribute("class", "pion vide");
            }
            
            td.appendChild(pion);
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
        
    }

    table.appendChild(tbody);
    plateauJeu.appendChild(table);


    //rendre les cases du document cliquable
    rendreCaseCliquableDocument();    

}

/* *** Fonction qui créer la grille dans le code - Grille qui sera complétée et lue pendant le code *** */
function creerGrilleTableau(){
    grilleOthello = [ ["","","","","","","",""],
                      ["","","","","","","",""],
                      ["","","","","","","",""],
                      ["","","","","","","",""],
                      ["","","","","","","",""],
                      ["","","","","","","",""],
                      ["","","","","","","",""],
                      ["","","","","","","",""] ];

    grilleOthello[3][3]="blanc";
    grilleOthello[4][4]="blanc";
    grilleOthello[3][4]="noir";
    grilleOthello[4][3]="noir";

    //console.log(grilleOthello);

}


/* *** Fonction qui efface le tableau du jeu dans le document *** */
function supprimerElementEnfant(id){

    let element = document.getElementById(id);
    
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

}


/* *** Rendre les cases du plateau de jeu cliquable *** */
function rendreCaseCliquableDocument(){
    for(let i=0;i<8;i++) {        
        for (let j=0;j<8;j++) {
            document.getElementById(`pion${i}${j}`).addEventListener('click', jouerCase, false);
        }
    }
}