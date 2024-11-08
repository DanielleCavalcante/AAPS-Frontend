import Modal from '/src/components/Modal';
import './botaoExcluir.css';

const botaoExcluir = ({ showModal, openModal, closeModal }) => {    
    return (
      <div>
        <button className="btn-Excluir" onClick={openModal}>Excluir</button>

        <Modal show={showModal} onClose={closeModal}>
          <img src="/src/assets/emoji-frown.png" alt="Ícone de sucesso" className="icon" />
          <p>Cadastro excluído com sucesso!</p>
        </Modal>
    </div>
  );
};

export default botaoExcluir;