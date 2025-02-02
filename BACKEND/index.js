import express, { json } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import todoRouter from "./routes/todosRoutes.js";



const app = express();

connectDB();

app.use(express.json());


const clientURL= `${process.env.BASE_URL}:${process.env.CLIENT_PORT}`;
app.use(cors({
    origin: clientURL,
    credentials: true, // Allow cookies and authentication headers if needed
})); 


app.get('/',(req,res)=>{
    res.send("server homepage");
})
app.use('/api',todoRouter);





const port = process.env.SERVER_PORT || 8000;
app.listen(port,()=>{
    console.log(`server running on ${process.env.BASE_URL}:${port}`);
    
})