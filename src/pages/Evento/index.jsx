import React from 'react';
import { Link } from "react-router-dom";
import './evento.css';

const Evento = () => {
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
                    <input type="text"/>
                    <button className="search-button-evento">
                        <img src="/src/assets/icone_lupa.png" alt="Ícone de busca" className="icon" />
                    </button>
                </div>
                <select id="filtro" name="opcoesFiltro">
                    <option value="1">Filtros</option>
                    <option value="2">Código</option>
                    <option value="3">Nome</option>
                </select>
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
                                <Link to='/visualiza-evento'>
                                    <button className="search-button-evento">
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

export default Evento;
