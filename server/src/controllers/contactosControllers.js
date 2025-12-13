// src/controllers/ContactosController.js
import { obtenerContactosPorCliente } from "../models/ContactosModels.js";

// 📌 Obtener contactos de un cliente (requiere autenticación)
export const obtenerContactosPorClienteController = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "⚠️ Falta el ID del cliente" });
  }

  try {
    const contactos = await obtenerContactosPorCliente(id);

    if (!contactos || contactos.length === 0) {
      return res.status(404).json({ message: "No se encontraron contactos para este cliente" });
    }

    res.status(200).json(contactos);
  } catch (error) {
    console.error("Error al obtener contactos del cliente:", error);
    res.status(500).json({ message: "❌ No se pudo obtener los contactos del cliente" });
  }
};
