import { cartsDAO as DAO } from "../DAO/cartsDAO.js";

class productsService {
    constructor(dao){
        this.dao = new dao();
    }

    async getCarts(){
        return await this.dao.getAll();
    }   

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

}

export const cartsService = new cartsService(DAO)



