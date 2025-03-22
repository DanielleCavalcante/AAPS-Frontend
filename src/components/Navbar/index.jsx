import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
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
            <Link to='/'><img src="/src/assets/icone_sair.png" alt="Ícone de sair" className="icon-sair" /></Link>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
