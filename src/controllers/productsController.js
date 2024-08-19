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
        console.log("getProductos")
        const limit = Number(req.query.limit);
        //const limit = 3;
        if (isNaN(limit)) {
            res.setHeader("Content-Type", "application/json");
            return res.status(401).json({message: "The 'limit' parameter must be a number" });
            //return res.json({ error: "The 'limit' parameter must be a number" });
        }
        if (limit <= 0) {
            res.setHeader("Content-Type", "application/json");
            return res.status(402).json({message: "The 'limit' parameter must be a number greater than zero" });
            //return res.json({ error: "The 'limit' parameter must be a number greater than zero" });
        }
        
        //let products = await productsService.getProducts();
        //res.setHeader("Content-Type", "text/html")
        //res.status(200).render("home", { products,  styles: "styles.css" }) 
              
        //const total = await productsModel.countDocuments();
        //const products = await productsModel.find().limit(limit);
        // Promise.all devuelve la respuesta en menos tiempo.
        const [products, total] = await Promise.all([productsModel.find().limit(limit), productsModel.countDocuments()]);
        return res.json({total, limit, products});
            
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