import { cartsModel } from "./models/cartsModel.js";

export class cartsDAO {
    
    async getAll(){
        return await cartsModel.find().lean();
    }

    async getOneBy(filter = {}) {
        return await cartsModel.findOne(filter).lean();
    }


    async getOneByPopulate(filter = {}) {
        return await cartsModel.findOne(filter).populate("products.product").lean();
    }

    async create(cart){
        let newCart = await cartsModel.create(cart);
        return newCart.toJSON();
    }

    async update(id, cart) {
        return await cartsModel.updateOne({_id:id}, cart);
    }

    async addToCart(cid, products) {
        return await cartsModel.updateOne({_id:cid}, {$set: {products: products}})
    }
}