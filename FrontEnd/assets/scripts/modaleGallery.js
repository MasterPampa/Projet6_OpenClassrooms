const afficherModale = document.getElementById('afficherModale');
const modale = document.getElementById('modale');
const fermerCroix = document.querySelector('.fa-xmark');
const fenetreModale = document.querySelector('.modale__window');

afficherModale.addEventListener('click', function(){
    modale.style.visibility = 'visible';
    document.getElementById('galleryModale').innerHTML="";
    afficherProjets();
});
fermerCroix.addEventListener('click', function(){
});
modale.addEventListener('click',function(e){
    if (e.target === modale ){
        modale.style.visibility = 'hidden';
    }
});



function afficherProjets(){
    const modaleGallery = document.getElementById('galleryModale');


    for (let i = 0; i < resultats.length; i++){

        const travaux = resultats[i];

        const figureModale = document.createElement('figure');
        const modaleGalleryImage = document.createElement('img');
        const editImage = document.createElement('figcaption');
        editImage.textContent = "éditer";
        
        const supprIcone = document.createElement('i');
        supprIcone.classList.add('fa-solid', 'fa-trash-can', 'fa-sm', 'icone');
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