import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js"
import connectToMongoDB from "./DB/connection.js";
const app = express();
const PORT =process.env.PORT || 5000;
//create root router http://localhost:5000/
// app.get("/",(req,res) =>{
//     res.send("Welcome to my API!");
// });
//calling routes
dotenv.config();
//middleware to extract field from request.body

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.listen(PORT,() => {
connectToMongoDB();
console.log(`server running on port ${PORT}`)});