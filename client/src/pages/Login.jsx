import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/UserContext.jsx';

const Login = () => {
  const { setUsuario } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
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
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('rol', usuario.rol);
      localStorage.setItem('id_usuario', usuario.id);

      // Redirigir
      navigate('/menu');
    } catch (err) {
      const msg = err.response?.data?.message || 'Error de conexión';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background-container">
      <div className="loginbox">
        <div className="title-container-login">
          <h2 className="title">GIGAFLOP</h2>
        </div>
        <div className="input-container">
          <input
            type="email"
            placeholder="Email"
            className="form-control mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="form-control mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="btn btn-primary w-100"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Cargando...
              </>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
          {error && <p className="text-danger mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
