import mongoose, { Schema } from "mongoose"

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema(
    {
        products: [
            {
                _id: false,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity: {
                    type: Number,
                    required: [true, "Product quantity is required"]
                }
            }
        ]
    }
)

cartsSchema.set("toJSON", {
    transform: function(doc, ret){
        delete ret.__v;
        return ret;
    }
})


export const cartsModel = mongoose.model(cartsCollection, cartsSchema);