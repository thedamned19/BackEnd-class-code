import { Router } from 'express';
import { UsersManagerMongo as UsersManager } from '../models/UsersManagerMongo.js';
import { generaHash } from '../utils.js';
export const router=Router();

const usersManager = new UsersManager();

router.post('/registro', async(req,res) => {

    let {name, e_mail, password} = req.body;
    if(!name || !e_mail || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete name, email, y password`})
    }

    let exists = await usersManager.getBy({e_mail})
    if(exists){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ya existe ${e_mail}`})
    }

    // validaciones que están para hacer
    // que el mail sea correcto,
    // que password tengo cierto formato de caracteres.

    password=generaHash(password);

    try {
        let newUser = await usersManager.create({name, e_mail, password, role:"user"})

        res.setHeader('Content-Type','application/json')
        res.status(200).json({
            message:"Registro correcto...!!!", newUser
        })
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

})

router.post("/login", async(req, res) => {

    let {e_mail, password, web} = req.body;

    console.log(req.body)
    if(!e_mail || !password){
        if(web){
            return res.redirect(`/login?error=Complete email y password`)
        }else{
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Complete email y password`})
        }
    }

    let user = await usersManager.getBy({e_mail, password:generaHash(password)})
    if(!user){
        if(web){
            return res.redirect(`/login?error=Credenciales invalidas`)
        }else{
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Credenciales inválidas`})
        }
    }

    user = {...user}
    delete user.password
    req.session.user=user

    if(web){
        res.redirect("/realTimeProducts")
    }else{
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"Login correcto", user});
    }

})

router.get("/logout", (req, res) => {
    req.session.destroy(e=> {
        if(e){
            console.log(error);
            res.setHeader('Content-Type','application/json');
            return res.status(500).json(
                {
                    error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                    detalle:`${error.message}`
                }
            )
            
        }
    })
    res.setHeader('Content-Type','application/json');
    res.redirect("/login")
    return res.status(200).json({payload:"Logout Exitoso...!!!"});
})