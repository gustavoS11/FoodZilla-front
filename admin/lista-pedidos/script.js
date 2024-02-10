const myHeaders = {
    "Content-Type": "application/json"
}
async function listProducts() {
    const id = localStorage.getItem("@foodzilla-userId")
    const order = await fetch("http://localhost:3000/product/user", {
        method: 'POST',
        body: id,
        headers: myHeaders
    })
    const orderJson = await products.json()
    const div = document.querySelector("#div-products")
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