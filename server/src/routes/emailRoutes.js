// src/routes/emailRoutes.js
import express from "express";
import multer from "multer";
import { enviarCotizacion, enviarEmailConAdjunto } from "../controllers/emailControllers.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 📌 Para enviar solo HTML sin adjunto
router.post("/enviar", enviarCotizacion);

// 📌 Para enviar HTML + PDF adjunto
router.post("/enviar-con-adjunto", upload.single("archivoPDF"), enviarEmailConAdjunto);

export default router;
