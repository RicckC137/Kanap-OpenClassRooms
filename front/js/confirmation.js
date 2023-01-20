
// Fonction validation de la commande qui insère les éléments du DOM tout en affichant 
// le numéro de la commande et reinitialisant le local storage

function orderValidation() {
    const orderId = document.getElementById("orderId");
    orderId.textContent = localStorage.getItem("orderId");
    console.log(localStorage.getItem("orderId"))
    localStorage.clear();
}

orderValidation();