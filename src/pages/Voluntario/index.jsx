import React from 'react';
import { useNavigate } from 'react-router-dom';
import './voluntario.css';

const Voluntario = () => {
    const navigate = useNavigate();
    const cadastro= (e) => {
      e.preventDefault();
      navigate('/cadastroVoluntario');
    };

    return(
        <div className="container">
            <div className="toolbar">
                <button className="button-cadastrar" onClick={cadastro}>Cadastrar</button>
                <div className="search-bar">
                    <input type="text" placeholder="Buscar" />
                    <button className="search-button">
                        <img src="/src/assets/icone_lupa.png" onc alt="Ícone de sucesso" className="icon" />
                    </button>
                </div>
                <button className="button-filtros">Filtros ⬇️</button>
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
                    {[...Array(5)].map((_, index) => (
                        <tr key={index}>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <button className="search-button">
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

export default Voluntario;