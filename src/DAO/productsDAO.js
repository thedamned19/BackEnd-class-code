import { productsModel } from "./models/productsModel.js";

export default class productsDAO {
    
    async getAll(){
        return await productsModel.find().lean();
    }

    async create(product){
        let newProduct = await productsModel.create(product);
        return newProduct.toJSON();
    }

    // runValidators:true (validaciones de mongo).
    // returnDocument: "after" (info. actualizada).
    async updateProduct(pId, updateData) {
        return await productsModel.findByIdAndUpdate(pId, updateData, { runValidators: true, returnDocument: "after" });
    }

    async deleteProduct(id) {
        return await productsModel.deleteOne({ _id: id });
    }

    async getProductById(id) { 
        return await productsModel.findOne({ _id: id }).lean();
    };

    async getProductsBy(filtro = {}) {
        return await productsModel.findOne(filtro).lean();
    };

    
}