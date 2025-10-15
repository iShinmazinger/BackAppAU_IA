import Crop from "../models/Crop.js";

export const createCrop = async (req, res) => {
  try {
    const { userId, name, startdate, tipo, ubicacion, etapa } = req.body;

    const newCrop = await Crop.create({ userId, name, startdate, tipo, ubicacion, etapa });
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

export const updateCrop = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, tipo, etapa, ubicacion } = req.body;
    const userId = req.user.id;

    const crop = await Crop.findOne({ where: { id, userId } });

    if (!crop) {
      return res.status(404).json({ message: "Cultivo no encontrado o no autorizado" });
    }

    if (name) crop.name = name;
    if (tipo) crop.tipo = tipo;
    if (etapa) crop.etapa = etapa;
    if (ubicacion) crop.ubicacion = ubicacion;

    await crop.save();

    res.json({
      message: "Cultivo actualizado correctamente",
      crop,
    });
  } catch (error) {
    console.error("Error al actualizar cultivo:", error);
    res.status(500).json({ message: "Error del servidor", error });
  }
};

