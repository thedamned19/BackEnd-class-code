import mongoose, { Schema } from "mongoose"

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema(
    {
        products: [
            {
                id: {
                    type: Schema.Types.ObjectId,
                    ref: "product"
                },
                quantity: {
                    type: Number,
                    required: [true, "Product quantity is required"]
                }
            }
        ]
    }
)

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);