import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';


const connectDb = () => {
    mongoose.connect(process.env.MONGO);
}

export {
    connectDb
}