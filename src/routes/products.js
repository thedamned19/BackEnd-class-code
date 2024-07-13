import { Router } from "express";
import { } from "../controllers/productsController.js";
import { createProduct, getProducts, getProductById, deleteProduct, updateProduct, generateProducts } from "../controllers/productsController.js";

const router = Router();

//Get all products
router.get('/', getProducts);

// Get product by id 
router.get('/:pId', getProductById);

router.post('/', createProduct);

router.delete('/:pid', deleteProduct);

router.put('/:pid', updateProduct);

router.get('/:mockingproducts', generateProducts);

export default router;


