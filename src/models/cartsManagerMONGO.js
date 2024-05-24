import { cartModel } from "./carts.js";

export class CartManager {
    async getAll() {
        return cartModel.find().lean();
    }

    async getOneBy(filter = {}) {
        return await cartModel.findOne(filter).lean();
    }

    async getOneByPopulate(filter = {}) {
        return await cartModel.findOne(filter).populate("products.product").lean();
    }

    async create() {
        let cart = await cartModel.create({products:[]});
        return cart.toJSON();
    }

    async update(id, cart) {
        return await cartModel.updateOne({_id:id}, cart);
    }
}