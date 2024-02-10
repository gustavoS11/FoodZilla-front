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
                    <input type="number" class="number-input" id="${uniqueId}" value="${quantity}" min="1" onchange="updateLocalStorage('${element.id}', this.value)">
                    <div class="increment" data-id="${uniqueId}" onclick="increment('${uniqueId}')">+</div>
                </div>
            </li>
        </ul>`);
        }
    });

    const divAddress = document.querySelector("#div-address")
    divAddress.insertAdjacentHTML("beforeend", `

    `)


    const Total = total.toFixed(2).toString().replace(".", ",");
    const divSummary = document.querySelector("#div-summary")
    divSummary.insertAdjacentHTML("beforeend", `
        <h1>Total: R$${Total}</h1>
        <input id="input-finish" type="submit" value="Finalizar">
    `)
    const inputSubmit = document.querySelector("#input-finish")
    inputSubmit.addEventListener("click", (event) => {
        const idUsuario = localStorage.getItem("@foodzilla-userId")
        if (idUsuario) {
            window.location.href = "/finalizar/index.html"
        }
        else {
            window.location.href = "/login/index.html"
        }
    })
}
window.increment = function (id) {
    const input = document.getElementById(id);
    input.stepUp();
    const crement = 1
    updateLocalStorage(id, input.value, crement);
}
window.decrement = function (id) {
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
                item.quantidade--
            }
        })
    }
    localStorage.setItem(cartId, JSON.stringify(cart));
}