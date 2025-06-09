import Modal from '../Modal/Modal.jsx';

import iconeAlterar from '/src/assets/icone_alterar.png';
import './BotaoAlterar.css';

// const BotaoAlterar = ({ showModal, openModal, closeModal, disabled }) => {
const BotaoAlterar = ({ onClick, disabled }) => {
  return (
    <div>
      <button 
        className={`btn-Alterar ${disabled ? 'disabled' : ''}`} 
        //onClick={openModal} 
        onClick={onClick} 
        disabled={disabled} 
        type="button" // verificar se é necessário
        style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
      >
        <img src={iconeAlterar} alt="Ícone alterar" className="icon" />
        <span>Alterar</span>
      </button>

      {/* <Modal show={showModal} onClose={closeModal}>
        <img src="/src/assets/emoji-smile.png" alt="Ícone de sucesso" className="icon" />
        <p>Alteração realizada com sucesso!</p>
      </Modal> */}
    </div>
  );
};

export default BotaoAlterar;