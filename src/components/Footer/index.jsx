import React from 'react';
import './footer.css';

import { useAuth } from '../../context/AuthContext';

const Footer = () => {
  const { isAuthenticated } = useAuth(); // Acessa o estado de autenticação
    return (
      <footer className="footer">
        <div className="footer-container">
            {isAuthenticated && (
              <i className="fas fa-user-circle fa-2x"></i> 
              // <div className="footer-right">
              //     {/* <Link to="/recover-password" className="footer-link">Recuperar Senha</Link> */}
              //     {/* <Link to="/profile" className="footer-link">Perfil</Link> */}

              //     <button className="footer-button">
              //     </button>
              // </div>
            )}
        </div>
      </footer>
  );
};

export default Footer;
