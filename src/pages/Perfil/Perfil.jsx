import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Perfil.css';

const Perfil = () => {

    return (
        <div className="cadastro-container">
            <form className="perfil-form" >


                <div className="form-group">
                    <label htmlFor="codigo">Código</label>
                    <input type="text" id="codigo" />
                </div>

                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" />
                </div>

                <div id="group-adocao2">
                    <div className="form-group">
                        <label htmlFor="cpf">CPF</label>
                        <input type="text" id="cpf" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="celular">Celular</label>
                        <input type="text" id="celular" />
                    </div>
                </div>
                <div className="button-group-crud">
                    <div className="form-group">
                        <button className="btn-resetar-senha">
                            <Link to='/alterar-senha'>
                            <img src="/src/assets/icone_senha.png" alt="Ícone senha" className="icon" /> 
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
                            <img src="/src/assets/icone_sair.png" alt="Ícone sair" className="icon" /> 
                            <span> Sair</span>
                        </button>
                    </div>
                </div>

            </form >
        </div >
    );
};

export default Perfil;
