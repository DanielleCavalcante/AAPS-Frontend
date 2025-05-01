import React from 'react';
import { Link } from "react-router-dom";

import iconeCadastrar from '/src/assets/icone_cadastrar.png';
import iconeBusca from '/src/assets/icone_lupa.png';
import iconeExcluir from '/src/assets/icone_excluir.png';
import './ListarPontosAdocao.css';

const PontoAdocao = () => {
    return(
        <div className="container-evento">
            <div className="toolbar-evento">
                <Link to='/cadastrar-ponto-adocao' style={{ textDecoration: 'none' }}>
                    <button className="button-cadastrar-evento">
                        <div>
                            <img src={iconeCadastrar} alt="Ícone de sucesso" className="icon" />
                            Cadastrar
                        </div>
                    </button>
                </Link>
                <div className="search-bar-evento">
                    <input type="text"/>
                    <button className="search-button-evento">
                        <img src={iconeBusca} alt="Ícone de busca" className="icon" />
                    </button>
                </div>

            </div>

            <div className="dropdowns">
                    <div className="filtro-group">
                    <select id="filtro-ponto" name="opcoesFiltro">
                    <option value="1">Filtros</option>
                    <option value="2">Código</option>
                    <option value="3">Nome</option>
                </select>
                    </div>
                    </div>   
            
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Ver</th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(2)].map((_, index) => (
                        <tr key={index}>
                            <td></td>
                            <td></td>
                            <td>
                                <Link to='/visualizar-ponto-adocao'>
                                    <button className="search-button-evento">
                                        <img src={iconeBusca} alt="Ícone de busca" className="icon" />
                                    </button>
                                </Link>
                                <button className="delete-button" onClick={() => {handleExcluir(voluntario.id)}}>
                                    <img src={iconeExcluir} alt="Ícone de excluir" className="icon" />
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PontoAdocao;
