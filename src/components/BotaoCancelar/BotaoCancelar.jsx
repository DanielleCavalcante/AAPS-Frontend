import {Link} from "react-router-dom";

import './BotaoCancelar.css';

const botaoCancelar = () => {  
  
  return (
    <Link to='/home' style={{ textDecoration: 'none' }}>
      <button className="btn-Cancelar">
          <img src="/src/assets/icone_cancelar.png" alt="Ícone cancelar" className="icon" />
          <span>Cancelar</span>
      </button>
    </Link>
  );
};

export default botaoCancelar;