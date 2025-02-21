import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
/*
Create router variable and declare Router from express
Create a login route through router. 
*/
const router = express.Router();


router.post("/signup",signup);

router.post("/login",login);

router.post("/logout",logout);



export default router;