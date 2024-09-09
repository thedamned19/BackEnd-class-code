import productsDAO from "../DAO/productsDAO.js";
import { generateProductsMocks as MOCK} from "../data/products.mocks.js"

class ProductsService {
    constructor(dao){
        this.dao = dao;
    }
    
    getProducts = async () => {
        return await this.dao.getAll();
    }
    
    async getProductById(pId){
        return await this.dao.getProductById({_id:pId})
    }
    
    getProductsBy = async (filtro) => {
        console.log(filtro);
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

    deleteProduct = async (id)=>{
        return await this.dao.deleteProduct(id)
    }
    

    generateProducts() {
        return MOCK.generateProducts();
    }

    getProductsPaginate = async (filtro, opciones, sortOptions) => {
        return this.dao.getProductsPaginate(filtro, opciones, sortOptions)
    }

}

export const productsService = new ProductsService(new productsDAO())
