import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/aaps_logo1.png';
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [userName, setUserName] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userName || !senha) {
      setErro('Por favor, preencha todos os campos');
      return;
    }

    try {
      await login(userName, senha);
      navigate('/home');
    } catch (error) {
      setErro('Usuário ou senha incorretos');
    }
  };

  const handleForgotPassword = () => {
    navigate('/esqueci-senha');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <img src={logo} alt="Logo AAPS" className="login-image" />

        <div className="form-group">
          <label htmlFor="usuario">Usuário</label>
          <input 
            type="text" 
            id="userName" 
            placeholder="Digite seu usuário" 
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        {erro && <div className="error-message">{erro}</div>}

        <div className="button-group">
          <button type="submit" className="btn-login">Entrar</button>
          <button type="button"className="btn-forgot" onClick={handleForgotPassword}>
            Esqueceu a senha?
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
