import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { auth } from './middlewares/auth.js';
import { initPassport } from "./config/passport.config.js";
import passport from "passport";

//import productManager from "./classes/productManager.js";
import cartsRouter from "./routes/carts.js";
import productsRouter from "./routes/products.js";
import usersRouter from "./routes/users.js";
import { router as loggerRouter } from './routes/logger.js';
import views from "./routes/views.js";
import __dirname from "./utils.js";

import mongoose from 'mongoose';
import { messagesModel } from "./DAO/models/messagesModel.js";

import { router as sessionsRouter } from './routes/sessions.js';
import { router as vistasRouter } from './routes/views.js';
import { dbConnection } from "./database/config.js";

import { config } from './config/config.js';

import { usersModel } from "./DAO/models/usersModel.js";
import { UsersDTO } from "./DTO/usersDTO.js";
import { productsModel } from "./DAO/models/productsModel.js";
import { ProductsDTO } from "./DTO/productsDTO.js";
import { cartsModel } from "./DAO/models/cartsModel.js";
import { CartsDTO } from "./DTO/cartsDTO.js";

import { errorHandler } from "./middlewares/errorHandler.js";
import { logger, middLogger } from "./loggger.js";

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { productsService } from "./services/ProductsService.js";
import { getProducts } from "./controllers/productsController.js";

//const swaggerJsDoc=require("swagger-jsdoc")
//const swaggerUI=require("swagger-ui-express")



// Defino variables para uso de las variables de entorno.
const PORT = config.PORT;
const SECRET = config.SECRET;
const MONGO_URL = config.MONGO_URL;
const DB_NAME = config.DB_NAME;


// Inicializo express.
const app = express();

//const p = new productManager();


app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(express.static(__dirname + "/public"));
// Cookie con seguridad
app.use(cookieParser(SECRET));
//app.use(cookieParser());

/*
app.use(sessions({
    //secret: "EL_08081970",
    secret: SECRET,
    resave: true,
    saveUninitialized: true
}))
*/    

/*
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://ernestoleimsieder:CoderCoder@cluster0.ycrhk4t.mongodb.net/?retryWrites=true&w=majority&appName=coderCluster&dbName=ecommerce",
        ttl: 3600
    }),
    secret: SECRET,
    resave: false,
    saveUninitialized: true
}))
*/

app.use(session({
    store: MongoStore.create({
        mongoUrl: `${MONGO_URL}/${DB_NAME}`,
        ttl: 3600
    }),
    secret: SECRET,
    resave: false,
    saveUninitialized: true
}))

initPassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(middLogger);

app.use("/api/sessions", sessionsRouter);
//app.use('/', vistasRouter);

/*
app.get('/', (req, res) => {
    return res.render('home');
})
*/

app.use('/', views);
//app.use('/', productsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/users', usersRouter);
app.use('/loggerTest', loggerRouter);




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

/*
app.get("/logout", (req, res)=>{
    req.session.destroy(error=>{
        if(error){
            //console.log(error);
            req.logger.error(error.message)
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
*/

// El servidor escuchando el puerto.
const expressServer = app.listen(PORT, () => logger.info(`Esta aplicación corre en el puerto ${PORT}`))
const io = new Server(expressServer);

await dbConnection();



// *******************************************************************************
// *******************************************************************************

// Estos gets lo agregamos para ver el funcionamiento del DTO de users.

app.get('/users',async(req,res) => {
    let users = await usersModel.find().lean();
    users = users.map(user => new UsersDTO(user));

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:users});
})

app.get('/products',async(req,res) => {
    let products = await productsModel.find().lean();
    products = products.map(product => new ProductsDTO(product));

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:products});
})

app.get('/carts',async(req,res) => {
    let carts = await cartsModel.find().lean();
    carts = carts.map(cart => new CartsDTO(cart));

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:carts});
})


app.use(errorHandler);


// *******************************************************************************
// *******************************************************************************

// Swagger. (documentación)

// Configuración de opciones para swagger-jsdoc
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API de Ecommerce',
        version: '1.0.0',
        description: 'Documentación de la API de Ecommerce',
      },
    },
    apis: ["./src/docs/*.yaml"], // Rutas de tus archivos de rutas a documentar
  };
  
  // Inicializar swagger-jsdoc
  const specs = swaggerJsdoc(options);
  
  // Middleware para servir la documentación Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


// *******************************************************************************
// *******************************************************************************

  let messages = [];
io.on("connection", async (socket) => {
    //console.log("Cliente conectado desde el front");
    logger.info("Cliente conectado desde el front");

    //const {payload} = await getProducts({});
    //socket.emit("products", payload);

    const products = await productsModel.find();
    socket.emit("products", products);

    
    socket.on("addProduct", async product => {
        const newProduct = await productsModel.create({...product});
        if(newProduct) {
            products.push(newProduct);
            socket.emit("product", products);
        } 
    })
    

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



