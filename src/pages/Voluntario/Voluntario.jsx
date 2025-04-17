import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";

import { useVoluntarios } from '../../hooks/useVoluntarios';
import { useLoading } from '../../hooks/useLoading';

import Carregando from '../../components/Spinner/Carregando';
import './Voluntario.css';

const Voluntario = () => {
    const { listarVoluntarios, excluirVoluntario, erro, limparErro } = useVoluntarios();

    const [voluntarios, setVoluntarios] = useState([]);
    const [filtro, setFiltro] = useState({ busca: '', status: '' });

    const { carregando, iniciarCarregamento, finalizarCarregamento } = useLoading();
    const [dadosCarregados, setDadosCarregados] = useState(false);

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
            setVoluntarios(dadosAtualizados);
        } catch (error) {
            console.error('Erro ao excluir voluntario');
        } finally {
            finalizarCarregamento();
        }
    };

    return(
        <div className="container">
            <div className="toolbar">
                <Link to='/cadastro-voluntario' style={{ textDecoration: 'none' }}>
                    <button className="button-cadastrar">
                        <div>
                            <img src="/src/assets/icone_cadastrar.png" onc alt="Ícone de sucesso" className="icon" />
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
                        <img src="/src/assets/icone_lupa.png" onc alt="Ícone de lupa" className="icon" />
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
                    ) :  ( voluntarios.map((voluntario) => (
                        <tr key={voluntario.id}>
                            <td>{voluntario.id}</td>
                            <td>{voluntario.nome}</td>
                            <td>{voluntario.acesso}</td>
                            <td>{voluntario.cpf}</td>
                            <td>{voluntario.userName}</td>
                            <td>{voluntario.status === 1 ? 'Ativo' : 'Inativo'}</td>
                            <td>
                                <Link to={`/visualiza-voluntario/${voluntario.id}`}>
                                    <button className="search-button">
                                        <img src="/src/assets/icone_lupa.png" onc alt="Ícone de visualizar" className="icon" />
                                    </button>
                                </Link> 
                                <button className="search-button" onClick={() => {handleExcluir(voluntario.id)}}>
                                    <img src="/src/assets/icone_excluir.png" alt="Ícone de excluir" className="icon" />
                                </button>
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