import React from 'react';
import {Link} from "react-router-dom";
import './doador.css';

const Doador = () => {
    return(
        <div className="container">
            <div className="toolbar">
                <Link to='/cadastro-doador' style={{ textDecoration: 'none' }}>
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
                        <img src="/src/assets/icone_lupa.png" onc alt="Ícone de sucesso" className="icon" />
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
                        <th>contato</th>
                    </tr>
                </thead>
                <tbody>
                    {doador.map((doador) => (
                        <tr key={doador.id}>
                            <td>{doador.id}</td>
                            <td>{doador.nome}</td>
                            <td>{doador.contato}</td>
                            <td>
                                <button className="search-button" to={"/altera-doador"}>
                                    <img src="/src/assets/icone_lupa.png" onc alt="Ícone de sucesso" className="icon" />
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