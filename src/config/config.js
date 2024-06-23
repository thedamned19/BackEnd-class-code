import dotenv from "dotenv"

dotenv.config(
    {
        path: "./src/.env", 
        override: true
    }
)

export const config = {
    PORT: process.env.PORT||8080,
    MONGO_URL: process.env.MONGO_URL, 
    DB_NAME: process.env.DB_NAME,
    CLIENT_ID: process.env.CLIENT_ID_GITHUB,
    SECRET: process.env.CLIENT_SECRET_GITHUB,
    CALLBACKURL:process.env.CALLBACKURL
}