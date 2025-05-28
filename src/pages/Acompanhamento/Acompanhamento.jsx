import React, { useState } from 'react';
import './Acompanhamento.css';

const Acompanhamento = () => {
    // Estado para os eventos de acompanhamento
    const [eventos, setEventos] = useState([]);

    // Estado dos campos do formulário
    const [codigo, setCodigo] = useState('');
    const [descricaoEvento, setDescricaoEvento] = useState('');
    const [data, setData] = useState('');
    const [observacao, setObservacao] = useState('');

    // Função para adicionar evento
    const adicionarEvento = () => {
        if (!codigo || !descricaoEvento || !data) {
            alert('Preencha todos os campos obrigatórios: Código, Evento e Data.');
            return;
        }

        const novoEvento = {
            id: codigo,
            evento: descricaoEvento,
            data,
            observacao
        };

        setEventos([...eventos, novoEvento]);

        // Limpar campos
        setCodigo('');
        setDescricaoEvento('');
        setData('');
        setObservacao('');
    };

    // Função para excluir evento
    const handleExcluir = (id) => {
        const eventosAtualizados = eventos.filter(evento => evento.id !== id);
        setEventos(eventosAtualizados);
    };

    return (
        <div className="container-acompanhamento">
            <form className="acompanhamento-form">

                <div className='cadastroAcompanhamento-linha1'>
                    <div className="form-group">
                        <label htmlFor="codigo">Código</label>
                        <input
                            type="text"
                            id="codigo"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="Evento">Evento</label>
                        <select
                            id="Evento"
                            value={descricaoEvento}
                            onChange={(e) => setDescricaoEvento(e.target.value)}
                        >
                            <option value="">Selecione um evento</option>
                            <option value="Vacinação">Vacinado</option>
                            <option value="Consulta">Castrado</option>
                            <option value="Cirurgia">Vermifugad</option>
                            {/* Adicione outras opções conforme necessidade */}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="data">Data</label>
                        <input
                            type="date"
                            id="data"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                        />
                    </div>
                </div>

                <textarea
                    name="observacaoAcompanhamento"
                    id="observacaoAcompanhamento"
                    placeholder="Observação sobre o acompanhamento"
                    value={observacao}
                    onChange={(e) => setObservacao(e.target.value)}
                />

                <div className="button-wrapper">
                    <button
                        type="button"
                        className="button-adicionar-evento"
                        onClick={adicionarEvento}
                    >
                        <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>
                        Adicionar Evento
                    </button>
                </div>



                <div id="group">
                    <div className="form-group">
                        <label htmlFor="acompanhamento">Acompanhamento</label>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Evento</th>
                                    <th>Data</th>
                                    <th>Observação</th>
                                    <th>Excluir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eventos.length === 0 && (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center' }}>Nenhum evento cadastrado.</td>
                                    </tr>
                                )}
                                {eventos.map(evento => (
                                    <tr key={evento.id}>
                                        <td>{evento.id}</td>
                                        <td>{evento.evento}</td>
                                        <td>{evento.data}</td>
                                        <td>{evento.observacao}</td>
                                        <td>
                                            <button
                                                className="delete-button"
                                                onClick={() => handleExcluir(evento.id)}
                                                title="Excluir evento"
                                            >
                                                <img src={iconeExcluir} alt="Ícone de excluir" className="icon" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Acompanhamento;
