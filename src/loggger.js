import winston from "winston";
import { config } from './config/config.js';

const DEBUG = config.DEBUG;

let customLevels = {
    fatal: 0,
    error: 1, 
    warning: 2,
    info: 3,
    http: 4,
    debug: 5
}

const customColors = {
    fatal: "bold red",
    error: "red",
    warning: "bold yellow",
    info: "green",
    http: "blue",
    debug: "white"
}

// La letra del desafío dice que se deben crear dos logger distintos
// (desarrollo y producción) pero el profesor en clase nos dijo que
// es mejor hacer un sólo logger con dos transportes
// Transporte en producción por defecto.
export const logger = winston.createLogger(
    {
        levels: customLevels,
        transports: [
                new winston.transports.File(
                {
                    level:"error",
                    filename:"./src/errors.log",
                    format: winston.format.combine(
                        winston.format.timestamp()
                    )
                }
            )
        ]
    }
)

const transporteDesarrollo = new winston.transports.Console(
    {
        level:"debug",
        format: winston.format.combine(
            winston.format.colorize(
                {
                    colors: {customColors}
                }
            ),
            winston.format.simple(),
            winston.format.timestamp()
        )
    }
)

const transporteProductivo = new winston.transports.Console(
    {
        level:"info",
        format: winston.format.combine(
            winston.format.colorize(
                {
                    colors: {customColors}
                }
            ),
            winston.format.simple(),
            winston.format.timestamp()
        )
    }
)

if(DEBUG === true) {
    logger.add(transporteDesarrollo);
    logger.add(transporteProductivo);
}

export const middLogger = (req, res, next) => {
    req.logger = logger;
    next();
}