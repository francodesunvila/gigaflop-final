// src/routes/configuracionRoutes.js
import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { authorize } from "../middlewares/roleAuth.js";
import * as configuracionControllers from "../controllers/configuracionControllers.js";

const router = Router();

/**
 * 📌 Rutas de Configuración
 * Responsabilidades:
 * - Usuarios: alta, listado, actualización de rol/estado (solo administradores)
 * - Datos fiscales: guardar y recuperar CUIT, razón social, email, dirección, contacto principal (solo administradores)
 */

// ================== Usuarios ==================

// Listar usuarios (solo administradores)
router.get(
  "/usuarios",
  authRequired,
  authorize(["administrador"]),
  configuracionControllers.listarUsuarios
);

// Crear usuario (solo administradores)
router.post(
  "/usuarios",
  authRequired,
  authorize(["administrador"]),
  configuracionControllers.crearUsuario
);

// Actualizar usuario (solo administradores)
router.put(
  "/usuarios/:id",
  authRequired,
  authorize(["administrador"]),
  configuracionControllers.actualizarUsuario
);

// ================== Datos fiscales ==================

// Crear datos fiscales (solo administradores)
router.post(
  "/datos-fiscales",
  authRequired,
  authorize(["administrador"]),
  configuracionControllers.crearDatosFiscales
);

// Obtener datos fiscales (solo administradores)
router.get(
  "/datos-fiscales",
  authRequired,
  authorize(["administrador"]),
  configuracionControllers.obtenerDatosFiscales
);

// Actualizar datos fiscales (solo administradores)
router.put(
  "/datos-fiscales",
  authRequired,
  authorize(["administrador"]),
  configuracionControllers.actualizarDatosFiscales
);

export default router;
