import React from 'react';
import { useEventos } from '../../hooks/useEventos';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import './evento.css';

const Evento = () => {
    const { listarEventos, excluirEvento, carregando, erro } = useEventos();
        const [eventos, setEventos] = useState([]);
        const [filtro, setFiltro] = useState({
            busca: '',
            status: '',
        });
    
        useEffect(() => {
            const carregarDados = async () => {
              const dados = await listarEventos(filtro);
              if (dados) setEventos(dados);
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
            await excluirEvento(id);
            const dadosAtualizados = await listarEventos(filtro);
            setEventos(dadosAtualizados);
        };
        
        if (carregando) return <div>Carregando...</div>;
        if (erro) return <div className="erro">{erro}</div>;

    return(
        <div className="container-evento">
            <div className="toolbar-evento">
                <Link to='/cadastro-evento' style={{ textDecoration: 'none' }}>
                    <button className="button-cadastrar-evento">
                        <div>
                            <img src="/src/assets/icone_cadastrar.png" alt="Ícone de sucesso" className="icon" />
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
                        <img src="/src/assets/icone_lupa.png" alt="Ícone de busca" className="icon" />
                    </button>
                </div>
                {/* <select id="filtro" name="opcoesFiltro">
                    <option value="1">Filtros</option>
                    <option value="2">Código</option>
                    <option value="3">Nome</option>
                </select> */}
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
                    {eventos.map((evento) => (
                        <tr key={evento.id}>
                            <td>{evento.id}</td>
                            <td>{evento.descricao}</td>
                            <td>{evento.status === 1 ? 'Ativo' : 'Inativo'}</td>
                            <td>
                                <Link to={`/visualiza-evento/${evento.id}`}>
                                    <button className="search-button">
                                        <img src="/src/assets/icone_lupa.png" alt="Ícone de visualizar" className="icon" />
                                    </button>
                                </Link>
                                <button className="search-button" onClick={() => {handleExcluir(evento.id)}}>
                                    <img src="/src/assets/icone_excluir.png" alt="Ícone de excluir" className="icon" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Evento;
