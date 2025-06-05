import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { useAdotantes } from '../../../hooks/useAdotantes';
import { useLoading } from '../../../hooks/useLoading';

import iconeCadastrar from '/src/assets/icone_cadastrar.png';
import iconeBusca from '/src/assets/icone_lupa.png';
import iconeExcluir from '/src/assets/icone_excluir.png';
import Carregando from '../../../components/Spinner/Carregando';
import './ListarAdotantes.css';

const Adotante = () => {
    const { listarAdotantes, excluirAdotante, erro, limparErro } = useAdotantes();

    const [adotantes, setAdotantes] = useState([]);
    const [filtro, setFiltro] = useState({ busca: '', status: '', bloqueio: '' });

    const { carregando, iniciarCarregamento, finalizarCarregamento } = useLoading();
    const [dadosCarregados, setDadosCarregados] = useState(false);

    useEffect(() => {
        const carregarDados = async () => {
            iniciarCarregamento();

            limparErro();
            const dados = await listarAdotantes(filtro);
            setAdotantes(dados || []);

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
            await excluirAdotante(id);
            limparErro();
            const dadosAtualizados = await listarAdotantes(filtro);
            setAdotantes(dadosAtualizados);
            /* openModalExcluir(); */
        } catch (error) {
            console.error('Erro ao excluir adotante');
        } finally {
            finalizarCarregamento();
        }
    };

    return(
        <div className="container-adotante">
            <div className="toolbar-adotante">
                <Link to='/cadastrar-adotante' style={{ textDecoration: 'none' }}>
                    <button className="button-cadastrar-adotante">
                        <div>
                            <img src={iconeCadastrar} alt="Ícone de sucesso" className="icon" />
                            Cadastrar
                        </div>
                    </button>
                </Link>
                <div className="search-bar-adotante">
                    <input
                        type="text" 
                        name="busca"
                        value={filtro.busca}
                        onChange={handleChange}
                        placeholder="Busque um ponto de adoção por nome, CPF ou RG"
                    />
                    <button className="search-button-adotante">
                        <img src={iconeBusca} alt="Ícone de busca" className="icon" />
                    </button>
                </div>
            </div>

            <div className="dropdowns">
                <div className="filtro-group">
                    <select id="filtro-adotantes" name="status" onChange={handleChange} value={filtro.status}>
                        <option value="">Status</option>
                        <option value={1}>Ativo</option>
                        <option value={0}>Inativo</option>
                    </select>
                </div>
                <div className="filtro-group">
                    <select id="filtro-adotantes" name="bloqueio" onChange={handleChange} value={filtro.bloqueio}>
                        <option value="">Bloqueado</option>
                        <option value={1}>Sim</option>
                        <option value={0}>Não</option>
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
                                <div className="acoes-adotante">
                                <Link to={`/visualizar-adotante/${adotante.id}`}>
                                    <button className="search-button-adotante">
                                        <img src={iconeBusca} alt="Ícone de busca" className="icon" />
                                    </button>
                                </Link>
                                <button className="delete-button" onClick={() => {handleExcluir(adotante.id)}}>
                                    <img src={iconeExcluir} alt="Ícone de excluir" className="icon" />
                                </button>
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

export default Adotante;
