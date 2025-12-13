// src/routes/usuariosRoutes.js
import { Router } from "express";
import { login, register, logout, profile, checkAuth } from "../controllers/usuariosController.js"; // 👈 singular
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", authRequired, profile);
router.get("/checkAuth", authRequired, checkAuth);

export default router;
