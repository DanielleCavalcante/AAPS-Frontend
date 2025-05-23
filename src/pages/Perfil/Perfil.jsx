import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useVoluntarios } from '../../hooks/useVoluntarios';
import { useAuth } from '../../hooks/useAuth';

import iconeSenha from '../../assets/icone_senha.png';
import iconeSair from '../../assets/icone_sair.png';
import './Perfil.css';

const Perfil = () => {
    const { id } = useParams();
    const { buscarPerfilPorId } = useVoluntarios();
    const [voluntario, setVoluntario] = useState(null);

    const { user } = useAuth();

    useEffect(() => {
        buscarPerfilPorId(id)
        .then((dados) => {
        const dadosFormatados = {
            ...dados,
            status: Number(dados.status)
        };
        setVoluntario(dadosFormatados);
        setFormDados(dadosFormatados);
        })
        .catch(console.error);
    }, [id]);

    return (
        <div className="cadastro-container">
            <form className="perfil-form" >
                <div className="form-group">
                    <label htmlFor="codigo">Código</label>
                    <input type="text" id="id" value={voluntario?.id || ''} disabled />
                </div>

                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input 
                        type="text" 
                        id="nome" 
                        name= "nome"
                        value={voluntario?.nome || ''}
                        disabled
                    />
                </div>

                <div id="group-adocao2">
                    <div className="form-group">
                        <label htmlFor="cpf">CPF</label>
                        <input 
                            type="text" 
                            id="cpf" 
                            name="cpf"
                            value={voluntario?.cpf || ''}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="celular">Celular</label>
                        <input 
                            type="text" 
                            id="celular-perfil" 
                            name="phoneNumber"
                            value={voluntario?.phoneNumber || ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="button-group-crud">
                    <div className="form-group">
                        <button className="btn-resetar-senha">
                            <Link to={`/alterar-senha/${user.usuarioId}`}>
                            <img src={iconeSenha} alt="Ícone senha" className="icon" /> 
                            </Link>
                            <span>alterar senha</span>
                        </button>
                    </div>
                    <div className="form-group">
                        <button
                            type="button"
                            className="btn-sair"
                            onClick={() => console.log('Sair clicado')}
                        >
                            <img src={iconeSair} alt="Ícone sair" className="icon" /> 
                            <span> Sair</span>
                        </button>
                    </div>
                </div>

            </form >
        </div >
    );
};

export default Perfil;
