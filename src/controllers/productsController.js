import { productsService } from "../services/ProductsService.js";
import { CustomError } from '../errors/CustomError.js';
import { TIPOS_ERROR } from '../errors/EErrors.js';
import { argumentsProduct } from '../errors/ErrorsProducts.js';
import { isValidObjectId } from "mongoose";
import {productsModel} from "../DAO/models/productsModel.js";



// Implementamos la creación de producto con el manejador de errores
export const createProduct = async (req, res) => {

    //let {title, description, price, thumbnails, code, stock, category, status} = req.body;
    let {title, description, price, code, stock, category} = req.body;
    //let owner="premium";

    try {
        
        if (!title || !description || !price || !code || !stock || !category ) {

            CustomError.createError({
                name: "Product creation error",
                cause: argumentsProduct(req.body),
                message: "Missing argument(s)",
                code: TIPOS_ERROR.ARGUMENTOS_INVALIDOS
            })
        }

    } catch (error) {
        console("addProduct ->", error);
        return error;            
    }

    try {        
        let existsProduct = await productsService.getProductsBy({ code });
        if (existsProduct) {
            CustomError.createError("createProduct --> productController", "Repetead code", `Error, code: ${code} exists already exists in another product`, TIPOS_ERROR.ARGUMENTOS_INVALIDOS);
            console.log("3")

        }

        let product = await productsService.createProduct({ title, description, price, code, stock, category });
        res.setHeader("Content-Type", "application/json");
        res.send({status:"success", payload:product});

    } catch (error){
        console("addProduct ->", error);
        return error;
    }
}    


export const getProducts = async (req=request, res=response) =>  {
    try {
        let { limit = 10, page = 1, sort, query } = req.query;

        page = page == 0 ? 1 : page;
        page = Number(page);
        limit = Number(limit);
        const skip = (page - 1) * limit;
        const sortOrderOptions = {'asc':1, 'desc':-1};
        sort = sortOrderOptions[sort] || null;

        try {
            if (query)
                query = JSON.parse(decodeURIComponent(query));
        } catch(error) {
            query = {};
        }

        const queryProducts = productsModel.find(query).limit(limit).skip(skip).lean();
        if (sort !== null) queryProducts.sort({price:sort});
        // Promise.all devuelve la respuesta en menos tiempo.        
        const [products, totalDocs] = await Promise.all([queryProducts, productsModel.countDocuments(query)]);
        const totalPages = Math.ceil(totalDocs/limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
        const prevPage = hasPrevPage ? page - 1 : null;
        const nextPage = hasNextPage ? page + 1 : null;

        res.setHeader("Content-Type", "text/html");
        res.status(200).render("products", { payload:products, totalPages, limit, query:JSON.stringify(query), page, hasPrevPage, hasNextPage, prevPage, nextPage, styles: "styles.css"}); 
              
    } catch (error){
        console("getProducts ->", error);
        return res.status(500).json({message: "Contact administrator"});
    }
}

export const getProductById = async (req=request, res=response) =>  {
    const {pId} = req.params;
    if (!isValidObjectId(pId)) {
        res.setHeader("Content-Type", "application/json")
        return res.status(400).json(
            {message: `Error, the required id: ${pId} is not in a valid MongoDB format`}
        );
    }
    try {
        const product = await productsService.getProductById(pId);
        if (!product) {
            res.setHeader("Content-Type", "application/json")
            return res.status(404).json({message:`The product with id ${id} doesn't exist`})
        } else {
            res.setHeader("Content-Type", "application/json")
            return res.status(200).json({payload:product});
        }
    } catch (error){
        console("getProductById ->", error);
        return res.status(500).json({message: "Contact administrator"});
    }
}

export const deleteProduct = async (req, res) => {
    try {
        let pId = req.params.pId;
        const product = await productsService.getProductsBy({ _id: pId });
        if (!product) {
            return res.status(404).json({message: `Error deleting product: ${pId}`});
        }
        const deletedProduct = await productsService.deleteProduct(pId);
        if (deletedProduct.deletedCount > 0) {
            res.setHeader("Content-Type", "application/json");
            return res.status(200).json({product});
        } 
    } catch (error) {
        console.log(pId);
        console("deleteProduct ->", error);
        return res.status(500).json({message: "Contact administrator"});
    }
}


export const updateProduct = async (req, res) => {
    let pId = req.params.pId;
    if (!isValidObjectId(pId)) {
        res.setHeader("Content-Type", "application/json")
        return res.status(400).json(
            {message: `Error, the required id: ${pId} is not in a valid MongoDB format`}
        );
    }
    let modif = req.body;
    //if(modif._id){
    //    delete modif._id; 
    //}
    const product = await productsService.getProductsBy({ _id: pId });
    if (!product) {
        return res.status(404).json({message: `Error updating product not found: ${pId}`});
    }
    
    try {    
        let updatedProduct = await productsService.updateProduct(pId, modif);        
        res.setHeader("Content-Type", "application/json");
        return res.status(200).json(updatedProduct);
    } catch (error){
        console("updateProduct ->", error);
        return res.status(500).json({message: "Contact administrator"});
    }
}

export const generateProducts = () => {
    return productsService.generateProducts();
}

