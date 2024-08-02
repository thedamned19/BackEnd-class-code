//import { productsDAO as DAO } from "../DAO/productsDAO.js";
import productsDAO from "../DAO/productsDAO.js";
import { generateProductsMocks as MOCK} from "../data/products.mocks.js"

class ProductsService {
    constructor(dao){
        //this.dao = new dao();
        this.dao = dao;
    }

    async getProducts(){
        return await this.dao.getAll();
    }   

    async getProductById(pId){
        return await this.dao.getProductById({_id:pId})
    }
    
    getProductsBy = async (filtro) => {
        return await this.dao.getProductsBy(filtro);
    }


    async createProduct(product){
        return await this.dao.create(product);
    }

    async updateProduct(pId, updateData) {
        return await this.dao.updateProduct({ _id: pId }, updateData);
    }

    async updateRole(id, newRole){
        return await this.dao.updateRole({ _id: pId }, newRole);
    }


    
    /*
    async deleteProduct(id) {
        //return await this.dao.deleteOne({ _id: id });
        return await this.dao.deleteProduct(id);
    }
    */
    
    
    deleteProduct = async (id)=>{
        //console.log(id)
        return await this.dao.deleteProduct(id)
    }
    

    generateProducts() {
        return MOCK.generateProducts();
    }

}

export const productsService = new ProductsService(new productsDAO())
//export const productsService = new ProductsService(new DAO())