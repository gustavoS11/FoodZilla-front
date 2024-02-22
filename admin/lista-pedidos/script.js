
const myHeaders = {
    "Content-Type": "application/json"
}
async function listOrders() {
    const order = await fetch("http://localhost:3000/product/getOrders")
    const orderJson = await order.json()
    console.log(orderJson)
    const div = document.querySelector("#div-orders")
    const ordersList = []
    const orders = orderJson.map((order) => {
        if (!ordersList.includes(order.pedido.pedido)) {
            ordersList.push(order.pedido.pedido)
        }
        
    })
    const reduceOrder = orderJson.reduce((acc, next) => {
        console.log(acc, next)
        const pedido = {}
        pedido[next.pedido.pedido] = { id: next.pedido.pedido, produtos: [next.produtos] }
        return pedido
    }, 0)
    console.log(reduceOrder)
    orderJson.forEach(element => {
        const lista = element.produtos.preco.toString().replace(".", ",")
        div.insertAdjacentHTML("beforeend", `
         <li class="order-li"><img class="img-li" src="${element.produtos.url}" >
            <p>${element.produtos.nome} </p>
            <p>Valor R$ ${lista} </p>
            <input type="submit" value="Finalizar" class="submit">
         </li>
        `
        )
    });
}
listOrders()