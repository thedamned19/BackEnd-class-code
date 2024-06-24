import { Router } from "express";
//import { addProductInCart, createCart, getCartById, getCarts } from "../controllers/cartsController.js";
import cartsController from '../controllers/cartsController.js';
const router = Router();

//router.get('/:cid', cartsController.getCartById);
//router.post('/', createCart);
//router.post('/:cid/product/:pid', addProductInCart);
router.get('/', cartsController.getCarts);

export default router;


