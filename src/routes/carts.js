import { Router } from "express";
import { addProductInCart, createCart, getCartById, getCarts, deleteProductInCart, deleteAllProducts, updateQuantity } from "../controllers/cartsController.js";
//import cartsController from '../controllers/cartsController.js';
import ticketsController from "../controllers/ticketsController.js";
const router = Router();

router.get('/', getCarts);
router.get('/:cId', getCartById);

router.post('/', createCart);
router.post('/:cId/product/:pId', addProductInCart);

router.delete("/:cId/product/:pId", deleteProductInCart);
router.delete("/:cId", deleteAllProducts);

router.put("/:cId/product/:pId", updateQuantity);

router.post('/:cid/purchase', ticketsController.createTicket);

export default router;


