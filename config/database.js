import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();


const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL, {
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      logging: false,
    })
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "postgres",
      logging: false,
    });

export default sequelize;
