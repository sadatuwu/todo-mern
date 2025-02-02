import express, { json } from "express";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import todoRouter from "./routes/todosRoutes.js";



const app = express();
connectDB();


app.use(express.json());


app.get('/',(req,res)=>{
    res.send("server homepage");
})
app.use('/api',todoRouter);





const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`server running on ${process.env.BACKEND_URL}:${port}`);
    
})