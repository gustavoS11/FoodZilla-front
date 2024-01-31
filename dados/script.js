const inputSubmitName = document.querySelector("#input-submitName")
inputSubmitName.addEventListener("click", (event) => {
    event.preventDefault()
    redirectName()
})
async function redirectName() {
    window.location.href = "../editar-dados/editar-nome/index.html"
}
const inputSubmitEmail = document.querySelector("#input-submitEmail")
inputSubmitEmail.addEventListener("click", (event) => {
    event.preventDefault()
    redirectEmail()
})
async function redirectEmail() {
    window.location.href = "../editar-dados/editar-email/index.html"
}
const inputSubmitSenha = document.querySelector("#input-submitPassword")
inputSubmitSenha.addEventListener("click", (event) => {
    event.preventDefault()
    redirectSenha()
})
async function redirectSenha() {
    window.location.href = "../editar-dados/editar-senha/index.html"
}
const inputSubmitNumber = document.querySelector("#input-submitNumber")
inputSubmitNumber.addEventListener("click", (event) => {
    event.preventDefault()
    redirectNumero()
})
async function redirectNumero() {
    window.location.href = "../editar-dados/editar-contato/index.html"
}
const inputSubmitProfile = document.querySelector("#input-submitProfile")
inputSubmitProfile.addEventListener("click", (event) => {
    event.preventDefault()
    redirectProfile()
})
async function redirectProfile() {
    window.location.href = "../editar-dados/editar-foto/index.html"
}