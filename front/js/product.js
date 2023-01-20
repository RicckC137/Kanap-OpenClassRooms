// Récupération des données auprès de l'API en utilisant l'ID du produit comme clé d'accès

const urlSearch = new URLSearchParams(window.location.search);
var id = urlSearch.get("id");


fetch(`http://localhost:3000/api/products/${id}/`)
    .then((response) => response.json())
    .then((res) => selectKanap(res));

// constante qui insère les éléments du DOM

const selectKanap = (kanap) => {

    //Image
    const kanapImg = document.querySelector(".item__img");
    const imgElement = document.createElement('img');
    imgElement.src = kanap.imageUrl;
    imgElement.alt = kanap.altTxt;

    //Titre
    const kanapName = document.querySelector("#title");
    kanapName.textContent = kanap.name;

    //Prix
    const kanapPrice = document.querySelector("#price");
    kanapPrice.textContent = kanap.price;

    //Description

    const kanapDescription = document.querySelector("#description");
    kanapDescription.textContent = kanap.description;
    kanapImg.appendChild(imgElement);

    // Couleur

    const chooseColor = document.querySelector("#colors");
    var color = kanap.colors;

    //Foreach pour permettre l'affichache dynamique de toutes les couleurs disponibles avec le nombre de case qui correspond

    color.forEach((color) => {
        const option = document.createElement("option");
        option.textContent = color;
        chooseColor.appendChild(option);
    });
    console.log(kanap);
    addValidationEvent();
}

// Listener pour le bouton validation pour envoi au panier

const addValidationEvent = () => {
    const caddyValidation = document.querySelector("#addToCart");
    caddyValidation.addEventListener("click", () => submit())
}

// Gestion de la quantité au niveau du local storage
const submit = () => {
    let quantity = document.querySelector("#quantity").value;
    const color = document.querySelector("#colors").value;

    if (color === null || color === "" || quantity === null || quantity < 1) {
        alert("Veuillez choisir une couleur et/ou une quantité valide!");
        return;
    } {
        let parseKanap = JSON.parse(localStorage.getItem("cart"));

        const kanap = {
            id,
            quantity,
            color,
        };

        if (parseKanap) {
            const newKanap = parseKanap.find(
                newKanap => newKanap.id === kanap.id
                    && newKanap.color === kanap.color
            );

            if (newKanap) {
                newKanap.quantity = Number(kanap.quantity) + Number(newKanap.quantity);
                localStorage.setItem("cart", JSON.stringify(parseKanap));
                alert("Ajouté au panier")
            } else {
                parseKanap.push(kanap);
                localStorage.setItem("cart", JSON.stringify(parseKanap));
                alert("Ajouté au panier")

            }
        } else {
            parseKanap = [];
            parseKanap.push(kanap);
            localStorage.setItem("cart", JSON.stringify(parseKanap));
            alert("Ajouté au panier")
        }
    }

}


