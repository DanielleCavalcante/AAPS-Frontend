import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

import { useAuth } from '../../context/AuthContext';

const Footer = () => {
  const { isAuthenticated } = useAuth(); // Acessa o estado de autenticação
    return (
      <footer className="footer">
        <div className="footer-container">
            {isAuthenticated && (
              <div className="footer-right">
                  <Link to="/recover-password" className="footer-link">Recuperar Senha</Link>
                  <Link to="/profile" className="footer-link">Perfil</Link>
              </div>
            )}
        </div>
      </footer>
  );
};

export default Footer;
