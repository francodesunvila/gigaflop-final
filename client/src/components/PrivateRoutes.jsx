// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";

const PrivateRoute = ({ children, roles }) => {
  const { usuario, cargando } = useUser();

  if (cargando) {
    return <div className="spinner-container">Verificando sesión...</div>;
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (roles && usuario?.rol && !roles.includes(usuario.rol)) {
    return <Navigate to="/menu" replace />;
  }

  return children;
};

export default PrivateRoute;
