const myHeaders = {
    "Content-Type": "application/json"
}
async function registerUser() {
    const dados  = document.querySelector("body")
    const dadosJson = JSON.stringify(dados)
    const register = await fetch(`http://localhost:3000/user/register`, {
        method: 'POST',
        body: dadosJson,
        headers: myHeaders
    })
    const registerJson = await register.json()
    console.log(registerJson)
}