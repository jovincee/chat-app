import express from "express";
import { getMessages, sendMessage, getConvoInfo, getNumberOfUnreadMsgs, updateUnreadCount, updateUnreadMsgs } from "../controllers/message.controller.js"
import protectRoute from "../middleware/protectRoute.js"


const router = express.Router();

router.get("/:id", protectRoute, getMessages);
//create sent message route; need an authorization first
router.post("/send/:id", protectRoute, sendMessage);
//create route to get all data for convos in the backend
router.get("/get-msg/:id", protectRoute, getConvoInfo);
//create route to get unread data
router.get("/get-unread-msgs/:id", protectRoute,getNumberOfUnreadMsgs);

router.post("/update/:id", protectRoute, updateUnreadCount);
router.post("/update-msg/:id", protectRoute, updateUnreadMsgs);
export default router;