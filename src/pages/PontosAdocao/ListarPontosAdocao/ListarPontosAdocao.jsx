import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { usePontosAdocao } from '../../../hooks/usePontosAdocao';
import { useLoading } from '../../../hooks/useLoading';

import iconeCadastrar from '/src/assets/icone_cadastrar.png';
import iconeBusca from '/src/assets/icone_lupa.png';
import iconeExcluir from '/src/assets/icone_excluir.png';
import Carregando from '../../../components/Spinner/Carregando';
import BotaoExcluir from "/src/components/BotaoExcluir/BotaoExcluir.jsx";
import './ListarPontosAdocao.css';

const PontoAdocao = () => {
    const { listarPontosAdocao, excluirPontoAdocao, erro, limparErro } = usePontosAdocao();
    
    const [pontosAdocao, setPontosAdocao] = useState([]);
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
            openModalExcluir();
        } catch (error) {
            console.error('Erro ao excluir ponto de adoção');
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
        <div className="container-ponto">
            <div className="toolbar-ponto">
                <Link to='/cadastrar-ponto-adocao' style={{ textDecoration: 'none' }}>
                    <button className="button-cadastrar">
                        <div>
                            <img src={iconeCadastrar} alt="Ícone de sucesso" className="icon" />
                            Cadastrar
                        </div>
                    </button>
                </Link>
                <div className="search-bar-ponto">
                    <input 
                        type="text" 
                        name="busca"
                        value={filtro.busca}
                        onChange={handleChange}
                        placeholder="Busque um ponto de adoção por nome fantasia, responsável ou CNPJ"
                    />
                    <button className="search-button">
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
                            <td>{pontoAdocao.resposavelContato}</td>
                            <td>{pontoAdocao.cnpj}</td>
                            <td>{pontoAdocao.status === 1 ? 'Ativo' : 'Inativo'}</td>
                            <td>
                                <div className='botoes'>
                                    <Link to={`/visualizar-ponto-adocao/${pontoAdocao.id}`}>
                                        <button className="search-button-evento">
                                            <img src={iconeBusca} alt="Ícone de busca" className="icon" />
                                        </button>
                                    </Link>
                                    <BotaoExcluir 
                                        showModal={showModalExcluir} 
                                        showConfirmModalExcluir={showConfirmModalExcluir} 
                                        openModal={() => openConfirmModalExcluir(pontoAdocao.id)} 
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

export default PontoAdocao;
