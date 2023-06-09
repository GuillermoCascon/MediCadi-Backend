import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import locationRoutes from './routes/locationRoutes.js'
import medicamentRoutes from './routes/medicamentRoutes.js'
import cors from 'cors';

const app = express()
app.use(express.json());
dotenv.config()

connectDB();

const dominiosPerimitidos = [process.env.DEV_FRONTEND_URL_1, process.env.DEV_FRONTEND_URL_2];

const corsOptions = {
  origin: (origin, callback) => {
    if(!origin) return callback(null, true);
    if (dominiosPerimitidos.indexOf(origin) === -1) {
        return callback(new Error('Lo q tu esta asiendo no esta permitio por CORS compai'));
    }
    return callback(null, true);
  }
};
app.use(cors(corsOptions));

app.use('/api/users', userRoutes)
app.use('/api/locations', locationRoutes)
app.use('/api/medicaments', medicamentRoutes)

const PORT = process.env.PORT || 400
app.listen(PORT, () =>{
    console.log(`Servidor funcionando en el puerto ${PORT}`)
})