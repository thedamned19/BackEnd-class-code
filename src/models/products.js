import mongoose from "mongoose"

const productsCollection = "products";

const productsSchema = new mongoose.Schema(
    {
        title: {type: String, required: ["Product title is required"]},
        description: {type: String, required: ["Product description is required"]},
        code: {type: String, required: ["Product code is required"], unique: true},
        price: {type: Number, required: ["Product price is required"]},
        status: {type: Boolean, default: true},
        stock: {type: Number, required: ["Product stock is required"]},
        category: {type: String, required: ["Product category is required"]},
        thumbnails: {type: String}
    }
)

productsSchema.set("toJSON", {
    transform: function(doc, ret){
        delete ret.__v;
        return ret;
    }
})

export const productsModel = mongoose.model(productsCollection, productsSchema);
