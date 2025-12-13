import { obtenerContactosPorCliente } from "../models/ContactosModels.js";

// 📌 Obtener contactos de un cliente por ID (requiere autenticación)
export const obtenerContactosPorClienteController = async (req, res) => {
  const { id } = req.params;
  console.log("Entró al controlador de contactos con id:", id);

  if (!id) {
    return res.status(400).json({ message: "⚠️ Falta el ID del cliente" });
  }

  try {
    const contactos = await obtenerContactosPorCliente(id);

    // 🔑 Devuelve array vacío en vez de 404
    res.status(200).json(contactos || []);
  } catch (error) {
    console.error("Error al obtener contactos del cliente:", error);
    res.status(500).json({ message: "❌ No se pudo obtener los contactos del cliente" });
  }
};
