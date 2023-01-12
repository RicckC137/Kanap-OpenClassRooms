

fetch("http://localhost:3000/api/products/")
    .then((response) => response.json())

    .then(function (kanaps) {
        for (let kanap of kanaps) {
            const els = document.getElementById("items");
            const aElement = document.createElement('a');
            aElement.href = `./product.html?id=${kanap._id}`;

            const articleElement = document.createElement('article');

            const imageElement = document.createElement('img');
            imageElement.src = kanap.imageUrl;
            imageElement.alt = kanap.altTxt;

            const h3Element = document.createElement('h3');
            h3Element.classList.add('productName');
            h3Element.textContent = kanap.name;

            const descriptionElement = document.createElement('p');
            descriptionElement.classList.add('productDescription');
            descriptionElement.textContent = kanap.description;

            articleElement.appendChild(imageElement);
            articleElement.appendChild(h3Element);
            articleElement.appendChild(descriptionElement);

            aElement.appendChild(articleElement);

            els.appendChild(aElement);

        }
    })


