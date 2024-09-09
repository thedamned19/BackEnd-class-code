import { Router } from "express";
import path from "path";
import __dirname from "../utils.js";
export const router = Router();
import { admin, auth } from '../middlewares/auth.js';
import { cartIdView, chatView, homeView, productsView, realTimeProductsView, loginGet, registerGet,  registerPost, logout, login, getPerfil } from "../controllers/viewController.js";
import { createProduct, getProducts, getProductById, deleteProduct, updateProduct } from '../controllers/productsController.js';
import passport from "passport";
import { title } from "process";


router.get('/', auth, homeView);
router.get('/chat', auth, chatView);
router.get('/realtimeproducts', auth, realTimeProductsView);
router.get('/cart/:cid', auth, cartIdView);


router.get('/cart/:cid', async(req, res) =>{
  const {cid} = req.params;
  const cart = await cartsService.getCartById(cid);
  return res.render("cart", {title:"Cart", cart});
});



router.get('/login', loginGet);
router.get('/register', registerGet);


router.post('/login', passport.authenticate("login", {failureRedirect:"/login"}), login);


router.post('/logout', logout);


router.get('/github', passport.authenticate('github', { scope: ['user:e_mail']}), async(req, res) => {});
router.get('/login-github-callback', passport.authenticate("github", {failureRedirect:"/register"}), login);

router.get("/products", getProducts);

router.get("/perfil", getPerfil);

export default router;


