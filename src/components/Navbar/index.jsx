import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '/src/components/Modal';
import './navbar.css';


const Navbar = () => {
  const navigate = useNavigate();

  //implementação de modal de confirmação de saída:
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleSair = () => {
    console.log("Usuário saiu!");
    closeModal();
    navigate('/'); //redireciona para a página de login.
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div id="Logotipo">
          <button className="navbar-button">
            <Link to='/Home'><img src="/src/assets/aaps_logo1.png" alt="Logotipo AAPS" className="icon-logo" /></Link>
          </button>
        </div>
        <div id='Sair'>
          <button className="navbar-button" onClick={openModal}>
            <img src="/src/assets/icone_sair.png" alt="Ícone de sair" className="icon-sair" />
          </button>
        </div>
      </div>

      {showModal && (
        <Modal show={showModal} onClose={handleSair} qtdeBotao={2} nomeBotao1="Não" nomeBotao2="Sim" onClose2={closeModal}>
          <img src="/src/assets/icone_alerta.png" alt="Ícone de alerta" className="icon" />
          <p>Deseja realmente sair?</p>
        </Modal>
      )}
    </nav>
  );
};

export default Navbar;
