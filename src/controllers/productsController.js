import { productsService } from "../services/productsService.js"

async function getProducts(req,res) {

    let products = await productsService.getProducts();
    
    res.setHeader('Content-Type','application/json');
    res.status(200).json({products});
}

async function createProduct(req,res) {
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

async function getProducts (req=request, res=response) {
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

async function getProductById(req=request, res=response) {
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

async function deleteProduct(req=request, res=response) {
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

async function updateProduct(req=request, res=response) {
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

export default {getProducts, createProduct, getProductById, deleteProduct, updateProduct}