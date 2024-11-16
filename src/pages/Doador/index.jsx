import React from 'react';
import { Link } from "react-router-dom";
import './doador.css';

const Doador = () => {
    return(
        <div className="container-doador">
            <div className="toolbar-doador">
                <Link to='/cadastro-doador' style={{ textDecoration: 'none' }}>
                    <button className="button-cadastrar-doador">
                        <div>
                            <img src="/src/assets/icone_cadastrar.png" alt="Ícone de sucesso" className="icon" />
                            Cadastrar
                        </div>
                    </button>
                </Link>
                <div className="search-bar-doador">
                    <input type="text"/>
                    <button className="search-button-doador">
                        <img src="/src/assets/icone_lupa.png" alt="Ícone de busca" className="icon" />
                    </button>
                </div>
                <select id="filtro" name="opcoesFiltro">
                    <option value="1">Filtros</option>
                    <option value="2">Código</option>
                    <option value="3">Nome</option>
                    <option value="4">Contato</option>
                </select>
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
                    {[...Array(5)].map((_, index) => (
                        <tr key={index}>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <Link to='/altera-doador'>
                                    <button className="search-button-doador">
                                        <img src="/src/assets/icone_lupa.png" alt="Ícone de busca" className="icon" />
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

export default Doador;
