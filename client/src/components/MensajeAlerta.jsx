import React, { useState } from 'react';
import '../CSS/mensajeAlerta.css';

const MensajeAlerta = ({ tipo, mensaje, cliente, onConfirmar, onCancelar }) => {
  const [razonSocial, setRazonSocial] = useState(cliente?.razon_social || '');
  const [cuit, setCuit] = useState(cliente?.cuit || '');

  const handleEditar = (e) => {
    e.preventDefault();
    onConfirmar(razonSocial, cuit);
  };

  const handleEliminar = (e) => {
    e.preventDefault();
    onConfirmar();
  };

  return (
    <div className="confirm-overlay" onClick={onCancelar} role="dialog" aria-modal="true">
      <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
        <p>{mensaje}</p>

        {tipo === 'editar' && (
          <form onSubmit={handleEditar}>
            <div className="form">
              <label>Razón Social:</label>
              <input
                type="text"
                value={razonSocial}
                onChange={(e) => setRazonSocial(e.target.value)}
                required
              />
            </div>
            <div className="form">
              <label>CUIT:</label>
              <input
                type="text"
                value={cuit}
                onChange={(e) => setCuit(e.target.value)}
                required
              />
            </div>
            <button className="btn-confirmar" type="submit">Guardar Cambios</button>
          </form>
        )}

        {tipo === 'eliminar' && (
          <div className="confirm-buttons">
            <button className="btn-cancelar" onClick={onCancelar}>Cancelar</button>
            <button className="btn-confirmar" onClick={handleEliminar}>Sí, eliminar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MensajeAlerta;
