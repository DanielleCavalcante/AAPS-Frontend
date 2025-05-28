import React from 'react';
import { useNavigate } from "react-router-dom";

import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    //verifica se há histórico de páginas anteriores
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/"); // fallback para a página inicial ou qualquer outra
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <i
          id="fas-reply"
          className="fas fa-reply fa-2x"
          onClick={handleBack}
          style={{ cursor: 'pointer' }} // deixa o cursor como 'mãozinha'
        ></i>

        {/* <i className="fas fa-user-circle fa-2x"></i> -- icone de Menu*/}

      </div>
    </footer>

  );
};

export default Footer;