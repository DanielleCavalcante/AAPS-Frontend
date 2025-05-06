import React from 'react';
import { Link } from "react-router-dom";

import iconeCadastrar from '/src/assets/icone_cadastrar.png';
import iconeBusca from '/src/assets/icone_lupa.png';
import iconeExcluir from '/src/assets/icone_excluir.png';
import './ListarDoadores.css';

const Doador = () => {
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
                    <input type="text" />
                    <button className="search-button-doador">
                        <img src={iconeBusca} alt="Ícone de busca" className="icon" />
                    </button>
                </div>
            </div>

            <div className="dropdowns">
                <div className="filtro-group">

                    <select id="filtro-doadores" name="opcoesFiltro">
                        <option value="1">Filtros</option>
                        <option value="2">Código</option>
                        <option value="3">Nome</option>
                        <option value="4">Contato</option>
                    </select>
                </div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Contato</th>
                        <th>Ver</th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(2)].map((_, index) => (
                        <tr key={index}>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <Link to='/visualizar-doador'>
                                    <button className="search-button-doador">
                                        <img src={iconeBusca} alt="Ícone de busca" className="icon" />
                                    </button>
                                </Link>
                                <button className="delete-button" onClick={() => { handleExcluir(voluntario.id) }}>
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

export default Doador;
