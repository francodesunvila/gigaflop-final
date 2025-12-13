// src/routes/contactosRoutes.js
import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { authorize } from "../middlewares/roleAuth.js";
import { obtenerContactosPorClienteController } from "../controllers/contactosControllers.js";

const router = Router();


router.get(
  "/clientes/:id/contactos",
  authRequired,
  authorize(["administrador", "vendedor"]),
  obtenerContactosPorClienteController
);

export default router;
