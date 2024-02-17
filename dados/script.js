const inputSubmit = document.querySelector("#input-submit")

const inputName = document.querySelector("#input-name")
const inputAddress = document.querySelector("#input-address")
const inputEmail = document.querySelector("#input-email")

const myHeaders = {
    "Content-Type": "application/json"
}

async function listData() {
    const idUsuario = localStorage.getItem("@foodzilla-userId")
    const dados = {
        id: idUsuario
    }
    const dadosJson = JSON.stringify(dados)
    const user = await fetch("http://localhost:3000/user", {
        method: 'POST',
        body: dadosJson,
        headers: myHeaders
    })
    const userJson = await user.json();
    inputName.value = `${userJson[0].nome}`
    inputEmail.value = `${userJson[0].email}`
    inputAddress.value = `${userJson[0].endereco}`
}
listData()


inputSubmit.addEventListener("click", (event) => {
    event.preventDefault()
    redirectName()
})
function redirectName() {
    window.location.href = "../editar-dados/index.html"
}
