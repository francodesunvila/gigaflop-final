// controllers/usuariosController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser, findUserById } from "../models/UsuariosModels.js";

// Registrar usuario
export const register = async (req, res) => {
  const { usuario, email, nombre, apellido, password, rol = "vendedor", estado } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await createUser(
      usuario,
      email,
      hashedPassword,
      nombre,
      apellido,
      rol,
      estado
    );

    res.status(201).json({ message: "Usuario registrado con éxito", userId });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// Iniciar sesión
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await findUserByEmail(email);
    if (!usuario) {
      return res.status(400).json({ message: "Datos incorrectos" });
    }

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Datos incorrectos" });
    }

    // 🔑 Generar token con JWT_SECRET
    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.usuario, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Guardar token en cookie (único mecanismo de auth)
    // ⚠️ Configuración para desarrollo local (HTTP, localhost)
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,   // 👈 en local debe ser false
      sameSite: "lax", // 👈 más permisivo en dev
      maxAge: 86400000,
    });

    // 👉 No devolvemos el token en el JSON, solo el usuario
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      usuario: {
        id: usuario.id,
        usuario: usuario.usuario,
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        rol: usuario.rol,
        estado: usuario.estado,
      },
    });
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// Cerrar sesión
export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Sesión cerrada correctamente" });
};

// Obtener perfil
export const profile = async (req, res) => {
  try {
    const usuario = await findUserById(req.user.id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({
      usuario: {
        id: usuario.id,
        usuario: usuario.usuario,
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        rol: usuario.rol,
        estado: usuario.estado,
      },
    });
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// Verificar autenticación
export const checkAuth = async (req, res) => {
  try {
    res.status(200).json({
      authenticated: true,
      usuario: {
        id: req.user?.id,
        nombre: req.user?.nombre,
        rol: req.user?.rol,
      },
    });
  } catch (error) {
    console.error("Error en checkAuth:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
