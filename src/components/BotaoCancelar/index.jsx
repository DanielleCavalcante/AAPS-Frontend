import React from 'react';
import { useNavigate } from 'react-router-dom';

import './botaoCancelar.css';

const botaoCancelar = () => {  
  
  const navigate = useNavigate();

  const cancelar= (e) => {
    e.preventDefault();
    navigate('/home');
  };
  
    return (
    <button className="btn-Cancelar" onClick={cancelar}>
        <span>Cancelar</span>
    </button>
  );
};

export default botaoCancelar;