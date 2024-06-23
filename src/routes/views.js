import { Router } from "express";
import path from "path";
import __dirname from "../utils.js";
//import productManager from "../classes/productManager.js";
//import {productsModel} from "../models/products.js";
//import productsController from '../controllers/productsController.js';
import { createProduct, getProducts, getProductById, deleteProduct, updateProduct } from '../controllers/productsController.js';
import { title } from "process";
export const router=Router();
import { auth } from '../middleware/auth.js';


/*
const prodManager = new productManager(
   path.join(__dirname, "/data/productos.json")
  );
*/

//const router = Router();

//router.get('/', productsController.getProducts);
router.get('/', getProducts);

/*
router.get('/', async (req, res) => {
    //const products = await productsModel.find().lean();
    router.get('/',productsController.getProducts)
    //let products = await prodManager.getProducts();
    //const products = await p.getProducts();
    //return res.render('home', {products, styles: "styles.css", title: "Products"});
    return res.render('home', {products, styles: "styles.css", title: "Products", login: req.session.user});
})
*/    

router.get('/realtimeproducts', async (req, res) => {
  return res.render('realTimeProducts',  {title: "Real Time Products", styles: "styles.css", 
  login: req.session.user, user:req.session.user})
})

router.get('/chat', async (req, res) => {
  return res.render('chat', {title: "Chat", styles: "chat.css"});
})

router.get('/registro', (req, res) => {
  res.status(200).render('registro', {login: req.session.user});
})

router.get('/login', (req, res) => {
  let {error}=req.query;
  res.status(200).render('login', {error, login: req.session.user});
})



