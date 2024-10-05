import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-right">
          <Link to="/recover-password" className="footer-link">Recuperar Senha</Link>
          <Link to="/profile" className="footer-link">Perfil</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
