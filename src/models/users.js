import mongoose from 'mongoose'

export const usersModel = mongoose.model('users',new mongoose.Schema({
    name: String,
    e_mail:{
        type: String, unique:true
    }, 
    password: String,
    role:{
        type: String, default:"user"
    },
    cart: {
        type: mongoose.Types.ObjectId, ref: "carts"
    }
}))