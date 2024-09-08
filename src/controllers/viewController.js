import { request, response } from "express";
import { productsService } from "../services/ProductsService.js";
import { cartsService } from "../services/CartsService.js";
import { usersService } from "../services/UsersService.js";
import { usersModel } from "../DAO/models/usersModel.js";
import { generaHash, validaPassword } from "../utils.js";

export const homeView = async (req = request, res = response) => {
    //const limit = 10;
    const products = await productsService.getProducts();
    //const isAuthenticated = req.session.user !== undefined;
    const user = req.session.user;
    //const { payload } = await productsService.getProductsBy({limit});
    return res.render("home", { products, title : "Home", styles: "styles.css", user });
    //return res.render("home", { products, title : "Home", styles: "styles.css", isAuthenticated });
}

export const realTimeProductsView = async (req = request, res = response) => {
    const user = req.session.user;
    return res.render("realtimeProducts", {  title : "Real Time", styles: "styles.css", user });
}

export const chatView = async (req = request, res = response) => {
    return res.render("chat", {  title : "Chat", styles: "styles.css", user });
}

export const productsView = async (req = request, res = response) => {
    //const result = await productsService.getProducts({...req.query});
    const products = await productsService.getProducts();
    const user = req.session.user;
    //res.status(200).render("home",  {products} )
    return res.render("home", { products, title : "Products", styles: "styles.css", user });
}

export const cartIdView = async (req = request, res = response) => {
    const { cid } = req.params;
    const cart = await cartsService.getCartById(cid);
    const user = req.session.user;
    //const products = cart.products;
    //console.log(products);
    //return res.render("cart", { cart, products, title : "Cart" });
    return res.render("cart", { cart, title : "Cart", styles: "styles.css", user });
    //res.status(200).render("cart", { cart, styles: "styles.css" });
}

export const loginGet = async (req = request, res = response) => {
    //if (req.session.user) return res.redirect("/");
    return res.render("login", {  title : "Login Ecommerce", styles: "login.css" });
}

// loginPost con passport.

export const login = async (req = request, res = response) => {
   if (!req.user)
    return res.redirect("/login");
   req.session.user = {
    first_name : req.user.first_name,
    last_name : req.user.last_name,
    e_mail : req.user.e_mail,
    role : req.user.role
   }
    //return res.redirect("/register");
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Login successful...!!!"});
}


/*
export const login = async (req = request, res = response) => {
    const {e_mail, password} = req.body;
    const user = await usersService.getUserByEmail({e_mail});

    if (user) {
        if (validaPassword(password, user.password)) {
            const userName = `${user.first_name} ${user.last_name}`;
            req.session.user = userName;
            req.session.role = user.role;
            return res.redirect("/");    
        }
    }
    return res.redirect("/login");
}
*/

export const registerGet = async (req = request, res = response) => {
    console.log("registerGet!!!")
    if (req.session.user) return res.redirect("/");
    return res.render("register", {  title : "Register Ecommerce", styles: "register.css" });
}

// registerPost con passport.

export const registerPost = async(req = request, res = response) => {
    if (!req.user)
        
        return res.redirect("/register");
    let user = { ...req.user };
        res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Successful registration...!!!", user}); 
}


/*
export const registerPost = async(req = request, res = response) => {
    let {first_name, last_name, e_mail, age, password} = req.body;
    if(!first_name || !last_name || !e_mail || !age || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`All data is required.`})
    }

    let exists = await usersService.getUserByEmail({e_mail});
    if(exists){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`It already exists ${e_mail}`})
    }

    password=generaHash(password);

    try {
        let user = await usersModel.create({first_name, last_name, e_mail, age, password, role:"user"});
        if (user) {
            const userName = `${user.first_name} ${user.last_name}`;
            req.session.user = userName;
            req.session.role = user.role;
            return res.redirect("/");
        }
        return res.redirect("/register");
        res.setHeader('Content-Type','application/json');
        res.status(200).json({ message:"Successful registration...!!!", newUser });
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Unexpected server error - Try again later, or contact your administrator`,
                detalle:`${error.message}`
            }
        )
    }

}
*/

export const logout = async(req = request, res = response) => {
    req.session.destroy(e=> {
        if(e){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json(
                {
                    error:`Unexpected server error - Try again later, or contact your administrator`,
                    detalle:`${error.message}`
                }
            )
            
        }
    })
    res.setHeader('Content-Type','application/json');
    res.redirect("/login")
    return res.status(200).json({payload:"Successful Logout...!!!"});
}










/*
export const register = (req, res) => {
    try {
        res.setHeader('Content-Type', 'text/html');
        let { error } = req.query;
        res.status(200).render('register', { error });
    } catch (error) {
        console.log("Error de registro!")
        //CustomError.createError("register --> ViewController", null, "Un error inesperado ocurrió al registrarse", TIPOS_ERROR.INTERNAL_SERVER_ERROR);
    }
}
*/