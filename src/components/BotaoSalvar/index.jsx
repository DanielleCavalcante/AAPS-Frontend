import './botaoSalvar.css';
import Modal from '/src/components/Modal';

const botaoSalvar = ({showModal, openModal, closeModal}) => { 

  return (
    
    <div>
      <button className="btn-Salvar" onClick={openModal}>
        <img src="/src/assets/icone_salvar.png" alt="Ícone salvar" className="icon" />
        <span>Salvar</span>
      </button>

      <Modal show={showModal} onClose={closeModal}>
        <img src="/src/assets/emoji-smile.png" alt="Ícone de sucesso" className="icon" />
        <p>Cadastro realizado com sucesso!</p>
      </Modal>
    </div>
  );
};

export default botaoSalvar;