let produitEnregistrerDansLocalStorage = JSON.parse(
  localStorage.getItem("produit")
);

// calcul du prix totale de la commande.
let pricomande = 0;
let totalQty = 0;
produitEnregistrerDansLocalStorage.forEach((items) => {
  pricomande = pricomande + items.quantity * items.prix;
  totalQty += items.quantity;
});

// boucle pour recuperer les differents canaper du local storage

produitEnregistrerDansLocalStorage.forEach((items) => {
  //constent recuperer du ou des canape du local storage.
  const name = items.name;
  let prix = items.prix;
  const couleur = items.colors;
  let quantiter = items.quantity;
  const ID = items.identification;
  const visuelKanap = items.imageduKanap;
  const descrptionPhoto = items.descrptionPhoto;
  const number = "number";
  const min = "1";
  const max = "100";
  const apelParents = document.getElementById("cart__items");
  const contenerprixcommande = document.getElementById("totalPrice");
  const prixmultiple = prix * quantiter;
  
  // selecteure pour le formulaire de commmande
  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
  let address = document.getElementById("address");
  let city = document.getElementById("city");
  let email = document.getElementById("email");
  let order = document.getElementById("order");
  
  




 
  // Création des diffèrrent élement html de la pages.
  let identificationKanpCouleurKanap = document.createElement("article");
  identificationKanpCouleurKanap.classList.add("cart__item");
  identificationKanpCouleurKanap.setAttribute("data-id", ID);
  identificationKanpCouleurKanap.setAttribute("data-color", couleur);
  let images = document.createElement("img");
  let divcontenerImage = document.createElement("div");
  divcontenerImage.classList.add("cart__item__img");
  images.setAttribute("src", visuelKanap);
  images.setAttribute("alt", descrptionPhoto);
  let contenereferenceProdutit = document.createElement("div");
  contenereferenceProdutit.classList.add("cart__item__content");
  let referenceProduit = document.createElement("div");
  referenceProduit.classList.add("cart__item__content__description");
  let nomKananSelection = document.createElement("h2");
  nomKananSelection.textContent = name;
  let couleureSelection = document.createElement("p");
  couleureSelection.textContent = couleur;
  let prixKanapSelction = document.createElement("p");
  prixKanapSelction.textContent = prixmultiple;
  let divcontenerSeting = document.createElement("div");
  divcontenerSeting.classList.add("cart__item__content__settings");
  let divcontenersetingQantity = document.createElement("div");
  divcontenersetingQantity.classList.add("cart__item__content__settings__quantity");
  let quantytiSelctect = document.createElement("p");
  quantytiSelctect.textContent = quantiter;
  //Ajout des diffrents attribut des balise HTML.
  let inuputchange = document.createElement("input");
  inuputchange.classList.add("itemQuantity");
  inuputchange.setAttribute("type", number);
  inuputchange.setAttribute("name", name);
  inuputchange.setAttribute("min", min);
  inuputchange.setAttribute("max", max);
  inuputchange.setAttribute("value", quantiter);
  let divContenersupretion = document.createElement("div");
  divContenersupretion.classList.add("cart__item__content__settings__delete");

  let divsupretion = document.createElement("p");
  divsupretion.classList.add("deleteItem");
  divsupretion.textContent = "Supprimer";
  contenerprixcommande.textContent = pricomande;


  //appel des element qui permet l'affigage des produit sur le dom.
  apelParents.appendChild(identificationKanpCouleurKanap);
  identificationKanpCouleurKanap.appendChild(divcontenerImage);
  identificationKanpCouleurKanap.appendChild(contenereferenceProdutit);
  contenereferenceProdutit.appendChild(referenceProduit);
  identificationKanpCouleurKanap.appendChild(divcontenerSeting);
  identificationKanpCouleurKanap.appendChild(divContenersupretion);
  divcontenerImage.appendChild(images);
  contenereferenceProdutit.appendChild(nomKananSelection);
  contenereferenceProdutit.appendChild(couleureSelection);
  contenereferenceProdutit.appendChild(prixKanapSelction);
  divcontenerSeting.appendChild(divcontenersetingQantity);
  divcontenerSeting.appendChild(divContenersupretion);
  divContenersupretion.appendChild(divsupretion);
  divcontenersetingQantity.appendChild(quantytiSelctect);
  divcontenersetingQantity.appendChild(inuputchange);


  //------------------------------//
  //fonction permettant de modifier la quantiter des canaper

  inuputchange.addEventListener("change", () => {
   //utilisation de fonction find pour changer la quantier du canaper
    const produitTrouve = produitEnregistrerDansLocalStorage.find(function (
      product
    ) {
      return product.identification === ID && product.quantity;
      //"LA COULEUR DU PRODUIT QU'OIN RAJOUTE DANS LE PANIER"; "L'ID DU PRODUIT QU'OIN RAJOUTE DANS LE PANIER"
    });
    console.log(produitTrouve);

    produitTrouve.quantity = inuputchange.value;
    console.log(produitTrouve);
     
    localStorage.setItem(
      "produit",
      JSON.stringify(produitEnregistrerDansLocalStorage)
    );
    //On recharge la page pour que la nouvelle quantiter soit affichez.
    window.location.href = "cart.html";
  });

  //--------------------------------------------------------//
  //evenement au click pour suprimer //

  divsupretion.addEventListener("click", () => {
    let produitTrouve = produitEnregistrerDansLocalStorage.find(function (
      product
    ) {
      return product.identification === ID && product.quantity;
      //"LA COULEUR DU PRODUIT QU'OIN RAJOUTE DANS LE PANIER"; "L'ID DU PRODUIT QU'OIN RAJOUTE DANS LE PANIER"
    });
    //console.log(produitTrouve);
    

    // selection du produit qui doit être suprimer
    let produitAsuprimer = produitTrouve;
    
    //je suprime le produit du local Storage
    produitTrouve = produitEnregistrerDansLocalStorage.filter(
      (el) => el !== produitAsuprimer
    );
    //console.log(produitTrouve);

    localStorage.setItem("produit", JSON.stringify(produitTrouve));
    // On recharge la page pour que le produit suprimer disparaisse.
    window.location.href= "cart.html"
  });

//------------------------//
// ecoute de l'evenent au click pour verifier les info du client et pour recuperer le numero de commande.//

  order.addEventListener("click", (e) => {
    e.preventDefault(e);
    adresseControle();
    prenonNonVilleControle();
    mailControle();
   
   
  //creation des difrents champs pour l'api
   const products = [
    {
      id: ID,
      price: prix,
      couleur : couleur,
      nom : name,
    },
  ];

  //map du produit pour pouvoir repondre à la demande de l'api.
  const idProduct = products.map(product => {
    return product.id;
  });

  //objet client 
  const object = {
    contact: {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email:city.value,
  },
   products: idProduct,
  
};

//post sur l'api 

 const options = fetch(`http://localhost:8888/api/products/order`, {
    method: "POST",
    body: JSON.stringify(object),
    headers: { "Content-Type": "application/json" },
});
  console.log(options);
 
  //récupération du numero de commande et envoie sur la page confirmation.
  options.then(async(response)=>{
    try{

      console.log("response");
      console.log(response);

      const contenu = await response.json(); window.location.href = `./confirmation.html?orderid=${contenu.orderId}`;
      console.log("contenu");
      console.log(contenu);
    }catch{
      console.log(e);
    }
  })
  
  

});

  



  // fonction qui controle le prenon et la ville 
  function prenonNonVilleControle(){

    const controlePrenon = firstName.value;
    const controleNom = lastName.value;
    const controleVille = city.value;
    //controle du prenon
    if (/^[A-Za-z]{3,20}$/g.test(controlePrenon,controleNom,controleVille)) {
      //console.log("ok");
    } else {
      //console.log("ko");
      alert("les champs prenom nom et ville ne doivent pas comptenir de numero");
      window.location.href= "cart.html"
    }
    
  }
//fonction qui controle le mail
  function mailControle(){
  
    const verifeMail = email.value;
    //controle du prenon
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(verifeMail)) {
    
    } else {
      console.log("ko");
      alert("mail invalide");
      window.location.href= "cart.html"
    }
    
  }
  //fonction qui controle l'adresse postal
  function adresseControle(){
  
    const verifadresse =address.value;
    //controle de l'adresse.
    if (/^[A-Za-z0-9\s]{5,50}$/g.test(verifadresse)) {
    
    } else {
      console.log("ko");
      alert("le champs adresse ne doit pas comptenire de ponctuation ni de caracthere spétiaux ");
      window.location.href= "cart.html"
    }
    
  }

});



