const divEdit = document.querySelector("#div-edit")
const products = await fetch(`http://localhost:3000/product`)
const productsJson = await products.json()