import React from 'react';
import './home.css';

/* const Home = () => {
    return (
        <div className="login-container">
            <h1>Bem-vindo!</h1>
        </div>
    );
}; */

const Home = () => {
    return (
      <div className="home-container">
        <div className="button-grid">
          <button className="home-button">
            <i className="fas fa-user fa-2x"></i> {/* Ícone de voluntária */}
            <span>voluntária</span>
          </button>
          <button className="home-button">
            <i className="fas fa-map-marker-alt fa-2x"></i> {/* Ícone de ponto de adoção */}
            <span>ponto de adoção</span>
          </button>
          <button className="home-button">
            <i className="fas fa-chart-line fa-2x"></i> {/* Ícone de relatório */}
            <span>relatório</span>
          </button>
          <button className="home-button">
            <i className="fas fa-calendar-alt fa-2x"></i> {/* Ícone de evento */}
            <span>evento</span>
          </button>
          <button className="home-button">
            <i className="fas fa-paw fa-2x"></i> {/* Ícone de animal */}
            <span>animal</span>
          </button>
          <button className="home-button">
            <i className="fas fa-user-friends fa-2x"></i> {/* Ícone de doador/tutor */}
            <span>doador/tutor</span>
          </button>
          <button className="home-button">
            <i className="fas fa-user fa-2x"></i> {/* Ícone de adotante */}
            <span>adotante</span>
          </button>
          <button className="home-button">
            <i className="fas fa-heart fa-2x"></i> {/* Ícone de adoção */}
            <span>adoção</span>
          </button>
          <button className="home-button">
            <i className="fas fa-user-circle fa-2x"></i> {/* Ícone de perfil */}
            <span>perfil</span>
          </button>
          <button className="home-button">
            <i className="fas fa-sign-out-alt fa-2x"></i> {/* Ícone de sair */}
            <span>sair</span>
          </button>
        </div>
      </div>
    );
  };

export default Home;