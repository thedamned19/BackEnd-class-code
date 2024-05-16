import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import sessions from "express-session";
import { auth } from './middleware/auth.js';

//import productManager from "./classes/productManager.js";
import cartsRouter from "./routers/carts.js";
import productsRouter from "./routers/products.js";
//import views from "./routers/views.js";
import __dirname from "./utils.js";

import mongoose from 'mongoose';
import { productsModel } from "./models/products.js";
import { messagesModel } from "./models/messages.js";

import { router as sessionsRouter } from './routers/sessions.js';
import { router as vistasRouter } from './routers/views.js';


// Defino un puerto.
const PORT = 8080;


// Inicializo express.
const app = express();

//const p = new productManager();


app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(express.static(__dirname + "/public"));
// Cookie con seguridad
app.use(cookieParser("EL_08081970"));
//app.use(cookieParser());
app.use(sessions({
    secret: "EL_08081970",
    resave: true,
    saveUninitialized: true
}))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use("/api/sessions", sessionsRouter)
app.use('/', vistasRouter)

/*
app.get('/', (req, res) => {
    return res.render('home');
})
*/

// Cookies.
// Por ahora, el ej. de clase.
app.get('/setcookies', (req, res) => {
    let datos={nombre:"Ernesto", rol:"user"};
    res.cookie("cookie1", "valor cookie1", {});
    res.cookie("cookie2", datos, {});
    res.cookie("cookie3conVto", datos, {maxAge: 1000 * 5});
    res.cookie("cookie4conVto", datos, {expires: new Date(2024, 8, 8)});
    res.cookie("cookie4conVtoFirmada", datos, {signed: true, expires: new Date(2024, 8, 8)});

    res.setHeader("Content-Type", "text/plain");
    res.status(200).send("Cookies seteadas!!!!");

})

app.get('/getcookies', (req, res) => {
    let cookies=req.cookies;
    let cookiesFirmadas=req.signedCookies;
    
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({cookies, cookiesFirmadas});
})

app.get('/delcookies',(req,res)=>{
    
    //res.clearCookie("cookie2")
    Object.keys(req.cookies).forEach(c=>res.clearCookie(c))
    Object.keys(req.signedCookies).forEach(c=>res.clearCookie(c))

    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        msg:"Cookies eliminadas"
    });
});

app.get('/',(req,res)=>{

    if(req.session.contador){
        req.session.contador++
    }else{
        req.session.contador=1
    }

    res.setHeader('Content-Type','text/plain');
    res.status(200).send(`Visitas al site: ${req.session.contador}`);
})

app.get('/datos', auth, (req,res)=>{
    
    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        datos:"DATOS...!!!", session: req.session
    });
});

/*
app.get('/login',(req,res)=>{
    
    let {usuario, password}=req.query
    if(!usuario || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete los datos...!!!`})
    }

    if(usuario!="ernesto" || password!="EL_08081970"){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Credenciales incorrectas`})
    }

    req.session.usuario=usuario

    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        message:"Login correcto", usuario   
    });
});
*/

app.get("/logout", (req, res)=>{
    req.session.destroy(error=>{
        if(error){
            console.log(error);
            res.setHeader('Content-Type','application/json');
            return res.status(500).json(
                {
                    error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                    detalle:`${error.message}`
                }
            )
        }
    })

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Logout exitoso"});

})






//app.use('/', views);
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
    const messages = await messagesModel.find();
    
    socket.emit('message', messages);
    
    socket.on('message', async(data) => {
        const newMessage = await messagesModel.create({...data});
        if (newMessage){
            const messages = await messagesModel.find();
            io.emit('messagesLogs', messages);
        }
    })
    

    /*
    socket.on("messagge", data => {
        messages.push(data);
        io.emit("messaggeLogs", messages);
    })
    */
    socket.broadcast.emit('new_user');
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



