const myHeaders = {
    "Content-Type": "application/json"
}
async function registerUser(dados) {
    const dadosJson = JSON.stringify(dados)
    const register = await fetch(`http://localhost:3000/user/register`, {
        method: 'POST',
        body: dadosJson,
        headers: myHeaders
    })
    if (register.status == 204) {
        setTimeout(() => {
            window.location.href = "/login"
        }, 3000)
    } else {
        toastify("Email ou senha incorretos", "error")
    }
}
const submit = document.querySelector(".input-submit")
submit.addEventListener("click", (event) => {
    event.preventDefault()
    const nome = document.querySelector("#input-name").value
    const email = document.querySelector("#input-email").value
    const senha = document.querySelector("#input-password").value
    const id_tipo_usuario = 1
    const dados = {
        id_tipo_usuario, nome, email, senha
    }
    registerUser(dados)
})