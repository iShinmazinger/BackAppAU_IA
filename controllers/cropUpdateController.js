import Crop from "../models/Crop.js";
import CropUpdate from "../models/CropUpdate.js";

export const createCropUpdate = async (req, res) => {
  try {
    const { crop_id, status, notes, image_url } = req.body;
    const userId = req.user.id;

    if (!crop_id || !status) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const crop = await Crop.findOne({ where: { id: crop_id, userId } });
    if (!crop) {
      return res.status(403).json({ message: "No tienes permiso para modificar este cultivo" });
    }

    const newUpdate = await CropUpdate.create({
      crop_id,
      status,
      notes,
      image_url,
    });

    res.status(201).json(newUpdate);
  } catch (error) {
    console.error("Error al crear actualización:", error);
    res.status(500).json({ message: "Error al crear actualización" });
  }
};

export const getCropUpdatesByCrop = async (req, res) => {
  try {
    const { crop_id } = req.params;
    const userId = req.user.id;

    const crop = await Crop.findOne({ where: { id: crop_id, userId } });
    if (!crop) {
      return res.status(403).json({ message: "No tienes permiso para ver este cultivo" });
    }

    const updates = await CropUpdate.findAll({
      where: { crop_id },
      order: [["created_at", "DESC"]],
    });

    res.json(updates);
  } catch (error) {
    console.error("Error al obtener actualizaciones:", error);
    res.status(500).json({ message: "Error al obtener actualizaciones" });
  }
};

export const deleteCropUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const update = await CropUpdate.findOne({
      where: { id },
      include: [{ model: Crop, where: { userId } }],
    });

    if (!update) {
      return res.status(403).json({ message: "No tienes permiso para eliminar esta actualización" });
    }

    await update.destroy();
    res.json({ message: "Actualización eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar actualización:", error);
    res.status(500).json({ message: "Error al eliminar actualización" });
  }
};
