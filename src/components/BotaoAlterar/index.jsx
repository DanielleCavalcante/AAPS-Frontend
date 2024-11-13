import Modal from '/src/components/Modal';
import './botaoAlterar.css';

const botaoAlterar = ({ showModal, openModal, closeModal }) => {
  return (
    <div>
      <button className="btn-Alterar" onClick={openModal}>
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

export default botaoAlterar;