import { cartsDAO as DAO } from "../DAO/cartsDAO.js";
import { MemoryCartsDAO } from "../DAO/memoryCartsDAO.js";
import { CartsDTO } from "../DTO/cartsDTO.js";

class CartsService {
    constructor(dao){
        this.dao = dao;
    }

    /*
    async getCarts(){
        return await this.cartsDAO.getAll();
    } 
    */

    async getOneBy(id){
        return await this.dao.getOneBy({_id:id})
    }

    async getOneByPopulate(filter = {}) {
        return await this.dao.findOne(filter).populate("carts.cart").lean();
    }

    async create(cart){
        let newCart = await this.dao.create(cart);
        return newCart.toJSON();
    }

    async updateCart(id, updateData) {
        return await this.dao.findByIdAndUpdate(id, updateData);
    }

    async findById(id, updateData) {
        return await this.dao.findByIdAndUpdate(id, updateData);
    }

    async getCarts() {        
        let carts = await this.dao.getAll();
        carts = carts.map(cart => new CartsDTO(cart));
        return carts;
    }

}

export const cartsService = new CartsService(new DAO())
//export const cartsService = new CartsService(new MemoryCartsDAO())



