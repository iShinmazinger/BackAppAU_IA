import express from "express";
import { createCrop, getCropsByUser, deleteCrop, updateCrop } from "../controllers/cropController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createCrop);

router.get("/:userId", getCropsByUser);

router.delete("/:id", deleteCrop);

router.put("/:id", authMiddleware, updateCrop);

export default router;
