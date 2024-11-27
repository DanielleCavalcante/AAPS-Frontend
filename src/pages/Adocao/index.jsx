import React from 'react';
import { Link } from "react-router-dom";
import './adocao.css';

const Adocao = () => {
    return(
        <div className="container-adocao">
            <div className="toolbar-adocao">
                <Link to='/cadastro-adocao' style={{ textDecoration: 'none' }}>
                    <button className="button-cadastrar-adocao">
                        <div>
                            <img src="/src/assets/icone_cadastrar.png" alt="Ícone de sucesso" className="icon" />
                            Cadastrar
                        </div>
                    </button>
                </Link>
                <div className="search-bar-adocao">
                    <input type="text"/>
                    <button className="search-button-adocao">
                        <img src="/src/assets/icone_lupa.png" alt="Ícone de busca" className="icon" />
                    </button>
                </div>
                <select id="filtro" name="opcoesFiltro">
                    <option value="1">Filtros</option>
                    <option value="2">Código</option>
                    <option value="3">Nome adotante</option>
                    <option value="3">Nome animal</option>
                </select>
            </div>
            
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome adotante</th>
                        <th>Nome animal</th>
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
                                <Link to='/altera-adocao'>
                                    <button className="search-button-adocao">
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

export default Adocao;
