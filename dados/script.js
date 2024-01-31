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