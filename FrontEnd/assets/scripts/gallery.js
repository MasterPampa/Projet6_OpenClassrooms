let resultats=[];
let categoriesListe=[];
const logged = sessionStorage.getItem('accessToken');

async function fetchData() {
    const response = await fetch("http://localhost:5678/api/works");
    resultats = await response.json();
    const responseCat = await fetch("http://localhost:5678/api/categories");
    categoriesListe = await responseCat.json();
    
    getGallery(resultats);
    if (logged === null){
        getCategories(categoriesListe);
    }
}
fetchData();

function getGallery(resultats) {
    for (let i = 0; i < resultats.length; i++){

        const travaux = resultats[i];

        const sectionGallery = document.querySelector(".gallery");
        const figureElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = travaux.imageUrl;
        const figcaptionElement = document.createElement('figcaption');
        figcaptionElement.textContent = travaux.title;

        sectionGallery.appendChild(figureElement)
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);
    }
}

function getCategories(categoriesListe) {
    for (let i = 0; i < categoriesListe.length; i++) {
        let categories = categoriesListe[i];

        const sectionCategories = document.querySelector(".filter");
        const filterElement = document.createElement("div");

        filterElement.id = "" + categories.id;
        filterElement.classList.add("bouton");
        filterElement.textContent = categories.name;

        sectionCategories.appendChild(filterElement);
    }
    filterGallery();
}

function filterGallery(){
    
    const filtreBouton = document.querySelectorAll('.bouton');

    filtreBouton.forEach(bouton => {

        bouton.addEventListener('click', function() {
            const clickedId = bouton.id;
            console.log('Clicked ID:', clickedId);

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
                console.log(imagesFiltrees);
                document.querySelector(".gallery").innerHTML ="";
                getGallery(imagesFiltrees);
            }
        });
    });
}
