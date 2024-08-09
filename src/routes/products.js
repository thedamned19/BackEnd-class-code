import { Router } from "express";
//import { ProductController } from "../controllers/productsController.js";
import { createProduct, getProducts, getProductById, deleteProduct, updateProduct, generateProducts } from "../controllers/productsController.js";

const router = Router();

//Get all products
router.get('/', getProducts);

// Get product by id 
router.get('/:pId', getProductById);

router.post('/', createProduct);

router.delete('/:pId', deleteProduct);

router.put('/:pId', updateProduct);

router.get('/:mockingproducts', generateProducts);

export default router;


