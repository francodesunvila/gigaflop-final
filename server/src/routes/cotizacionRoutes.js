// src/routes/cotizacionRoutes.js
import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import * as cotizacionController from "../controllers/cotizacionController.js";

const router = Router();

// Crear cotización
router.post("/iniciar", authRequired, cotizacionController.iniciarCotizacion);

// Todas las cotizaciones de un usuario específico
router.get("/todas/usuario/:id_usuario", authRequired, cotizacionController.obtenerTodasLasCotizaciones);

// Todas las cotizaciones (según token/rol)
router.get("/todas", authRequired, cotizacionController.obtenerTodasLasCotizaciones);

// Borradores
router.get("/borrador/:id_usuario", authRequired, cotizacionController.obtenerCotizacionesBorrador);
router.get("/borrador/retomar/:id", authRequired, cotizacionController.obtenerCotizacionBorradorPorId);

// Finalizar (✅ usa PUT)
router.put("/finalizar/:id", authRequired, cotizacionController.finalizarCotizacion);

// Ver completa
router.get("/ver/:id", authRequired, cotizacionController.verCotizacionCompleta);

// Actualizar borrador
router.put("/:id/actualizar", authRequired, cotizacionController.actualizarCotizacionBorrador);

// Cambiar estado
router.put("/estado/pendiente/:id", cotizacionController.marcarCotizacionComoPendiente);
router.put("/estado/:id", cotizacionController.actualizarEstado);

// Alerta vencimiento
router.post("/alerta-vencimiento/:id", cotizacionController.enviarAlertaVencimiento);

// Dashboard
router.get("/dashboard", cotizacionController.listarCotizacionesDashboard);

export default router;
