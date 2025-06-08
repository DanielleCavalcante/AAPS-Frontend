import Modal from '/src/components/Modal/Modal.jsx';

import iconeExcluir from "/src/assets/icone_excluir.png"
import iconeAlerta from "/src/assets/icone_alerta.png"
import iconeEmoji from "/src/assets/emoji-frown.png"
import './BotaoExcluir.css';

const BotaoExcluir = ({showModal, showConfirmModalExcluir, openModal, closeModal, closeModal2, closeModalExcluir, disabled}) => {    
    return (
      <div>
        <button 
          className={`btn-Excluir ${disabled ? 'disabled' : ''}`} 
          onClick={openModal} 
          disabled={disabled} 
          style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
        >
          <img src={iconeExcluir} alt="Ícone excluir" className="icon" /> 
          {/* <span>Excluir</span> */}
        </button>

        <Modal show={showConfirmModalExcluir} onClose={closeModal} onClose2={closeModal2} qtdeBotao={2} nomeBotao1={'Não'} nomeBotao2={'Sim'}>
          <img src={iconeAlerta} alt="Ícone de sucesso" className="icon" />
          <p>Deseja realmente inativar o cadastro?</p>
        </Modal>

        <Modal show={showModal} onClose={closeModalExcluir}>
          <img src={iconeEmoji} alt="Ícone de sucesso" className="icon" />
          <p>Cadastro inativado com sucesso!</p>
        </Modal>
      </div>
    );
};

export default BotaoExcluir;