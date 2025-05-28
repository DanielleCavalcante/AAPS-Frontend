import React, { useState } from 'react';
import './Acompanhamento.css';

const Acompanhamento = () => {

return (
    <div className="container-acompanhamento">

        <div id="group">
            <div className="form-group">
                <label htmlFor="id" >Código</label>
                <input
                    type="text"
                    id="codigo"
                    disabled
                />
            </div>

            <div className="form-group">
                <label>Data</label>
                <input
                    type="date"
                    id="data"
                    value={dadosAdocao.data}
                    onChange={handleChange}
                    placeholder="Digite a data da adoção"
                />

                {(tentouEnviar && !dadosAdocao.data) && (
                    <span className="erro-required"> O campo 'Data' é obrigatório </span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="nomeVoluntario">Voluntário</label>
                <select
                    type="text"
                    id="nomeVoluntario"
                    value={dadosAdocao.voluntarioId}
                    onChange={handleVoluntarioChange}
                >
                    <option value="">Selecione um voluntário</option>
                    {voluntarios.map((vol) => (
                        <option key={vol.id} value={vol.id}>
                            {vol.nome}
                        </option>
                    ))}
                </select>
            </div>
        </div>

        <textarea
            name="observacaoAcompanhamento"
            id="observacaoAcompanhamento"
            placeholder="Observação sobre o acompanhamento"
            value={dadosAdotante.observacaoBloqueio}
            onChange={handleChange}
        />

        <button type="submit" className="btn-relatorio">Gerar Relatório</button>

                <div id="group">
            <div className="form-group">
<label htmlFor="acompanhamento">Acompanhamento</label>
                    <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>RG</th>
                        <th>Status</th>
                        <th>Bloqueado</th>
                        <th>Ver</th>
                    </tr>
                </thead>
                <tbody>
                    {erro ? (
                        <tr>
                            <td colSpan="4" className="erro" style={{ textAlign: 'center', height: '20vh' }}>
                                {erro}
                            </td>
                        </tr>
                    ) : carregando ? (
                        <tr>
                            <td colSpan="4">
                                <Carregando />
                            </td>
                        </tr>
                    ) :  ( adotantes.map((adotante) => (
                        <tr key={adotante.id}>
                            <td>{adotante.id}</td>
                            <td>{adotante.nome}</td>
                            <td>{adotante.cpf}</td>
                            <td>{adotante.rg}</td>
                            <td>{adotante.status === 1 ? 'Ativo' : 'Inativo'}</td>
                            <td>{adotante.bloqueio === 1 ? 'Sim' : 'Não'}</td>
                            <td>
                                <Link to={`/visualizar-adotante/${adotante.id}`}>
                                    <button className="search-button-adotante">
                                        <img src={iconeBusca} alt="Ícone de busca" className="icon" />
                                    </button>
                                </Link>
                                <button className="delete-button" onClick={() => {handleExcluir(adotante.id)}}>
                                    <img src={iconeExcluir} alt="Ícone de excluir" className="icon" />
                                </button>

                            </td>
                        </tr>
                        ))
                    )}
                </tbody>
            </table>
            </div>
            </div>

    </div>
);

};

export default Acompanhamento;
