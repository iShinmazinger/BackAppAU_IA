import express from "express";
import { createCrop, getCropsByUser, deleteCrop, updateCrop } from "../controllers/cropController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createCrop);

router.get("/", authMiddleware, getCropsByUser);

router.delete("/:id", authMiddleware, deleteCrop);

router.put("/:id", authMiddleware, updateCrop);

export default router;
