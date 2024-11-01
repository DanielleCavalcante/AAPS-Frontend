import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {isAuthenticated && (
          <>
            <div id="Logotipo">
              <button className="navbar-button">
                <Link to='/Home'><img src="/src/assets/aaps_logo1.png" alt="Logotipo AAPS" className="icon" /></Link>
              </button>
            </div>
            <div id='Sair'>
              <button className="navbar-button">
                <Link to='/'><img src="/src/assets/icone_sair.png" alt="Ícone de sair" className="icon" /></Link>
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
