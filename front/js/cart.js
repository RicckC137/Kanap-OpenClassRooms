//Récupération données du local storage

const kanap = localStorage.getItem('cart');
let parseKanap = JSON.parse(kanap);

// Constante somme quantité totale des articles

function sumQty() {

    let sumQty = parseKanap.reduce((accumulateur, element) => {
        return Number(accumulateur) + Number(element.quantity)
    }, 0)
    let sumTotal = 0;
}


// Fetch pouR récupérer les articles à partir du local storage et en les complétants des informations contenues dans l'API
async function fetchProducts() {
    try {
        const kanaps = await parseKanap.map(async kanap => {
            const res = await fetch(`http://localhost:3000/api/products/${kanap.id}`);
            const data = await res.json();
            addKanapToDom({ ...data, ...kanap });

        })

    } catch (error) {

    }

}
// Fonction asynchrone pour le calcul du total du prix
async function fetchPrice() {
    try {
        let kanapFromStorage = JSON.parse(localStorage.getItem("cart"));

        const kanaps = await Promise.all(kanapFromStorage.map(async kanap => {
            const res = await fetch(`http://localhost:3000/api/products/${kanap.id}`);
            const data = await res.json();

            return ({ ...data, ...kanap });


        }))
        console.log(kanaps)
        for (const i of kanaps) {
            let kanapFromStorage = JSON.parse(localStorage.getItem("cart"));
            for (const d of kanapFromStorage) {
                let total = kanaps.reduce(function (previousValue, currentValue) {
                    return Number(previousValue) + Number(currentValue.price) * Number(currentValue.quantity);
                }, 0);
                console.log(total)
                const cartsumTotal = document.querySelector("#totalPrice");
                cartsumTotal.textContent = total;
            }
        }

        const totalQuantity = document.querySelector("#totalQuantity");
        totalQuantity.textContent = kanaps.reduce(function (previousValue, currentValue) {
            return Number(previousValue) + Number(currentValue.quantity);
        }, 0);

    } catch (err) {
        alert("Panier vide")
    }



} fetchPrice()

let kanapFromStorage = JSON.parse(localStorage.getItem("cart"));

//Fonction afin de remplir tous les éléments du DOM

const addKanapToDom = (kanap) => {

    console.log(kanap)
    const imageUrlofKanap = kanap.imageUrl;
    const nameOfKanap = kanap.name;
    const cartItem = document.querySelector("#cart__items");
    const article = document.createElement("article");
    const divItemImg = document.createElement("div");
    divItemImg.classList.add("cart__item__img");
    const img = document.createElement("img");
    cartItem.appendChild(article)
    article.appendChild(divItemImg)
    divItemImg.appendChild(img)
    img.src = imageUrlofKanap;
    article.classList.add("cart__item");
    article.dataset.id = kanap.id;
    article.dataset.color = kanap.color;
    divItemImg.classList.add("cart__item__img");
    const divItmContent = document.createElement("div");
    divItmContent.classList.add("cart__item__content");
    const divDescription = document.createElement("div");
    divDescription.classList.add("cart__item__content__description");
    const h2 = document.createElement("h2");
    h2.textContent = nameOfKanap;
    const colorP = document.createElement("p");
    colorP.textContent = kanap.color;
    const priceP = document.createElement("p");
    priceP.textContent = kanap.price;
    const divContentSettings = document.createElement("div");
    divContentSettings.classList.add("cart__item__content__settings");
    const divQuantity = document.createElement("div");
    divQuantity.classList.add("cart__item__content__settings__quantity");
    const pQuantity = document.createElement("p");
    pQuantity.textContent = "Qté :";
    const input = document.createElement("input");
    input.type = "number";
    input.classList.add("itemQuantity");
    input.name = "itemQuantity";
    input.min = "1";
    input.max = "100";
    input.value = kanap.quantity;
    input.setAttribute('color', kanap.color);
    input.id = kanap.id;
    const deleteQuantity = document.createElement("div")
    deleteQuantity.classList.add("cart__item__content__settings__delete")
    const pDeleteQuantity = document.createElement("p")
    pDeleteQuantity.classList.add("deleteItem")
    pDeleteQuantity.textContent = "Supprimer"
    cartItem.appendChild(article)
    article.appendChild(divItemImg)
    divItemImg.appendChild(img)

    article.appendChild(divItmContent)
    divItmContent.appendChild(divDescription)
    divDescription.appendChild(h2)
    divDescription.appendChild(colorP)
    divDescription.appendChild(priceP)

    article.appendChild(divContentSettings)
    divContentSettings.appendChild(divQuantity)
    divQuantity.appendChild(pQuantity)
    divQuantity.appendChild(input)

    article.appendChild(deleteQuantity)
    deleteQuantity.appendChild(pDeleteQuantity)

    const totalQuantity = document.querySelector("#totalQuantity");
    const itemQuantity = document.querySelector(".itemQuantity").value;
    const articleColorInPage = document.querySelector(".cart__item");
    const colorInCaddy = articleColorInPage.dataset.color;
    const articleIdInPage = document.querySelector(".cart__item");
    const idInCaddy = articleIdInPage.dataset.id;


    //Fonction afin de changer la quantité au sein de la section quantité totale et de la quantité
    // de l'article dans le local storafe
    function itemQuantityArray() {
        document.querySelectorAll(".itemQuantity").forEach(element => {
            element.addEventListener('change', (e) => {

                var liveQuantity = e.currentTarget.value;
                const color = e.currentTarget.getAttribute('color');
                const id = e.currentTarget.id;

                let kanapFromStorage = JSON.parse(localStorage.getItem("cart"));

                for (let i of kanapFromStorage) {
                    if (id === i.id && color === i.color) {

                        i.quantity = liveQuantity;
                        let sumQty = kanapFromStorage.reduce((accumulateur, element) => {
                            return Number(accumulateur) + Number(element.quantity)
                        }, 0)
                        totalQuantity.textContent = sumQty;

                        if (liveQuantity < 0 && sumQty < 0) {
                            i.quantity = 0;
                            liveQuantity = 0;
                            input.value = 0;
                        }
                    }
                }
                localStorage.setItem('cart', JSON.stringify(kanapFromStorage))
                fetchPrice()
            }
            )
        })
    } itemQuantityArray()



    //Fonction afin de changer de supprimer l'article du panier et du local storage tout en adaptant le prix total et la quantité totale. 
    function deleteButton() {
        document.querySelectorAll(".deleteItem").forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopImmediatePropagation();
                const rightButton = e.currentTarget;
                const elementClose = rightButton.closest(".cart__item");
                const idi = rightButton.closest("[data-id]").dataset.id;
                const colori = rightButton.closest("[data-color]").dataset.color;
                const found = parseKanap.find(element => element.id === idi && element.color === colori);

                if (found) {
                    const index = parseKanap.indexOf(found);
                    parseKanap.splice(index, 1);
                    elementClose.remove();
                    localStorage.setItem("cart", JSON.stringify(parseKanap));
                    if (parseKanap.length === 0) {
                        const cartsumTotal = document.querySelector("#totalPrice");
                        cartsumTotal.textContent = 0;
                        totalQuantity.textContent = 0;
                        localStorage.clear();
                    }
                    fetchPrice();
                }
            }
            )
        }
        )
    } deleteButton();


    // Récupération du noeud parent du formulaire 
    const form = document.querySelector(".cart__order__form");


    // Fonction validation Prénom
    form.firstName.addEventListener('change', function () {
        validFirstName(this);
    })

    const validFirstName = function (inputFirstName) {
        let firstNameRegex = new RegExp("^[a-zA-Z ,.'-]+$");
        let testFirstName = firstNameRegex.test(inputFirstName.value)
        const errorFirstName = document.querySelector("#firstNameErrorMsg")
        if (testFirstName) {
            console.log('true');
            errorFirstName.textContent = ""
            return true
        }
        else {
            errorFirstName.textContent = "Erreur sur le prénom";
            return false
        }
    }

    //Fonction validation Nom

    form.lastName.addEventListener('change', function () {
        validLastName(this);
    })

    const validLastName = function (inputLastName) {
        let lastNameRegex = new RegExp("^[a-zA-Z ,.'-]+$");
        let testLastName = lastNameRegex.test(inputLastName.value)
        const errorLastName = document.querySelector("#lastNameErrorMsg")
        if (testLastName) {
            console.log('true');
            errorLastName.textContent = ""
            return true
        }
        else {
            errorLastName.textContent = "Erreur sur le nom"
            return false
        }
    }

    //Fonction validation Adresse

    form.address.addEventListener('change', function () {
        validAddress(this);
    })

    const validAddress = function (inputAdress) {
        let addressRegex = new RegExp("[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
        let testAddress = addressRegex.test(inputAdress.value)
        const errorAddress = document.querySelector("#addressErrorMsg")
        if (testAddress) {
            console.log('true');
            errorAddress.textContent = ""
            return true
        }
        else {
            errorAddress.textContent = "Erreur sur l'adresse"
            return false
        }
    }

    // Fonction validation Ville

    form.city.addEventListener('change', function () {
        validCity(this);
    })

    const validCity = function (inputCity) {
        let cityRegex = new RegExp("^[a-zA-Z ,.'-]+$");
        let testCity = cityRegex.test(inputCity.value);
        const errorCity = document.querySelector("#cityErrorMsg");
        if (testCity) {
            console.log('true');
            errorCity.textContent = ""
            return true
        }
        else {
            errorCity.textContent = "Erreur sur l'orthographe de la ville"
            return false
        }
    }

    // Fonction validation Mail

    form.email.addEventListener('change', function () {
        validEmail(this);
    })

    const validEmail = function (inputEmail) {
        let emailRegex = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
        let testEmail = emailRegex.test(inputEmail.value)
        const errorEmail = document.querySelector("#emailErrorMsg");
        if (testEmail) {
            console.log('true');
            errorEmail.textContent = ""
            return true
        }
        else {

            errorEmail.textContent = "Erreur sur l'email"
            return false
        }
    }


    function submit() {
        document.getElementById("order").addEventListener("click", (e) => {
            e.preventDefault();
            let totalInQuantity = totalQuantity.textContent;
            // Fonction validation de la quantité
            if (totalInQuantity <= 0) {
                alert("Quantité du panier insuffisante, merci d'ajouter un produit à votre commande");

            }
            else if // Validation des éléments saisis dans le formulaire par l'utilisateur
                (validEmail(form.email) && validCity(form.city) && validAddress(form.address)
                && validFirstName(form.firstName) && validLastName(form.lastName)) {

                // Si oui, récupérer les inputs afin de valider la commande
                let inputName = document.getElementById('firstName').value;
                let inputLastName = document.getElementById('lastName').value;
                let inputAdress = document.getElementById('address').value;
                let inputCity = document.getElementById('city').value;
                let inputMail = document.getElementById('email').value;

                // Insérer les produits dans un objet de type array
                let products = [];
                console.log(products)

                for (let i of parseKanap) {
                    products.push(i.id);

                }
                // Construire une variable regroupant l'array des produits ainsi qu'un objet contact 
                // prenant en compte toutes les informations du client pour otbenir un numèro de commande
                // en passant par un fetch auprès de l'API

                const orderdetails = {
                    contact: {
                        firstName: inputName,
                        lastName: inputLastName,
                        address: inputAdress,
                        city: inputCity,
                        email: inputMail,
                    },

                    products,
                }
                fetch("http://localhost:3000/api/products/order",
                    {
                        method: 'POST',
                        body: JSON.stringify(orderdetails),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                    .then((response) => response.json(response))
                    .then((data) => {
                        localStorage.setItem("orderId", data.orderId);
                        document.location.href = "confirmation.html";
                    })

            } else {
                alert("Informations manquantes ")
            }

        }
        )
    } submit()
}
fetchProducts();
