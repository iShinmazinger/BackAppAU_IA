import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Crop from "./Crop.js";

const CropUpdate = sequelize.define("CropUpdate", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  crop_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Crop,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  status: {                  //tipo de entrada
    type: DataTypes.STRING,
    allowNull: false,
  },
  notes: {                   //descripcion
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

Crop.hasMany(CropUpdate, { foreignKey: "crop_id", onDelete: "CASCADE" });
CropUpdate.belongsTo(Crop, { foreignKey: "crop_id" });

export default CropUpdate;
