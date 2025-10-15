import express from "express";
import { register, login, updateUser, getUserProfile } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update", authMiddleware, updateUser);
router.get("/me", authMiddleware, getUserProfile);

export default router;

