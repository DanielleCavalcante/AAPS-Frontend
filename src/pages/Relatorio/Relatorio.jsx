import React, { useEffect, useState } from 'react';
import { useRelatorios } from '../../hooks/useRelatorios';
import { useLoading } from '../../hooks/useLoading';
import CarregandoCat from '../../components/Spinner/CarregandoCat';
import './Relatorio.css';

const Relatorio = () => {
  const { obterDadosRelatorio, gerarRelatorioExcel, gerarRelatorioPdf } = useRelatorios();
  const { carregando, iniciarCarregamento, finalizarCarregamento } = useLoading();

  const [carregandoExportar, setCarregandoExportar] = useState(false);

  const [filtro, setFiltro] = useState({ dataInicio: '', dataFim: '', tipo: '' });
  const [tentouEnviar, setTentouEnviar] = useState(false);
  const [relatorios, setRelatorios] = useState([]);

  useEffect(() => {
    const { dataInicio, dataFim } = filtro;
    if (!dataInicio || !dataFim) {
      setRelatorios([]);
      return;
    }

    const fetchRelatorios = async () => {
      iniciarCarregamento();
      try {
        const dados = await obterDadosRelatorio(filtro);
        setRelatorios(dados || []);
      } finally {
        finalizarCarregamento();
      }
    };

    fetchRelatorios();
  }, [filtro.dataInicio, filtro.dataFim, filtro.tipo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltro((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (gerador) => {
    setTentouEnviar(true);
    if (!filtro.dataInicio || !filtro.dataFim) return;

    setCarregandoExportar(true);
    try {
      await gerador(filtro);
    } catch (err) {
      console.error(err);
    } finally {
      setCarregandoExportar(false);
    }
  };

  const relatoriosFiltrados = filtro.tipo
    ? relatorios.filter((r) => r.titulo.includes(getTituloDoTipo(filtro.tipo)))
    : relatorios;

  return (
    <div className="container-relatorio">
      <div className="dropdowns-relatorio">
        <div className="filtros">
          <div className="form-group">
            <label>Data Início *</label>
            <input type="date" name="dataInicio" value={filtro.dataInicio} onChange={handleChange} disabled={carregando}/>
            {tentouEnviar && !filtro.dataInicio && <span className="erro-required">Informe a data de início</span>}
          </div>
          <div className="form-group">
            <label>Data Final *</label>
            <input type="date" name="dataFim" value={filtro.dataFim} onChange={handleChange} disabled={carregando}/>
            {tentouEnviar && !filtro.dataFim && <span className="erro-required">Informe a data de fim</span>}
          </div>
          <div className="form-group">
            <label>Tipo (opcional)</label>
            <select name="tipo" value={filtro.tipo} onChange={handleChange} disabled={carregando}>
              <option value="">Todos</option>
              <option value="0">Adoções - Geral</option>
              <option value="1">Adoções - Por Espécie</option>
              <option value="2">Balanço Geral</option>
              <option value="3">Levantamento de animais adotados</option>
            </select>
          </div>
        </div>
        <div className="botoes-geracao">
          <button disabled={carregando} onClick={() => handleSubmit(gerarRelatorioExcel)}>
            {/* {carregando ? 'Gerando...' : 'Exportar como Excel'} */}
            Exportar como Excel
          </button>
          <button disabled={carregando} onClick={() => handleSubmit(gerarRelatorioPdf)}>
            {/* {carregando ? 'Gerando...' : 'Exportar como PDF'} */}
            Exportar como PDF
          </button>
        </div>
      </div>

      {carregandoExportar && <CarregandoCat />}

      {carregando && <div className="spinner">Carregando...</div>}

      {!carregando && relatoriosFiltrados.length > 0 && (
        <div className="grid-tabelas">
          {relatoriosFiltrados.map((r, i, arr) => {
            const ehLevantamento = r.titulo.includes('Levantamento');
            const ehUnicaTabela = arr.length === 1;
            const saoApenasAdocoes = arr.length === 2 &&
              arr.every(t => t.titulo.includes('Adoções'));

            const larguraTotal = ehLevantamento || ehUnicaTabela || (!saoApenasAdocoes && arr.length === 1);

            return (
              <TabelaRelatorio
                key={i}
                {...r}
                larguraTotal={larguraTotal}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

const getTituloDoTipo = (tipo) => {
  switch (tipo) {
    case '0': return 'Adoções - Geral';
    case '1': return 'Adoções - Por Espécie';
    case '2': return 'Balanço Mensal';
    case '3': return 'Levantamento de Animais';
    default: return '';
  }
};

const TabelaRelatorio = ({ titulo, colunas, linhas, larguraTotal }) => (
  <div className={`tabela-relatorio ${larguraTotal ? 'largura-total' : ''}`}>
    <h4>{titulo}</h4>
    {linhas.length === 0
      ? <p>Nenhum dado para este filtro.</p>
      : (
        <table>
          <thead>
            <tr>{colunas.map((c, i) => <th key={i}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {linhas.map((l, i) => (
              <tr key={i}>
                {colunas.map((c, j) => <td key={j}>{l[c]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      )}
  </div>
);

export default Relatorio;
