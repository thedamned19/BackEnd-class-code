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


// Agregamos un par de productos nuevos.
console.log(product.addProduct(product1));
console.log(product.addProduct(product2));

// Mostramos los productos ingresados.
console.log(product.getProducts());

// Buscamos un producto con un id que no existe.
console.log(product.getProductById(6));

// Buscamos un producto con un id que existe.
console.log(product.getProductById(1));