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
                <div></div>
                <div class="number-input-wrapper">
                    <div class="decrement" data-id="${uniqueId}" onclick="decrement('${uniqueId}')">-</div>
                    <input readonly type="number" class="number-input" id="${uniqueId}" value="${findElement.quantidade}" min="1">
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
    const products = await fetch("http://localhost:3000/product");
    const productsJson = await products.json();
    let total = 0
    productsJson.forEach(element => {
        const price = element.preco;
        const preco = price.toString().replace(".", ",");
        const findElement = cart.find((item) => {
            return item.id == element.id
        })

        const uniqueId = `quantity-${element.id}`;

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
    freight(neighborhoodsJson)
}
async function freight(neighborhoodsJson) {
    const select = document.querySelector("#select")
    neighborhoodsJson.forEach(element => {
        select.insertAdjacentHTML("beforeend", `
            <option value="${element.frete}">${element.nome}</option>
        `)
    })
    select.addEventListener('change', function () {
        const frete = select.options[select.selectedIndex].value
        const bairro = select.options[select.selectedIndex].innerHTML
        localStorage.setItem("@foodzilla-neighborhood", bairro)
        localStorage.setItem("@foodzilla-frete", frete)
    });
    const inputSubmit = document.querySelector("#input-finish")
    inputSubmit.addEventListener("click", (event) => {
        finish()
    })
}
async function finish() {
    const inputAddress = document.querySelector("#input-address")
    const selectNeighborhood = document.querySelector("#select")
    const neighborhood = selectNeighborhood.value
    const address = inputAddress.value
    const user = localStorage.getItem("@foodzilla-userId")
    localStorage.setItem("@foodzilla-endereco", address)
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
    const id_usuario = localStorage.getItem("@foodzilla-userId")
    if (id_usuario) {
        const id_usuario = parseInt(localStorage.getItem("@foodzilla-userId"))
        const dadosInsertOrder = {
            id: id_usuario
        }
        const dadosInsertOrderJson = JSON.stringify(dadosInsertOrder)
        const order = await fetch(`http://localhost:3000/product/insertOrder`, {
            method: 'POST',
            body: dadosInsertOrderJson,
            headers: myHeaders
        })
        const orderJson = await order.json();
        console.log(orderJson)
        const dadosSelectOrder = {
            id_usuario
        }
        const dadosSelectOrderJson = JSON.stringify(dadosSelectOrder)
        const selectOrder = await fetch(`http://localhost:3000/product/selectOrder`, {
            method: 'POST',
            body: dadosSelectOrderJson,
            headers: myHeaders
        })
        const selectOrderJson = await selectOrder.json();
        console.log(selectOrderJson)
        window.location.href = "/finalizar"
    }
    else {
        window.location.href = "/login"
    }
}