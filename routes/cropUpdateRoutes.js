import express from "express";
import {
  createCropUpdate,
  getCropUpdatesByCrop,
  deleteCropUpdate,
} from "../controllers/cropUpdateController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createCropUpdate);

router.get("/:crop_id", authMiddleware, getCropUpdatesByCrop);

router.delete("/:id", authMiddleware, deleteCropUpdate);

export default router;
