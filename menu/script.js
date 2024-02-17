async function listProducts() {
    const products = await fetch("http://localhost:3000/product")
    const productsJson = await products.json()
    const div = document.querySelector("#div-products")
    productsJson.forEach(element => {
        const price = element.preco
        const preco = price.toString().replace(".", ",")
        div.insertAdjacentHTML("beforeend", `
        <ul> 
            <li><img class="img-li" src="${element.url}" alt="${element.nome}"></li>
            <li>
                <div>
                    <h2>${element.nome}</h2>
                    <h3>R$${preco}</h3>
                </div>
                <div>
                    <input id="${element.id}" class="input-submit" name="input-li" type="submit" value="Comprar">
                </div>
            </li>
        </ul>`
        )
    })

    const comprarButtons = document.querySelectorAll(".input-submit")
    comprarButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const productId = event.target.id;

            addToCart(productId)
        });
    });
    const inputFinish = document.querySelector("#input-finish")
    inputFinish.addEventListener("click", () => {
        window.location.href = "/cart/index.html"
    })
}
listProducts()

function addToCart(productId) {
    const cartId = `@foodzilla-cart`;
    let cart = JSON.parse(localStorage.getItem(cartId)) || [];
    const findElement = cart.find((item) => {
        return item.id == productId
    })
    if (findElement) {
        cart.forEach((item) => {
            if (item.id == productId) {
                item.quantidade++
            }
        })
    }
    else {
        cart.push({ id: productId, quantidade: 1 })
    }

    localStorage.setItem(cartId, JSON.stringify(cart));
}