import {expect} from "chai";
import supertest from "supertest";
import {afterEach, before, describe, it} from "mocha";
import mongoose, { isValidObjectId } from "mongoose";
import { dbConnection } from "../src/database/config.js";
import fs from "fs";
import { productsService } from "../src/services/ProductsService.js";
import { cartsService } from "../src/services/CartsService.js";
import { config } from '../src/config/config.js';

const PORT = config.PORT;

// Chai sirve para hacer las pruebas a través de expect.
//const expect = chai.expect;
// Requester realiza las peticiones al servidor.
const requester = supertest(`http://localhost:${PORT}`);

await dbConnection();

describe("Test ecommerce project", function() {

    // Products tests.
    describe("Products test", function() {
        it("The route /api/products/, in its post method, create a new product", async() => {
            const productMock = {
                title : "Titulo para el 44",
                description : "Descripción para el 44",
                code : "aaa bbb ccc ddd eee fff yyy",
                price : 550,
                status : true,
                stock : 31,
                category : "Categoría del 44"
            }
            let {body} = await requester.post("/api/products").send(productMock);
            expect(body.status).to.be.equal("success");
            expect(isValidObjectId(body.payload._id)).to.be.true;
        })

        
        it("The route /api/products/:pid, in its get method, returns a product with the searched pid", async() => {
            let pId = "66b390ecc0dbbadecd0ebf73";
            let product = await productsService.getProductById(pId);
            let result = await requester.get(`/api/products/${pId}`);
            let {body} = await requester.get(`/api/products/${pId}`);
            expect(result.status).to.exist.and.to.be.equal(200);
            expect(body.payload._id).to.be.equal(product._id.toString());
        })
            
    })

    // Carts tests.
    describe("Carts test", function() {
        it("The route /api/carts/:cid, in its post method, remove all products from the cart", async() => {
            let cId = "66af868a1d68fc126ee71025";
            let cart = await cartsService.getCartById(cId);
            let result = await requester.delete(`/api/carts/${cId}`);
            let {body} = await requester.delete(`/api/carts/${cId}`);
            expect(result.status).to.exist.and.to.be.equal(200);
            expect(body.result._id).to.be.equal(cart._id.toString());
        })

        it("The route /api/carts/:cid/product/:pid, in its post method, remove a product from the cart", async() => {
            let cId = "664fe5007f8d5db5fa17bfe0";
            let pId = "66b38f9a3b958d8d3e1dae42";
            //let cart = await cartsService.getCartById(cId);
            let result = await requester.delete(`/api/carts/${cId}/product/${pId}`);
            let {body} = await requester.delete(`/api/carts/${cId}/product/${pId}`);
            expect(result.status).to.exist.and.to.be.equal(200);
            //expect(body.result._id).to.be.equal(cart._id.toString());
            //expect(body.payload.modifiedCount).to.be.equal(1);
        })
            
    })

    
})






