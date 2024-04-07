import fs from 'fs';

class productManager {
    #products;
    #path;
    
    constructor() {
        this.#products = [];
        this.#path = './src/data/productos.json';
        this.readProductsInFile();
    }

    // Adding product
    async addProduct(title, description, price, thumbnails=[], code, stock, category, status = true) {
        try {
            if (!title || !description || !price || !code || !stock || !category)
                return 'All data are required (title, description, price, code, stock, category)';

            const codeRepeat = this.#products.some(p => p.code === code);
            if (codeRepeat) {
                return `The code ${code} is already busy, please try again`;
            }

            let id = this.assignId();

            const newProduct = {
                id,
                title,
                description,
                price,
                thumbnails,
                code,
                stock,
                category,
                status
            };

            this.#products.push(newProduct);
            await this.saveFile();

            return 'Product added successfully';
        } catch (error) {
            console.log(`Error adding product: ${error}`);
            return 'An error occurred while adding the product';
        }
    }

    // Getting products 
    async getProducts(limit = 0) {
        limit = Number(limit);
        if (limit > 0)
            return this.#products.slice(0, limit);
        return this.#products;
    }

    // Getting product by id
    getProductById(id) {
        let response = `The product with id ${id} doesn't exist`;
        let flag = false;

        let product = this.#products.find(p => p.id === id);
        if (product) {
            flag = true;
            response = product;
        }
        return {response, flag};
    }

    // Automatic auto-incrementing id 
    assignId() {
        let id = 1;
        if (this.#products.length !== 0)
            id = this.#products[this.#products.length - 1].id + 1;
        return id;
    }

    // Reading products
    async readProductsInFile() {
        try {
            if (fs.existsSync(this.#path))
                this.#products = JSON.parse(await fs.promises.readFile(this.#path, 'utf-8'));
            console.log('Reading file successfully');
        } catch (error) {
            console.log(`Error reading file, ${error}`);
        }
    }

    // Updating products
    async updateProduct(id, updateProd) {
        try {

            let alert = `The product with id ${id} doesn't exist`;

            const index = this.#products.findIndex(p => p.id === id);
            if (index !== -1) {
                const { id, ...rest } = updateProd;
                const datosReales = ['title', 'description', 'price', 'thumbnails', 'code', 'stock', 'category', 'status'];
                const datosActualizar = Object.keys(rest)
                    .filter(dato => datosReales.includes(dato))
                    .reduce((obj, key) => {
                        obj[key] = rest[key];
                        return obj;
                    }, {});
                this.#products[index] = { ...this.#products[index], ...datosActualizar };
                await this.saveFile();
                return 'Product updated';
            }

            return alert;

        } catch (error) {
            console.log(`Error updating product: ${error}`);
            return 'An error occurred while updating the product';
        }
    }

    // Deleting products
    async deleteProduct(id) {
        try {
            
            let alert = `The product with id ${id} doesn't exist`;

            const index = this.#products.findIndex(p => p.id === id);
            if (index !== -1) {
                this.#products.splice(index, 1);
                await this.saveFile();
                alert = 'Product deleted';
                return alert;
            }
            return alert;
        } catch (error) {
            console.log(`Error deleting product: ${error}`);
            return 'An error occurred while deleting the product';
        }
    }

    // Saving files
    async saveFile() {
        try {
            await fs.promises.writeFile(this.#path, JSON.stringify(this.#products));
        } catch (error) {
            console.log(`Error saving file, ${error}`);
        }
    }
}

export default productManager;