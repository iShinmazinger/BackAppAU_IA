import express from "express";
import { createCrop, getCropsByUser, deleteCrop, updateCrop, getCropsCrecimiento} from "../controllers/cropController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createCrop);

router.get("/", authMiddleware, getCropsByUser);

router.delete("/:id", authMiddleware, deleteCrop);

router.put("/:id", authMiddleware, updateCrop);

router.get('/crecimiento', authMiddleware, getCropsCrecimiento);

export default router;
