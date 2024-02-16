const myHeaders = {
    "Content-Type": "application/json"
}
async function loginUser(dados) {
    const dadosJson = JSON.stringify(dados)
    const login = await fetch(`http://localhost:3000/user/loginAdmin`, {
        method: 'POST',
        body: dadosJson,
        headers: myHeaders
    })
    console.log(login)
    if (login.status == 200) {
        //seguir daqui
       const loginUserJson = await login.json()
        console.log(loginUserJson)

        setTimeout(() => {
            window.location.href = "./lista-pedidos/index.html"
        }, 3000)
    } else {
        
        console.log("errado")
    }
}
const submit = document.querySelector(".input-submit")
submit.addEventListener("click", (event) => {
    event.preventDefault()
    const email = document.querySelector("#input-email").value
    const senha = document.querySelector("#input-password").value
    const dados = {
        email,senha
    }
    console.log(dados)
    loginUser(dados)
})