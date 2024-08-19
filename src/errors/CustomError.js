import { TIPOS_ERROR } from "./EErrors.js";
import { errorDescription } from "./ErrorDescription.js";

export class CustomError {
    static createError(name, cause, message, code) {
        const error = new Error(message, {cause:cause});
        error.name = name;
        error.code = code;
        throw error;
    }
}

/*
export class CustomError {
    static createError(name = "Error", cause, message, code = TIPOS_ERROR.INTERNAL_SERVER_ERROR) {
        const description = errorDescription(name, cause, message);
        const error = new Error(message);
        error.name = name;
        error.code = code;
        error.cause = cause;
        error.description = error.description;
        throw error;
    }
}
    
*/

/*
export class createError (error, req, res, next) => {
    switch (error.code) {
        case TIPOS_ERROR.ARGUMENTOS_INVALIDOS:
            res.send({status:"error", error: error.name});
            break;
        default:    
            res.send({status:"error", error: "Unhandled error"});
    }
}
*/














