import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Navbar.css';
// import Modal from '/src/components/Modal';
import Modal from "../Modal/Modal";
import { useLocation } from 'react-router-dom';



const Navbar = () => {
  const { logout } = useAuth();

  const navigate = useNavigate();

  //implementação de modal de confirmação de saída:
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleSair = () => {
    setShowModal(false);
    logout();
    closeModal();
    navigate('/');
  };

  const location = useLocation();

  const getTituloEIcone = () => {
    switch (location.pathname) {
      case '/home':
        return { titulo: 'Página Inicial', icone: 'fas fa-home' };
      case '/listar-animais':
        return { titulo: 'Lista de Animais', icone: 'fas fa-dog' };
      case '/cadastrar-animal':
        return { titulo: 'Cadastrar Animal', icone: 'fas fa-paw' };
      case `/visualizar-animal/${location.pathname.split('/')[2]}`:
        return { titulo: 'Detalhes do Animal', icone: 'fas fa-eye' };

      case '/listar-doadores':
        return { titulo: 'Lista de Doadores', icone: 'fas fa-hand-holding-heart' };
      case '/cadastrar-doador':
        return { titulo: 'Cadastrar Doador', icone: 'fas fa-user-plus' };
      case `/visualizar-doador/${location.pathname.split('/')[2]}`:
        return { titulo: 'Detalhes do Doador', icone: 'fas fa-user' };

      case '/listar-eventos':
        return { titulo: 'Lista de Procedimentos', icone: 'fas fa-list' };
      case '/cadastrar-evento':
        return { titulo: 'Cadastrar Procedimento', icone: 'fas fa-notes-medical' };
      case `/visualizar-evento/${location.pathname.split('/')[2]}`:
        return { titulo: 'Detalhes do Procedimento', icone: 'fas fa-file-alt' };

      case '/listar-adotantes':
        return { titulo: 'Lista de Adotantes', icone: 'fas fa-users' };
      case '/cadastrar-adotante':
        return { titulo: 'Cadastrar Adotante', icone: 'fas fa-user-plus' };
      case `/visualizar-adotante/${location.pathname.split('/')[2]}`:
        return { titulo: 'Detalhes do Adotante', icone: 'fas fa-user' };

      case '/listar-adocoes':
        return { titulo: 'Lista de Adoções', icone: 'fas fa-clipboard-list' };
      case '/cadastrar-adocao':
        return { titulo: 'Cadastrar Adoção', icone: 'fas fa-handshake' };
      case `/visualizar-adocao/${location.pathname.split('/')[2]}`:
        return { titulo: 'Detalhes da Adoção', icone: 'fas fa-info-circle' };

      case `/perfil/${location.pathname.split('/')[2]}`:
        return { titulo: 'Perfil do Usuário', icone: 'fas fa-user' };
      case `/alterar-senha/${location.pathname.split('/')[2]}`:
        return { titulo: 'Alterar Senha', icone: 'fas fa-key' };

      case '/listar-voluntarios':
        return { titulo: 'Lista de Voluntários', icone: 'fas fa-hands-helping' };
      case '/cadastrar-voluntario':
        return { titulo: 'Cadastrar Voluntário', icone: 'fas fa-user-plus' };
      case `/visualizar-voluntario/${location.pathname.split('/')[2]}`:
        return { titulo: 'Detalhes do Voluntário', icone: 'fas fa-user' };

      case '/listar-pontos-adocao':
        return { titulo: 'Lista de Pontos de Adoção', icone: 'fas fa-map-marker-alt' };
      case '/cadastrar-ponto-adocao':
        return { titulo: 'Cadastrar Ponto de Adoção', icone: 'fas fa-plus-circle' };
      case `/visualizar-ponto-adocao/${location.pathname.split('/')[2]}`:
        return { titulo: 'Detalhes do Ponto de Adoção', icone: 'fas fa-map-pin' };

      case '/esqueci-senha':
        return { titulo: 'Recuperar Senha', icone: 'fas fa-unlock' };
      case '/esqueci-senha-celular':
        return { titulo: 'Código por Celular', icone: 'fas fa-mobile-alt' };
      case '/redefinir-senha-celular':
        return { titulo: 'Redefinir Senha', icone: 'fas fa-sync-alt' };
      case '/esqueci-senha-admin':
        return { titulo: 'Recuperar Senha (Admin)', icone: 'fas fa-user-shield' };

      case '/relatorio':
        return { titulo: 'Relatório', icone: 'fas fa-file-alt' };

      case '/acompanhamento':
        return { titulo: 'Acompanhamento', icone: 'fas fa-clipboard-list' };



      default:
        return { titulo: 'Sistema AAPS', icone: 'fas fa-paw' };
    }
  };

  const { titulo, icone } = getTituloEIcone();


  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div id="Logotipo">

          <div className="navbar-center">
            <i className={`${icone} navbar-page-icon`}></i>
            <span className="navbar-page-title">{titulo}</span>
          </div>


          <button className="navbar-button">
            <Link to='/Home'><img src="/src/assets/aaps_logo1.png" alt="Logotipo AAPS" className="icon-logo" /></Link>
          </button>
        </div>
        <div id='Sair'>
          <button className="navbar-button" onClick={openModal}>
            {/*  <img src="/src/assets/icone_sair.png" alt="Ícone de sair" className="icon-sair" />*/}
            <i className="fas fa-door-open fa-2x"></i>
            {/* <img src="/src/assets/icone_sair.png" alt="Ícone de sair" className="icon-sair" onClick={logout}/> */}
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