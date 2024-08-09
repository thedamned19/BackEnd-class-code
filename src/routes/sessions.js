import { Router } from 'express';
import { usersModel } from '../DAO/models/usersModel.js';
import { generaHash } from '../utils.js';
export const router=Router();
import passport from 'passport';

//usersModel = new usersModel();

router.post('/registro', async(req,res) => {

    let {name, e_mail, password} = req.body;
    if(!name || !e_mail || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete name, email and password`})
    }

    let exists = await usersModel.getBy({e_mail})
    if(exists){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`It already exists ${e_mail}`})
    }

    // validaciones que están para hacer
    // que el mail sea correcto,
    // que password tengo cierto formato de caracteres.

    password=generaHash(password);

    try {
        let newUser = await usersModel.create({name, e_mail, password, role:"user"})

        res.setHeader('Content-Type','application/json')
        res.status(200).json({
            message:"Successful registration...!!!", newUser
        })
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

})

router.post("/login", async(req, res) => {

    let {e_mail, password, web} = req.body;

    console.log(req.body)
    if(!e_mail || !password){
        if(web){
            return res.redirect(`/login?error=Complete email and password`)
        }else{
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Complete email and password`})
        }
    }

    let user = await usersManager.getBy({e_mail, password:generaHash(password)})
    if(!user){
        if(web){
            return res.redirect(`/login?error=Invalid credentialss`)
        }else{
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Invalid credentials`})
        }
    }

    user = {...user}
    delete user.password
    req.session.user=user

    if(web){
        res.redirect("/realTimeProducts")
    }else{
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"Correct login", user});
    }

})

router.get('/profile', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.status(200).render("profile",{
        user: req.session.user
    })
});

router.get("/logout", (req, res) => {
    req.session.destroy(e=> {
        if(e){
            console.log(error);
            res.setHeader('Content-Type','application/json');
            return res.status(500).json(
                {
                    error:`Unexpected server error - Try again later, or contact your administrator`,
                    detalle:`${error.message}`
                }
            )
            
        }
    })
    res.setHeader('Content-Type','application/json');
    res.redirect("/login")
    return res.status(200).json({payload:"Successful Logout...!!!"});
})

router.get("/error", (req, res)=>{
    res.setHeader('Content-Type','application/json');
    return res.status(500).json(
        {
            error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
        }
    )
})

router.get('/github', passport.authenticate("github", {}), (req,res)=>{})

router.get('/callbackGithub', passport.authenticate("github", {failureRedirect:"/api/sessions/error"}), (req,res)=>{
    req.session.user=req.user;

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:req.user});
})