import React from 'react';
import './animal.css';
import {Link} from "react-router-dom";
import api from "../../services/api"

import { useEffect, useState } from 'react';

const Animal = () => {

    const [animais, setarAnimais] = useState([]);

    async function ObterAnimais(){
       const animaisApi = await api.get('api/Animal/ObterAnimais/ObterTodos');

       setarAnimais(animaisApi.data);
    }

    useEffect(() => {
        ObterAnimais()
    }, []);

    return(
        <div className="container">
            <div className="toolbar">
                <Link to='/cadastro-animal' style={{ textDecoration: 'none' }}>
                <button className="button-cadastrar">
                    <div>
                        <img src="/src/assets/icone_cadastrar.png" onc alt="Ícone de sucesso" className="icon" />
                        Cadastrar
                    </div>
                </button></Link>
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
                        <th>Espécie</th>
                        <th>Sexo</th>
                        <th>Idade</th>
                    </tr>
                </thead>
                <tbody>
                    {animais.map((animal) => (
                        <tr key={animal.id}>
                            <td>{animal.id}</td>
                            <td>{animal.nome}</td>
                            <td>{animal.especie}</td>
                            <td>{animal.sexo}</td>
                            <td>{new Date().getFullYear() - new Date(animal.dataNascimento).getFullYear()}</td>
                            <td>
                                <button className="search-button" to={"/altera-animal"}>
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