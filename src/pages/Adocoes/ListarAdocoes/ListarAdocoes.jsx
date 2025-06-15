import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useAdocoes } from '../../../hooks/useAdocoes';
import { useTermoAdocao } from '../../../hooks/useTermoAdocao';
import { useLoading } from '../../../hooks/useLoading';

import AlertSucesso from "/src/components/AlertSucesso/AlertSucesso.jsx";
import iconeCadastrar from '/src/assets/icone_cadastrar.png';
import iconeBusca from '/src/assets/icone_lupa.png';
import iconeDownload from '/src/assets/icone_download.png';
import iconeCompartilhar from '/src/assets/icone_compartilhar.png';
import Carregando from '../../../components/Spinner/Carregando';
import CarregandoCat from '../../../components/Spinner/CarregandoCat';
import './ListarAdocoes.css';

const Adocao = () => {
    const { listarAdocoes, excluirAdocao, erro, limparErro } = useAdocoes();

    const [adocoes, setAdocoes] = useState([]);
    const [filtro, setFiltro] = useState({ busca: '', cancelada: null });
    const { enviarTermoAdocao, gerarTermoAdocao } = useTermoAdocao();

    const { carregando, iniciarCarregamento, finalizarCarregamento } = useLoading();
    const [dadosCarregados, setDadosCarregados] = useState(false);

    const [carregandoPdf, setCarregandoPdf] = useState(false);

    const [alertSucesso, setAlertSucesso] = useState(false);

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
        setCarregandoPdf(true);
        try {
            await enviarTermoAdocao({ adocaoId, adotanteId });
            setAlertSucesso(true);
            // alert("E-mail enviado com sucesso!");
        } catch (error) {
            tratarErro(error);
        } finally {
            setCarregandoPdf(false);
        }
    };

    const handleGerarTermo = async (id) => {
        limparErro();
        setCarregandoPdf(true);
        try {
            await gerarTermoAdocao(id);
        } catch (error) {
            tratarErro(error);
        }finally {
            setCarregandoPdf(false);
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
                        placeholder="Busque uma adoção pelo Nome do Animal, Adotante, Voluntário ou Ponto de Adoção"
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

{/*Alterar */} <div className="dropdowns"> 
                <div className="filtro-group">
                    <select id="filtro-doadores" name="cancelada" onChange={handleChange} value={filtro.cancelada}>
                        <option value="">Adoção anulada</option>
                        <option value={true}>Sim</option>
                        <option value={false}>Não</option>
                    </select>
                </div>
            </div>

            {carregandoPdf && <CarregandoCat />}

            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Animal</th>
                        <th>Adotante</th>
                        <th>Voluntário</th>
                        <th>Ponto de Adoção</th>
                        <th>Adoção anulada</th>
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
                    ) : (adocoes.map((adocao) => (
                        <tr key={adocao.id}>
                            <td>{adocao.id}</td>
                            <td>{adocao.nomeAnimal}</td>
                            <td>{adocao.nomeAdotante}</td>
                            <td>{adocao.nomeVoluntario}</td>
                            <td>{adocao.nomePontoAdocao}</td>
    {/*Alterar */}          <td>{adocao.cancelada === true ? 'Sim' : 'Não'}</td>
                            <td>
                                <div className="acoes-adocao">
                                    <Link to={`/visualizar-adocao/${adocao.id}`}>
                                        <button className="search-button-adocao">
                                            <img src={iconeBusca} alt="Ícone de busca" className="icon" />
                                        </button>
                                    </Link>
                                    <button className="download-button-adocao" onClick={() => { handleGerarTermo(adocao.id) }}>
                                        <img src={iconeDownload} alt="Ícone de download" className="icon" />
                                    </button>
                                    <button className="compartilhar-button-adocao" onClick={() => handleEnviarTermo(adocao.id, adocao.adotanteId)}>
                                        <img src={iconeCompartilhar} alt="Ícone de compartilhar" className="icon" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                    )}
                </tbody>
            </table>
            {alertSucesso && (
                <AlertSucesso
                    mensagem="Termo de adoção enviado!"
                    onClose={() => setAlertSucesso(false)}
                />
            )}
        </div>
    );
}

export default Adocao;