import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { useAnimais } from '../../../hooks/useAnimais';
import { useLoading } from '../../../hooks/useLoading';

import iconeCadastrar from '/src/assets/icone_cadastrar.png';
import iconeBusca from '/src/assets/icone_lupa.png';
import carregando from '../../../components/Spinner/Carregando';
import BotaoExcluir from "/src/components/BotaoExcluir/BotaoExcluir.jsx";
import './ListarAnimais.css';

const Animal = () => {
    // const { listarAnimais, excluirAnimal, erro, limparErro } = useAnimais();
    const [showModalExcluir, setShowModalExcluir] = useState(false);
    const [showConfirmModalExcluir, setShowConfirmModalExcluir] = useState(false);
    const [idParaExcluir, setIdParaExcluir] = useState(null);
    const { listarAnimais, excluirAnimal, carregando, erro } = useAnimais();

    const [animais, setAnimais] = useState([]);
    const [filtro, setFiltro] = useState({
        busca: '',
        especie: '',
        sexo: '',
        status: '',
        disponibilidade: ''
    });

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
          const dados = await listarAnimais(filtro);
          if (dados) setAnimais(dados);
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
        await excluirAnimal(id);
        const dadosAtualizados = await listarAnimais(filtro);
        openModalExcluir();
        setAnimais(dadosAtualizados);
    };
    
    if (erro) return <div>Carregando...</div>;
    if (erro) return <div className="erro">{erro}</div>;

    return(
        <div className="container-animal">
            <div className="toolbar">
                <Link to='/cadastrar-animal' style={{ textDecoration: 'none' }}>
                    <button className="button-cadastrar">
                        <div>
                            <img src={iconeCadastrar} onc alt="Ícone de sucesso" className="icon" />
                            Cadastrar
                        </div>
                    </button>
                </Link>

                {/* Barra de Pesquisa: */}
                <div className="search-bar-animal">
                    <input 
                        type="text"
                        name="busca"
                        value={filtro.busca}
                        onChange={handleChange}
                        placeholder="Busque um animal por Nome"
                    />
                    <button className="search-button">
                        <img src={iconeBusca} onc alt="Ícone de sucesso" className="icon" />
                    </button>
                </div>

                {/* Filtros: */}
                {/* <select id="filtro" name="opcoesFiltro">
                    <option value="1">Filtros</option>
                    <option value="2">Espécie</option>
                    <option value="3">Sexo</option>
                </select> */}
                
            </div>

            <div className="dropdowns">
                <div className="filtro-group">
                    <select id="filtro-animais" name="disponibilidade" onChange={handleChange} value={filtro.disponibilidade}>
                        <option value="">Disponibilidade</option>
                        <option value={0}>Adotado</option>
                        <option value={1}>Disponível</option>
                    </select>
                </div>
                <div className="filtro-group">
                    <select id="filtro-animais" name="especie" onChange={handleChange} value={filtro.especie}>
                        <option value="">Espécie</option>
                        <option value="Cachorro">Cachorro</option>
                        <option value="Gato">Gato</option>
                    </select>
                </div>
                <div className="filtro-group">
                    <select id="filtro-animais" name="sexo" onChange={handleChange} value={filtro.sexo}>
                        <option value="">Sexo</option>
                        <option value="M">Macho</option>
                        <option value="F">Fêmea</option>
                    </select>
                </div>
                <div className="filtro-group">
                    <select id="filtro-animais" name="status" onChange={handleChange} value={filtro.status}>
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
                        <th>Espécie</th>
                        <th>Sexo</th>
                        <th>Idade</th>
                        <th>Disponibilidade</th>
                        <th>Status</th>
                        <th>Ver</th>
                    </tr>
                </thead>
                <tbody>
                    {animais.map((animal) => (
                        <tr key={animal.id}>
                            <td>{animal.id}</td>
                            <td>{animal.nome}</td>
                            <td>{animal.especie}</td>
                            <td>{animal.sexo}</td>
                            <td>{new Date().getFullYear() - new Date(animal.dataNascimento).getFullYear()}</td>
                            <td>{animal.disponibilidade === 1 ? 'Disponível' : 'Adotado'}</td>
                            <td>{animal.status === 1 ? 'Ativo' : 'Inativo'}</td>
                            <td>
                                <div className='botoes'>
                                    <Link to={`/visualizar-animal/${animal.id}`}>
                                        <button className="search-button">
                                            <img src="/src/assets/icone_lupa.png" alt="Ícone de visualizar" className="icon" />
                                        </button>
                                    </Link>
                                    <BotaoExcluir 
                                        showModal={showModalExcluir} 
                                        showConfirmModalExcluir={showConfirmModalExcluir} 
                                        openModal={() => openConfirmModalExcluir(animal.id)} 
                                        closeModal2={closeConfirmModalExcluir} 
                                        closeModal={confirmarExclusao}
                                        closeModalExcluir={closeModalExcluir}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Animal;