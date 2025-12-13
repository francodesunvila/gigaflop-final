// src/controllers/menuControllers.js
export const getMenuOptions = (req, res) => {
  try {
    const menuOptions = [
      { name: "Cotizacion", path: "/cotizacion" },
      { name: "Clientes", path: "/clientes" },
      { name: "Productos", path: "/productos" }, // corregí mayúscula y espacio
      { name: "Configuracion", path: "/configuracion" }
    ];
    res.status(200).json({ menu: menuOptions });
  } catch (error) {
    console.error("Error al obtener el menú:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
