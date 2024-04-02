import fs from 'fs';

class cartManager {
    #carts;
    #path;
    constructor() {
        this.#carts = [];
        this.#path = './src/data/carritos.json';
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
    /*
    async readCarritosInFile() {
        try {
            if (fs.existsSync(this.#path))
                return JSON.parse(await fs.promises.readFile(this.#path, 'utf-8'));
            //return [];
        } catch (error) {
            console.log(`Error reading file, ${error}`);
        }
    }
    */
   
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
        return this.#carts;
        //return newCart;
    }

   
    // Saving files
    async saveFile() {
        try {
            await fs.promises.writeFile(this.#path, JSON.stringify(this.#carts));
        } catch (error) {
            console.log(`Error saving file, ${error}`);
        }
    }

    addProductInCart(cid, pid) {

    }
}

export default cartManager;