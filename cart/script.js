document.addEventListener('DOMContentLoaded', () => {
    displayCart();
});

async function displayCart() {
    const cartId = "@foodzilla-cartId";
    let cart = JSON.parse(localStorage.getItem(cartId)) || {};

    const products = await fetch("http://localhost:3000/product");
    console.log(cart)
    const productsJson = await products.json();
    const div = document.querySelector("#div-products");
    div.innerHTML = "";

    productsJson.forEach(element => {
        const price = element.preco;
        const preco = price.toString().replace(".", ",");
        const findElement = cart.find((item) => {
            return item.id == element.id
        })
        console.log(findElement)

        const uniqueId = `quantity-${element.id}`;

        if (findElement) {
            const quantity = findElement.quantidade
            div.insertAdjacentHTML("beforeend", `
        <ul>
            <li><img class="img-li" src="${element.url}" alt="${element.nome}"></li>
            <li class="li-divs">
                <div>
                    <h2>${element.nome}</h2>
                    <h3>R$${preco}</h3>
                </div>
                <div class="number-input-wrapper">
                    <div class="decrement" data-id="${uniqueId}" onclick="decrement('${uniqueId}')">-</div>
                    <input type="number" class="number-input" id="${uniqueId}" value="${quantity}" min="1" onchange="updateLocalStorage('${element.id}', this.value)">
                    <div class="increment" data-id="${uniqueId}" onclick="increment('${uniqueId}')">+</div>
                </div>
            </li>
        </ul>`);
        }
    });
}

window.increment = function (id) {
    const input = document.getElementById(id);
    input.stepUp();
    updateLocalStorage(id, input.value);
}

window.decrement = function (id) {
    const input = document.getElementById(id);
    input.stepDown();
    updateLocalStorage(id, input.value);
}

function updateLocalStorage(id, value) {
    console.log(id.split("-"))
    const cartId = "@foodzilla-cartId";
    let cart = JSON.parse(localStorage.getItem(cartId)) || {};
    cart.forEach((item) => {
        if (item.id == id.split("-")[1]) {
            item.quantidade++
        }
    })
    console.log(cart)
    localStorage.setItem(cartId, JSON.stringify(cart));
}