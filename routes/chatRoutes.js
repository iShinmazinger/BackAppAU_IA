import express from "express";
import { sendMessage } from "../controllers/chatController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/send", authMiddleware, sendMessage);

export default router;
