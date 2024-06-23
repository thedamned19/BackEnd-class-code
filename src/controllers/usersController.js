import { usersService } from "../services/usersService.js"
    
async function getUsers (req,res) {
    let users = await usersService.getUsers();
    res.setHeader('Content-Type','application/json');
    res.status(200).json({users});
}

async function getUserById(req,res){
    try {
        let user = await usersService.getUserById(req.params.id)
        return res.status(200).json({user})
    } catch (error) {
        return res.status(500).json({
            error:"Error inesperado", detalle:error.message
        })
    }
}

async function getUserByEmail(req,res){
    try {
        let user = await usersService.getUserByEmail(req.params.e_mail);
        return res.status(200).json({user})
    } catch (error) {
        return res.status(500).json({
            error:"Error inesperado", detalle:error.message
        })
    }
}

async function createUser(req,res) {
    let {name, e_mail, role, ...others} = req.body;
    if(!name || !e_mail){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete al menos nombre / email`})
    }

    let exists = await usersService.getUserByEmail(e_mail);
    if(exists){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ya existen usuarios con email ${e_mail}...!!!`})
    }
        
    // validaciones / procesos, etc... siempre dentro de capa Controller / Negocio

    try {
        let newUser = await usersService.createUser({name, e_mail, role, ...others});        
        res.setHeader('Content-Type','application/json')
        res.status(201).json({newUser})
            
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
    }
}

export default {getUsers, getUserById, getUserByEmail, createUser}
