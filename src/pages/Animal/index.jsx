import React from 'react';
import { useNavigate } from 'react-router-dom';
import './animal.css';

const Animal = () => {
    const navigate = useNavigate();
    
    const cadastro= (e) => {
      e.preventDefault();
      navigate('/cadastroAnimal');
    };

    const altera= (e) => {
        e.preventDefault();
        navigate('/alteraAnimal');
      };

    return(
        <div className="container">
            <div className="toolbar">
                <button className="button-cadastrar" onClick={cadastro}>
                    <div>
                        <img src="/src/assets/icone_cadastrar.png" onc alt="Ícone de sucesso" className="icon" />
                        Cadastrar
                    </div>
                </button>
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
                    {[...Array(5)].map((_, index) => (
                        <tr key={index}>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <button className="search-button" onClick={altera}>
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

export default Animal;