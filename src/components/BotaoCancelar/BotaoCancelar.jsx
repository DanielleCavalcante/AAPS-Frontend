import {Link} from "react-router-dom";

import iconeCancelar from '/src/assets/icone_cancelar.png';
import './BotaoCancelar.css';

const botaoCancelar = () => {  
  
  return (
    <Link to='/home' style={{ textDecoration: 'none' }}>
      <button className="btn-Cancelar">
          <img src={iconeCancelar} alt="Ícone cancelar" className="icon" />
          <span>Cancelar</span>
      </button>
    </Link>
  );
};

export default botaoCancelar;