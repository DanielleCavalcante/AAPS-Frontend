import React from 'react';
import './footer.css';

import { useAuth } from '../../context/AuthContext';

const Footer = () => {
  const { isAuthenticated } = useAuth(); // Acessa o estado de autenticação
    return (
      <footer className="footer">

        <div className="footer-container">
            {isAuthenticated && (
              <button className="fas fa-user-circle fa-2x"></button> 
            )}
        </div>
      </footer>
  );
};

export default Footer;
