import mongoose from 'mongoose'

export const ticketsModel = mongoose.model('tickets',new mongoose.Schema({
    name: String,
    code:{
        type: String, unique:true
    }, 
    purchase_datetime: Date,
    amount : Number,
    purchaser: String
},
{
    timestamps:true, strict: false
}))

