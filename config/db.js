import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        mongoose.set('strictQuery', false);
        
        const db = await mongoose.connect(process.env.MONGO_URI);

        const url = `${db.connection.host}:${db.connection.port}`
        console.log(`MongoDB conectado en: ${url}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1);
    }
}

export default connectDB;
