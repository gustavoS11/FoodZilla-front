const myHeaders = {
    "Content-Type": "application/json"
}
async function registerUser(dados) {
    console.log("sim")
    const dadosJson = JSON.stringify(dados)
    const register = await fetch(`http://localhost:3000/user/register`, {
        method: 'POST',
        body: dadosJson,
        headers: myHeaders
    })
    if (registerUser.status == 200) {
        registerUserJson = await registerUser.json()
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
    const dados = document.querySelector("body")
    registerUser(dados)
})