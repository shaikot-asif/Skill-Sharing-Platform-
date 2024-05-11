import express from "express";
const router = express.Router();

import { addMessage, getMessages } from "../controllers/messageController.js";
import { getAllUsers } from "../controllers/userControllers.js";
import { authGuard } from "../middleware/authMiddleware.js";

router.post("/addmsg", addMessage);
router.post("/getmsg", getMessages);
router.get("/allusers/:id", getAllUsers);

export default router;
