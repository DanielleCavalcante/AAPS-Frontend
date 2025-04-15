import './botaoSalvar.css';
import Modal from '/src/components/Modal/Modal.jsx';

const BotaoSalvar = ({ showModal, openModal, closeModal, disabled }) => { 

  return (
    <div>
      <button 
        className={`btn-Salvar ${disabled ? 'disabled' : ''}`} 
        onClick={openModal} 
        disabled={disabled} 
        style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
      >
        <img src="/src/assets/icone_salvar.png" alt="Ícone salvar" className="icon" />
        <span>Salvar</span>
      </button>

      {showModal && (
        <Modal show={showModal} onClose={closeModal}>
          <img src="/src/assets/emoji-smile.png" alt="Ícone de sucesso" className="icon" />
          <p>Salvo com sucesso!</p>
        </Modal>
      )}
    </div>
  );
};

export default BotaoSalvar;
