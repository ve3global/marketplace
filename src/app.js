import express from "express";
const app = express();
import { connectDb } from './db/connectDb.js';
import './controller/index.js';
import index from './routes/index.js';



app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const PORT = process.env.PORT || 3000;

app.use("/api/v1", index);

app.listen(PORT, async () => {
    await connectDb();
    console.log(`App listening at port ${PORT}`)
})