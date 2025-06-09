import iconeCancelar from '/src/assets/icone_cancelar.png';
import './BotaoCancelar.css';

const botaoCancelar = ({ onClick }) => {
  return (
      <button className="btn-Cancelar" onClick={onClick}>
          <img src={iconeCancelar} alt="Ícone cancelar" className="icon" />
          <span>Cancelar</span>
      </button>
  );
};

export default botaoCancelar;