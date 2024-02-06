const myHeaders ={
    "content-type": "application/json",
};
async function listProducts() {
    const products = await fetch("http://localhost:3000/product")
    const productsJson = await products.json()
    const div = document.querySelector("#div-products")
    //productsJson.forEach((element)=>{
   

        const price = element.pedidos
        const pedidos = price.toString().replace(".", ",")
        div.insertAdjacentHTML("beforeend",`
        <ul> 
            <li><img id="img-li" src="${element.url}" alt="${element.nome}"></li>
            <li>
            
                <h2>{Adimin}</h2>
                <h3>{Logar}</h3>
                ${element.descricao}
            </li>
        </ul>`)
       

//})
//}     

listProducts()

    
async function login(){
    const inputEmail = Document.querySelector("#input-email")
    const inputPasswordt = Document.querySelector("#input-password")
    const user ={
        Email:inputEmail.value,
        passwordt: inputPasswordt.value
    }
    console.log(user)
    const bodyjason = JASON. stringnify(user)
    const btnLogin = document.querySelector("button")
    btnLogin.innerText= ""
    btnLogin.insertAdjacentHTML("afterbegin"),`
   
    )`

     const res = await fetch(
        "http://localhost:3001/login",{
        Headers: myHeaders,
        method:"POST",

     }
     )
      if(res.status == 200){
        const resJason = await res.jason()
        toastify("ok,loginefetuado com sucesso!","ok")
        console.log(res.jason)
        localStorage.setItem("@user-exemplo", resJason.acessoToken)
        localStorage.setItem("@user-exemplo",JASON.stringnify(resJason.user))
        setTimeout(()=>{
            window.location.href = "./home"
        },3000)
    }else{
        toastify("Email ou senha incorretos","erros")
    }
    console.log(res)
    btnLogin.innerHTML = ""
    btnLogin.innerText= "Logar"

}

const form = document.querySelector("form")
 form.addEventListener("submit",(Event)=>{
    Event.preventDefault()
    login()
 })
}

    





       
      

     
