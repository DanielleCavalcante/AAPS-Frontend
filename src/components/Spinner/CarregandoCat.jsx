import React from 'react';
import carregandoCat from '../../assets/carregando-cat.gif';
import './CarregandoCat.css'; 

const CarregandoCat = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner-content">
        <img
          src={carregandoCat}
          alt="Carregando..."
        />
{/*         <p>Carregando...</p>
 */}      </div>
    </div>
  );
};

export default CarregandoCat;