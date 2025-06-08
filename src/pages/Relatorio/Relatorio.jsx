import React, { useState } from 'react';
import { useRelatorios } from '../../hooks/useRelatorios';
import './Relatorio.css';

const Relatorio = () => {
  const { gerarRelatorioExcel, gerarRelatorioPdf } = useRelatorios();
  const [filtro, setFiltro] = useState({ dataInicio: '', dataFim: '' });
  const [carregando, setCarregando] = useState(false);
  const [tentouEnviar, setTentouEnviar] = useState(false);

  const handleSubmitRelatorio = async (gerador) => {
    try {
      setCarregando(true);
      await gerador(filtro);
      setFiltro({ dataInicio: '', dataFim: '' });
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
    } finally {
      setCarregando(false);
    }
  };

  const handleChange = (e) => {
    setFiltro({
      ...filtro,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container-relatorio">
      <div className="dropdowns-relatorio">
        <div className="filtros">
          <div className="form-group">
            <label htmlFor="data-inicio">Data Início</label>
            <input
              type="date"
              id="dataInicio"
              name="dataInicio"
              value={filtro.dataInicio}
              onChange={handleChange}
              disabled={carregando}
            />
          </div>

          {(tentouEnviar && !dad.disponibilidade) && (
                <span className="erro-required"> O campo 'Disponibilidade' é obrigatório </span>
            )}

          <div className="form-group">
            <label>Data Final</label>
            <input
              type="date"
              id="dataFim"
              name="dataFim"
              value={filtro.dataFim}
              onChange={handleChange}
              disabled={carregando}
            />
          </div>

          <div className="form-group">
            <label htmlFor="data-fim">Tipo de Relatório</label>
            <select
                id="disponibilidade"
                name="disponibilidade"
                onChange={handleChange}
            >
                <option value=""></option>
                <option value={0}>Adoções - Geral</option>
                <option value={1}>Adoções - Por Espécie</option>
                <option value={1}>Balanço Geral</option>
                <option value={1}>Levantamento de animais adotados</option>
            </select>
          </div>
        </div>

        <button 
          type="button" 
          className="btn-relatorio" 
          onClick={() => handleSubmitRelatorio(gerarRelatorioExcel)}
          disabled={carregando}
        >
          {carregando ? 'Gerando...' : 'Gerar Relatório Excel'}
        </button>

        <button 
          type="button" 
          className="btn-relatorio" 
          onClick={() => handleSubmitRelatorio(gerarRelatorioPdf)}
          disabled={carregando}
        >
          {carregando ? 'Gerando...' : 'Gerar Relatório PDF'}
        </button>
      </div>
    </div>
  );
};

export default Relatorio;