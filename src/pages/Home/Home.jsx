import React from 'react';
import { Link } from 'react-router-dom';
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
import iconeSair from '../../assets/icone_sair.png';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="home-container">
      <div className="button-grid-home">

        {user?.role === "Admin" && (
          <>
            <button className="home-button">
              <Link to='/voluntario'>
                <img src={iconeVoluntario} alt="Ícone de voluntário" className="icon" />
              </Link>
              <span>Voluntário</span>
            </button>

            <button className="home-button">
              <Link to='/ponto-adocao'>
                <img src={iconePontoAdocao} alt="Ícone de ponto de adoção" className="icon" />
              </Link>
              <span>Ponto de Adoção</span>
            </button>

            <button className="home-button">
              <Link to='/relatorio'>
                <img src="/src/assets/icone_relatorio.png" alt="Ícone de relatorio" className="icon" />
              </Link>
              <span>relatório</span>
            </button>
          </>
        )}

        <button className="home-button">
          <Link to='/evento'>
            <img src="/src/assets/icone_evento.png" alt="Ícone de evento" className="icon" />
          </Link>
          <span>evento</span>
        </button>

        <button className="home-button">
          <Link to='/animal'>
            <img src="/src/assets/icone_animal.png" alt="Ícone de animal" className="icon" />
          </Link>
          <span>animal</span>
        </button>

        <button className="home-button">
          <Link to='/doador'>
            <img src="/src/assets/icone_doador.png" alt="Ícone de doador" className="icon" />
          </Link>
          <span>doador/tutor</span>
        </button>

        <button className="home-button">
          <Link to='/adotante'>
            <img src="/src/assets/icone_adotante.png" alt="Ícone de adotante" className="icon" />
          </Link>
          <span>adotante</span>
        </button>

        <button className="home-button">
          <Link to='/adocao'>
            <img src="/src/assets/icone_adocao.png" alt="Ícone de adocao" className="icon" />
          </Link>
          <span>adoção</span>
        </button>

        <button className="home-button">
          <Link to='/perfil'>
            <img src="/src/assets/icone_perfil.png" alt="Ícone de perfil do usuario" className="icon" />
          </Link>
          <span>perfil</span>
        </button>

        <button className="home-button" onClick={logout}>
          <img src={iconeSair} alt="Ícone para sair da aplicação" className="icon" />
          <span>Sair</span>
        </button>

      </div>
    </div>
  );
};

export default Home;