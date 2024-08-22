import { Router } from "express";
import path from "path";
import __dirname from "../utils.js";
export const router = Router();
import { admin, auth } from '../middlewares/auth.js';
import { cartIdView, chatView, homeView, productsView, realTimeProductsView, loginGet, registerGet,  registerPost, logout, login } from "../controllers/viewController.js";
import { createProduct, getProducts, getProductById, deleteProduct, updateProduct } from '../controllers/productsController.js';
import passport from "passport";


//router.get('/', getProducts);
router.get('/', homeView);
//router.get('/', productsView);
router.get('/chat', chatView);
router.get('/realtimeproducts', realTimeProductsView);
//router.get('/realtimeproducts', [auth, admin], realTimeProductsView);
router.get('/cart/:cid', cartIdView);

router.get('/login', loginGet);
router.post('/login', passport.authenticate("login", {failureRedirect:"/login"}), login);
//router.post('/login', loginPost);

router.get('/register', registerGet);
router.post('/register', passport.authenticate("register", {failureRedirect:"/register"}), registerPost);
//router.post('/register', registerPost);

router.post('/logout', logout);



router.get('/github', passport.authenticate('github', { scope: ['user:e_mail']}), async(req, res) => {});
router.post('/login-github-callback', passport.authenticate("github", {failureRedirect:"/register"}), login);

/*
router.post('/register', passport.authenticate("register", {failureRedirect:"/register"}), async(req, res) => {
  // si sale todo OK passport deja un req.user
  res.setHeader('Content-Type','application/json');
  return res.status(201).json({messagge:"Registro OK", newUser : req.user});
}
)
*/

/*
router.get('/login', (req, res) => {
  let {error}=req.query;
  res.status(200).render('login', {error, login: req.session.user});
})
*/

export default router;


