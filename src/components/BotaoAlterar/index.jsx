import Modal from '/src/components/Modal';
import './botaoAlterar.css';

const BotaoAlterar = ({showModal, showConfirmModalAlterar, openModal, closeModal, closeModal2, closeModalAlterar, disabled}) => {
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

      <Modal show={showConfirmModalAlterar} onClose={closeModal} onClose2={closeModal2} qtdeBotao={2} nomeBotao1={'Não'} nomeBotao2={'Sim'}>
        <img src="/src/assets/icone_alerta.png" alt="Ícone de sucesso" className="icon" />
        <p>Deseja realmente alterar o cadastro?</p>
      </Modal>
      
      <Modal show={showModal} onClose={closeModalAlterar}>
        <img src="/src/assets/emoji-smile.png" alt="Ícone de sucesso" className="icon" />
        <p>Alteração realizada com sucesso!</p>
      </Modal>
    </div>
  );
};

export default BotaoAlterar;
