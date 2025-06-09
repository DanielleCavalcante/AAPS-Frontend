import React from 'react';
import './AlertAtencao.css';

export default function AlertWarning({ mensagem, onClose }) {
  return (
    <div className="alert-atencao">
      <div className="alert-content">
        <span className="alert-icon">⚠️</span>
        <span>
          <strong>Atenção:</strong> {mensagem}
        </span>
      </div>
      <button className="botao-fechar" onClick={onClose}>
        &times;
      </button>
    </div>
  );
}