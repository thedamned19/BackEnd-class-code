import fs from 'fs';
import productManager from './productsDAO.js';

class cartManager {
    #carts;
    #path;

    constructor() {
        this.#carts = [];
        this.#path = './src/data/carts.json';
        this.readCarritosInFile();
    }

    // Getting cart by id
    getCartById(id) {
        let cart = this.#carts.find(c => c.id === id);
        return cart ? cart : 'Not found';
    }

    // Automatic auto-incrementing id 
    assignId() {
        let id = 1;
        if (this.#carts.length !== 0)
            id = this.#carts[this.#carts.length - 1].id + 1;
        return id;
    }

    // Reading carts
    async readCarritosInFile() {
        try {
            if (fs.existsSync(this.#path))
                this.#carts = JSON.parse(await fs.promises.readFile(this.#path, 'utf-8'));
            console.log('Reading file successfully');
        } catch (error) {
            console.log(`Error reading file, ${error}`);
        }
    }


    // Create cart
    async createCart() {
        const newCart = {
            id : this.assignId(),
            products: []
        };
        this.#carts.push(newCart);
        await this.saveFile();
        return newCart;
    }

   
    // Saving files
    async saveFile() {
        try {
                await fs.promises.writeFile(this.#path, JSON.stringify(this.#carts));
        } catch (error) {
            console.log(`Error saving file, ${error}`);
        }
    }

    // Esta función hace el ingreso de productos a los carritos.
    async addProductInCart(cid, pid) {
        let response = `Cart with id ${cid} does not exist`;
        const indexCart = this.#carts.findIndex(c => c.id === cid);
        
        let cart = this.getCartById(cid);

        if (indexCart !== -1) {
            let product = cart.products.find(p => p.pid == pid);
            
            const indexProduct = this.#carts[indexCart].products.findIndex(p => p.id === pid);
            if (indexProduct === -1) {
    
                const indexProduct = this.#carts[indexCart].products.findIndex(p => p.id === pid);
                this.#carts[indexCart].products.push({id : pid, "quantity" : 1});
                this.saveFile();
                response = `Product ${pid} added to cart ${cid}`;
            } else {
                this.#carts[indexCart].products[indexProduct].quantity +=1;
                this.saveFile();
                response = `Product ${pid} added again to cart ${cid}`;
            }    
        }
        return response;        
    }
        
}

export default cartManager;