import mongoose from 'mongoose'

export const usersModel = mongoose.model('users',new mongoose.Schema({
    name: String,
    e_mail:{
        type: String, unique:true
    }, 
    password: String,
    role:{
        type: String, default:"user"
    }
},
{
    timestamps:true, strict: false
}))

p