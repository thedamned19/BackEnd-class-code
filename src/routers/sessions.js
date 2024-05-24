import { Router } from 'express';
import { UsersManagerMongo as UsersManager } from '../models/UsersManagerMongo.js';
import { generaHash } from '../utils.js';
import passport from 'passport';
export const router=Router();

const usersManager = new UsersManager();

router.get("/error", (req, res) => {
    res.setHeader('Content-Type','application/json');
    return res.status(500).json({error:`Operation error`});
})

router.post("/registro", passport.authenticate("registro", {failureRedirect:"/api/sessions/error"}), (req, res) => {
    // si passport ejecuta OK (si realiza el return done(null, usuario)), 
    // genera en la req un objeto use (req.user), con los datos del usuario que enviamos vía done
    res.setHeader('Content-Type','application/json');
    return res.status(201).json({payload:"Successful registration...!!!", user: req.user});
})

router.post("/login", passport.authenticate("login", {failureRedirect:"/api/sessions/error"}), (req, res)=>{

    req.session.user=req.user
    console.log(req.user)

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Successful Login...!!!", user:req.user});
})

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