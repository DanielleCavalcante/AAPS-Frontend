import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { useAdocoes } from '../../../hooks/useAdocoes';
import { useTermoAdocao } from '../../../hooks/useTermoAdocao';
import { useLoading } from '../../../hooks/useLoading';

import iconeCadastrar from '/src/assets/icone_cadastrar.png';
import iconeBusca from '/src/assets/icone_lupa.png';
import iconeUpload from '/src/assets/icone_upload.png';
import iconeChat from '/src/assets/icone_chat.png';
import Carregando from '../../../components/Spinner/Carregando';
import './ListarAdocoes.css';

const Adocao = () => {
    const { listarAdocoes, excluirAdocao, erro, limparErro } = useAdocoes();

    const [adocoes, setAdocoes] = useState([]);
    const [filtro, setFiltro] = useState({ busca: ''});
    const { enviarTermoAdocao, gerarTermoAdocao } = useTermoAdocao();

    const { carregando, iniciarCarregamento, finalizarCarregamento } = useLoading();
    const [dadosCarregados, setDadosCarregados] = useState(false);

    useEffect(() => {
        const carregarDados = async () => {
            iniciarCarregamento();

            limparErro();
            const dados = await listarAdocoes(filtro);
            setAdocoes(dados || []);

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
            await excluirAdocao(id);
            limparErro();
            const dadosAtualizados = await listarAdocoes(filtro);
            setAdocoes(dadosAtualizados);
        } catch (error) {
            console.error('Erro ao excluir adoção');
        } finally {
            finalizarCarregamento();
        }
    };

    const handleEnviarTermo = async (adocaoId, adotanteId) => {
        limparErro();
        try {
            await enviarTermoAdocao({ adocaoId, adotanteId });
            alert("E-mail enviado com sucesso!");
        } catch (error) {
            tratarErro(error);
        }
    };

    const handleGerarTermo = async (id) => {
        limparErro();
        try {
            await gerarTermoAdocao(id);
        } catch (error) {
            tratarErro(error);
        }
    };

    return (
        <div className="container-adocao">
            <div className="toolbar-adocao">
                <Link to='/cadastrar-adocao' style={{ textDecoration: 'none' }}>
                    <button className="button-cadastrar-adocao">
                        <div>
                            <img src={iconeCadastrar} alt="Ícone de sucesso" className="icon" />
                            Cadastrar
                        </div>
                    </button>
                </Link>
                <div className="search-bar-adocao">
                    <input
                        type="text"
                        name="busca"
                        value={filtro.busca}
                        onChange={handleChange}
                        placeholder="Busque uma adoção pelo nome do animal, adotante, voluntário ou ponto de adoção"
                    />
                    <button className="search-button-adocao">
                        <img src={iconeBusca} alt="Ícone de busca" className="icon" />
                    </button>
                </div>
                {/* <select id="filtro" name="opcoesFiltro">
                    <option value="1">Filtros</option>
                    <option value="2">Código</option>
                    <option value="3">Nome adotante</option>
                    <option value="3">Nome animal</option>
                </select> */}
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Animal</th>
                        <th>Adotante</th>
                        <th>Voluntário</th>
                        <th>Ponto de Adoção</th>
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
                    ) : (adocoes.map((adocao) => (
                        <tr key={adocao.id}>
                            <td>{adocao.id}</td>
                            <td>{adocao.nomeAnimal}</td>
                            <td>{adocao.nomeAdotante}</td>
                            <td>{adocao.nomeVoluntario}</td>
                            <td>{adocao.nomePontoAdocao}</td>
                            <td>
                                <div className="acoes-adocao">
                                <Link to={`/visualizar-adocao/${adocao.id}`}>
                                    <button className="search-button-adocao">
                                        <img src={iconeBusca} alt="Ícone de busca" className="icon" />
                                    </button>
                                </Link>
                                <button className="delete-button" onClick={() => {handleGerarTermo(adocao.id)}}>
                                    <img src={iconeUpload} alt="Ícone de download" className="icon" />
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => handleEnviarTermo(adocao.id, adocao.adotanteId)}
                                >
                                    <img src={iconeChat} alt="Ícone de excluir" className="icon" />
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

export default Adocao;