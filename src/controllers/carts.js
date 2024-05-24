import { json, request, response } from "express";
import {CartManager} from "../models/cartsManagerMONGO.js";

export const getCartById = async(req=request, res=response) => {
    try {
        const {cId} = req.params;
        const cart = await cartsModel.findById(cId);
        if (!cart)
            return res.status(404).json({msg:`The cart with id ${id} doesn't exist`})
        return res.json({cart});
    } catch (error){
        console("getCartById ->", error);
        return res.status(500).json({msg: "Contact administrator"});
    }
}

export const createCart = async(req=request, res=response) => {
    try {
        const cart = await cartsModel.create({});
        return res.json({msg: "Cart created", cart});
    } catch (error){
        console("creatCart ->", error);
        return res.status(500).json({msg: "Contact administrator"});
    }
}

export const addProductInCart = async(req=request, res=response) => {
    try {
        const {cId, pId} = req.params;
        const cart = await cartsModel.findById(cId);
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