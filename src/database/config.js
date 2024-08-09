import mongoose from 'mongoose';
import { config } from '../config/config.js';

const PORT = config.MONGO_URL;
const MONGO_URL = config.MONGO_URL;
const DB_NAME = config.DB_NAME;


export const dbConnection = async () => {
    try {
        //await mongoose.connect(MONGO_URL,{DB_NAME});
        await mongoose.connect("mongodb+srv://ernestoleimsieder:CoderCoder@cluster0.ycrhk4t.mongodb.net/ecommerce")
        console.log("BD online!!!")
    } catch(error) {
        console.log(`Error raising database ${error}`);
        process.exit(1);
    }
}

