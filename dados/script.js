const inputSubmitName = document.querySelector("#input-submitName")
console.log("tete")
inputSubmitName.addEventListener("click", (event) => {
    event.preventDefault()
    redirect()
})
async function redirect() {
    window.location.href = "../editar-dados/editar-nome/index.html"
}