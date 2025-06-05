import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/home");
    }
  };

  const hideBackButtonRoutes = ['/home']; //Botão de retorno não aparece na tela de Menu.
  const isBackButtonVisible = !hideBackButtonRoutes.includes(location.pathname);

  return (
    <footer className="footer">
      <div className="footer-container">

        {isBackButtonVisible && (
          <i
            id="fas-reply"
            className="fas fa-reply fa-2x"
            onClick={handleBack}
            style={{ cursor: 'pointer' }}
          ></i>
        )}

      </div>
    </footer>
  );
};

export default Footer;