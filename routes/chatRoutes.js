import express from "express";
import { sendMessage, getUserConversations, getConversationMessages } from "../controllers/chatController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/send", authMiddleware, sendMessage);

router.get("/history", authMiddleware, getUserConversations);

router.get("/history/:id", authMiddleware, getConversationMessages);

export default router;
