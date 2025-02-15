import mongoose from "mongoose";
import dotEnv from 'dotenv';

dotEnv.config();

export default (req, res, next) => {
    mongoose.connect(process.env.MONGO_URL).catch((err) => {
        console.log("Error ao conectar no banco...")
    })
    return next()    
}