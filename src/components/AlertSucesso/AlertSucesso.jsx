import React from 'react';
import './alertSucesso.css';

export default function AlertSucesso({ mensagem, onClose }) {
  return (
    <div className="alert-sucesso">
      <div className="alert-content">
        <span className="alert-icon">✅</span>
        <span>
          <strong>Sucesso:</strong> {mensagem}
        </span>
      </div>
      <button className="botao-fechar" onClick={onClose}>
        &times;
      </button>
    </div>
  );
}