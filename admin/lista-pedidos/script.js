const myHeaders = {
    "Content-Type": "application/json"
}
async function listOrders() {
    const id = localStorage.getItem("@foodzilla-userId")
    const order = await fetch("http://localhost:3000/product/orders")
    const orderJson = await order.json()
    const div = document.querySelector("#div-orders")
    orderJson.forEach(element => {
        const price = element.listaPedidos
        const lista = price.toString().replace(".", ",")
        div.insertAdjacentHTML("beforeend",`
        <ul>
            <li><img id="img-li" src="${element.url}" alt="${element.nome}"></li>
            <li>
                <h2>${element.nome}</h2>
                <h3>R$${listaPedidos}</h3>
                ${element.descricao}
            </li>
        </ul>`
        )
    });
}
listProducts()