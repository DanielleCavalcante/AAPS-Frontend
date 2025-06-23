import React, { useEffect, useRef } from 'react';
import './Modal.css';

const Modal = ({ show, onClose, onClose2, children, qtdeBotao, nomeBotao1, nomeBotao2 }) => {

  const botaoNaoRef = useRef(null);
  const botaoSimRef = useRef(null);
  const modalRef = useRef(null);

  // Quando o modal abre, foca no botão "Não" (se existir)
  useEffect(() => {
    if (show && qtdeBotao > 1 && botaoNaoRef.current) {
      botaoNaoRef.current.focus();
    }
  }, [show, qtdeBotao]);

  // Função para navegar com as setas do teclado
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      if (document.activeElement === botaoNaoRef.current) {
        botaoSimRef.current.focus();
      }
    } else if (e.key === 'ArrowLeft') {
      if (document.activeElement === botaoSimRef.current) {
        botaoNaoRef.current.focus();
      }
    }
  };

  // Mantém o foco dentro do modal
  const handleFocusOut = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.relatedTarget)) {
      // Se o foco saiu do modal, volta pro botão "Não"
      if (botaoNaoRef.current) {
        botaoNaoRef.current.focus();
      }
    }
  };

  // O modal só aparece se o estado 'show' for verdadeiro
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay" onKeyDown={handleKeyDown} tabIndex={-1} onBlur={handleFocusOut}>
      <div className="modal-content" ref={modalRef}>
        {children}
        {qtdeBotao > 1 &&
          <button
            ref={botaoNaoRef}
            className="close-button"
            onClick={onClose2}
            style={{ backgroundColor: "#E00000", color: "white" }}
          >
            {
              nomeBotao1 ?? "Fechar"
            }
          </button>
        }
        <button
          ref={botaoSimRef}
          className="close-button"
          onClick={onClose}
          style={{ backgroundColor: "#1AB83D", color: "white" }}>
          {
            nomeBotao2 ?? "Ok"
          }
        </button>
      </div>
    </div>
  );
};

export default Modal;