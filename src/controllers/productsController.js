import { productsService } from "../services/ProductsService.js";
import { CustomError } from '../errors/CustomError.js';
import { TIPOS_ERROR } from '../errors/EErrors.js';
import { argumentsProduct } from '../errors/ErrorsProducts.js';
import { isValidObjectId } from "mongoose";
import {productsModel} from "../DAO/models/productsModel.js";


/*
async function getProducts(req,res) {

    let products = await productsService.getProducts();
    
    res.setHeader('Content-Type','application/json');
    res.status(200).json({products});
}
    */

//export const getCartById = async(req=request, res=response) => {

// Implementamos la creación de producto con el manejador de errores
export const createProduct = async (req, res) => {

    //let {title, description, price, thumbnails, code, stock, category, status} = req.body;
    let {title, description, price, code, stock, category} = req.body;
    //let owner="premium";

    try {
        
        if (!title || !description || !price || !code || !stock || !category ) {

            //CustomError.createError("createProduct --> productController", "Required fields were not completed", "All fields are required", TIPOS_ERROR.ARGUMENTOS_INVALIDOS);

            CustomError.createError({
                name: "Product creation error",
                cause: argumentsProduct(req.body),
                message: "Missing argument(s)",
                code: TIPOS_ERROR.ARGUMENTOS_INVALIDOS
            })
        }

        /*
        if (typeof price !== 'number' || typeof stock !== 'number') {
            CustomError.createError("createProduct --> productController", "Wrong price and stock", "Price and stock must be numerical values", TIPOS_ERROR.ARGUMENTOS_INVALIDOS);
            console.log("2")

        }
        */
        
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
        //return res.status(500).json({message: `Contact administrator`});
    }
}    

/*
        } catch (error) {
            res.setHeader("Content-Type", "application/json")
            return res.status(500).json({ message: "Error when performing the filter function" })
        }
        
    
        //try {    
            let product = await productsService.createProduct({ title, description, price, code, stock, category });
            res.setHeader("Content-Type", "application/json");
            res.send({status:"success", payload:product});
            //return res.status(200).json(product);
        } catch (error){
            console("addProduct ->", error);
            return res.status(500).json({message: `Contact administrator`});
        }

*/

// Nos estamos "salteando" la capa de Service (corregir).

export const getProducts = async (req=request, res=response) =>  {
    try {
        let { limit = 10, page = 1, sort, query } = req.query;

        /*
        if (isNaN(limit) || (isNaN(page))) {
            res.setHeader("Content-Type", "application/json");
            return res.status(401).json({message: "The 'limit' and 'page' parameters must be a number" });
        }
        if (limit <= 0 || page <= 0) {
            res.setHeader("Content-Type", "application/json");
            return res.status(402).json({message: "The 'limit' and 'page' must be a number greater than zero" });
        }
        */
        
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

        //const queryProducts = productsModel.find(query).limit(limit).skip(skip);
        const queryProducts = productsModel.find(query).limit(limit).skip(skip).lean();
        if (sort !== null) queryProducts.sort({price:sort});
        // Promise.all devuelve la respuesta en menos tiempo.        
        const [products, totalDocs] = await Promise.all([queryProducts, productsModel.countDocuments(query)]);
        const totalPages = Math.ceil(totalDocs/limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
        const prevPage = hasPrevPage ? page - 1 : null;
        const nextPage = hasNextPage ? page + 1 : null;

        //const result = { totalDocs, totalPages, limit, hasNextPage, hasPrevPage, prevPage, nextPage, payload:products};
        //return res.json({ result });

        res.setHeader("Content-Type", "text/html");
        res.status(200).render("products", { payload:products, totalPages, limit, query:JSON.stringify(query), page, hasPrevPage, hasNextPage, prevPage, nextPage, styles: "styles.css"}); 
              
    } catch (error){
        console("getProducts ->", error);
        return res.status(500).json({message: "Contact administrator"});
    }
}


/*
//static getProducts = async (req, res) => {
export const getProducts = async (req=request, res=response) =>  {    

    try {
        //              QUERY PARAMS
        let page = parseInt(req.query.page) || 1
        let limit = parseInt(req.query.limit) || 10
        let query = req.query.query
        let sort = req.query.sort || "asc"
        let stock = parseInt(req.query.stock) || undefined

        let filtro = {}
        if (query) {
            const parametros = query.split(':');
            const campo = parametros[0];
            const valor = parametros[1];
            filtro[campo] = valor
        }

        if (stock) {
            filtro.stock = { $gte: stock }//sintaxis mongoose
        }


        let opciones = {
            page: page,
            limit: limit,
        }

        const sortOptions = {};

        if (sort === 'asc') {
            sortOptions.price = 1; // Orden ascendente por precio
        } else if (sort === 'desc') {
            sortOptions.price = -1; // Orden descendente por precio
        }
        console.log(filtro);
        console.log(opciones);
        console.log(sortOptions);
        let resultado = await productsService.getProductsPaginate(filtro, opciones, sortOptions)
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(resultado)

    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        res.status(500).json("Error en el servidor al paginar productos")
    }
}
*/

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
            //res.send({status:"success", payload:product});
            //return res.json({product});
        }
    } catch (error){
        console("getProductById ->", error);
        return res.status(500).json({message: "Contact administrator"});
    }
}

/*
export const deleteProduct = async (req=request, res=response) =>  {
    try {
        const {pId} = req.params;
        const product = await productsService.deleteProduct(pId);
        //const product = await productsService.findByIdAndDelete(pId);
        if (!product)
            return res.status(404).json({msg: `Error deleting product: ${pId}`});
        return res.json({msg: "Deleted product", product})
    } catch (error){
        console("deleteProduct ->", error);
        return res.status(500).json({msg: "Contact administrator"});
    }
}
*/

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


/*
// Método antes del refactor que funcionaba.
export const updateProduct = async(req=request, res=response) => {
    try {
        const {pId} = req.params;
        const {_id, ...rest} = req.body;
        const product = await productsModel.findByIdAndUpdate(pId, {...rest}, {new:true});
        if (product)
            return res.json({msg: "Updated product", product})
        return res.status(404).json({msg: `Error updated product: ${pId}`});
    } catch (error){
        console("updateProduct ->", error);
        return res.status(500).json({msg: "Contact administrator"});
    }
}
*/

export const generateProducts = () => {
    return productsService.generateProducts();
}

//export default {getProducts, createProduct, getProductById, deleteProduct, updateProduct}