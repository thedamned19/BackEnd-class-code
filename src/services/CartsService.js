import { cartsDAO as DAO } from "../DAO/cartsDAO.js";
import { MemoryCartsDAO } from "../DAO/memoryCartsDAO.js";
import { CartsDTO } from "../DTO/cartsDTO.js";

class CartsService {
    constructor(dao){
        this.dao = dao;
    }

    async getOneBy(id){
        return await this.dao.getOneBy({_id:id});
    }

    async getOneByPopulate(filter = {}) {
        return await this.dao.findOne(filter).populate("carts.cart").lean();
    }

    async create(cart){
        //let newCart = await this.dao.create(cart);
        //return newCart.toJSON();
        return await this.dao.create(cart);
    }

    async updateCart(id, updateData) {
        return await this.dao.findByIdAndUpdate(id, updateData);
    }

    async update(id, cart){
        return await this.dao.update({_id:id}, cart);
    }

    async findById(id, updateData) {
        return await this.dao.findByIdAndUpdate(id, updateData);
    }

    async getCarts() {        
        let carts = await this.dao.getAll();
        carts = carts.map(cart => new CartsDTO(cart));
        return carts;
    }

    async addToCart(id, products) {
        return await this.dao.addToCart(id, products);
    }

    async addProductToCart(id, product) {
        return await this.dao.addProductToCart(id, product);
    }


     /*
    async getCarts(){
        return await this.cartsDAO.getAll();
    } 
    */

    async getCartById (id) {
        return await this.dao.getCartById(id);
    }

    async deleteProductInCart (cId, pId) {
        return this.dao.deleteProductInCart(cId, pId);
    }

    async deleteAllProducts(cId) {
        return await this.dao.deleteAllProducts(cId);
    }

    async updateQuantity (cId, pId, newQuantity) {
        return this.dao.updateQuantity(cId, pId, newQuantity);
    }

}

export const cartsService = new CartsService(new DAO())
//export const cartsService = new CartsService(new MemoryCartsDAO())



