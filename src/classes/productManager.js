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
    async addProduct(title, description, price, image, code, stock) {
        try {
            if (!title || !description || !price || !image || !code || !stock)
                return 'All data are required (title, description, price, image, code, stock)';

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
                image,
                code,
                stock
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
    async getProductById(id) {
        let product = this.#products.find(p => p.id === id);
        return product ? product : 'Not found';
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
                const { id: prodId, ...rest } = updateProd;
                this.#products[index] = { ...this.#products[index], ...rest };
                await this.saveFile();
                alert = 'Product updated';
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