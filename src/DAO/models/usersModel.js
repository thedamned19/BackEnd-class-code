import mongoose from 'mongoose';

export const usersModel = mongoose.model('users', new mongoose.Schema({
    first_name: {type: String, required: [true, "First name is required"]},
    last_name: {type: String, required: [true, "Last name is required"]},
    e_mail:{type: String, required: [true, "E-mail is required"], unique:true},
    age: {type: Number, required: [true, "Age is required"]}, 
    password: {type: String, required: [true, "Password is required"], unique:true},
    status: {type: Boolean, default :true},
    cart: {type: mongoose.Types.ObjectId, ref:"carts"},
    role: {type: String, enum: ["user", "admin", "premium"], default: "user"}
},
{
    timestamps:true, strict: false
}))

