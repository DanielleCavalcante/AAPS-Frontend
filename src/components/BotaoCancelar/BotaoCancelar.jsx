import {Link} from "react-router-dom";

import './BotaoCancelar.css';

const botaoCancelar = ({ onClick }) => {
  return (
    <button className="btn-Cancelar" onClick={onClick}>
      <img src="/src/assets/icone_cancelar.png" alt="Ícone cancelar" className="icon" />
      <span>Cancelar</span>
    </button>
  );
};

export default botaoCancelar;