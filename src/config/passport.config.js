import passport from "passport";
import local from "passport-local"
import github from "passport-github2"
import { UsersManagerMongo as UsersManager } from '../models/UsersManagerMongo.js';
import { CartManager } from "../models/cartsManagerMONGO.js";
import { generaHash, validaPassword } from "../utils.js";

const usersManager = new UsersManager();
const cartManager = new CartManager();

// paso 1
export const initPassport = () => {

    passport.use(
        "github",
        new github.Strategy(
            {
                clientID:"de la app de Github",
                clientSecret:"de la app de Github",
                callbackURL:"http://localhost:8080/api/sessions/callbackGithub",
            },
            async(ta, tr, profile, done)=>{
                try {
                    // console.log(profile)
                    let e_mail = profile._json.e_mail
                    let name = profile._json.name
                    if(!e_mail){
                        return done(null, false)
                    }
                    let user = await usersManager.getByPopulate({e_mail})
                    if(!user){
                        let newCart = await cartManager.create()
                        user = await UsersManager.create(
                            {
                                name, e_mail, profile, cart: newCart._id                            }
                        )
                        user = await usersManager.getByPopulate({e_mail})
                    }
                    return done(null, user)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use(
        "registro",
        new local.Strategy(
            {
                passReqToCallback: true, 
                usernameField: "e_mail"
            },
            async(req, username, password, done)=>{
                try {
                    let {name} = req.body
                    if(!name){
                        return done(null, false)
                    }

                    let exists = await usersManager.getBy({e_mail:username})
                    if(exists){
                        return done(null, false)
                    }

                    // validaciones 

                    let newCart = await cartManager.create()
                    password = generaHash(password)

                    let user = await usersManager.create({name, e_mail:username, password, cart: newCart._id})

                    return done(null, user)


                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use(
        "login",
        new local.Strategy(
            {
                usernameField:"e_mail"
            },
            async(username, password, done)=>{
                try {
                    if(username=="adminCoder@coder.com" && password=="adminCod3r123"){
                        
                        let usuario={
                            _id: "idAdmin", name: "admin", e_mail: username, 
                            cart: {_id:"663980cad0e550982f0db3f1"}, rol: "admin"
                        }
                        return done(null, user)
                    }

                    let user = await usersManager.getByPopulate({e_mail:username})
                    if(!user){
                        return done(null, false)
                    }

                    if(!validaPassword(password, user.password)){
                        return done(null, false)
                    }

                    // usuario={...usuario}
                    delete user.password // y resto de datos sensibles
                    return done(null, user)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

// paso 1' (solo si hay sessions configuradas)
    passport.serializeUser((user, done) => {
        return done(null, user._id)
    })

    passport.deserializeUser(async(id, done) => {
        let user = await usersManager.getBy({_id:id});
        return done(null, user);
    })

    /*
     passport.deserializeUser(async(id, done) => {
        let user
        if(id==="idAdmin"){
            user = {
                _id: "idAdmin", name: "admin", email: "adminCoder@coder.com", 
                cart: {_id:"663980cad0e550982f0db3f1"}, role: "admin"
            }
        }else{
            user = await usersManager.getBy({_id:id})
        }
        return done(null, user)
    })
    */

}