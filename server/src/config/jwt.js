// src/config/jwt.js
import jwt from "jsonwebtoken";

// Usamos la clave desde .env
const TOKEN_SECRET = process.env.JWT_SECRET;

// Función para crear token de acceso
export function createAccessToken(payload) {
  return jwt.sign(payload, TOKEN_SECRET, {
    expiresIn: "1d",
  });
}
