import { request, response } from "express";
import { productsService } from "../services/ProductsService.js";
import { cartsService } from "../services/CartsService.js";
import { usersService } from "../services/UsersService.js";
import { usersModel } from "../DAO/models/usersModel.js";
import { generaHash, validaPassword } from "../utils.js";

export const homeView = async (req = request, res = response) => {
    const products = await productsService.getProducts();
    const user = req.session.user;
    return res.render("home", { products, title : "Home", styles: "styles.css", user });
}

export const realTimeProductsView = async (req = request, res = response) => {
    const user = req.session.user;
    return res.render("realtimeProducts", {  title : "Real Time", styles: "styles.css", user });
}

export const chatView = async (req = request, res = response) => {
    return res.render("chat", {  title : "Chat", styles: "styles.css", user });
}

export const productsView = async (req = request, res = response) => {
    const products = await productsService.getProducts();
    const user = req.session.user;
    return res.render("home", { products, title : "Products", styles: "styles.css", user });
}

export const cartIdView = async (req = request, res = response) => {
    const { cid } = req.params;
    const cart = await cartsService.getCartById(cid);
    const user = req.session.user;
    return res.render("cart", { cart, title : "Cart", styles: "styles.css", user });
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
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Login successful...!!!"});
}



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

export const getPerfil = async (req = request, res = response) => {
    console.log("getPerfil");
    res.setHeader("Content-Type", "text/html");
    const user = req.user;
    return res.status(200).json({payload:user});
}










