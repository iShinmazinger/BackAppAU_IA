import express from "express";
import { createCrop, getCropsByUser, deleteCrop } from "../controllers/cropController.js";

const router = express.Router();

router.post("/", createCrop);

router.get("/:userId", getCropsByUser);

router.delete("/:id", deleteCrop);

export default router;
