// src/controllers/ConfiguracionController.js
import * as ConfiguracionModels from "../models/ConfiguracionModels.js";

// 📌 Listar usuarios (solo administradores)
export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await ConfiguracionModels.getUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error en listarUsuarios:", error);
    res.status(500).json({ message: "❌ Error al listar usuarios" });
  }
};

// 📌 Crear usuario (solo administradores)
export const crearUsuario = async (req, res) => {
  try {
    const { usuario, email, password, nombre, apellido, rol, estado } = req.body;

    if (!usuario || !email || !password || !nombre || !apellido || !rol || estado === undefined) {
      return res.status(400).json({ message: "⚠️ Faltan campos obligatorios" });
    }

    const id = await ConfiguracionModels.createUsuario(req.body);
    res.status(201).json({ message: "✅ Usuario creado", id });
  } catch (error) {
    console.error("Error en crearUsuario:", error);
    res.status(500).json({ message: "❌ Error al crear usuario" });
  }
};

// 📌 Actualizar usuario (solo administradores)
export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuario, email, nombre, apellido, rol, estado } = req.body;

    if (!usuario || !email || !nombre || !apellido || !rol || estado === undefined) {
      return res.status(400).json({ message: "⚠️ Faltan campos obligatorios" });
    }

    await ConfiguracionModels.updateUsuario(id, req.body);
    res.status(200).json({ message: "✅ Usuario actualizado correctamente" });
  } catch (error) {
    console.error("Error en actualizarUsuario:", error.sqlMessage || error);
    res.status(500).json({ message: "❌ Error al actualizar usuario" });
  }
};

// 📌 Obtener datos fiscales
export const obtenerDatosFiscales = async (req, res) => {
  try {
    const datos = await ConfiguracionModels.getDatosFiscales();
    res.status(200).json(datos);
  } catch (error) {
    console.error("Error en obtenerDatosFiscales:", error);
    res.status(500).json({ message: "❌ Error al obtener datos fiscales" });
  }
};

// 📌 Actualizar datos fiscales
export const actualizarDatosFiscales = async (req, res) => {
  try {
    const { id, cuit, razon_social, email, direccion, contacto_principal, condicion_fiscal } = req.body;

    if (!id || !cuit || !razon_social || !email || !direccion || !contacto_principal || !condicion_fiscal) {
      return res.status(400).json({ message: "⚠️ Faltan campos obligatorios" });
    }

    await ConfiguracionModels.updateDatosFiscales(req.body);
    res.status(200).json({ message: "✅ Datos fiscales actualizados correctamente" });
  } catch (error) {
    console.error("Error en actualizarDatosFiscales:", error.sqlMessage || error);
    res.status(500).json({ message: "❌ Error al actualizar datos fiscales" });
  }
};

// 📌 Crear datos fiscales
export const crearDatosFiscales = async (req, res) => {
  try {
    const { cuit, razon_social, email, direccion, contacto_principal, condicion_fiscal } = req.body;

    if (!cuit || !razon_social || !email || !direccion || !contacto_principal || !condicion_fiscal) {
      return res.status(400).json({ message: "⚠️ Faltan campos obligatorios" });
    }

    console.log("Body recibido:", req.body);
    const id = await ConfiguracionModels.createDatosFiscales(req.body);
    res.status(201).json({ message: "✅ Datos fiscales creados", id });
  } catch (error) {
    console.error("Error en crearDatosFiscales:", error.sqlMessage || error);
    res.status(500).json({ message: "❌ Error al crear datos fiscales" });
  }
};
