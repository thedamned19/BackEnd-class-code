const fs=require("fs")
const crypto=require("crypto")
const path=require("path")

class ProductManager {
    #products;
    //static id = 0;

    constructor(rutaArchivo) {
        this.path = rutaArchivo;
        this.#products = [];
        this.id=0;
    }

    async leerProductos(){
        if(fs.existsSync(this.path)){
            return JSON.parse(await fs.promises.readFile(this.path, {encoding:"utf-8"}))
        }else{
            return []
        }
    }

    async addProduct(producto){
        let productos = await this.leerProductos();
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
        return `El producto ${product.title} ha sido ingresado`;

    }

    // Actualizar producto
    updateProduct = async() => {
        let lectura = await fs.promises.readFile(rutaArchivo, {encoding:"utf-8"})
        //console.log(loQueLeeDeArchivo)
º
        await fs.promises.appendFile(rutaArchivo, "\n\nDatos agregados")
        console.log(`El producto ${product.title} ha sido modificado`);
        //return this.#products;
    }

    deleteProduct = async() => {
        await fs.promises.unlink(rutaArchivo)
        console.log(`El producto ${product.title} ha sido eliminado`);
    };

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

    app=async()=>{
        await addProduct(product);
        await updateProduct();
        await deleteProduct();
        }
    

}

module.exports = ProductManager;
