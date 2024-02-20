
const myHeaders = {
    "Content-Type": "application/json"
}
async function listOrders() {
    const id = localStorage.getItem("@foodzilla-userId")
    // const order = await fetch("http://localhost:3000/orders")
    // const orderJson = await order.json()
    // console.log(orderJson)
    const orderJson = [
        {nome:"judas",
        bairro:"Centro",
        valor:"valor"
        },
        {nome:"judas",
        bairro:"Centro",
        valor:"valor"
        },
        {nome:"judas",
        bairro:"Centro",
        valor:"valor"
        },
        {nome:"judas",
        bairro:"Centro",
        valor:"valor"
        },
        {nome:"judas",
        bairro:"Centro",
        valor:"valor"
        },
        {nome:"judas",
        bairro:"Centro",
        valor:"valor"
        },
        {nome:"judas",
        bairro:"Centro",
        valor:"valor"
        },
        {nome:"judas",
        bairro:"Centro",
        valor:"valor"
        },
        {nome:"judas",
        bairro:"Centro",
        valor:"valor"
        }

    ]
    const div = document.querySelector("#div-orders")
    orderJson.forEach(element => {
        console.log(element)
        const lista = element.valor.toString().replace(".", ",")
        div.insertAdjacentHTML("beforeend",`
        
         <li class="order-li"><img id="img-li" src="{element.url}" >
            <p>${element.nome} </p>
            <p>${element.bairro} </p>
            <p>Valor total R$ ${lista} </p>
         </li>

        `
        )
    });
}
listOrders()
// const submit  = document