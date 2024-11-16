import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {

    return (
      <div className="home-container">
        <div className="button-grid-home">
          <button className="home-button">
            <Link to='/voluntario'><img src="/src/assets/icone_voluntario.png" alt="Ícone de voluntario" className="icon" /></Link>
            <span>Voluntário</span>
          </button>
          <button className="home-button">
            <Link to='/'><img src="/src/assets/icone_pontoAdocao.png" alt="Ícone de ponto de adocao" className="icon" /></Link>
            <span>ponto de adoção</span>
          </button>
          <button className="home-button">
            <Link to='/'><img src="/src/assets/icone_relatorio.png" alt="Ícone de relatorio" className="icon" /></Link>
            <span>relatório</span>
          </button>
          <button className="home-button">
            <Link to='/'><img src="/src/assets/icone_evento.png" alt="Ícone de evento" className="icon" /></Link>
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
            <Link to='/'><img src="/src/assets/icone_adotante.png" alt="Ícone de adotante" className="icon" /></Link>
            <span>adotante</span>
          </button>
          <button className="home-button">
            <Link to='/'><img src="/src/assets/icone_adocao.png" alt="Ícone de adocao" className="icon" /></Link>
            <span>adoção</span>
          </button>
          <button className="home-button">
            <Link to='/'><img src="/src/assets/icone_perfil.png" alt="Ícone de perfil do usuario" className="icon" /></Link>
            <span>perfil</span>
          </button>
          <button className="home-button">
            <Link to='/'><img src="/src/assets/icone_sair.png" alt="Ícone para sair da aplicacao" className="icon" /></Link>
            <span>sair</span>
          </button>
        </div>
      </div>
    );
  };

export default Home;