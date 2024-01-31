const imagem = document.querySelector("#img-main")
imagem.addEventListener("click",(event)=>{
    event.preventDefault()
    redirect()
})
async function redirect() {
    window.location.replace('../menu/index.html')
}