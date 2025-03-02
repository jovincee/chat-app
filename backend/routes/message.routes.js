import express from "express";
import { getMessages, sendMessage, getConvoInfo } from "../controllers/message.controller.js"
import protectRoute from "../middleware/protectRoute.js"


const router = express.Router();
router.get("/:id", protectRoute, getMessages);
//create sent message route; need an authorization first
router.post("/send/:id", protectRoute, sendMessage);
//create route to get all data for convos in the backend
router.get("/get-msg/:id", protectRoute, getConvoInfo);
export default router;