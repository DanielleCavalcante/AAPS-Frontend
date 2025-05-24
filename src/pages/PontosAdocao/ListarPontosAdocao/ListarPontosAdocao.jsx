import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { usePontosAdocao } from '../../../hooks/usePontosAdocao';
import { useLoading } from '../../../hooks/useLoading';

import iconeCadastrar from '/src/assets/icone_cadastrar.png';
import iconeBusca from '/src/assets/icone_lupa.png';
import iconeExcluir from '/src/assets/icone_excluir.png';
import Carregando from '../../../components/Spinner/Carregando';
import './ListarPontosAdocao.css';

const PontoAdocao = () => {
    const { listarPontosAdocao, excluirPontoAdocao, erro, limparErro } = usePontosAdocao();
    
    const [pontosAdocao, setPontosAdocao] = useState([]);
    const [filtro, setFiltro] = useState({ busca: '', status: '' });

    const { carregando, iniciarCarregamento, finalizarCarregamento } = useLoading();
    const [dadosCarregados, setDadosCarregados] = useState(false);

    useEffect(() => {
        const carregarDados = async () => {
            iniciarCarregamento();

            limparErro();
            const dados = await listarPontosAdocao(filtro);
            setPontosAdocao(dados || []);

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
            await excluirPontoAdocao(id);
            limparErro();
            const dadosAtualizados = await listarPontosAdocao(filtro);
            setPontosAdocao(dadosAtualizados);
            /* openModalExcluir(); */
        } catch (error) {
            console.error('Erro ao excluir ponto de adoção');
        } finally {
            finalizarCarregamento();
        }
    };

    return(
<<<<<<< HEAD
        <div className="container-ponto">
            <div className="toolbar-ponto">
                <Link to='/cadastrar-ponto-adocao' style={{ textDecoration: 'none' }}>
                    <button className="button-cadastrar">
=======
        <div className="container-evento">
            <div className="toolbar-evento">
                <Link to='/cadastrar-ponto-adocao' style={{ textDecoration: 'none' }}>
                    <button className="button-cadastrar-evento">
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                        <div>
                            <img src={iconeCadastrar} alt="Ícone de sucesso" className="icon" />
                            Cadastrar
                        </div>
                    </button>
                </Link>
<<<<<<< HEAD
                <div className="search-bar-ponto">
=======
                <div className="search-bar-evento">
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                    <input 
                        type="text" 
                        name="busca"
                        value={filtro.busca}
                        onChange={handleChange}
                        placeholder="Busque um ponto de adoção por nome fantasia, responsável ou CNPJ"
                    />
<<<<<<< HEAD
                    <button className="search-button">
=======
                    <button className="search-button-evento">
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                        <img src={iconeBusca} alt="Ícone de busca" className="icon" />
                    </button>
                </div>

            </div>

            <div className="dropdowns">
                <div className="filtro-group">
                    <select id="filtro-ponto" name="status" onChange={handleChange} value={filtro.status}>
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
                        <th>Nome Fantasia</th>
                        <th>Responsável</th>
                        <th>CNPJ</th>
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
                    ) :  ( pontosAdocao.map((pontoAdocao) => (
                        <tr key={pontoAdocao.id}>
                            <td>{pontoAdocao.id}</td>
                            <td>{pontoAdocao.nomeFantasia}</td>
                            <td>{pontoAdocao.responsavel}</td>
                            <td>{pontoAdocao.cnpj}</td>
                            <td>{pontoAdocao.status === 1 ? 'Ativo' : 'Inativo'}</td>
                            <td>
                                <Link to={`/visualizar-ponto-adocao/${pontoAdocao.id}`}>
                                    <button className="search-button-evento">
                                        <img src={iconeBusca} alt="Ícone de busca" className="icon" />
                                    </button>
                                </Link>
                                <button className="delete-button" onClick={() => { handleExcluir(pontoAdocao.id) }}>
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

export default PontoAdocao;
