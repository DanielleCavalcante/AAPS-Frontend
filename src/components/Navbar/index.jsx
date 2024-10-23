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
              <div className="navbar-right">
                {/* <Link to="/" className="navbar-link">Sair</Link> */}

                <button className="navbar-button">
                  <Link to="/"><i className="fas fa-sign-out-alt fa-2x"></i></Link> {/* Ícone de sair*/}
                </button>
              </div>
            </>
          )}
        </div>
      </nav>
    );
};

export default Navbar;
