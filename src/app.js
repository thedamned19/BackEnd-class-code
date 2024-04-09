import express from "express";
import productsRouter from "./routers/products.router.js";
import cartsRouter from "./routers/carts.router.js";
// Defino un puerto.
const PORT = 8080;

// Inicializo express.
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.get('/', (req, res) => {
    return res.send("Primer pre entrega.");
})

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// El servidor escuchando el puerto.
app.listen(PORT, () => console.log(`Esta aplicación corre en el puerto ${PORT}`))

//const p = new productManager();


