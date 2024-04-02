import { Router } from "express";

const router = Router();

router.get('/:cid', async (req, res)=>{
    const {cid} = req.params;
    return res.json({});
})

router.post('/', async (req, res)=>{
    
    return res.json({});
})

router.post('/:cid/product/pid', async (req, res)=>{
    const {cid, pid} = req.params;
    return res.json({});
})

export default router;
