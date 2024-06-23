import { productsDAO as DAO } from "../DAO/productsDAO.js";

export class ProductsService {
    constructor(dao){
        this.dao = new dao();
    }

    async getProducts(){
        return await this.dao.getAll();
    }   

    async getProductById(id){
        return await this.dao.getProductById({_id:id})
    }


    async createProduct(product){
        return await this.dao.create(product)
    }

    async updateProduct(id, updateData) {
        return await this.dao.findByIdAndUpdate(id, updateData);
    }

    async deleteProduct(id) {
        return await this.dao.deleteOne({ _id: id });
    }
}

export const productsService = new ProductsService(DAO)