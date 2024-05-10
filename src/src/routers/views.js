import { Router } from "express";
import path from "path";
import __dirname from "../utils.js";
//import productManager from "../classes/productManager.js";
import {productsModel} from "../models/products.js";
import { title } from "process";

/*
const prodManager = new productManager(
   path.join(__dirname, "/data/productos.json")
  );
*/

const router = Router();

router.get('/', async (req, res) => {
    const products = await productsModel.find().lean();
    //let products = await prodManager.getProducts();
    //const products = await p.getProducts();
    return res.render('home', {products, styles: "styles.css"}, {title: "Products"});
})

router.get('/realtimeproducts', async (req, res) => {
  return res.render('realTimeProducts', {title: "Real Time Products"});
})

router.get('/chat', async (req, res) => {
  return res.render('chat', {title: "Chat"});
})

export default router;