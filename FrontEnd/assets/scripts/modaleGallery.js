const afficherModale = document.getElementById('afficherModale');
const modale = document.getElementById('modale');
const fermerCroix = document.querySelectorAll('.fa-xmark');
const fenetreModale = document.querySelector('.modale__window');
const modaleGallery = document.getElementById('galleryModale');

afficherModale.addEventListener('click', function(){
    modale.style.visibility = 'visible';
    document.getElementById('galleryModale').innerHTML="";
    afficherProjets();
    fenetreModale.style.visibility = 'visible';
});

fermerCroix.forEach(element => {
    element.addEventListener('click', function(){
        fermerModale()
    });
});

modale.addEventListener('click',function(e){
    if (e.target === modale ){
        fermerModale()
    }
});


let supprIcone = "";
function afficherProjets(){

    for (let i = 0; i < resultats.length; i++){

        const travaux = resultats[i];

        const figureModale = document.createElement('figure');
        const modaleGalleryImage = document.createElement('img');
        const editImage = document.createElement('figcaption');
        editImage.textContent = "éditer";
        
        supprIcone = document.createElement('i');
        supprIcone.classList.add('fa-solid', 'fa-trash-can', 'fa-sm', 'icone');
        figureModale.id = travaux.id;
        const flecheIcone = document.createElement('i');
        flecheIcone.classList.add('fa-solid', 'fa-arrows-up-down-left-right', 'fa-sm','icone','fleche');
    

        modaleGalleryImage.src = travaux.imageUrl;
        modaleGallery.appendChild(figureModale);
        figureModale.appendChild(modaleGalleryImage);
        figureModale.appendChild(editImage);
        figureModale.appendChild(supprIcone);
        figureModale.appendChild(flecheIcone);

    }
}

let galleryModale = document.getElementById('galleryModale');
let projetSupprId = "";

galleryModale.addEventListener('click', function(e) {
  if (e.target.classList.contains('fa-trash-can')) {
    const projetId = e.target.parentNode;
    projetSupprId = projetId.id;
    suppressionProjet();
  }
});

const ajoutProjetBouton = document.getElementById('ajoutProjetBouton');
const ajoutProjetModale = document.getElementById('ajoutProjetModale');
let ajoutProjetVisible = ajoutProjetModale.style.visibility='hidden';

ajoutProjetBouton.addEventListener('click', function(){
    fenetreModale.style.visibility ='hidden';
    ajoutProjetModale.style.visibility='visible';
});

if (ajoutProjetVisible.visibility = 'visible'){
    const boutonRetour = document.getElementById('retour');
    console.log(boutonRetour);
    boutonRetour.addEventListener('click', function(){
        ajoutProjetModale.style.visibility = 'hidden';
        fenetreModale.style.visibility = 'visible';
    });
};

function fermerModale(){
    modale.style.visibility = 'hidden';
    ajoutProjetModale.style.visibility = 'hidden';
    fenetreModale.style.visibility = 'hidden';
}