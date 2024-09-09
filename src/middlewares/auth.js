//import { SECRET } from "../utils.js";
import jwt from "jsonwebtoken";
import { config } from '../config/config.js';

const SECRET = config.SECRET;


export const auth = (req, res, next) => {
    if(req.session?.user){
        return next();
    }
    return res.redirect("/login");
}

/*
export const auth = (permissions = []) => {
    return (req, res, next) => {

        permissions = permissions.map(p => p.toLowerCase());

        if (!req.user?.role) {
            req.logger.error(`Request ${req.method} from unauthenticated user to route ${req.originalUrl}`);
            res.setHeader("Content-Type", "application/json");
            return res.status(401).json({error:`There are no authenticated users`});
        }

        if (!permissions.includes(req.user.role.toLowerCase())) {
            res.setHeader("Content-Type", "application/json");
            return res.status(403).json({error:`The user does not have access to this route`});
        }

        next();
    }
}
*/

export const verifyJWT = (req, res, next) => {
    const token = req.cookies["codercookie"];
    if (!token) {
        return res.status(401).json({error:`There are no authenticated users`});
    }
    jwt.verify(token, SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({error:`Invalid token`});
        }
        req.user = user;

    });
    next();
}

export const admin = (req, res, next) => {
    if (req.session?.role === "admin")
        return next();
    return res.redirect("/login");

}
