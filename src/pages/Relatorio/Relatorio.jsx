import React, { useState } from 'react';
import './Relatorio.css';

const Relatorio = () => {
  const [mesSelecionado, setMesSelecionado] = useState('');
  const [anoSelecionado, setAnoSelecionado] = useState('');

  // Gera todos os 12 meses dinamicamente
  const meses = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(0, i); // mês de 0 a 11
    return {
      valor: String(i + 1).padStart(2, '0'), // "01", "02", etc.
      nome: date.toLocaleString('pt-BR', { month: 'long' })
    };
  });

  // Gera os últimos 6 anos (ex: 2025 a 2020)
  const anoAtual = new Date().getFullYear();
  const anos = Array.from({ length: 17 }, (_, i) => (2024 + i).toString());

  const handleMesChange = (e) => {
    setMesSelecionado(e.target.value);
    console.log('Mês selecionado:', e.target.value);
  };

  const handleAnoChange = (e) => {
    setAnoSelecionado(e.target.value);
    console.log('Ano selecionado:', e.target.value);
  };

  return (
    <div className="container-relatorio">
      <div className="dropdowns-relatorio">
  <div className="filtros">
    <div className="filtro-group">
      <label htmlFor="mes">Mês</label>
      <select id="mes" value={mesSelecionado} onChange={handleMesChange}>
        <option value="">Selecione o mês</option>
        {meses.map((mes) => (
          <option key={mes.valor} value={mes.valor}>
            {mes.nome.charAt(0).toUpperCase() + mes.nome.slice(1)}
          </option>
        ))}
      </select>
    </div>

    <div className="filtro-group">
      <label htmlFor="ano">Ano</label>
      <select id="ano" value={anoSelecionado} onChange={handleAnoChange}>
        <option value="">Selecione o ano</option>
        {anos.map((ano) => (
          <option key={ano} value={ano}>{ano}</option>
        ))}
      </select>
    </div>
  </div>

  <button type="submit" className="btn-relatorio">Gerar Relatório</button>
</div>

    </div>
  );
};

export default Relatorio;
