const myHeaders = {
    "Content-Type": "application/json"
}
async function loginUser(dados) {
    const dadosJson = JSON.stringify(dados)
    const login = await fetch(`http://localhost:3000/user/login`, {
        method: 'POST',
        body: dadosJson,
        headers: myHeaders
    })
    console.log(login)
    if (login.status == 200) {
        const loginUserJson = await login.json()
        localStorage.setItem("@foodzilla-userId",loginUserJson.id)
        localStorage.setItem("@foodzilla-userEmail",loginUserJson.email)
        setTimeout(() => {
            window.location.href = "../cart/index.html"
        }, 3000)
    } else {
        /*toastify("Email ou senha incorretos", "error")*/
        console.log("errado")
    }
}
const submit = document.querySelector(".input-submit")
submit.addEventListener("click", (event) => {
    event.preventDefault()
    const email = document.querySelector("#input-email").value
    const senha = document.querySelector("#input-password").value
    const dados = {
        email, senha
    }
    loginUser(dados)
})