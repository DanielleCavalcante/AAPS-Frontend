import { useEffect, useState } from 'react';
import {Link} from "react-router-dom";

import { useVoluntarios } from '../../../hooks/useVoluntarios';
import { useLoading } from '../../../hooks/useLoading';

import iconeCadastrar from '/src/assets/icone_cadastrar.png';
import iconeBusca from '/src/assets/icone_lupa.png';
import Carregando from '../../../components/Spinner/Carregando';
import BotaoExcluir from "/src/components/BotaoExcluir/BotaoExcluir.jsx";
import './ListarVoluntarios.css';

const Voluntario = () => {
    const { listarVoluntarios, excluirVoluntario, erro, limparErro } = useVoluntarios();

    const [voluntarios, setVoluntarios] = useState([]);
    const [filtro, setFiltro] = useState({ busca: '', status: '' });

    const { carregando, iniciarCarregamento, finalizarCarregamento } = useLoading();
    const [dadosCarregados, setDadosCarregados] = useState(false);

    const [showModalExcluir, setShowModalExcluir] = useState(false);
    const [showConfirmModalExcluir, setShowConfirmModalExcluir] = useState(false);
    const [idParaExcluir, setIdParaExcluir] = useState(null);

    useEffect(() => {
        const carregarDados = async () => {
            iniciarCarregamento();

            limparErro();
            const dados = await listarVoluntarios(filtro);
            setVoluntarios(dados || []);

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
            await excluirVoluntario(id);
            limparErro();
            const dadosAtualizados = await listarVoluntarios(filtro);
            openModalExcluir();
            setVoluntarios(dadosAtualizados);
        } catch (error) {
            console.error('Erro ao excluir voluntario');
        } finally {
            finalizarCarregamento();
        }
    };

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

    return(
        <div className="container">
            <div className="toolbar">
                <Link to='/cadastrar-voluntario' style={{ textDecoration: 'none' }}>
                    <button className="button-cadastrar">
                        <div>
                            <img src={iconeCadastrar} onc alt="Ícone de sucesso" className="icon" />
                            Cadastrar
                        </div>
                    </button>
                </Link>
                <div className="search-bar">
                    <input 
                        type="text"
                        name="busca"
                        value={filtro.busca}
                        onChange={handleChange}
                        placeholder="Busque um voluntario pelo nome, cpf ou nome de usuário"
                    />
                    <button className="search-button">
                        <img src={iconeBusca} onc alt="Ícone de lupa" className="icon" />
                    </button>
                </div>
            </div>

            <div className="dropdowns">
            <div className="filtro-group">

            <select id="filtro-voluntario" name="status" onChange={handleChange} value={filtro.status}>
                <option value="">Status</option>
                <option value={1}>Ativo</option>
                <option value={0}>Inativo</option>
            </select>
            </div>
            </div>
            
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Acesso</th>
                        <th>CPF</th>
                        <th>Nome de Usuário</th>
                        <th>Status</th>
                        <th>Ver</th>
                    </tr>
                </thead>
                <tbody>
                    {erro ? (
                        <tr>
                            <td colSpan="7" className="erro" style={{ textAlign: 'center', height: '20vh' }}>
                                {erro}
                            </td>
                        </tr>
                    ) : carregando ? (
                        <tr>
                            <td colSpan="7">
                                <Carregando />
                            </td>
                        </tr>
                    ) :  ( voluntarios.map((voluntario) => (
                        <tr key={voluntario.id}>
                            <td>{voluntario.id}</td>
                            <td>{voluntario.nome}</td>
                            <td>{voluntario.acesso}</td>
                            <td>{voluntario.cpf}</td>
                            <td>{voluntario.userName}</td>
                            <td>{voluntario.status === 1 ? 'Ativo' : 'Inativo'}</td>
                            <td>
                                <div className='botoes'>
                                    <Link to={`/visualizar-voluntario/${voluntario.id}`}>
                                        <button className="search-button">
                                            <img src={iconeBusca} onc alt="Ícone de visualizar" className="icon" />
                                        </button>
                                    </Link> 
                                    <BotaoExcluir 
                                        showModal={showModalExcluir} 
                                        showConfirmModalExcluir={showConfirmModalExcluir} 
                                        openModal={() => openConfirmModalExcluir(voluntario.id)} 
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
}

export default Voluntario;