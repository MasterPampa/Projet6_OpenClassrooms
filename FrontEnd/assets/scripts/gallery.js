let resultats=[];
let categoriesListe=[];

async function fetchData() {
    const response = await fetch("http://localhost:5678/api/works");
    resultats = await response.json();
    const responseCat = await fetch("http://localhost:5678/api/categories");
    categoriesListe = await responseCat.json();
    
    getGallery(resultats);
    getCategories(categoriesListe);
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
        filterElement.classList.add("button");
        filterElement.textContent = categories.name;

        sectionCategories.appendChild(filterElement);
    }
    filterGallery();
}

function filterGallery(){
    
    const filterButtons = document.querySelectorAll('.button');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const clickedId = button.id;
            console.log('Clicked ID:', clickedId);
            if (clickedId === "filterAll") {
                document.querySelector(".gallery").innerHTML = "";
                getGallery(resultats);
            } else {    
                let imagesFiltrees = resultats.filter(function (image){
                    return image.categoryId == clickedId;
                });
                console.log(imagesFiltrees);
                document.querySelector(".gallery").innerHTML ="";
                getGallery(imagesFiltrees);
            }
        });
    });
}
