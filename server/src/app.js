import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import usuariosRoutes from "./routes/usuariosRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import clientesRoutes from "./routes/clientesRoutes.js";
import productosRoutes from "./routes/productosRoutes.js";
import cotizacionRoutes from "./routes/cotizacionRoutes.js";
import contactosRoutes from "./routes/contactosRoutes.js";
import estadosRoutes from "./routes/estadosRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import configuracionRoutes from "./routes/configuracionRoutes.js";

dotenv.config();

const app = express();

// ✅ Configuración de CORS para cookies cross-site
const allowedOrigins = [
  "http://localhost:3000",
  "https://gigaflop.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Origen no permitido por CORS"));
      }
    },
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// ✅ Servir imágenes estáticas
app.use("/images", express.static("public/images"));

// ✅ Montaje con prefijos claros
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/cotizaciones", cotizacionRoutes);
app.use("/api/clientes", contactosRoutes);   // 👈 CORREGIDO: contactos bajo /api/clientes
app.use("/api/estados", estadosRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/configuracion", configuracionRoutes);

// ✅ Middleware de errores global
app.use((err, req, res, next) => {
  console.error("Error no capturado:", err);
  res.status(500).json({ message: "❌ Error interno del servidor" });
});

export default app;
