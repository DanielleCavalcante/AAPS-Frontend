import React from 'react';
import { useAnimal } from '../../hooks/useAnimal';
import { Link } from "react-router-dom";
import './animal.css';

import { useEffect, useState } from 'react';

const Animal = () => {
    const { listarAnimais, carregando, erro } = useAnimal();
    const [animais, setAnimais] = useState([]);

    useEffect(() => {
        const carregarDados = async () => {
          const dados = await listarAnimais();
          if (dados) setAnimais(dados);
        };
        carregarDados();
      }, []);
    
      if (carregando) return <div>Carregando...</div>;
      if (erro) return <div className="erro">{erro}</div>;

    return(
        <div className="container">
            <div className="toolbar">
                <Link to='/cadastro-animal' style={{ textDecoration: 'none' }}>
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
                    <option value="2">Espécie</option>
                    <option value="3">Sexo</option>
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
                        <th>Ver</th>
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
                                <button className="search-button" to={"/visualiza-animal"}>
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