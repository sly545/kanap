// Récupération de l'ID du produit depuis l'URL
let params = new URL(document.location).searchParams;
let ID = params.get("ID");

// Fonction principale pour récupérer les détails du produit depuis l'API
function fetchkanap() {
  // Appel à l'API pour obtenir les informations du produit
  fetch(`http://localhost:8888/api/products/${ID}`)
    .then(convertJSON) // Convertit la réponse en JSON
    .then(function (dataFromAPI) {
      // Extraction des données du produit depuis la réponse de l'API
      const namekanap = dataFromAPI.name;
      const descriptionduKANAP = dataFromAPI.description;
      const descriptionALT = dataFromAPI.altTxt;
      const photo = dataFromAPI.imageUrl;
      const balisephoto = document.getElementById("ok");
      const selectioncolor = document.getElementById("colors");
      const prix = dataFromAPI.price;
      
      // Sélection des éléments du DOM nécessaires
      const ajoutpanier = document.getElementById("addToCart");
      const Idform = document.getElementById("quantity");
      const choiceColors = document.getElementById("colors");

      // Création et configuration de l'image du produit
      let images = document.createElement("img");
      images.setAttribute("src", photo);
      images.setAttribute("alt", descriptionALT);

      // Affichage des différentes couleurs disponibles pour le produit
      let colorsK = dataFromAPI.colors;
      colorsK.forEach((color) => {
        let option = document.createElement("option");
        option.textContent = color;
        selectioncolor.appendChild(option);
      });

      // Affichage des informations du produit dans le DOM
      title.textContent = namekanap;
      description.textContent = descriptionduKANAP;
      price.textContent = prix;
      balisephoto.appendChild(images);

      // Gestionnaire d'événements pour ajouter le produit au panier
      ajoutpanier.addEventListener("click", () => {
        // Création de l'objet représentant le produit sélectionné
        const optionProduit = {
          name: namekanap,
          identification: ID,
          colors: choiceColors.value,
          quantity: Idform.value,
          prix: prix,
          imageduKanap: photo,
          descrptionPhoto: descriptionALT,
        };

        // Récupération du panier depuis le localStorage
        let produitEnregistrerDansLocalStorage = JSON.parse(localStorage.getItem("produit"));
        
        // Gestion de l'ajout ou de la mise à jour du produit dans le panier
        if (produitEnregistrerDansLocalStorage) {
          // Recherche du produit dans le panier
          const produitTrouve = produitEnregistrerDansLocalStorage.find(product =>
            product.identification === ID && product.colors === choiceColors.value);

          // Mise à jour de la quantité si le produit est déjà présent
          if (produitTrouve) {
            produitTrouve.quantity = parseInt(produitTrouve.quantity) + parseInt(Idform.value);
          } else {
            // Ajout d'un nouveau produit dans le panier
            produitEnregistrerDansLocalStorage.push(optionProduit);
          }

          // Mise à jour du localStorage avec le panier modifié
          localStorage.setItem("produit", JSON.stringify(produitEnregistrerDansLocalStorage));
        } else { 
          // Création du panier avec le premier produit si le panier est vide
          produitEnregistrerDansLocalStorage = [optionProduit];
          localStorage.setItem("produit", JSON.stringify(produitEnregistrerDansLocalStorage));
        }

        // Affichage de la notification de l'ajout au panier
        showNotification('Le canapé a été ajouté au panier');
      });
    });
}

// Fonction pour afficher une notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerText = message;
  document.body.appendChild(notification);

  // Suppression de la notification après un délai
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Fonction pour convertir la réponse de l'API en JSON
function convertJSON(responseJSON) {
  if (responseJSON.ok) {
    return responseJSON.json();
  }
}

// Appel initial pour charger les données du produit
fetchkanap();
