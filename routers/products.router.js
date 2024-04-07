import { Router } from "express";
import productManager from "../classes/productManager.js";

const router = Router();
const p = new productManager();

//Get all products
router.get('/', async (req, res) => {

    //let limit = req.query.limit;
    const {limit} = req.query;

    try {
        let allProducts = await p.getProducts(limit);
        res.status(200).json({ allProducts });
        console.log('Response Limit:', { allProducts, limit });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error has occurred');
    }   
});


// Get product by id 
router.get('/:pid', async (req, res) => {

    let { pid } = req.params;

    if (isNaN(pid)) {
        return res.status(400).send({error: 'ID must be a number'});
    }
    
    try {
        let productById = await p.getProductById(Number(pid));
        res.json({ productById });
        console.log('Response ID:', { productById });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error has occurred');
    }
});


router.post('/', async (req, res)=>{
    
    const {title, description, price, thumbnails, code, stock, category, status} = req.body;
    const result = await p.addProduct(title, description, price, thumbnails, code, stock, category, status);
    return res.json({result});
})

router.put('/:pid', async (req, res)=>{
    const {pid} = req.params;
    const result = await p.updateProduct(Number(pid), req.body);
    return res.json({result});
})

router.delete('/:pid', async (req, res)=>{
    const {pid} = req.params;
    const result = await p.deleteProduct(Number(pid));
    return res.json({result});
})

export default router;

