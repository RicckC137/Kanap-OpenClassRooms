const urlSearch = new URLSearchParams(window.location.search);
var id = urlSearch.get("id");
console.log(id);


fetch(`http://localhost:3000/api/products/${id}/`)
    .then((response) => response.json())
    .then((res) => selectKanap(res));

const selectKanap = (kanap) => {
    const kanapImg = document.querySelector(".item__img");
    const imgElement = document.createElement('img');
    imgElement.src = kanap.imageUrl;
    imgElement.alt = kanap.altTxt;

    const kanapName = document.querySelector("#title");
    kanapName.textContent = kanap.name;

    const kanapPrice = document.querySelector("#price");
    kanapPrice.textContent = kanap.price;

    const kanapDescription = document.querySelector("#description");
    kanapDescription.textContent = kanap.description;
    kanapImg.appendChild(imgElement);

    const chooseColor = document.querySelector("#colors");
    var color = kanap.colors;

    color.forEach((color) => {
        const option = document.createElement("option");
        option.textContent = color;
        chooseColor.appendChild(option);
    });
    console.log(kanap);
    addValidationEvent();
}

const addValidationEvent = () => {
    const caddyValidation = document.querySelector("#addToCart");
    caddyValidation.addEventListener("click", () => submit())
}

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
                console.log(newKanap.quantity);
                console.log(kanap.quantity);
                console.log(newKanap.quantity)
                newKanap.quantity = Number(kanap.quantity) + Number(newKanap.quantity);
                console.log(newKanap.quantity);

                localStorage.setItem("cart", JSON.stringify(parseKanap));
                alert("Ajouté au panier")
                console.log("passe par là")
            } else {
                parseKanap.push(kanap);
                localStorage.setItem("cart", JSON.stringify(parseKanap));
            }
        } else {

            console.log("passe là")
            parseKanap = [];
            parseKanap.push(kanap);
            localStorage.setItem("cart", JSON.stringify(parseKanap));

            alert("Ajouté au panier")

        }
    }

}


