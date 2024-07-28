import mongoose from 'mongoose'

export const usersModel = mongoose.model('users', new mongoose.Schema({
    first_name: String,
    last_name: String,
    e_mail:{ type: String, unique:true },
    age: Number, 
    password: { type: String, unique:true },
    cart: { type: mongoose.Types.ObjectId, ref:"carts" },
    role: { type: String, enum: ["user", "admin", "premium"], default: "user" }
},
{
    timestamps:true, strict: false
}))

