import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './home.css';
import Modal from '/src/components/Modal';

const Home = () => {
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
          <button className="home-button">
            <Link to='/voluntario'><img src="/src/assets/icone_voluntario.png" alt="Ícone de voluntario" className="icon" /></Link>
            <span>Voluntário</span>
          </button>
          <button className="home-button">
            <Link to='/ponto-adocao'><img src="/src/assets/icone_pontoAdocao.png" alt="Ícone de ponto de adocao" className="icon" /></Link>
            <span>ponto de adoção</span>
          </button>
          <button className="home-button">
            <Link to='/'><img src="/src/assets/icone_relatorio.png" alt="Ícone de relatorio" className="icon" /></Link>
            <span>relatório</span>
          </button>
          <button className="home-button">
            <Link to='/evento'><img src="/src/assets/icone_evento.png" alt="Ícone de evento" className="icon" /></Link>
            <span>evento</span>
          </button>
          <button className="home-button">
            <Link to='/animal'><img src="/src/assets/icone_animal.png" alt="Ícone de animal" className="icon" /></Link>
            <span>animal</span>
          </button>
          <button className="home-button">
            <Link to='/doador'><img src="/src/assets/icone_doador.png" alt="Ícone de doador" className="icon" /></Link>
            <span>doador/tutor</span>
          </button>
          <button className="home-button">
            <Link to='/adotante'><img src="/src/assets/icone_adotante.png" alt="Ícone de adotante" className="icon" /></Link>
            <span>adotante</span>
          </button>
          <button className="home-button">
            <Link to='/adocao'><img src="/src/assets/icone_adocao.png" alt="Ícone de adocao" className="icon" /></Link>
            <span>adoção</span>
          </button>
          <button className="home-button">
            <Link to='/perfil'><img src="/src/assets/icone_perfil.png" alt="Ícone de perfil do usuario" className="icon" /></Link>
            <span>perfil</span>
          </button>
          <button className="home-button" onClick={openModal}>
            <img src="/src/assets/icone_sair.png" alt="Ícone para sair da aplicacao" className="icon" />
            <span>sair</span>
          </button>
        </div>

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