//npm install express dotenv cookie-parser bcryptjs mongoose socket.io jsonwebtoken
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js"
import connectToMongoDB from "./controllers/db/connectToMongoDB.js";

import { app, server } from "./socket/socket.js";

dotenv.config();

//environment variable
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

//add another middleware to parse incoming requests, particularly body requests
app.use(express.json());
app.use(cookieParser());

//create authentication and message routes here. 
app.use("/api/auth",authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

//static middleware; set root directory + frontend + dist (non existent)
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))

})

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`)

});