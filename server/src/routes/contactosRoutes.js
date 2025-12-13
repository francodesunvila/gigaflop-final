import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { authorize } from "../middlewares/roleAuth.js";
import { obtenerContactosPorClienteController } from "../controllers/contactosControllers.js";

const router = Router();

// 📌 Ruta para obtener contactos por ID del cliente
router.get(
  "/:id/contactos",   // 👈 CORREGIDO: ahora es relativo a /api/clientes
  authRequired,
  authorize(["administrador", "vendedor"]),
  obtenerContactosPorClienteController
);

export default router;
