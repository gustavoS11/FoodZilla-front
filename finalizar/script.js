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
            const Soma = soma.toFixed(2).toString().replace(".", ",")
            total += soma
            divProducts.insertAdjacentHTML("beforeend", `
        <ul>
            <li class="li-divs">
                <div>
                    <h1>${element.nome}</h1>
                </div>
                <div class="number-input-wrapper">
                    <h2>Quantidade: ${quantity}</h2>
                    <h2>Subtotal: ${Soma}</h2>
                </div>
            </li>
        </ul>`);
        }
    });
    const Total = total.toFixed(2).toString().replace(".", ",");
    const divSummary = document.querySelector("#div-summary")
    divSummary.insertAdjacentHTML("beforeend", `
        <h4>Total: R$${Total}</h4>
    `)
}