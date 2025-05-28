import React, { useState } from 'react';
import './Relatorio.css';

const Relatorio = () => {
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const handleGerarRelatorio = () => {
    console.log('Data início:', dataInicio);
    console.log('Data final:', dataFim);
    // Aqui você pode adicionar a lógica para gerar o relatório
  };

  return (
    <div className="container-relatorio">
      <div className="dropdowns-relatorio">
        <div className="filtros">
          <div className="form-group">
            <label htmlFor="data-inicio">Data Início</label>
            <input
              type="date"
              id="data-inicio"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="data-fim">Data Final</label>
            <input
              type="date"
              id="data-fim"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
            />
          </div>
        </div>

        <button type="button" className="btn-relatorio" onClick={handleGerarRelatorio}>
          Gerar Relatório
        </button>
      </div>
    </div>
  );
};

export default Relatorio;
