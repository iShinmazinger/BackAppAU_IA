import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";

const Crop = sequelize.define("Crop",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "crops",
    timestamps: false,
  }
);

User.hasMany(Crop, { foreignKey: "userId" });
Crop.belongsTo(User, { foreignKey: "userId" });

export default Crop;
