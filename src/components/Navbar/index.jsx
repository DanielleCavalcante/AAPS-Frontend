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
                <Link to="/" className="navbar-link">Sair</Link>
              </div>
            </>
          )}
        </div>
      </nav>
    );
};

export default Navbar;
