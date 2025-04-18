import React from 'react';
import { Link } from "react-router-dom";

import iconeCadastrar from '/src/assets/icone_cadastrar.png';
import iconeBusca from '/src/assets/icone_lupa.png';
import iconeExcluir from '/src/assets/icone_excluir.png';
import './ListarAdotantes.css';

const Adotante = () => {
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
                    <input type="text"/>
                    <button className="search-button-adotante">
                        <img src={iconeBusca} alt="Ícone de busca" className="icon" />
                    </button>
                </div>
                <select id="filtro" name="opcoesFiltro">
                    <option value="1">Filtros</option>
                    <option value="2">Código</option>
                    <option value="3">Nome</option>
                    <option value="4">CPF</option>
                </select>
            </div>
            
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>CPF</th>
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
                                <Link to='/visualizar-adotante'>
                                    <button className="search-button-adotante">
                                        <img src={iconeBusca} alt="Ícone de busca" className="icon" />
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Adotante;
