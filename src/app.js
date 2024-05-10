import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";

//import productManager from "./classes/productManager.js";
import cartsRouter from "./routers/carts.js";
import productsRouter from "./routers/products.js";
import views from "./routers/views.js";
import __dirname from "./utils.js";

import mongoose from 'mongoose';
import { productsModel } from "./models/products.js";
import { messagesModel } from "./models/messages.js";

// Defino un puerto.
const PORT = 8080;


// Inicializo express.
const app = express();

//const p = new productManager();


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
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


// El servidor escuchando el puerto.
const expressServer = app.listen(PORT, () => console.log(`Esta aplicación corre en el puerto ${PORT}`))
const io = new Server(expressServer);

const dbConnection = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://ernestoleimsieder:CoderCoder@cluster0.ycrhk4t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
            {
                dbName:"ecommerce"
            }
        )
        console.log("DB Online...!!!")
    } catch (error) {
        console.log("Error raising database ${error}");
        process.exit(1);
    }
}

await dbConnection();

let messages = [];
io.on("connection", async (socket) => {
    console.log("Cliente conectado desde el front");
    const products = await productsModel.find();
    socket.emit("products", products);

    /*
    socket.on("addProduct", async product => {
        const newProduct = await productsModel.create({...product});
        if(newProduct) {
            products.push(newProduct);
            socket.emit("product", products);
        } 
    })
    */

    // Chat
    //const messagges = await messagesModel.find();
    //socket.emit("messagge", messagges);

    /*
    socket.on("messagge", async(data) => {
        const newMessagge = await messagesModel.create({...data});
        if (newMessagge){
            const messages = await messagesModel.find();
            io.emit("messaggeLogs", messages);
        }
    })
    */

    socket.on("messagge", data => {
        messages.push(data);
        io.emit("messaggeLogs", messages);
    })
    socket.broadcast.emit("new_user");
})

/*
io.on("connection", async (socket) => {
    console.log("Cliente conectado desde el front");
    const products = await p.getProducts();
    socket.emit("products", products);

    socket.on("addProduct", async product => {
        const result = await p.addProduct({...product});
        if(result.product) socket.emit("product", result.product);
    })
})
*/



