import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import cropRoutes from "./routes/cropRoutes.js";
import cropUpdateRoutes from "./routes/cropUpdateRoutes.js";


dotenv.config();

const app = express();

const allowedOrigins = [
  "https://frontendappau.onrender.com",
  "http://localhost:4200"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/crop-updates", cropUpdateRoutes);


sequelize.sync().then(() => {
  console.log("Base de datos sincronizada");
  app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
  });
});
