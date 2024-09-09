import { cartsModel } from "./models/cartsModel.js";

export class cartsDAO {
    
    async getAll(){
        return await cartsModel.find().lean();
    }

    async getOneBy(id) {
        return await cartsModel.findOne({ _id: id }).lean();
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
        return await cartsModel.updateOne({_id:cid}, {$set: {products: products}});
    }

    async getCartById(id) {
        return await cartsModel.findOne({ _id: id }).populate("products.product").lean();
    }

    async deleteProductInCart(cid, pid) {
        return await cartsModel.updateOne({_id:cid}, {$pull: {products: {product: pid}}});
    }

    async deleteAllProducts(cid) {
        return await cartsModel.findByIdAndUpdate(cid, { $set: { products: [] } }, { returnDocument: "after" });
    }

    async updateQuantity(cid, pid, newQuantity) {
        return await cartsModel.updateOne({_id:cid, "products.product": pid}, {$set:{"products.$.quantity": newQuantity}});

    }
}