import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import github from "passport-github2";
import { usersService } from "../services/UsersService.js";
import { generaHash, validaPassword } from "../utils.js";
import { usersModel } from "../DAO/models/usersModel.js";
import { usersDAO } from "../DAO/usersDAO.js";
import { config } from './config.js';

const CLIENT_ID = config.CLIENT_ID;
const SECRET = config.CLIENT_SECRET;
const CALLBACKURL = config.CALLBACKURL;

const uDAO = new usersDAO();
const localStrategy = local.Strategy;

export const initPassport = () => {

    passport.use("register", new localStrategy(
        {passReqToCallback: true, usernameField: "e_mail"},
        async (req, username, password, done) => {
            try {
                //const user = await usersService.getUserByEmail(username);
                //const user = await usersDAO.getBy({ e_mail: username });
                const user = await uDAO.getBy({ e_mail: username });
                if (user) {
                    console.log ("El usuario ya existe");
                    return done(null, false);
                }
                req.body.password = generaHash(password);
                const newUser = await usersService.createUser({...req.body});
                return done(null, newUser);
            }
            catch(error) {
                console.log("error")
                done(error);
            }
        }
    ))

    passport.use("login", new localStrategy(
        {usernameField: "e_mail"},
        async (username, password, done) => {
            try {
                //const user = await getUsersByEmail(username);
                const user = await usersDAO.getBy({ e_mail: username });
                if (!user) {
                    console.log ("El usuario no existe");
                    return done(null, false);
                }
                if(!validaPassword(password, user.password)) {
                    console.log("No coinciden password!!!");
                    return done(null, false);
                }
                return done(null, user);
            }
            catch(error) {
                done(error);
            }
        }
    ))

    passport.use("github", new github.Strategy(
        {
            clientID: CLIENT_ID,
            clientSecret: SECRET,
            callbackURL: CALLBACKURL
        },
        async(accessToken, refreshToken, profile, done) => {
            try {
                const e_mail = profile._json.e_mail;
                const user = await usersService.getUserByEmail(e_mail);
                if (user) return done(null, user);
                const newUser = {
                    first_name : profile._json.first_name,
                    last_name : profile._json.last_name,
                    password : ".$",
                }
                const result = await usersService.createUser({ ... newUser});
                return done(null, result);
            } catch (error) {
                done(error);
            }
        }
    ))

    passport.serializeUser((user, done) => {
        return done(null, user._id);
    })

    passport.deserializeUser(async(id, done) => {
        let user = await usersModel.getBy({_id:id});
        //let user = await usersModel.getBy(id);
        return done(null, user);
    })
}