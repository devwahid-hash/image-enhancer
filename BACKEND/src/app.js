import express, { Router } from "express"
import dotenv from "dotenv"
import authrouter from "./routes/authRoute.js";
import router from "./routes/enhancementRoute.js"
import connectDb from "./libs/db.js";
import cors from "cors"
import cookieParser from "cookie-parser";
const app=express();
app.use(express.json())
dotenv.config();
connectDb();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());

app.use("/auth",authrouter)
app.use("/api",router)
const PORT=process.env.PORT


export default app;
