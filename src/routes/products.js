import { Router } from "express";
import  { getProducts, getProductById, addProduct, deleteProduct, updateProduct } from "../controllers/productsController.js";

const router = Router();

//Get all products
router.get('/', getProducts);

// Get product by id 
router.get('/:pId', getProductById);

router.post('/', addProduct);

router.delete('/:pid', deleteProduct);

router.put('/:pid', updateProduct);

export default router;


