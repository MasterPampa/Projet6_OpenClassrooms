const afficherModale = document.getElementById('afficherModale');
const modale = document.getElementById('modale');
const fermerCroix = document.querySelectorAll('.fa-xmark');
const fenetreModale = document.querySelector('.modale__window');
const modaleGallery = document.getElementById('galleryModale');

afficherModale.addEventListener('click', function(){
    modale.style.visibility = 'visible';
    modaleGallery.innerHTML="";
    afficherProjets();
    fenetreModale.style.visibility = 'visible';
    getChoixCategories();
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

        supprIcone.addEventListener('click', function(e) {
            const projetId = e.target.parentNode.id;
            projetSupprId = projetId;
            suppressionProjet();
        });
    };
};

let galleryModale = document.getElementById('galleryModale');
let projetSupprId = "";


const ajoutProjetBouton = document.getElementById('ajoutProjetBouton');
const ajoutProjetModale = document.getElementById('ajoutProjetModale');
let ajoutProjetVisible = ajoutProjetModale.style.visibility='hidden';

ajoutProjetBouton.addEventListener('click', function(){
    fenetreModale.style.visibility ='hidden';
    ajoutProjetModale.style.visibility='visible';
});

if (ajoutProjetVisible.visibility = 'visible'){
    const boutonRetour = document.getElementById('retour');
    boutonRetour.addEventListener('click', function(){
        ajoutProjetModale.style.visibility = 'hidden';
        fenetreModale.style.visibility = 'visible';
        unloadPreview();
        miseAJourPage();
    });
};

function fermerModale(){
    modale.style.visibility = 'hidden';
    ajoutProjetModale.style.visibility = 'hidden';
    fenetreModale.style.visibility = 'hidden';
    unloadPreview();
};

//////////////////////////Suppression Projet////////////////////////////////////////
const accessToken = sessionStorage.getItem('accessToken');

async function suppressionProjet() {
    
    const response = await fetch('http://localhost:5678/api/works/'+projetSupprId, {
        method:'DELETE',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });
    miseAJourPage();
};
async function miseAJourPage() {
    modaleGallery.innerHTML = "";
    await fetchData();
    afficherProjets();
}
//////////////////////////Affichage dynamique des catégories////////////////////////

let choixCategorieListe = document.getElementById('choixCategories');
let categories = "";

function getChoixCategories(){

    choixCategorieListe.innerHTML = '';
    const optionVide = document.createElement("option");
    choixCategorieListe.appendChild(optionVide);

    for (let i = 0; i < categoriesListe.length; i++) {
        
        categories = categoriesListe[i];
        const selectionCategorie = document.createElement("option");
        choixCategorieListe.appendChild(selectionCategorie);
        selectionCategorie.value = categories.id;
        selectionCategorie.textContent = categories.name;
    };
};


/////////////////////////Preview de l'image chargé/////////////////////////////////

const previewContainer = document.getElementById("imagePreviewContainer");
previewContainer.style.visibility = 'hidden';

const input = document.getElementById('inputLink');
const preview = document.getElementById("imagePreview");
const boutonUpload = document.getElementById('boutonUpload');

function previewImage() {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
      };
        fichierChargé = 1;
        reader.readAsDataURL(input.files[0]);
        previewContainer.style.visibility = 'visible';
    } else {
        preview.src = "#";
        previewContainer.style.visibility = 'hidden';
        fichierChargé = "";

    };
};

function unloadPreview(){
    input.value = '';
    preview.src = '';
    previewContainer.style.visibility = 'hidden';
    fichierChargé = "";

};

///////////////////////Validation Formulaire d'envoi///////////////////////////////////////////////////////////////////

const titreProjet = document.getElementById('titreProjet');
const envoiProjet = document.getElementById('envoiProjet');
let fichierChargé = "";
let titreChargé = "";
let categorieChargé = "";

async function formulaireValide (){
    if( fichierChargé === 1 && titreChargé === 1 && categorieChargé === 1 ){
        envoiProjet.style.backgroundColor = '#1D6154';
        console.log("formulaire complet");
        envoiProjetServeur();
    }else{
        console.log("formulaire non valide")
        console.log(fichierChargé);
        console.log(titreChargé);
        console.log(categorieChargé);
        envoiProjet.style.backgroundColor = '#A7A7A7';
    };
};

titreProjet.addEventListener('input', function() {
    if (titreProjet.value.trim() !== '') {
        titreChargé = 1;
        formulaireValide();
        console.log("titre chargé");
    } else {
        titreChargé = 0;
        console.log("titre non valide");
        formulaireValide();
    };
});
input.addEventListener('change', function(){
    if (input.files && input.files[0]){
        fichierChargé = 1;
        formulaireValide();
        console.log("fichier chargé");
    }else{
        fichierChargé = 0;
        formulaireValide();
        console.log("fichier dechargé");
    };
});
choixCategorieListe.addEventListener('change', function(){
    if(choixCategorieListe.value !== ""){
        categorieChargé = 1;
        console.log(choixCategorieListe.value);
        formulaireValide();
    }else{
        categorieChargé = 0;
        formulaireValide();
        console.log("catégorie déchargé");
    };
});

function envoiProjetServeur() {
    envoiProjet.addEventListener('click', async function boutonActif(e) {
        e.preventDefault();

        const formData = new FormData(document.getElementById('formulaireUpload'));
        formData.append("image", input.files[0]);
        formData.append("title", titreProjet.value.trim());
        formData.append("category", choixCategorieListe.value);

        const demande = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            body: formData,
        });

        titreProjet.value = "";
        choixCategorieListe.value = "";
        titreChargé = "";
        categorieChargé = "";
        envoiProjet.style.backgroundColor = '#A7A7A7';

        unloadPreview();
        formulaireValide();
        modaleGallery.innerHTML = "";
        galleryModale.innerHTML = "";
        fetchData();
        afficherProjets();
        getChoixCategories();

        // Supprime l'événement click du bouton d'envoi
        envoiProjet.removeEventListener('click', boutonActif);
    });
}
