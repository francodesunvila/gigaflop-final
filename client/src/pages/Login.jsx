import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import '../CSS/login.css'
import axios from 'axios';
import { useUser } from '../context/UserContext.jsx';

const Login = () => {
  const { setUsuario } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // 👈 agregado

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true); // 👈 agregado
    setError('');
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE}/api/usuarios/login`,
        { email, password },
        { withCredentials: true }
      );

      const usuario = res.data.usuario;

      // Guardar usuario en contexto
      setUsuario(usuario);

      // Guardar en localStorage
      localStorage.setItem('usuario', JSON.stringify(usuario));
      localStorage.setItem('token', res.data.token);   // 👈 token para llamadas al backend
      localStorage.setItem('rol', usuario.rol);        // 👈 rol para controlar accesos
      localStorage.setItem('id_usuario', usuario.id);  // 👈 id para cotizaciones propias

      // Redirigir
      navigate('/menu');
    } catch (err) {
      const msg = err.response?.data?.message || 'Error de conexión';
      setError(msg);
    } finally {
      setLoading(false); // 👈 agregado
    }
  }; 

  console.log('API base:', process.env.REACT_APP_API_BASE);

  return (
    <>
      <div className="background-container">
        <div className="loginbox">
          <div className="title-container-login">
            <h2 className="title">GIGAFLOP</h2>
          </div>
          <div className="input-container">
            <input
              type="email"
              placeholder="Email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="login-button"
              onClick={handleLogin}
              disabled={loading} // 👈 agregado
            >
              {loading ? 'Cargando...' : 'Iniciar Sesión'} {/* 👈 agregado */}
            </button>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login
