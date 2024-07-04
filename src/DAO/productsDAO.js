import { productsModel } from "./models/productsModel.js";

export class productsDAO {
    
    async getAll(){
        return await productsModel.find().lean();
    }

    async create(product){
        let newProduct = await productsModel.create(product);
        return newProduct.toJSON();
    }

    async updateProduct(id, updateData) {
        return await productsModel.findByIdAndUpdate(id, updateData);
    }

    async deleteProduct(id) {
        return await productsModel.deleteOne({ _id: id });
    }
    
}