import { Router } from "express";
import { addProductInCart, creatCart, getCartById } from "../controllers/carts.js";
//import cartManager from "../classes/cartManager.js";

const router = Router();
//const c = new cartManager();

router.get('/:cid', getCartById);
router.post('/:cid', creatCart);
router.post('/:cid/product/:pid', addProductInCart);

export default router;
/*
router.post('/', async (req, res)=>{
    const result = await c.createCart();
    return res.json({result});
})

router.get('/:cid', (req, res)=>{
    const {cid} = req.params;
    const result = c.getCartById(Number(cid));
    return res.json({result});
})

router.post('/:cid/product/:pid', async (req, res)=>{
    const {cid, pid} = req.params;
    const result =  await c.addProductInCart(Number(cid), Number(pid));
    return res.json({result});
})
*/

