import React from 'react';
import './AlterarSenha.css';

const AlterarSenha = () => {
  return (

    <div className="altera-senha-container">
        <form className="altera-senha-form">
            <img src="src/assets/aaps_logo1.png" alt="aaps-logo1" className="login-image" />
            <div className="form-group">
                <label htmlFor="senha">Senha atual</label>
                <input type="password" id="password" />
            </div>
            <div className="form-group">
                <label htmlFor="senha">Nova senha</label>
                <input type="password" id="password" />
            </div>
            <div className="form-group">
                <label htmlFor="senha">Repita a nova senha</label>
                <input type="password" id="password" />
            </div>
            <div className="button-group">
                <button type="submit" className="btn-alterar-senha">Alterar senha</button>
            </div>
        </form>
    </div>
  );
}

export default AlterarSenha;
