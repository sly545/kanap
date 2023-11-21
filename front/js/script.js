/**
 * Fonction d'appel à l'API
 * Recup tous les produits (canapés) 
 */
function fetchKanap() {
  // On effectue un call à une API
  // => On envoie une requete à une API pour lui demander des informations
  fetch("https://kanap-production-48f2.up.railway.app/") // On déclenche la requete sur l'URL suivante (= endpoint => là où notre API nous délivre des données)
    .then(convertJSON)
    .then(insertProductsOnDOM);
};

/**
 *    
 * @param { Json } responseJSON 
 * @returns { Array }
 */
function convertJSON(responseJSON) {
  // Ici, une fois que la requete est effectuée
  // On reçoit dans ce bloc then, là réponse de l'API au format JSON

  // Si la réponse de l'API est ok
  if (responseJSON.ok) {
    // On retourne la réponse de l'API (qui est au format JSON)
    // dans un format que JS va pouvoir utiliser pour travailler (un tableau d'objet JS)
    return responseJSON.json();
  }
};

/**
 * Description simple et claire du but de la fontion
 * @param { Array } dataFromAPI 
 */
function insertProductsOnDOM(dataFromAPI) {
  // console.log(dataFromAPI);
  //boucle sur l'api  
  dataFromAPI.forEach(createProduct);
}


function createProduct(item) {
  // Recup des données dans des variables
  const name = item.name;
  const identifient = item._id;
  const desriptifkanap = item.altTxt;
  const descrpit = item.description;
  const visuel = item.imageUrl;

  // Recup l'element HTML où inserer la liste des produits dans le DOM
  const items = document.getElementById("items");

  //console.log(name,identifient,desriptifkanap,descrpit,visuel);
  //creation des elements du dom
  const newlien = document.createElement("a");
  const neawarticle = document.createElement("article");
  const namekanap = document.createElement("h3");
  const images = document.createElement("img");
  const paragraphe = document.createElement("p");
  // Création du lien vers la page détail de produit avec l'id du canapé
  const joined = `./product.html?ID=${identifient}`;

  //console.log(newlien,neawarticle,images,paragraphe,namekanap);
  //ajout des class
  namekanap.classList.add("productName");
  paragraphe.classList.add("productDescription");
  //ajout du texte
  paragraphe.textContent = descrpit;
  namekanap.textContent = name;
  images.textContent = visuel;
  //ajout des atributs
  newlien.setAttribute("href",joined);
  newlien.setAttribute("id", identifient);
  images.setAttribute("src", visuel);
  images.setAttribute("alt", desriptifkanap);
  //indentation de la structur html
  neawarticle.appendChild(images);
  neawarticle.appendChild(namekanap);
  neawarticle.appendChild(paragraphe);
  newlien.appendChild(neawarticle);

  // Insertion dans le DOM
  items.appendChild(newlien);
}


// Appel à la fonction
fetchKanap();
