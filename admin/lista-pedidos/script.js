const myHeaders = {
    "Content-Type": "application/json"
}
async function listOrders() {
    const div = document.querySelector("#div-orders");
    async function fetchAndUpdateOrders() {
        try {
            //console.log("chegou")
            const order = await fetch("http://localhost:3000/product/getOrders");
            const orderJson = await order.json();
            const reduceOrder = orderJson.reduce((acc, obj) => {
                let key = obj.pedido['pedido'];
                if (!acc[key]) {
                    acc[key] = { id_pedido: key, total: obj.pedido.total, endereco: obj.pedido.endereco, produtos: [] };
                }
                acc[key].produtos.push(obj.produtos);
                return acc;
            }, {});
            div.innerHTML = "";
            Object.keys(reduceOrder).forEach(key => {
                const element = reduceOrder[key];
                const ul = document.createElement("ul");
                element.produtos.forEach(produto => {
                    const lista = produto.preco.toString().replace(".", ",");
                    ul.insertAdjacentHTML("beforeend", `
                        <li class="order-li">
                            <img class="img-li" src="${produto.url}" >
                            <p>${produto.nome} </p>
                            <p>Valor R$ ${lista} </p>
                        </li>
                    `);
                });
                const enderecoParagraph = document.createElement("h2");
                enderecoParagraph.innerText = `Endereço: ${element.endereco}`;
                ul.appendChild(enderecoParagraph);
                const finalizarButton = document.createElement("input");
                finalizarButton.type = "submit";
                finalizarButton.value = "Finalizar";
                finalizarButton.className = "submit";
                finalizarButton.addEventListener("click", async () => {
                    await finalizarPedido(element.id_pedido);
                    fetchAndUpdateOrders();
                });
                ul.appendChild(finalizarButton);
                div.appendChild(ul);
            });
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }
    fetchAndUpdateOrders();
    setInterval(fetchAndUpdateOrders, 5000);
}
async function finalizarPedido(id_pedido) {
    const idPedido = {
        id: id_pedido
    };
    const dadosJson = JSON.stringify(idPedido);
    try {
        const status = await fetch("http://localhost:3000/product/updateStatus", {
            method: 'POST',
            body: dadosJson,
            headers: myHeaders
        });
        const statusJson = await status.json();
        console.log(`Pedido ${id_pedido} finalizado!`);
    } catch (error) {
        console.error(`Error finalizing Pedido ${id_pedido}:`, error);
    }
}

listOrders();