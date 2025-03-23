import React from 'react';
import './modal.css';

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
          <button className="close-button" onClick={onClose2} style={{ backgroundColor: "#E00000", color: "white"}}>
            {
            nomeBotao1 ?? "Fechar"
            } 
          </button>
        }
          <button className="close-button" onClick={onClose} style={{ backgroundColor: "#1AB83D", color: "white"}}>
          {
            nomeBotao2 ?? "Ok"
          } 
        </button>
      </div>
    </div>
  );
};

export default Modal;
