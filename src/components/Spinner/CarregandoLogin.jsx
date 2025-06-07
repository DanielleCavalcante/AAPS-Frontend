import React from 'react';
import carregandoLogin from '../../assets/carregando-login1.svg';

import './CarregandoLogin.css';

const CarregandoLogin = () => (
  <div className="carregando-login-container">
    <img src={carregandoLogin} alt="Carregando login" className="carregador-login" />
  </div>
);

export default CarregandoLogin;