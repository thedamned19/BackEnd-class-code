import { Router } from 'express';
import { usersModel } from '../DAO/models/usersModel.js';
import { generaHash, passportCall } from '../utils.js';
export const router=Router();
import passport from 'passport';
import { usersService } from "../services/UsersService.js";
import {  registerPost, login } from "../controllers/viewController.js";
//import { register } from "../controllers/sessionController.js";


//usersModel = new usersModel();

/*
router.get("/signUp", passport.authenticate("signUp", { failureRedirect: "/api/sessions/error", session: false }), async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    return res.status(201).json({ newUser: req.user });
})
*/    

//router.get('/register', register);

/*
router.post("/register", async (req, res) => { 
    console.log("llegué aca sessions")
    res.setHeader("Content-Type", "application/json");
    return res.status(201).json({ newUser: req.user });
})
*/

router.post("/register", registerPost);

//router.post("/login", login);

//router.post("/login", loginPost);

/*
export const loginPost = async (req = request, res = response) => {
    console.log("loginPost")
    const {email, password} = req.body;
    const user = await usersService.getUserByEmail(email);
    

    if (user && user.password === password) {
        const userName = `${user.first_name} ${user.last_name}`;
        req.session.user = userName;
        req.session.role = user.role;
        return res.redirect("/");    
    }
    return res.redirect("/login");
}
*/

/*
router.post("/login", async(req, res) => {
    let {email, password, web} = req.body;
    console.log(email)
    console.log(password)
    if(!email || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete email and password`})        
    }
    const user = await usersService.getUserByEmail(email);
    const passwordHash = generaHash(password);
    if (user && user.password === password) {
        const userName = `${user.first_name} ${user.last_name}`;
        req.session.user = userName;
        req.session.role = user.role;
        return res.redirect("/");  
        res.setHeader('Content-Type','application/json');
    }
    return res.redirect("/login");

})
    */

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

router.get('/github', passport.authenticate("github", {}), (req, res) => {});

router.get('/callbackGithub', passport.authenticate("github", {failureRedirect:"/api/sessions/error"}), (req,res)=>{
    req.session.user=req.user;
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:req.user});
})
    