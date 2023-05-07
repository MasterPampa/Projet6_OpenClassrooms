async function getGallery() {

const reponse = await fetch("http://localhost:5678/api/works");
const resultats = await reponse.json();
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
getGallery();