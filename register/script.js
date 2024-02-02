const myHeaders = {
    "Content-Type": "application/json"
}
async function registerUser(dados) {
    console.log(dados)
    const dadosJson = JSON.stringify(dados)
    const register = await fetch(`http://localhost:3000/user/register`, {
        method: 'POST',
        body: dadosJson,
        headers: myHeaders
    })
    console.log(register)
    if (register.status == 200) {
        registerUserJson = await register.json()
        toastify("Ok, login efetuado com sucesso!", "ok")
        localStorage.setItem("@token-exemplo", resJson.accessToken)
        localStorage.setItem("@user-exemplo", JSON.stringify(resJson.user))
        setTimeout(() => {
            window.location.href = "/home"
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
        id_tipo_usuario,nome,email,senha
    }
    registerUser(dados)
})