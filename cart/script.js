const myHeaders = {
    "Content-Type": "application/json"
}
document.addEventListener('DOMContentLoaded', () => {

});
displayCart();
async function displayCart() {
    const cartId = "@foodzilla-cart";
    let cart = JSON.parse(localStorage.getItem(cartId)) || {};

    const products = await fetch("http://localhost:3000/product");
    const productsJson = await products.json();
    const divProducts = document.querySelector("#div-products");
    divProducts.innerHTML = "";
    productsJson.forEach(element => {
        const price = element.preco;
        const preco = price.toString().replace(".", ",");
        const findElement = cart.find((item) => {
            return item.id == element.id
        })

        const uniqueId = `quantity-${element.id}`;

        if (findElement) {
            divProducts.insertAdjacentHTML("beforeend", `
        <ul>
            <li><img class="img-li" src="${element.url}" alt="${element.nome}"></li>
            <li class="li-divs">
                <div>
                    <h2>${element.nome}</h2>
                    <h3>R$${preco}</h3>
                </div>
                <div class="number-input-wrapper">
                    <div class="decrement" data-id="${uniqueId}" onclick="decrement('${uniqueId}')">-</div>
                    <input type="number" class="number-input" id="${uniqueId}" value="${findElement.quantidade}" min="1" onchange="updateLocalStorage('${element.id}', this.value)">
                    <div class="increment" data-id="${uniqueId}" onclick="increment('${uniqueId}')">+</div>
                </div>
            </li>
        </ul>`);
        }
    });
    summary(cart)
}
window.increment = function (id) {
    const input = document.getElementById(id);
    input.stepUp();
    const crement = 1
    updateLocalStorage(id, input.value, crement);
}
window.decrement = function (id, total) {
    const input = document.getElementById(id);
    input.stepDown();
    const crement = 2
    updateLocalStorage(id, input.value, crement);
}
function updateLocalStorage(id, value, crement) {
    const cartId = `@foodzilla-cart`;
    let cart = JSON.parse(localStorage.getItem(cartId)) || {};
    if (crement === 1) {
        cart.forEach((item) => {
            if (item.id == id.split("-")[1]) {
                item.quantidade++
            }
        })
    }
    else {
        cart.forEach((item) => {
            if (item.id == id.split("-")[1]) {
                if (item.quantidade > 1) {
                    item.quantidade--
                }
            }
        })
    }
    localStorage.setItem(cartId, JSON.stringify(cart));
    summary(cart)
}
async function summary(cart) {
    const carrinho = cart
    let frete = 0
    calculator(carrinho, frete)
    const idUsuario = localStorage.getItem("@foodzilla-userId")
    const dados = {
        id: idUsuario
    }
    const dadosJson = JSON.stringify(dados)
    const address = await fetch(`http://localhost:3000/user/address`, {
        method: 'POST',
        body: dadosJson,
        headers: myHeaders
    })
    const addressJson = await address.json();
    const neighborhoods = await fetch(`http://localhost:3000/product/neighborhoods`)
    const neighborhoodsJson = await neighborhoods.json();
    const divAddress = document.querySelector("#div-address")
    divAddress.insertAdjacentHTML("beforeend", `
        <p>Selecione o bairro</p>
        <select type="text" name="select" id="select"></select>
        <input type="text" name="input-address" id="input-address" value="${addressJson[0].endereco}">
    `)
    freight(carrinho, neighborhoodsJson)
}
async function calculator(carrinho, frete) {
    let total = frete
    const products = await fetch("http://localhost:3000/product");
    const productsJson = await products.json();
    productsJson.forEach(element => {
        const price = element.preco;
        const preco = price.toString().replace(".", ",");
        const findElement = carrinho.find((item) => {
            return item.id == element.id
        })

        if (findElement) {

            const quantity = findElement.quantidade
            let soma = price * quantity
            total += soma
        }
    })
    const Total = total.toFixed(2).toString().replace(".", ",");
    const divSummary = document.querySelector("#div-summary")
    divSummary.innerHTML = ""
    divSummary.insertAdjacentHTML("beforeend", `
        <div id="div-address"></div>
        <div id="div-total">
            <h1>Total: R$${Total}</h1>
            <input id="input-finish" type="submit" value="Finalizar">
        </div>
    `)
}
async function freight(carrinho, neighborhoodsJson) {
    const select = document.querySelector("#select");

    select.addEventListener("change", function () {
        const selectedOption = select.options[select.selectedIndex];

        const newFreight = parseFloat(selectedOption.value);

        calculator(carrinho, newFreight);
    });

    neighborhoodsJson.forEach(element => {
        select.insertAdjacentHTML("beforeend", `
            <option name="${element.nome}" value="${element.frete}">${element.nome}</option>
        `);
    });

    // summary(carrinho, parseFloat(select.value));

    const inputSubmit = document.querySelector("#input-finish");
    inputSubmit.addEventListener("click", (event) => {
        finish();
    });
}
async function finish() {
    const inputAddress = document.querySelector("#input-address")
    const selectNeighborhood = document.querySelector("#select")
    const neighborhood = selectNeighborhood.value
    console.log(neighborhood)
    const address = inputAddress.value
    const user = localStorage.getItem("@foodzilla-userId")
    const endereco = {
        endereco: address,
        id: user
    }
    const dadosJson = JSON.stringify(endereco)
    const updateAddress = await fetch(`http://localhost:3000/user/updateAddress`, {
        method: 'POST',
        body: dadosJson,
        headers: myHeaders
    })
    const updateAddressJson = await updateAddress.json();
    const idUsuario = localStorage.getItem("@foodzilla-userId")
    if (idUsuario) {
        window.location.href = "/finalizar/index.html"
    }
    else {
        window.location.href = "/login/index.html"
    }
}