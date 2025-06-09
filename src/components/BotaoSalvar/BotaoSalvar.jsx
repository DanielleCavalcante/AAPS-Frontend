import Modal from '/src/components/Modal/Modal.jsx';

import iconeSalvar from "/src/assets/icone_salvar.png"
import iconeSmile from "/src/assets/emoji-smile.png"
import './BotaoSalvar.css';

const BotaoSalvar = ({ showModal, openModal, closeModal, disabled }) => { 

  return (
    <div>
      <button 
        className={`btn-Salvar ${disabled ? 'disabled' : ''}`} 
        onClick={openModal} 
        disabled={disabled} 
        style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
      >
        <img src={iconeSalvar} alt="Ícone salvar" className="icon" />
        <span>Salvar</span>
      </button>

      {showModal && (
        <Modal show={showModal} onClose={closeModal}>
          <img src={iconeSmile} alt="Ícone de sucesso" className="icon" />
          <p>Salvo com sucesso!</p>
        </Modal>
      )}
    </div>
  );
};

export default BotaoSalvar;