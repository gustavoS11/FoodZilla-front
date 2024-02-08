const idUsuario = localStorage.getItem("@foodzilla-userId")
const dados = await fetch(`http://locallhost:3000/user`)

const divDados = document.querySelector("#div-dados")
divDados.insertAdjacentHTML("beforeend", `
    <h3 class="name-user"></h3>
    <p class="cpf-user"></p>
    <p class="email-user"></p>
`)