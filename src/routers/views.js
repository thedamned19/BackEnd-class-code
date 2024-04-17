import { Router } from "express";
import path from "path";
import __dirname from "../utils.js";
import productManager from "../classes/productManager.js";

const prodManager = new productManager(
   path.join(__dirname, "/data/productos.json")
  );

const router = Router();

router.get('/', async (req, res) => {
    const p = new productManager();
    let products = await prodManager.getProducts();
    //const products = await p.getProducts();
    console.log(products);
    return res.render('home', {products});
})

router.get('/realtimeproducts', async (req, res) => {
  return res.render('realTimeProducts');
})

export default router;