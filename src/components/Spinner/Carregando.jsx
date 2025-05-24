import React from 'react';
import carregando from '../../assets/carregando-1.svg';

import './Carregando.css';

const Carregando = () => {
  return (
    <div className="carregando-container">
      <img src={carregando} alt="Carregando" className="carregador" />
    </div>
  );
};

export default Carregando;