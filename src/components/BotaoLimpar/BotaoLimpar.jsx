import React from 'react';

import iconeLimpar from "/src/assets/icone_limpar.png"
import './BotaoLimpar.css';

const BotaoLimpar = ({ disabled, onClick }) => {    
    return (
      <button 
        type="button"
        className={`btn-Limpar ${disabled ? 'disabled' : ''}`} 
        disabled={disabled} 
        style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
        onClick={onClick}
      >
        <img src={iconeLimpar} alt="Ícone limpar" className="icon" /> 
        <span>Limpar</span>
      </button>
    );
};

export default BotaoLimpar;