import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Acessa a função de login do contexto

  const handleLogin = (e) => {
      e.preventDefault();
      login(); // Atualiza o estado para autenticado
      navigate('/home');
  };

  return (
    <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
            <img src="src/assets/aaps_logo1.png" alt="aaps-logo1" className="login-image" />
            <div className="form-group">
                <label htmlFor="usuario">Usuário</label>
                <input type="text" id="usuario" placeholder="Digite seu usuário" required />
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
