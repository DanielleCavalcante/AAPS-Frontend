import React, { useState } from 'react';
import './perfil.css';

const Perfil = () => {



    return (
        <div className="cadastro-container">
            <form className="perfil-form" >


                <div className="form-group">
                    <label htmlFor="codigo">Código</label>
                    <input type="text" id="codigo" placeholder="Digite o nome do voluntário" required />
                </div>

                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" placeholder="Digite o nome do voluntário" required />
                </div>

                <div id="group-adocao2">
                    <div className="form-group">
                        <label htmlFor="cpf">CPF</label>
                        <input type="text" id="cpf" placeholder="Digite o nome do voluntário" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="celular">Celular</label>
                        <input type="text" id="celular" placeholder="Digite o nome do voluntário" required />
                    </div>
                </div>
                <div className="button-group-crud">
                <div className="form-group">
                        <button
                            type="button"
                            className="botao-resetar-senha"
                            onClick={resetarSenha}
                        >
                            alterar senha
                        </button>
                    </div>
                    <div className="form-group">
                        <button
                            type="button"
                            className="botao-resetar-senha"
                            onClick={resetarSenha}
                        >
                            sair
                        </button>
                    </div>
                </div>

            </form >
        </div >
    );
};

export default Perfil;
