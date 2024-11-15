import Modal from '/src/components/Modal';
import './botaoAlterar.css';

const BotaoAlterar = ({ openModal, closeModal, disabled }) => {
  return (
    <div>
      <button 
        className={`btn-Salvar ${disabled ? 'disabled' : ''}`} 
        onClick={openModal} 
        disabled={disabled} 
        style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
      >
        <img src="/src/assets/icone_alterar.png" alt="Ícone alterar" className="icon" />
        <span>Alterar</span>
      </button>

    </div>
  );
};

export default BotaoAlterar;
