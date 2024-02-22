displayCart();
async function displayCart() {
    const cartId = "@foodzilla-cart";
    const cart = JSON.parse(localStorage.getItem(cartId)) || [];
    if (Array.isArray(cart) && cart.length > 0) {
        const products = await fetch("http://localhost:3000/product");
        const productsJson = await products.json();
        const divProducts = document.querySelector("#div-products");
        divProducts.innerHTML = "";
        const freteString = localStorage.getItem("@foodzilla-tele")
        const frete = parseInt(freteString) || 0;
        let total = frete
        productsJson.forEach(element => {
            const price = element.preco;
            const preco = price.toString().replace(".", ",");
            const findElement = cart.find((item) => {
                return item.id == element.id
            })
            if (findElement) {
                const quantity = findElement.quantidade
                let soma = price * quantity
                const Soma = soma.toFixed(2).toString().replace(".", ",")
                total += soma
                divProducts.insertAdjacentHTML("beforeend", `
        <ul>
            <li class="li-divs">
                <div>
                    <h2>${element.nome}</h2>
                </div>
                <div class="number-input-wrapper">
                    <h3>Quantidade: ${quantity}</h3>
                    <h3>Subtotal: ${Soma}</h3>
                </div>
            </li>
        </ul>
        `);
            }
        });
        const Total = total.toFixed(2).toString().replace(".", ",");
        const Frete = frete.toFixed(2).toString().replace(".", ",");
        const endereco = localStorage.getItem("@foodzilla-endereco")
        const divSummary = document.querySelector("#div-summary")
        divSummary.insertAdjacentHTML("beforeend", `
        <h2>Frete: R$${Frete}</h2>
        <h2>Total: R$${Total}</h2>
        <h1>Obrigado pela preferência!</h1>
        <h2>Seu pedido será entregue dentro de 1 hora no endereço ${endereco}.</h2>
    `)
    }
    window.addEventListener("beforeunload", () => {
        clearLocalStorageOnExit();
    });
}
function clearLocalStorageOnExit() {
    const cartId = "@foodzilla-cart";

    localStorage.removeItem(cartId);
}