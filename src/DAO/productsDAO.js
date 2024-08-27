import { productsModel } from "./models/productsModel.js";

export default class productsDAO {
    
    async getAll(){
        return await productsModel.find().lean();
    }

    async create(product) {
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
        console.log(filtro)
        return await productsModel.findOne(filtro).lean();
    };

     async getProductsPaginate(filtro, opciones, sortOptions) {

        let resultado = await productsModel.paginate(filtro, {limit: opciones.limit, page: opciones.page, lean: true, sort: sortOptions})
        return resultado = {
                    status: "success",
                    payload: resultado.docs,
                    totalPages: resultado.totalPages,
                    prevPage: resultado.prevPage,
                    nextPage: resultado.nextPage,
                    page: resultado.page,
                    hasPrevPage: resultado.hasPrevPage,
                    hasNextPage: resultado.hasNextPage,
                }     
    }

    
}