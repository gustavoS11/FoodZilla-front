const inputSubmitName = document.querySelector("#input-submitName")
const inputSubmitEmail = document.querySelector("#input-submitEmail")
const inputSubmitSenha = document.querySelector("#input-submitPassword")
const inputSubmitProfile = document.querySelector("#input-submitProfile")

const inputName = document.querySelector("#input-name")
const inputPassword = document.querySelector("#input-password")
const inputEmail = document.querySelector("#input-email")

async function listData() {
    const products = await fetch("http://localhost:3000/user/list")
    const productsJson = await products.json()
    const div = document.querySelector("#div-products")
    productsJson.forEach(element => {
        const price = element.preco
        const preco = price.toString().replace(".", ",")
        div.insertAdjacentHTML("beforeend",`
        <ul> 
            <li><img class="img-li" src="${element.url}" alt="${element.nome}"></li>
            <li>
                <h2>${element.nome}</h2>
                <h3>R$${preco}</h3>
                <label for="input-li">${element.descricao}</label>
                <br>
                <input class="input-submit" name="input-li" type="submit" value="Comprar">
            </li>
        </ul>`
        )
    });
}
listProducts()


inputSubmitName.addEventListener("click", (event) => {
    event.preventDefault()
    redirectName()
})
async function redirectName() {
    window.location.href = "../editar-dados/editar-nome/index.html"
}
inputSubmitEmail.addEventListener("click", (event) => {
    event.preventDefault()
    redirectEmail()
})
async function redirectEmail() {
    window.location.href = "../editar-dados/editar-email/index.html"
}
inputSubmitSenha.addEventListener("click", (event) => {
    event.preventDefault()
    redirectSenha()
})
async function redirectSenha() {
    window.location.href = "../editar-dados/editar-senha/index.html"
}
async function redirectNumero() {
    window.location.href = "../editar-dados/editar-contato/index.html"
}
inputSubmitProfile.addEventListener("click", (event) => {
    event.preventDefault()
    redirectProfile()
})
async function redirectProfile() {
    window.location.href = "../editar-dados/editar-foto/index.html"
}
