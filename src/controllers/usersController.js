import { usersService } from "../services/UsersService.js";
import { isValidObjectId } from "mongoose";
    
export const getUsers = async(req=request, res=response) => {
    let users = await usersService.getUsers();
    res.setHeader('Content-Type','application/json');
    res.status(200).json({users});
}

export const getUserById = async(req=request, res=response) => {
    try {
        let user = await usersService.getUserById(req.params.id)
        return res.status(200).json({user})
    } catch (error) {
        return res.status(500).json({
            error:"Error inesperado", detalle:error.message
        })
    }
}

export const getUserByEmail = async(req=request, res=response) => {
    try {
        let user = await usersService.getUserByEmail(req.params.e_mail);
        return res.status(200).json({user})
    } catch (error) {
        return res.status(500).json({
            error:"Error inesperado", detalle:error.message
        })
    }
}

export const createUser = async (req=request, res=response) => {
    let {name, e_mail, role, ...others} = req.body;
    console.log(name)
    if(!name || !e_mail){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete al menos nombre / email`})
    }

    let exists = await usersService.getUserByEmail(e_mail);
    if(exists){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`There are already users with email ${e_mail}...!!!`})
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
                error:`Unexpected server error - Try again later, or contact your administrator`,
                detalle:`${error.message}`
            }
        )
    }
}

export const changeUser = async (req=request, res=response) => {
    let id = req.params._id;
    let newRole;
    let newUser;

    if (!isValidObjectId(id)) {
        res.setHeader("Content-Type", "application/json");
        return res.status(400).json({
            message: "Error, the required id does not have a valid MongoDB format"
        });
    }
    
    try {
        let user = await usersService.getUserById({_id:id});
        if (!user) {
            res.setHeader("Content-Type", "application/json");
            return res.status(400).json({error:`There is no user registered with the provided id ${id}...!!!`});     
        }
        if (user.role == "user") {
            newRole = "premium";
            newUser = await usersService.updateRole(id, newRole);
            res.setHeader("Content-Type", "text/html");
            res.status(200).json(newUser);  
        } else {
            let newRole = "user"
            let newUser = await usersService.updateRole(id, newRole);
            res.setHeader("Content-Type", "text/html");
            res.status(200).json(newUser);            
        }
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        return res.status(500).json({
            error:"Unexpected error", detalle:error.message
        });
    }   
}



//export default {getUsers, getUserById, getUserByEmail, createUser}
