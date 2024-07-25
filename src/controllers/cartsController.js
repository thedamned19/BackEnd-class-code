import { json, request, response } from "express";
import { cartsService } from "../services/CartsService.js";
import { productsService } from "../services/ProductsService.js";

export const getCartById = async(req = request, res = response) => {
    try {
        const {cId} = req.params;
        const cart = await cartsService.getOneBy(cId);
        if (!cart)
            return res.status(404).json({msg:`The cart with id ${id} doesn't exist`})
        return res.json({cart});
    } catch (error){
        console("getOneBy ->", error);
        return res.status(500).json({msg: "Contact administrator"});
    }
}

export const createCart = async(req = request, res = response) => {
    try {
        const cart = await cartsService.create({});
        return res.json({msg: "Cart created", cart});
    } catch (error){
        console("creatCart ->", error);
        return res.status(500).json({msg: "Contact administrator"});
    }
}

export const addProductInCart = async(req = request, res = response) => {
    try {
        const {cId, pId} = req.params;
        const cart = await cartsService.getOneBy(cId);
        if (!cart)
            return res.status(404).json({msg:`The cart with id ${cId} doesn't exist`})
        const productInCart = cart.products.find(p => p.id.toString() === pId);
        if (productInCart)
            productInCart.quantity++;
        else
            cart.products.push({id:pId, quantity:1});
        cart.save();
        return res.json({msg: "Cart updated", cart});
    } catch (error){
        console("addProductInCart ->", error);
        return res.status(500).json({msg: "Contact administrator"});
    }
}

export const addToCart = async (req = request, res = response) => { 
    let cid = req.params.cid;
    let pid = req.params.pid;
    let userEmail = req.user.email;

    if (!isValidObjectId(cid)) {
        res.setHeader("Content-Type", "application/json")
        return res.status(400).json({
            message: "Error, the required id does not have a valid MongoDB format"
        });
    }
    
    let cart;
    let newProduct;
    let products;
    try {
        cart = await cartsService.getOneBy(cid);
        if (cart) {
            products = cart.products;                
            req.logger.debug(cart);
            req.logger.debug(products);
        } else {
            res.setHeader("Content-Type", "application/json");
            return res.status(400).json("There is no cart registered with the provided id");
        }
        newProduct = await productsService.getProductById({ _id: pid })
        if (newProduct) {
            req.logger.debug("userEmail: " + userEmail);
            req.logger.debug("newProduct: " + newProduct);
        } else {
            res.setHeader("Content-Type", "application/json")
            return res.status(400).json("That product does not exist!!!")
        }
        if (userEmail == newProduct.owner) {
            res.setHeader("Content-Type", "application/json")
            return res.status(400).json("You cannot add that product to the cart (you are the owner)!!!")
        }
    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        return res.status(500).json({
            error:"Unexpected error", detalle:error.message
        });
    }

    let productExists = false;
    let product = products.find(elem => elem.product.ç._id.toString() == newProduct._id);
    if (product == undefined) {
        products.push({ product: newProduct, quantity: 1 });
        productExists = true;
    } else {
        product.quantity += 1;
    }

    try {
        let result = await cartsService.addToCart(cid, products);
        res.setHeader("Content-Type", "application/json");
        return res.status(200).json(result);
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        return res.status(500).json({
            error:"Unexpected error", detalle:error.message
        });
    }
}



export const getCarts = async(req=request,res= response) => {
    try {
        const carts = await cartsService.getCarts({});
        return res.json({msg: "Cart created", carts});
    } catch (error){
        console("getCarts ->", error);
        return res.status(500).json({msg: "Contact administrator"});
    }
}



