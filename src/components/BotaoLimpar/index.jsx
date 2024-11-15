import React from 'react';
import './botaoLimpar.css';

const BotaoLimpar = ({ disabled }) => {    
    return (
      <button 
        className={`btn-Limpar ${disabled ? 'disabled' : ''}`} 
        disabled={disabled} 
        style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
      >
        <img src="/src/assets/icone_limpar.png" alt="Ícone limpar" className="icon" /> 
        <span>Limpar</span>
      </button>
    );
};

export default BotaoLimpar;
