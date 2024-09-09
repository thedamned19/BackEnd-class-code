import mongoose from 'mongoose';
import { config } from '../config/config.js';
import { logger } from "../loggger.js";

const PORT = config.MONGO_URL;
const MONGO_URL = config.MONGO_URL;
const DB_NAME = config.DB_NAME;


export const dbConnection = async () => {
    try {
        await mongoose.connect(config.MONGO_URL, {dbName: config.DB_NAME});
        logger.debug("BD online!!!");
    } catch(error) {
        logger.debug(`Error raising database ${error}`);
        process.exit(1);
    }
}

