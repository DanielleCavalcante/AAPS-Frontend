import React from 'react';
import './botaoLimpar.css';

const botaoLimpar = () => {    
    return (
    <button className="btn-Limpar">
        <img src="/src/assets/icone_limpar.png" alt="Ícone limpar" className="icon" /> 
        <span>Limpar</span>
    </button>
  );
};

export default botaoLimpar;