import React from 'react';
import './Modal.css';

const Modal = ({ show, onClose, onClose2, children, qtdeBotao, nomeBotao1, nomeBotao2 }) => {

  // O modal só aparece se o estado 'show' for verdadeiro
  console.log(show);
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        {qtdeBotao > 1 &&
          <button className="close-button" onClick={onClose2}>
            {
            nomeBotao1 ?? "Fechar"
            } 
          </button>
        }
        <button className="close-button" onClick={onClose}>
        {
          nomeBotao2 ?? "Ok"
        } 
        </button>
      </div>
    </div>
  );
};

export default Modal;
