import React from 'react';
import './redefinirSenhaWhats.css';

const RedefinirSenhaWhats = () => {
    const handleSubmit = (event) => {
        event.preventDefault(); 
    };

    return (
        <div className="redefinir-senha-container">
            <form className="redefinir-senha-form" onSubmit={handleSubmit}>
                <img src="src/assets/aaps_logo1.png" alt="aaps-logo1" className="redefinir-login-image" />
                <div className="redefinir-form-group">
                    <label htmlFor="esqueciSenha">Redefinir senha</label>
                    <span>Por favor, digite o código que recebeu pelo WhatsApp e redefina a senha</span>
                </div>

                <div className="redefinir-form-group">
                    <label htmlFor="codigo" id="redefinir-codigo">Código</label>
                    <input name="codigo" />
                </div>

                <div className="redefinir-form-group">
                    <label htmlFor="novasenha" id="redefinir-senha">Nova senha</label>
                    <input id="novasenha" name="novasenha" />
                </div>

                <div className="redefinir-form-group">
                    <label htmlFor="repitasenha" id="redefinir-senha">Repita a nova senha</label>
                    <input id="repitasenha" name="repitasenha" />
                </div>

                <div className="button-group">
                    <button type="submit" className="btn-redefinir-senha">Redefinir</button>
                </div>
            </form>
        </div>
    );
};

export default RedefinirSenhaWhats;
