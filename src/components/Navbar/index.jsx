import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

import './navbar.css';

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div id="Logotipo">
          <button className="navbar-button">
            <Link to='/Home'><img src="/src/assets/aaps_logo1.png" alt="Logotipo AAPS" className="icon-logo" /></Link>
          </button>
        </div>
        <div id='Sair'>
          <button className="navbar-button">
            <Link to='/'><img src="/src/assets/icone_sair.png" alt="Ícone de sair" className="icon-sair" onClick={logout}/></Link>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
