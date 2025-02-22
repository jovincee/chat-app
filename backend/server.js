//npm install express dotenv cookie-parser bcryptjs mongoose socket.io jsonwebtoken
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectToMongoDB from "./controllers/db/connectToMongoDB.js";
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

//add another middleware to parse incoming requests, particularly body requests
app.use(express.json());
app.use(cookieParser());

//create authentication and message routes here. 
app.use("/api/auth",authRoutes);
app.use("/api/messages", messageRoutes);



//environment variable
const PORT = process.env.PORT || 5000;
//create a test route, root route which client will be directed to first
// app.get ("/", (req, res) => {
//     //root route http://localhost:5000/
//     res.send("Hello World!")
// });



app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`)

});