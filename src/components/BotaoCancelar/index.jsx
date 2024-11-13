import './botaoCancelar.css';
import {Link} from "react-router-dom";

const botaoCancelar = () => {  
  
  return (
    <Link to='/home' style={{ textDecoration: 'none' }}>
      <button className="btn-Cancelar">
          <span>Cancelar</span>
      </button>
    </Link>
  );
};

export default botaoCancelar;