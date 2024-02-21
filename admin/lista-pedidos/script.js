
const myHeaders = {
    "Content-Type": "application/json"
}
async function listOrders() {
    const id = localStorage.getItem("@foodzilla-userId")
    // const order = await fetch("http://localhost:3000/orders")
    // const orderJson = await order.json()
    // console.log(orderJson)
    const orderJson = [
        {nome:"Pizza Familia,Calabresa",
        bairro:"Bairro.Centro-tele 7 Reais",
        valor:"79,53 Reais"
        },
        {nome:" Pizza Media: 4Queijos + Coca 2L",
        bairro:"Bairro.Universitario-tele 12,00 Reais",
        valor:"114,26 Reais"
        },
        {nome:"Pizza Gigante: Coracao,4Queijos + Gurana 2L",
        bairro:"Bairro.Joao Alves-tele 15,00 Reais",
        valor:"117,88 Reais"
        },
        {nome:"Pizza Broto: Probolone,4Queijos,Brocolis + Coca Lata",
        bairro:"Bairro.Esmeralda-tele 12,00 Reais",
        valor:"96,52 Reais"
        },
        {nome:"Pizza Media: Catupiri,4Queijos,Brocolis + Coca 2L",
        bairro:"Bairro.Esmeralda-tele 12,00 Reais",
        valor:"94,12 Reais"
        },
        {nome:"Pizza Familia:Cheddar,Brocolis,Catupiri + F.Laranja 2L",
        bairro:"Bairro.Santo Inacio-tele 7,00 Reais",
        valor:"109,64 Reais"
        },
        {nome:"Pizza Doce: Chocolate Branco com Morangos + Gurana 2L",
        bairro:"Bairro.Pedreira-tele 7,00 Reais",
        valor:"109,64 Reais"
        },
        {nome:"pizza Gigante: Costela desfiada,4Queijos",
        bairro:"Bairro.L.Santa Cruz-tele 15,00 Reais",
        valor:"179,46 Reais"
        },
        {nome:"Pizza Broto:4Queijos,Mussarela",
        bairro:"Bairro.Margarida-tele 12,00 Reais",
        valor:"98,22 Reais"
        },
        {nome:"Pizza Media:4Queijos,Mussarela,Catupiri+ coca 2L",
        bairro:"Bairro.Goias-tele 7,00 Reais",
        valor:"103,72 Reais"
        },
        {nome:"Pizza Gigante:Camarao,Mussarela,Catupiri+ coca 2L",
        bairro:"Bairro.Goias-tele 7,00 Reais",
        valor:"103,72 Reais"
        },
        

     

    ]
    const div = document.querySelector("#div-orders")
    orderJson.forEach(element => {
        console.log(element)
        const lista = element.valor.toString().replace(".", ",")
        div.insertAdjacentHTML("beforeend",`
        
         <li class="order-li"><img id="img-li" src="{element.url}" >
            <p>${element.nome} </p>
            <p>${element.bairro} </p>
            <p>Valor R$ ${lista} </p>
         </li>

        `
        )
    });
}
listOrders()
// const submit  = document