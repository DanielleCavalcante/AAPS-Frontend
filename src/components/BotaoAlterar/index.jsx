import Modal from '/src/components/Modal';
import './botaoAlterar.css';

const BotaoAlterar = ({ showModal, openModal, closeModal, disabled }) => {
  return (
    <div>
      <button 
        className={`btn-Alterar ${disabled ? 'disabled' : ''}`} 
        onClick={openModal} 
        disabled={disabled} 
        style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
      >
        <img src="/src/assets/icone_alterar.png" alt="Ícone alterar" className="icon" />
        <span>Alterar</span>
      </button>

      <Modal show={showModal} onClose={closeModal}>
        <img src="/src/assets/emoji-smile.png" alt="Ícone de sucesso" className="icon" />
        <p>Alteração realizada com sucesso!</p>
      </Modal>
    </div>
  );
};

export default BotaoAlterar;
