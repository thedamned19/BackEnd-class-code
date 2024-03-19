const ProductManager = require("./productManager");

const product = new ProductManager([]);

const product1 = {
    title: 'Dell',
    description: 'Inspiron',
    price: 643,
    thumbnail: 'path/img1.jpg',
    code: 'iron_maiden_92',
    stock: 5
};

const product2 = {
    title: 'Lenovo',
    description: 'K14',
    price: 649,
    thumbnail: 'path/img2.jpg',
    code: 'ian_gillan_91',
    stock: 3
};

const product3 = {
  title: 'Lenovo',
  description: 'M19',
  price: 750,
  thumbnail: 'path/img3.jpg',
  code: 'the_doors_68',
  stock: 6
};

// Agregamos un par de productos nuevos.
console.log(product.addProduct(product1));
console.log(product.addProduct(product2));
console.log(product.addProduct(product3));

// Mostramos los productos ingresados.
//console.log(product.getProducts());

// Buscamos un producto con un id que no existe.
//console.log(product.getProductById(6));

// Buscamos un producto con un id que existe.
//console.log(product.getProductById(1));

// ***********************************************************
// Llamada a métodos agregados para la segunda entrega.
// ***********************************************************

// Eliminamos un producto.
console.log(product.deleteProduct(2));

// Intentamos eliminar un producto que no existe.
console.log(product.deleteProduct(8));

// Modificación de un producto.
const productoModificar = {
  "id":25,
  "title": "Dell",
  "description": "abc321",
  "price":598,
  "thumbnial":"pathNuevoOK/img3.jpg"
}
console.log(product.updateProduct(3, productoModificar));



// Modificación de un producto.
const productoModificar2 = {
  "id":23,
  "title": "Dell",
  "description": "abc789",
  "price":874,
  "thumbnial":"pathNuevoOK/img4.jpg"
}
console.log(product.updateProduct(9, productoModificar2));