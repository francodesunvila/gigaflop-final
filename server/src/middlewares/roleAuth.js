// middlewares/roleAuth.js
export const authorize = (rolesPermitidos = []) => {
  return (req, res, next) => {
    const userRole = req.user?.rol; // viene del token validado en validateToken.js

    // Si no hay rol en el token
    if (!userRole) {
      return res.status(401).json({ message: "No se pudo determinar el rol del usuario" });
    }

    // Si el rol no está permitido
    if (!rolesPermitidos.includes(userRole)) {
      return res.status(403).json({ message: "Acceso denegado: rol insuficiente" });
    }

    // Si todo está bien, continúa
    next();
  };
};
