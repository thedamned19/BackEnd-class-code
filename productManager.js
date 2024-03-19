const fs = require("fs");

class ProductManager {
    #products;
    #path;
    //static id = 0;

    constructor() {
        this.#products = this.#readProducts();
        this.#path = "./data/productos.json";
        this.id=0;
    }

    // Agregar producto.
    addProduct(product) {

        // Validar todos los campos que sean obligatorios
        if (!this.validateProduct(product)) {
            return "Todos los campos son obligatorios";
        }

        
        // Verificar que el campo code no se repita.
        const existCode = this.#products.find(p => p.code === product.code);
        if (existCode) {
          return "El código del producto ya existe";
        }

        //const id = ProductManager.id + 1;
        //const id = ProductManager.id;
        this.id++;
        product.id=this.id;

        
        this.#products.push(product);
        this.#saveFile();
        return `El producto ${product.title} ha sido ingresado`;

    }

    // Obtener productos
    getProducts() {
        return this.#products;
    }

    // Verificar datos ingresados para un producto.
    validateProduct(product) {
        return (
          product.title &&
          product.description &&
          product.price &&
          product.thumbnail &&
          product.code &&
          product.stock
        );
    }

    // Obtener un producto por id.
    getProductById(id) {
        const product = this.#products.find(p => p.id === id);
    
        // Si no se encuentra el producto devuelve un error
        if (!product) 
            return "Not found";
        else
            return product;
    }

    // ********************************************
    // Métodos agregados para la segunda entrega.
    // ********************************************

    #readProducts() {
        try {
            if(fs.existsSync(this.#path)) {
                return JSON.parse(fs.readFileSync(this.#path, "utf-8"));
            }
            return [];
        } catch(error) {
            return `Error en lectura de archivo ${error} `;
        }
    }

    #saveFile() {
        try {
            fs.writeFileSync(this.#path, JSON.stringify(this.#products), {
                encoding: "utf-8",
              });
        } catch (error) {
            return `Error en guardar archivo ${error} `;    
        }
    }

    updateProduct(id, datosProducto) {
        const i = this.#products.findIndex(p => p.id === id);
        if (i !== -1) {
            const {id, ...rest} = datosProducto;
            this.#products[i] = {...this.#products[i], ...rest};
            this.#saveFile();
            return `El producto ha sido actualizado`;
        }
        return `El producto no existe`;
    }

    deleteProduct(id) {
        const i = this.#products.findIndex(p => p.id === id);
        if (i !== -1) {
            this.#products = this.#products.filter(p => p.id !== id);
            this.#saveFile();
            return `El producto ha sido eliminado`; 
        }
        return `El producto no existe`;
    }


}

module.exports = ProductManager;