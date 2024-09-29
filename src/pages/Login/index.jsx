import React from 'react';
import './style.css';

function Login() {
  return (
    <div className="login-container">
      <form className="login-form">
      <img src="src/assets/aaps_logo1.png" alt="aaps-logo1" className="login-image" />
        <div className="form-group">
          <label htmlFor="usuario">Usuário</label>
          <input type="usuario" id="usuario" placeholder="Digite seu usuário" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" placeholder="Digite sua senha" required />
        </div>
        <div className="button-group">
          <button type="submit" className="btn-login">Entrar</button>
          <button type="button" className="btn-forgot">Esqueceu a senha?</button>
        </div>
      </form>
    </div>
  );
}

export default Login;