const kanap = localStorage.getItem('cart');
const parseKanap = JSON.parse(kanap);
let sumQty = parseKanap.reduce((accumulateur, element) => {
    return Number(accumulateur) + Number(element.quantity)
}, 0)
let sumTotal = 0;
const fetchProducts = async () => {
    const kanaps = await parseKanap.map(async kanap => {
        const res = await fetch(`http://localhost:3000/api/products/${kanap.id}`);
        const data = await res.json();
        addKanapToDom({ ...data, ...kanap });

    })

}
const addKanapToDom = (kanap) => {
    const id = kanap._id;
    const imageUrlofKanap = kanap.imageUrl;
    const priceOfKanap = kanap.price;
    const nameOfKanap = kanap.name
    let priceTotalByPiece = kanap.quantity * priceOfKanap;
    sumTotal += priceTotalByPiece;
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

    const cartsumTotal = document.querySelector("#totalPrice");
    cartsumTotal.textContent = sumTotal

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
    totalQuantity.textContent = sumQty;

    const itemQuantity = document.querySelector(".itemQuantity").value;
    const articleColorInPage = document.querySelector(".cart__item");
    const colorInCaddy = articleColorInPage.dataset.color;
    const articleIdInPage = document.querySelector(".cart__item");
    const idInCaddy = articleIdInPage.dataset.id;
    const itemQuantityArray = document.querySelectorAll(".itemQuantity").forEach(element => {
        element.addEventListener('change', (e) => {
            const liveQuantity = e.currentTarget.value;
            const color = e.currentTarget.getAttribute('color');
            const id = e.currentTarget.id;
            let kanapFromStorage = JSON.parse(localStorage.getItem("cart"));

            for (let i of kanapFromStorage) {
                if (id === i.id && color === i.color) {
                    i.quantity = liveQuantity;
                    console.log(i)
                    var newTotal = liveQuantity * priceOfKanap;
                    console.log(newTotal)

                    let sumQty = kanapFromStorage.reduce((accumulateur, element) => {
                        return Number(accumulateur) + Number(element.quantity)
                    }, 0)
                    console.log(sumQty)
                    totalQuantity.textContent = sumQty;
                    let priceTotalByPiece = kanap.quantity * priceOfKanap;
                    sumTotal += priceTotalByPiece;
                    cartsumTotal.textContent = newTotal


                    // let priceTotalByPiece = liveQuantity * priceOfKanap;
                    // const newTotal2 = (sumTotal - newTotal) + priceOfKanap;
                    // cartsumTotal.textContent = newTotal2
                }
                kanapFromStorage.forEach(element => {
                    sumTotal = 0;
                    sumTotal += newTotal
                    console.log(sumTotal)

                    // console.log(element)
                    // console.log(priceOfKanap)
                    // const kanapPriceByElement = Number(element.quantity) * Number(priceOfKanap)
                    // console.log(kanapPriceByElement)

                });
                // sumTotal = 0;
                // sumTotal += newTotal
                // console.log(sumTotal)

            }



            localStorage.setItem('cart', JSON.stringify(kanapFromStorage))
        })
    }
    )
    const deleteButton = document.querySelectorAll(".deleteItem").forEach(element => {
        element.addEventListener('click', (e) => {

            const rightButton = e.currentTarget
            const elementClose = rightButton.closest(".cart__item");
            const id = rightButton.closest("[data-id]").dataset.id;
            const color = rightButton.closest("[data-color]").dataset.color;
            const itemQuantity = document.querySelector(".itemQuantity").value;
            const kanapDelete = {
                id,
                quantity: itemQuantity,
                color,
            }
            elementClose.remove();
            localStorage.removeItem("cart", JSON.stringify(kanapDelete));
            const kanapInCaddy = document.querySelector(".cart__item")
            const idInDom = kanapInCaddy.closest("[data-id]").dataset.id;
            const colorInDom = kanapInCaddy.closest("[data-color]").dataset.color;
            const quantityInDom = document.querySelector("cart__item__content__settings__quantity");
            const kanapStillInCaddy = [{
                id: idInDom,
                color: colorInDom,
                quantity: itemQuantity
            }]

            localStorage.setItem("cart", JSON.stringify(kanapStillInCaddy));
        }
        )
    })

    function formValidation() {

        let firstName = document.getElementById('#firstName');
        let form = document.querySelector(".cart__order__form");

        let generalRegex = /^[a-zA-Z ,.'-]+$/;

        form.firstName.addEventListener('change', function () {
            validFirstName(this);
        });

        const validFirstName = function (e) {
            let firstNameError = e.nextElementSibling;

            if (generalRegex.test(e.value)) {

            } else {
                firstNameError.textContent = 'Merci de remplir ce champ';
            }
        };
        form.lastName.addEventListener('change', function () {
            validLastName(this);
        });


        const validLastName = function (e) {
            let lastNameError = e.nextElementSibling;

            if (generalRegex.test(e.value)) {

            } else {
                lastNameError.textContent = 'Merci de remplir ce champ';
            }
        };
        let addressRegex = /[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/;
        form.address.addEventListener('change', function () {
            validAddress(this);
        });
        const validAddress = function (e) {
            let addressError = e.nextElementSibling;
            if (addressRegex.test(e.value)) {

            } else {
                addressError.textContent = 'Merci de remplir ce champ';
            }
        };
        form.city.addEventListener('change', function () {
            validCity(this);
        });
        const validCity = function (e) {
            let cityError = e.nextElementSibling;
            if (generalRegex.test(e.value)) {
            } else {
                cityError.textContent = 'Merci de remplir ce champ';
            }
        };
        let mailRegEx = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
        form.email.addEventListener('change', function () {
            validEmail(this);
        });
        const validEmail = function (e) {
            let emailError = e.nextElementSibling;
            if (mailRegEx.test(e.value)) {

            } else {
                emailError.textContent = 'Merci de remplir ce champ';
            }
        };

        if (validEmail && validCity && validAddress && validLastName) {
            function formToLocalStorage() {
                const order = document.getElementById("order");
                order.addEventListener("click", (e) => {


                    let inputName = document.getElementById('firstName').value;
                    let inputLastName = document.getElementById('lastName').value;
                    let inputAdress = document.getElementById('address').value;
                    let inputCity = document.getElementById('city').value;
                    let inputMail = document.getElementById('email').value;
                    if (inputName && inputLastName && inputAdress && inputCity && inputMail) {
                        let products = [];
                        for (let i of parseKanap) {
                            products.push(i.id);

                        }
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
                        alert('Merci de remplir tous les champs afin de pouvoir valider la commande')
                    }
                });
            } formToLocalStorage()
        }
    }
    formValidation();
}
fetchProducts();