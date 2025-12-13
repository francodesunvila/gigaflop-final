// middlewares/validateToken.js
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/jwt.js";

// Middleware de validación de Token
export const authRequired = (req, res, next) => {
  // Buscar token en cookie o en header Authorization
  const token =
    req.cookies?.token || req.headers.authorization?.split(" ")[1];

  console.log("Token recibido:", token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "No se proporcionó token de autenticación" });
  }

  try {
    const user = jwt.verify(token, TOKEN_SECRET);
    req.user = user; // 👈 acá se setea el usuario y rol
    console.log("Usuario autenticado:", user);
    next();
  } catch (err) {
    console.error("Error al verificar token:", err);
    return res.status(403).json({ message: "Token inválido" });
  }
};
