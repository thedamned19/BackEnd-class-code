import { json, request, response } from "express";
import { cartsService } from "../services/CartsService.js";
import { productsService } from "../services/ProductsService.js";
import { isValidObjectId } from "mongoose";

/*
export const getCartById = async(req = request, res = response) => {
    try {
        const {cId} = req.params;
        const cart = await cartsService.getOneBy(cId);
        if (!cart)
            return res.status(404).json({msg:`The cart with id ${cId} doesn't exist`})
        return res.json({cart});
    } catch (error){
        console("getOneBy ->", error);
        return res.status(500).json({msg: "Contact administrator"});
    }
}
    */

export const getCartById = async (req, res) => {
    let id = req.params.cId;

    if (!isValidObjectId(id)) {
        res.setHeader("Content-Type", "application/json");
        return res.status(400).json(
            {message: `Error, the required id: ${id} is not in a valid MongoDB format`}
        );
    }

    try {
        let cart = await cartsService.getCartById(id);
        if (cart) {
            res.setHeader("Content-Type", "application/json");
            return res.status(200).json(cart);
        } else {
            res.setHeader("Content-Type", "application/json");
            return res.status(404).json({message:`Error, the cart with id ${id} doesn't exist`});
        }
    } catch (error) {
        console("getCartById ->", error);
        return res.status(500).json({message: "Contact administrator"});
    }
}

export const createCart = async(req, res) => {
    try {
        let newCart = {products: []};
        await cartsService.create(newCart);
        res.setHeader("Content-Type", "application/json");
        //return res.status(200).json(newCart);
        return res.json({msg: "Cart created", newCart});
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        return res.status(500).json({msg: "Contact administrator"});
    }
}

export const addProductInCart = async(req = request, res = response) => {
    const { cId, pId } = req.params;

    if (!isValidObjectId(cId) || !isValidObjectId(pId)) {
        res.setHeader("Content-Type", "application/json");
        return res.status(400).json(
            {message: `Error, enter a valid MongoDB Id format`}
        );
    }

    let cart = await cartsService.getOneBy(cId);
    if(!cart){
      res.setHeader('Content-Type','application/json');
      return res.status(401).json({message:`The cart with id ${cId} doesn't exist`});
  }

    let product = await productsService.getProductsBy({ _id: pId });
    if (!product) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(402).json({message:`The product with id ${pId} doesn't exist`})
    }

    let indexProduct = cart.products.findIndex(p => p.product == pId);
    if(indexProduct === -1){
        cart.products.push({ product: pId, quantity:1 });
    }else{
        cart.products[indexProduct].quantity++;
    }

    let result = await cartsService.update(cId, cart);
    if(result.modifiedCount > 0) {
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"Cart updated"});
    } else {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({msg: "Contact administrator"});
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



