// middlewares/validateToken.js
import jwt from "jsonwebtoken";

// Middleware de validación de Token usando SOLO cookies
export const authRequired = (req, res, next) => {
  // Buscar token únicamente en la cookie
  const token = req.cookies?.token;

  console.log("Token recibido desde cookie:", token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "No se proporcionó token de autenticación" });
  }

  try {
    // Usar la misma clave que en el login
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user; // acá se setea el usuario y rol
    console.log("Usuario autenticado:", user);
    next();
  } catch (err) {
    console.error("Error al verificar token:", err);
    return res.status(403).json({ message: "Token inválido" });
  }
};
