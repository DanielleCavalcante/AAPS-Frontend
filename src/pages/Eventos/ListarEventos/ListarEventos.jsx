import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { useEventos } from '../../../hooks/useEventos';
import { useLoading } from '../../../hooks/useLoading';

import iconeCadastrar from '/src/assets/icone_cadastrar.png';
import iconeBusca from '/src/assets/icone_lupa.png';
import BotaoExcluir from "/src/components/BotaoExcluir/BotaoExcluir";
import Carregando from '../../../components/Spinner/Carregando';
import './ListarEventos.css';

const Evento = () => {
    const { listarEventos, excluirEvento, erro, limparErro } = useEventos();

    const [eventos, setEventos] = useState([]);
    const [filtro, setFiltro] = useState({ busca: '', status: '' });

    const { carregando, iniciarCarregamento, finalizarCarregamento } = useLoading();
    const [dadosCarregados, setDadosCarregados] = useState(false);
    const [showModalExcluir, setShowModalExcluir] = useState(false);
    const [showConfirmModalExcluir, setShowConfirmModalExcluir] = useState(false);
    const [idParaExcluir, setIdParaExcluir] = useState(null);

    //Modais para botão Excluir:
    const openModalExcluir = () => {
            setShowConfirmModalExcluir(false);
            setShowModalExcluir(true);
    };
    
    const closeModalExcluir = () => {
            setShowModalExcluir(false);
    };
    
    const openConfirmModalExcluir = (id) => {
        setIdParaExcluir(id); // salva o ID
        setShowConfirmModalExcluir(true); // abre o modal de confirmação
    };
    
    const closeConfirmModalExcluir = () => setShowConfirmModalExcluir(false);

    const confirmarExclusao = async () => {
        if (idParaExcluir) {
            await handleExcluir(idParaExcluir);
            setIdParaExcluir(null); // limpa o estado
            setShowConfirmModalExcluir(false);
        }
    };

    useEffect(() => {
        const carregarDados = async () => {
            iniciarCarregamento();

            limparErro();
            const dados = await listarEventos(filtro);
            setEventos(dados || []);

            finalizarCarregamento();
            setDadosCarregados(true);
        };
    
        carregarDados();
    }, [filtro]);

    const handleChange = (e) => {
        setFiltro({
            ...filtro,
            [e.target.name]: e.target.value
        });
    };

    const handleExcluir = async (id) => {
        iniciarCarregamento();
        try {
            await excluirEvento(id);
            limparErro();
            const dadosAtualizados = await listarEventos(filtro);
            setEventos(dadosAtualizados);
            openModalExcluir();
        } catch (error) {
            console.error('Erro ao excluir evento');
        } finally {
            finalizarCarregamento();
        }
    };
    
    return(
        <div className="container-evento">
            <div className="toolbar-evento">
                <Link to='/cadastrar-evento' style={{ textDecoration: 'none' }}>
                    <button className="button-cadastrar-evento">
                        <div>
                            <img src={iconeCadastrar} alt="Ícone de sucesso" className="icon" />
                            Cadastrar
                        </div>
                    </button>
                </Link>
                <div className="search-bar-evento">
                    <input 
                        type="text"
                        name="busca"
                        value={filtro.busca}
                        onChange={handleChange}
                        placeholder="Busque um evento pela descrição"
                    />
                    <button className="search-button-evento">
                        <img src={iconeBusca} alt="Ícone de busca" className="icon" />
                    </button>
                </div>
                <select id="filtro" name="status" onChange={handleChange} value={filtro.status}>
                    <option value="">Status</option>
                    <option value={1}>Ativo</option>
                    <option value={0}>Inativo</option>
                </select>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descrição</th>
                        <th>Status</th>
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
                    ) :  ( eventos.map((evento) => (
                        <tr key={evento.id}>
                            <td>{evento.id}</td>
                            <td>{evento.descricao}</td>
                            <td>{evento.status === 1 ? 'Ativo' : 'Inativo'}</td>
                            <td>
                                <div className='botoes'>
                                    <Link to={`/visualizar-evento/${evento.id}`}>
                                        <button className="search-button">
                                            <img src="/src/assets/icone_lupa.png" alt="Ícone de visualizar" className="icon" />
                                        </button>
                                    </Link>
                                    <BotaoExcluir 
                                        showModal={showModalExcluir} 
                                        showConfirmModalExcluir={showConfirmModalExcluir} 
                                        openModal={() => openConfirmModalExcluir(evento.id)} 
                                        closeModal2={closeConfirmModalExcluir} 
                                        closeModal={confirmarExclusao}
                                        closeModalExcluir={closeModalExcluir}
                                    />
                                </div>
                            </td>
                        </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Evento;
