import Crop from "../models/Crop.js";

export const createCrop = async (req, res) => {
  try {
    const { userId, name, startdate, tipo } = req.body;

    const newCrop = await Crop.create({ userId, name, startdate, tipo });
    res.status(201).json(newCrop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el cultivo" });
  }
};

export const getCropsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const crops = await Crop.findAll({ where: { userId } });
    res.json(crops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los cultivos" });
  }
};

export const deleteCrop = async (req, res) => {
  try {
    const { id } = req.params;
    const crop = await Crop.findByPk(id);
    if (!crop) return res.status(404).json({ error: "Cultivo no encontrado" });

    await crop.destroy();
    res.json({ message: "Cultivo eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el cultivo" });
  }
};
