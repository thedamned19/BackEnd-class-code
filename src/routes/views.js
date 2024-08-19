import { Router } from "express";
import path from "path";
import __dirname from "../utils.js";
export const router = Router();
import { admin, auth } from '../middlewares/auth.js';
import { cartIdView, chatView, homeView, productsView, realTimeProductsView, loginGet, registerGet, loginPost, registerPost, logout } from "../controllers/viewController.js";
import { createProduct, getProducts, getProductById, deleteProduct, updateProduct } from '../controllers/productsController.js';


//router.get('/', getProducts);
router.get('/', homeView);
//router.get('/', productsView);
router.get('/chat', chatView);
router.get('/realtimeproducts', realTimeProductsView);
//router.get('/realtimeproducts', [auth, admin], realTimeProductsView);
router.get('/cart/:cid', cartIdView);

router.get('/login', loginGet);
router.post('/login', loginPost);
router.get('/register', registerGet);
router.post('/register', registerPost);
router.post('/logout', logout);


/*
router.get('/login', (req, res) => {
  let {error}=req.query;
  res.status(200).render('login', {error, login: req.session.user});
})
*/


//router.get('/register', register);


export default router;


