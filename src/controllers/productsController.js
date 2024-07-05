import { productsService } from "../services/productsService.js";
import { CustomError } from '../errors/CustomError.js';
import { argumentosProducto } from '../errors/ErrorsProducts.js';
import { TIPOS_ERROR } from '../errors/EErrors.js';


/*
async function getProducts(req,res) {

    let products = await productsService.getProducts();
    
    res.setHeader('Content-Type','application/json');
    res.status(200).json({products});
}
    */

//export const getCartById = async(req=request, res=response) => {

// Implementamos la creación de producto con el manejador de errores
export const createProduct = async (req,res) => {
    try {
        let {title} = req.body;
        let {description} = req.body;
        let {code} = req.body;
        let {price} = req.body;
        let {stock} = req.body;
        let {category} = req.body;
        if(!title){
            CustomError.createError("Argumento title faltante", argumentosProducto(req.body), "Complete la propiedad title", TIPOS_ERROR.ARGUMENTOS_INVALIDOS)
        }
        if(!description){
            CustomError.createError("Argumento description faltante", argumentosProducto(req.body), "Complete la propiedad description", TIPOS_ERROR.ARGUMENTOS_INVALIDOS)
        }
        if(!code){
            CustomError.createError("Argumento code faltante", argumentosProducto(req.body), "Complete la propiedad code", TIPOS_ERROR.ARGUMENTOS_INVALIDOS)
        }
        if(!price){
            CustomError.createError("Argumento price faltante", argumentosProducto(req.body), "Complete la propiedad price", TIPOS_ERROR.ARGUMENTOS_INVALIDOS)
        }
        if(!stock){
            CustomError.createError("Argumento stock faltante", argumentosProducto(req.body), "Complete la propiedad stock", TIPOS_ERROR.ARGUMENTOS_INVALIDOS)
        }
        if(!category){
            CustomError.createError("Argumento category faltante", argumentosProducto(req.body), "Complete la propiedad category", TIPOS_ERROR.ARGUMENTOS_INVALIDOS)
        }
    
        let propiedadesValidas = ['title','description','code','price','stock','category'];
        let propiedadesProductoNuevo = Object.keys(req.body);
        let valido = propiedadesProductoNuevo.every(prop => propiedadesValidas.includes(prop));
    
        if(!valido){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Ha ingresado propiedades invalidas`, detalle:propiedadesValidas});
        }
        const product = await productsService.createProduct(req.body);
        return res.json({msg: "Product created", product});
        
    } catch (error){
        console("addProduct ->", error);
        return res.status(500).json({msg: "Contact administrator"});
    }
}

/*
// Creación de producto con validaciones anteriores.
export const createProduct = async (req,res) => {
    try {
        const {title, description, price, thumbnails, code, stock, category, status} = req.body;
        if (!title || !description || !price || !code || !stock || !category)
            return res.status(404).json({msg: 'All data are required (title, description, price, code, stock, category'});
        const product = await productsService.createProduct(req.body);
        return res.json({msg: "Product created", product});
    } catch (error){
        console("addProduct ->", error);
        return res.status(500).json({msg: "Contact administrator"});
    }
}
*/

export const getProducts = async (req=request, res=response) =>  {
    try {
            
        const limit = Number(req.query.limit);
        if (isNaN(limit)) {
            return res.json({ error: "The 'limit' parameter must be a number" });
        }
        if (limit === 0) {
            return res.json({ error: "The 'limit' parameter must be a number greater than zero" });
        }      
              
        //const total = await productsModel.countDocuments();
        //const products = await productsModel.find().limit(limit);
        // Promise.all devuelve la respuesta en menos tiempo.
        const [products, total] = await Promise.all([productsModel.find().limit(limit), productsModel.countDocuments()]);
        return res.json({total, limit, products});
            
    } catch (error){
        console("getProducts ->", error);
        return res.status(500).json({msg: "Contact administrator"});
    }
}

export const getProductById = async (req=request, res=response) =>  {
    try {
        const {pId} = req.params;
        const product = await productsService.getProductById(pId);
        if (!product)
            return res.status(404).json({msg:`The product with id ${id} doesn't exist`})
        return res.json({product});
    } catch (error){
        console("getProductById ->", error);
        return res.status(500).json({msg: "Contact administrator"});
    }
}

export const deleteProduct = async (req=request, res=response) =>  {
    try {
        const {pId} = req.params;
        const product = await productsService.findByIdAndDelete(pId);
        if (!product)
            return res.status(404).json({msg: `Error deleting product: ${pId}`});
        return res.json({msg: "Deleted product", product})
    } catch (error){
        console("deleteProduct ->", error);
        return res.status(500).json({msg: "Contact administrator"});
    }
}

export const updateProduct = async (req=request, res=response) => {
    try {
        const {pId} = req.params;
        console.log(pId);
        const {_id, ...rest} = req.body;
        const product = await productsService.findByIdAndUpdate(pId, {...rest}, {new:true});
        if (product)
            return res.json({msg: "Updated product", product})
        return res.status(404).json({msg: `Error updated product: ${pId}`});
    } catch (error){
        console("updateProduct ->", error);
        return res.status(500).json({msg: "Contact administrator"});
    }
}

export const generateProducts = () => {
    return productsService.generateProducts();
}

//export default {getProducts, createProduct, getProductById, deleteProduct, updateProduct}