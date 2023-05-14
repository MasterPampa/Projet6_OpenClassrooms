let resultats=[];
let categoriesListe=[];
const logged = sessionStorage.getItem('accessToken');
let sectionGallery ="";

/////////////// Récupération et traitement des données serveur //////////////

async function fetchData() {
    const response = await fetch("http://localhost:5678/api/works");
    const responseCat = await fetch("http://localhost:5678/api/categories");
    resultats = await response.json();
    categoriesListe = await responseCat.json();
    
    sectionGallery.innerHTML="";
    getGallery(resultats);
    
    if (logged === null){
        getCategories(categoriesListe);
    }
}
fetchData();

////////////////// Affichage de la gallerie /////////////////////////////

async function getGallery(resultats) {

    for (let i = 0; i < resultats.length; i++){

        const travaux = resultats[i];

        sectionGallery = document.querySelector(".gallery");
        const figureElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = travaux.imageUrl;
        const figcaptionElement = document.createElement('figcaption');
        figcaptionElement.textContent = travaux.title;

        sectionGallery.appendChild(figureElement)
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);
    };
};

///////////////// Données des catégories et filtres ////////////////////////////

function getCategories(categoriesListe) {
    for (let i = 0; i < categoriesListe.length; i++) {
        let categories = categoriesListe[i];

        const sectionCategories = document.querySelector(".filter");
        const filterElement = document.createElement("div");

        filterElement.id = "" + categories.id;
        filterElement.classList.add("bouton");
        filterElement.textContent = categories.name;

        sectionCategories.appendChild(filterElement);
    };
    filterGallery();
};

function filterGallery(){
    
    const filtreBouton = document.querySelectorAll('.bouton');

    filtreBouton.forEach(bouton => {

        bouton.addEventListener('click', function() {
            const clickedId = bouton.id;
            filtreBouton.forEach(bouton => {
                bouton.classList.remove('selection');
            });

            if (clickedId === "filterAll") {
                document.querySelector(".gallery").innerHTML = "";
                bouton.classList.add('selection');
                getGallery(resultats);
            } else {    
                let imagesFiltrees = resultats.filter(function (image){
                    return image.categoryId == clickedId;
                });
                bouton.classList.add('selection');
                document.querySelector(".gallery").innerHTML ="";
                getGallery(imagesFiltrees);
            };
        });
    });
};
