import { Router } from "express";
import { addProductInCart, createCart, getCartById, getCarts } from "../controllers/cartsController.js";
//import cartsController from '../controllers/cartsController.js';
import ticketsController from "../controllers/ticketsController.js";
const router = Router();

router.get('/:cid', getCartById);
router.post('/', createCart);
router.post('/:cid/product/:pid', addProductInCart);
router.get('/', getCarts);

router.post('/:cid/purchase', ticketsController.createTicket);

export default router;


