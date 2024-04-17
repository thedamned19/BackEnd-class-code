import express from "express";
import {Server} from "socket.io";
import {engine} from "express-handlebars";

import productsRouter from "./routers/products.router.js";
import cartsRouter from "./routers/carts.router.js";
import views from "./routers/views.js";
import __dirname from "./utils.js";
import productManager from "./classes/productManager.js";

// Defino un puerto.
const PORT = 8080;


// Inicializo express.
const app = express();

const p = new productManager();

app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(express.static(__dirname + "/public"));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

/*
app.get('/', (req, res) => {
    return res.render('home');
})
*/

app.use('/', views);
app.use('/api/products', views);
app.use('/api/carts', cartsRouter);

// El servidor escuchando el puerto.
const expressServer = app.listen(PORT, () => console.log(`Esta aplicación corre en el puerto ${PORT}`))
const socketServer = new Server(expressServer);

socketServer.on("connection", async socket => {
    //console.log("Cliente conectado desde el front");
    const products = await p.getProducts();
    socket.emit("products", products);

    socket.on("addProduct", async product => {
        const result = await p.addProduct({...product});
        console.log({result});
    })
})

//const p = new productManager();


