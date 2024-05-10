const socket = io();

socket.on("products", products =>{
    //console.log(products);
    const tbody = document.getElementById("products-body");
    tbody.innerHTML = "";

    products.forEach(product => {
        const row = tbody.insertRow();
        row.innerHTML = `
        <td>${product._id}</td>
        <td>${product.title}</td>
        <td>${product.description}</td>
        <td>${product.price}</td>
        <td>${product.code}</td>
        <td>${product.stock}</td>
        <td>${product.category}</td>
        <td>${product.status ? "Si" : "No"}</td>
        `
        
    });
});

// Este form. no estaba solicitado para entregar en los desafíos.
/*
const form = document.getElementById("product-form");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = document.getElementById("codigo").value;
    const codigo = document.getElementById("titulo").value;
    const stock = document.getElementById("stock").value;
    const categoria = document.getElementById("categoria").value;

    const product = {
        title : titulo,
        description : descripcion,
        price : precio,
        code : codigo,
        stock : stock,
        category : categoria
    }

    socket.emit("addProduct", product);

    form.reset();
})
*/

