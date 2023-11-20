// recuperation du numero de commande dans l'url
let params = new URL(document.location).searchParams;
let ID = params.get("orderid");
console.log(ID);
main();


//afichage du numero de commande.
function displayOrder() {
  const orderId = document.getElementById("orderId");
  orderId.innerText = ID;

  
  //surppresion du numero de commande dans le local storage pour des raison de confidantialiter.
  localStorage.clear(); 
}

 
function main() {
  displayOrder();
}


