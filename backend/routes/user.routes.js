import express from "express"; //router
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";

const router = express.Router();
/*
Get users from sidebar

*/
router.get("/", protectRoute, getUsersForSidebar);




export default router;