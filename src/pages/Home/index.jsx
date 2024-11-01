import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {

    const navigate = useNavigate();

    return (
      <div className="home-container">
        <div className="button-grid">
          <button className="home-button">
            <Link to='/Voluntario'><img src="/src/assets/icone_voluntario.png" alt="Ícone de adocao" className="icon" /></Link>
            <span>voluntária</span>
          </button>
          <button className="home-button">
            <Link to='/'><img src="/src/assets/icone_pontoAdocao.png" alt="Ícone de ponto de adocao" className="icon" /></Link>
            {/* <i className="fas fa-map-marker-alt fa-2x"></i> Ícone de ponto de adoção */}
            <span>ponto de adoção</span>
          </button>
          <button className="home-button">
            <Link to='/'><img src="/src/assets/icone_relatorio.png" alt="Ícone de relatorio" className="icon" /></Link>
            {/* <i className="fas fa-chart-line fa-2x"></i> Ícone de relatório */}
            <span>relatório</span>
          </button>
          <button className="home-button">
            <Link to='/'><img src="/src/assets/icone_evento.png" alt="Ícone de evento" className="icon" /></Link>
            {/* <i className="fas fa-calendar-alt fa-2x"></i> Ícone de evento */}
            <span>evento</span>
          </button>
          <button className="home-button">
            <Link to='/'><img src="/src/assets/icone_animal.png" alt="Ícone de animal" className="icon" /></Link>
            {/* <i className="fas fa-paw fa-2x"></i> Ícone de animal */}
            <span>animal</span>
          </button>
          <button className="home-button">
            <Link to='/'><img src="/src/assets/icone_doador.png" alt="Ícone de doador" className="icon" /></Link>
            {/* <i className="fas fa-user-friends fa-2x"></i> Ícone de doador/tutor */}
            <span>doador/tutor</span>
          </button>
          <button className="home-button">
            <Link to='/'><img src="/src/assets/icone_adotante.png" alt="Ícone de adotante" className="icon" /></Link>
            {/* <i className="fas fa-user fa-2x"></i> Ícone de adotante */}
            <span>adotante</span>
          </button>
          <button className="home-button">
            <Link to='/'><img src="/src/assets/icone_adocao.png" alt="Ícone de adocao" className="icon" /></Link>
            {/* <i className="fas fa-heart fa-2x"></i> Ícone de adoção */}
            <span>adoção</span>
          </button>
          <button className="home-button">
            <Link to='/'><img src="/src/assets/icone_perfil.png" alt="Ícone de perfil do usuario" className="icon" /></Link>
            {/* <i className="fas fa-user-circle fa-2x"></i> Ícone de perfil */}
            <span>perfil</span>
          </button>
          <button className="home-button">
            <Link to='/'><img src="/src/assets/icone_sair.png" alt="Ícone para sair da aplicacao" className="icon" /></Link>
            {/* <i className="fas fa-sign-out-alt fa-2x"></i> Ícone de sair */}
            <span>sair</span>
          </button>
        </div>
      </div>
    );
  };

export default Home;