import Modal from '/src/components/Modal';
import './botaoExcluir.css';

const botaoExcluir = ({ showModal, showConfirmModal, openModal, closeModal, closeModal2, closeModalExcluir }) => {    
    return (
      <div>
        <button className="btn-Excluir" onClick={openModal}>
          <img src="/src/assets/icone_excluir.png" alt="Ícone excluir" className="icon" /> 
          <span>Excluir</span>
        </button>

        <Modal show={showConfirmModal} onClose={closeModal} onClose2={closeModal2} qtdeBotao={2} nomeBotao1={'Não'} nomeBotao2={'Sim'}>
          <img src="/src/assets/icone_alerta.png" alt="Ícone de sucesso" className="icon" />
          <p>Deseja realmente excluir o cadastro?</p>
        </Modal>

        <Modal show={showModal} onClose={closeModalExcluir}>
          <img src="/src/assets/emoji-frown.png" alt="Ícone de sucesso" className="icon" />
          <p>Cadastro excluído com sucesso!</p>
        </Modal>
    </div>
  );
};

export default botaoExcluir;