import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* <h1 className="navbar-title">Nome da Tela</h1> */}
        <div className="navbar-right">
          <Link to="/" className="navbar-link">Sair</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
