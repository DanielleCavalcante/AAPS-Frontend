import React from 'react';
import './modal.css';

const Modal = ({ show, onClose, children }) => {

  // O modal só aparece se o estado 'show' for verdadeiro
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <button className="close-button" onClick={onClose}> 
          Ok
        </button>
      </div>
    </div>
  );
};

export default Modal;
