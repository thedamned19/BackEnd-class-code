import { Router } from "express";
import path from "path";
import __dirname from "../utils.js";
//import productManager from "../classes/productManager.js";
import {productsModel} from "../models/products.js";

/*
const prodManager = new productManager(
   path.join(__dirname, "/data/productos.json")
  );
*/

const router = Router();

router.get('/', async (req, res) => {
    const p = productsModel.find();
    //let products = await prodManager.getProducts();
    //const products = await p.getProducts();
    return res.render('home', {products, styles: "styles.css"});
})

router.get('/realtimeproducts', async (req, res) => {
  return res.render('realTimeProducts');
})

export default router;