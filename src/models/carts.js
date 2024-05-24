import mongoose from "mongoose";

export const cartModel = mongoose.model(
    "carts",
    new mongoose.Schema(
        {
            products:{
                type:[
                    {
                        product:{
                            type: mongoose.Types.ObjectId, ref:"products"
                        }, 
                        quantity: Number
                    }
                ]
            }
        }
    )
)