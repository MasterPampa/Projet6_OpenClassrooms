let resultats=[];

async function getGallery(resultats) {

    const reponse = await fetch("http://localhost:5678/api/works");
    resultats = await reponse.json();
    console.log(resultats);

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
getGallery(resultats);

////////////////////////////////////////////////////////////////////////////////////////////////////

async function getCategories() {
    const reponse = await fetch("http://localhost:5678/api/categories");
    categoriesListe = await reponse.json();

    for (let i = 0; i < categoriesListe.length; i++){

        categories = categoriesListe[i];

        const sectionCategories = document.querySelector(".filter");

        const filterElement = document.createElement("div");

        filterElement.id = "" + categories.id;
        filterElement.classList.add("filter__buttons");
        filterElement.textContent = categories.name;

        sectionCategories.appendChild(filterElement);
    }
}
getCategories();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.addEventListener('load', function() {

    const filterButtons = document.querySelectorAll('.filter__buttons');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const clickedId = button.id;
            console.log('Clicked ID:', clickedId);

            let imagesFiltrees = resultats.filter(function (image){
                return image.categoryId == clickedId;
            });
            document.querySelector(".gallery").innerHTML ="";
            getGallery(imagesFiltrees);
        });
    });
});