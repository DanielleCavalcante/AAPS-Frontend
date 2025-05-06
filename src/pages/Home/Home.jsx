import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth"; 

import './Home.css';
import Modal from '/src/components/Modal/Modal.jsx';

import iconeVoluntario from '../../assets/icone_voluntario.png';
import iconePontoAdocao from '../../assets/icone_pontoAdocao.png';
import iconeRelatorio from '../../assets/icone_relatorio.png';
import iconeEvento from '../../assets/icone_evento.png';
import iconeAnimal from '../../assets/icone_animal.png';
import iconeDoador from '../../assets/icone_doador.png';
import iconeAdotante from '../../assets/icone_adotante.png';
import iconeAdocao from '../../assets/icone_adocao.png';
import iconePerfil from '../../assets/icone_perfil.png';

const Home = () => {
  const { user, logout } = useAuth();
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
    <div className="home-container">
      <div className="button-grid-home">

        {user?.role === "Admin" && (
          <>
            <button className="home-button">
              <Link to='/listar-voluntarios'>
                <img src={iconeVoluntario} alt="Ícone de voluntário" className="icon" />
              </Link>
              <span>Voluntário</span>
            </button>

            <button className="home-button">
              <Link to='/listar-pontos-adocao'>
                <img src={iconePontoAdocao} alt="Ícone de ponto de adoção" className="icon" />
              </Link>
              <span>Ponto de Adoção</span>
            </button>

            <button className="home-button">
              <Link to='/relatorio'>
                <img src={iconeRelatorio} alt="Ícone de relatorio" className="icon" />
              </Link>
              <span>relatório</span>
            </button>
          </>
        )}

        <button className="home-button">
          <Link to='/listar-eventos'>
            <img src={iconeEvento} alt="Ícone de evento" className="icon" />
          </Link>
          <span>evento</span>
        </button>

        <button className="home-button">
          <Link to='/listar-animais'>
            <img src={iconeAnimal} alt="Ícone de animal" className="icon" />
          </Link>
          <span>animal</span>
        </button>

        <button className="home-button">
          <Link to='/listar-doadores'>
            <img src={iconeDoador} alt="Ícone de doador" className="icon" />
          </Link>
          <span>doador/tutor</span>
        </button>

        <button className="home-button">
          <Link to='/listar-adotantes'>
            <img src={iconeAdotante} alt="Ícone de adotante" className="icon" />
          </Link>
          <span>adotante</span>
        </button>

        <button className="home-button">
          <Link to='/listar-adocoes'>
            <img src={iconeAdocao} alt="Ícone de adocao" className="icon" />
          </Link>
          <span>adoção</span>
        </button>
      </div>

      <button className="home-button-perfil">
          <Link to='/perfil'>
            <img src={iconePerfil} alt="Ícone de perfil do usuario" className="icon" />
          </Link>
          <span>perfil</span>
        </button>
    
      {showModal && (
        <Modal show={showModal} onClose={handleSair} qtdeBotao={2} nomeBotao1="Não" nomeBotao2="Sim" onClose2={closeModal}>
          <img src="/src/assets/icone_alerta.png" alt="Ícone de alerta" className="icon" />
          <p>Deseja realmente sair?</p>
        </Modal>
      )}
    </div>
  );
};

export default Home;