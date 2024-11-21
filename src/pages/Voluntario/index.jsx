import React from 'react';
import {Link} from "react-router-dom";
import './voluntario.css';

const Voluntario = () => {
    return(
        <div className="container">
            <div className="toolbar">
            <Link to='/cadastro-voluntario' style={{ textDecoration: 'none' }}>
                <button className="button-cadastrar">
                    <div>
                        <img src="/src/assets/icone_cadastrar.png" onc alt="Ícone de sucesso" className="icon" />
                        Cadastrar
                    </div>
                </button>
            </Link>
                <div className="search-bar">
                    <input type="text"/>
                    <button className="search-button">
                        <img src="/src/assets/icone_lupa.png" onc alt="Ícone de lupa" className="icon" />
                    </button>
                </div>
                <select id="filtro" name="opcoesFiltro">
                        <option value="1">Filtros</option>
                        <option value="2">X</option>
                        <option value="3">Y</option>
                </select>
            </div>
            
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Tipo</th>
                        <th>Situação</th>
                        <th>Ver</th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(2)].map((_, index) => (
                        <tr key={index}>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                            <button className="search-button">
                                <Link to='/altera-voluntario'><img src="/src/assets/icone_lupa.png" onc alt="Ícone de sucesso" className="icon" /></Link>
                            </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Voluntario;