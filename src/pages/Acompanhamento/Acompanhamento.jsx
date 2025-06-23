import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";

import { useAcompanhamentos } from '../../hooks/useAcompanhamentos';
import { useEventos } from '../../hooks/useEventos';
import { useError } from '../../hooks/useError';
import { useLoading } from '../../hooks/useLoading';

import iconeExcluir from '/src/assets/icone_excluir.png';
import Carregando from '../../components/Spinner/Carregando';
import './Acompanhamento.css';

const Acompanhamento = () => {
    const { id } = useParams();

    const { criarAcompanhamento, listarAcompanhamentosPorAnimalId, excluirAcompanhamento } = useAcompanhamentos();
    const { listarEventosAtivos } = useEventos();

    const { erro, limparErro } = useError();
    const [tentouEnviar, setTentouEnviar] = useState(false);

    const [dadosAcompanhamento, setDadosAcompanhamento] = useState({
        eventoId: '',
        descricaoEvento: '',
        data: '',
        observacao: ''
    });
    const [eventos, setEventos] = useState([]);

    const [acompanhamentos, setAcompanhamentos] = useState([]);

    const { carregando, iniciarCarregamento, finalizarCarregamento } = useLoading();
    const [dadosCarregados, setDadosCarregados] = useState(false);

    const camposObrigatorios =
        dadosAcompanhamento.eventoId &&
        dadosAcompanhamento.descricaoEvento &&
        dadosAcompanhamento.data;

    useEffect(() => {
        const fetchEventos = async () => {
            const eventosData = await listarEventosAtivos();
            setEventos(eventosData);
        };

        const carregarDados = async () => {
            iniciarCarregamento();
            limparErro();
            const dados = await listarAcompanhamentosPorAnimalId(Number(id));
            setAcompanhamentos(dados || []);
            finalizarCarregamento();
            setDadosCarregados(true);
        };

        fetchEventos();
        carregarDados();
    }, []);

    const carregarDados = async () => {
        iniciarCarregamento();
        limparErro();
        const dados = await listarAcompanhamentosPorAnimalId(Number(id));
        setAcompanhamentos(dados || []);
        finalizarCarregamento();
        setDadosCarregados(true);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        limparErro();

        setDadosAcompanhamento({
            ...dadosAcompanhamento,
            [id]: ['eventoId'].includes(id) ? Number(value) : value
        });

        if (id === "eventoId"){
            const eventoSelecionado = eventos.find(e => e.id === Number(value));
            if (eventoSelecionado) {
                setDadosAcompanhamento(prevState => ({
                    ...prevState,
                    descricaoEvento: eventoSelecionado.descricao ? eventoSelecionado.descricao : '',
                }));
            }
        }
    };

    const handleEventoChange = (e) => {
        const eventoId = e.target.value;
        const eventoSelecionado = eventos.find(e => e.id === Number(eventoId));

        setDadosAcompanhamento({
            ...dadosAcompanhamento,
            eventoId,
            descricaoEvento: eventoSelecionado.descricao ? eventoSelecionado.descricao : ''
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setTentouEnviar(true); 
        limparErro();
        try {
            await criarAcompanhamento({
                ...dadosAcompanhamento,
                animalId: Number(id)
            });
            setDadosAcompanhamento({
                data: '',
                observacao: '',
                eventoId: '',
                descricaoEvento: ''
            });
            setTentouEnviar(false)
            await carregarDados(); 
        } catch (error) {
            tratarErro(error);
        }
    };

    const handleExcluir = async (id) => {
        iniciarCarregamento();
        try {
            await excluirAcompanhamento(id);
            limparErro();
            const dadosAtualizados = await listarAcompanhamentosPorAnimalId(id);
            setAcompanhamentos(dadosAtualizados);
            await carregarDados(); 
        } catch (error) {
            console.log('Erro ao excluir acompanhamento', error);
        } finally {
            finalizarCarregamento();
        }
    };

    return (
        <div className="container-acompanhamento">
            <form className="acompanhamento-form" onSubmit={handleSubmit}>
                <div className='cadastroAcompanhamento-linha1'>
                    <div className="form-group">
                        <label htmlFor="codigo">Código</label>
                        <input
                            type="number"
                            id="eventoId"
                            name="eventoId"
                            value={dadosAcompanhamento.eventoId}
                            onChange={handleChange}
                        />
                        {(tentouEnviar && !dadosAcompanhamento.eventoId) && (
                            <span className="erro-required"> O campo 'Código Evento' é obrigatório </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="Evento">Procedimento</label>
                        <select
                            id="descricaoEvento"
                            name="descricaoEvento"
                            value={dadosAcompanhamento.eventoId}
                            onChange={handleEventoChange}
                        >
                            <option value="">Selecione uma descrição do procedimento</option>
                            {eventos.map(evento => (
                                <option key={evento.id} value={evento.id}>
                                    {evento.descricao}
                                </option>
                            ))}
                        </select>
                        {(tentouEnviar && !dadosAcompanhamento.descricaoEvento) && (
                            <span className="erro-required"> O campo 'Descrição' é obrigatório </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="data">Data</label>
                        <input
                            type="date"
                            id="data"
                            value={dadosAcompanhamento.data}
                            onChange={handleChange}
                            placeholder="Digite a data do procedimento"
                        />
                        {(tentouEnviar && !dadosAcompanhamento.data) && (
                            <span className="erro-required"> O campo 'Data' é obrigatório </span>
                        )}
                    </div>
                </div>

                <textarea
                    name="observacao"
                    id="observacao"
                    placeholder="Observação sobre o acompanhamento"
                    value={dadosAcompanhamento.observacao}
                    onChange={handleChange}
                />

                <div className="button-wrapper">
                    <button
                        type="submit"
                        className="button-adicionar-evento"
                        disabled={!camposObrigatorios}
                    >
                        <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>
                        Adicionar Procedimento
                    </button>
                </div>

                <div id="group">
                    <div className="form-group">
                        <label htmlFor="acompanhamento">Acompanhamento</label>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Procedimento</th>
                                    <th>Data</th>
                                    <th>Observação</th>
                                    <th>Excluir</th>
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
                                ) :  ( acompanhamentos.map((acompanhamento) => (
                                    <tr key={acompanhamento.id}>
                                        <td>{acompanhamento.id}</td>
                                        <td>{acompanhamento.descricao}</td>
                                        <td>
                                            {acompanhamento.data
                                                ? new Date(acompanhamento.data).toLocaleDateString('pt-BR')
                                                : ''}
                                        </td>
                                        <td>{acompanhamento.observacao}</td>
                                        <td>
                                            <button className="delete-button" 
                                                title="Excluir Procedimento" 
                                                onClick={() => {handleExcluir(acompanhamento.id)}}
                                            >
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
            </form>
        </div>
    );
};

export default Acompanhamento;
