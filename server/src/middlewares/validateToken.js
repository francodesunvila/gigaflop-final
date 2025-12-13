// middlewares/validateToken.js
import jwt from "jsonwebtoken";

export const authRequired = (req, res, next) => {
  const token = req.cookies && req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No se proporcionó token de autenticación" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user; // setea id, nombre y rol

    // En local podés loguear, en producción mejor no
    if (process.env.NODE_ENV !== "production") {
      console.log("Usuario autenticado:", user);
    }

    next();
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error al verificar token:", err);
    }
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};
