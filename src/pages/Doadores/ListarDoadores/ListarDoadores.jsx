import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { useDoadores } from '../../../hooks/useDoadores';
import { useLoading } from '../../../hooks/useLoading';

import iconeCadastrar from '/src/assets/icone_cadastrar.png';
import iconeBusca from '/src/assets/icone_lupa.png';
import iconeExcluir from '/src/assets/icone_excluir.png';
import Carregando from '../../../components/Spinner/Carregando';
import './ListarDoadores.css';

const Doador = () => {
    const { listarDoadores, excluirDoador, erro, limparErro } = useDoadores();

    const [doadores, setDoadores] = useState([]);
    const [filtro, setFiltro] = useState({ busca: '', status: '' });

    const { carregando, iniciarCarregamento, finalizarCarregamento } = useLoading();
    const [dadosCarregados, setDadosCarregados] = useState(false);

    useEffect(() => {
        const carregarDados = async () => {
            iniciarCarregamento();

            limparErro();
            const dados = await listarDoadores(filtro);
            setDoadores(dados || []);

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
            await excluirDoador(id);
            limparErro();
            const dadosAtualizados = await listarDoadores(filtro);
            setDoadores(dadosAtualizados);
            /* openModalExcluir(); */
        } catch (error) {
            console.error('Erro ao excluir doador');
        } finally {
            finalizarCarregamento();
        }
    };

    return (
        <div className="container">
            <div className="toolbar-doador">
                <Link to='/cadastrar-doador' style={{ textDecoration: 'none' }}>
                    <button className="button-cadastrar-doador">
                        <div>
                            <img src={iconeCadastrar} alt="Ícone de sucesso" className="icon" />
                            Cadastrar
                        </div>
                    </button>
                </Link>
                <div className="search-bar-doador">
                    <input 
                        type="text" 
                        name="busca"
                        value={filtro.busca}
                        onChange={handleChange}
                        placeholder="Busque um doador por nome, cpf ou rg"
                    />
                    <button className="search-button-doador">
                        <img src={iconeBusca} alt="Ícone de busca" className="icon" />
                    </button>
                </div>
            </div>

            <div className="dropdowns">
                <div className="filtro-group">
                    <select id="filtro-doadores" name="status" onChange={handleChange} value={filtro.status}>
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
                        <th>CPF</th>
                        <th>RG</th>
                        <th>Contato</th> {/* arrumar no back */}
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
                    ) :  ( doadores.map((doador) => (
                        <tr key={doador.id}>
                            <td>{doador.id}</td>
                            <td>{doador.nome}</td>
                            <td>{doador.cpf}</td>
                            <td>{doador.rg}</td>
                            <td>{doador.celular}</td>
                            <td>{doador.status === 1 ? 'Ativo' : 'Inativo'}</td>
                            <td>
                                <Link to={`/visualizar-doador/${doador.id}`}>
                                    <button className="search-button-doador">
                                        <img src={iconeBusca} alt="Ícone de busca" className="icon" />
                                    </button>
                                </Link>
                                <button className="delete-button" onClick={() => { handleExcluir(doador.id) }}>
                                    <img src={iconeExcluir} alt="Ícone de excluir" className="icon" />
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

export default Doador;
