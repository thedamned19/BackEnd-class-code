import { json, request, response } from "express";
import {productsModel} from "../models/products.js";

export const getProducts = async(req=request, res=response) => {
    try {
        //const limit = req.query;
        const limit = Number(req.query.limit);
        const total = await productsModel.countDocuments();
        if (isNaN(limit)) {
            return res.json({ error: "The 'limit' parameter must be a number" });
        }
        if (limit === 0) {
            return res.json({ error: "The 'limit' parameter must be a number greater than zero" });
        }        
        /*
        let products = await productsModel.getProducts();
        if (req.query.limit) { //Checks if 'limit' exists in the request query
            const limit = Number(req.query.limit);
            if (isNaN(limit)) {
             return res.json({ error: "The 'limit' parameter must be a number" });
            }
            products = products.slice(0, limit); // Apply limit if valid
        }
        */
        //const products = await productsModel.find().limit(Number(limit));
        const products = await productsModel.find().limit(limit);
        return res.json({total, limit, products});
    } catch (error){
        console("getProducts ->", error);
        return res.status(500).json({msg: "Contact administrator"});
    }
}

export const getProductById = async(req=request, res=response) => {
    try {
        const {pId} = req.params;
        const product = await productsModel.findById(pId);
        if (!product)
            return res.status(404).json({msg:`The product with id ${id} doesn't exist`})
        return res.json({product});
    } catch (error){
        console("getProductById ->", error);
        return res.status(500).json({msg: "Contact administrator"});
    }
}

export const addProduct = async(req=request, res=response) => {
    try {
        const {title, description, price, thumbnails, code, stock, category, status} = req.body;
        if (!title || !description || !price || !code || !stock || !category)
            return res.status(404).json({msg: 'All data are required (title, description, price, code, stock, category'});
        const product = await productsModel.create(req.body);
        return res.json({msg: "Product created", product});
    } catch (error){
        console("addProduct ->", error);
        return res.status(500).json({msg: "Contact administrator"});
    }
}

export const updateProduct = async(req=request, res=response) => {
    try {
        const {pId} = req.params;
        const {_id, ...rest} = req.body;
        const product = await productsModel.findByIdAndUpdate(pId, {...rest}, {new:true});
        if (product)
            return res.json({msg: "Updated product", product})
        return res.status(404).json({msg: `Error updated product: ${pId}`});
    } catch (error){
        console("deleteProduct ->", error);
        return res.status(500).json({msg: "Contact administrator"});
    }
}

export const deleteProduct = async(req=request, res=response) => {
    try {
        const {pId} = req.params;
        const product = await productsModel.findByIdAndDelete(pId);
        if (product)
            return res.json({msg: "Deleted product", product})
        return res.status(404).json({msg: `Error deleting product: ${pId}`});
    } catch (error){
        console("deleteProduct ->", error);
        return res.status(500).json({msg: "Contact administrator"});
    }
}