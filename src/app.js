import express from "express";
import productManager from "./classes/productManager.js";

// Defino un puerto.
const PORT = 8080;

// Inicializo express.
const app = express();

// El servidor escuchando el puerto.
app.listen(PORT, () => console.log(`Server online en puerto ${PORT} `))

const p = new productManager();

//Get all products
app.get('/products', async (req, res) => {

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
app.get('/products/:pid', async (req, res) => {

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

