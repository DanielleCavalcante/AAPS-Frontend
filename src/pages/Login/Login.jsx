import React,  { useState }  from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from "../../hooks/useAuth"; 
import { useError } from '../../hooks/useError';

import logo from '../../assets/aaps_logo1.png';
import './login.css';

const Login = () => {
  const { login } = useAuth();

  const [credentials, setCredentials] = useState({ userName: "", senha: "" });

  const { erro, tratarErro, limparErro } = useError();
  const [tentouEnviar, setTentouEnviar] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    limparErro();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setTentouEnviar(true); 
    try {
      await login(credentials);
      setCredentials({ userName: "", senha: "" });
      setTentouEnviar(false);
    } catch (error) {
      tratarErro(error);
    }
  };

  /*const handleForgotPassword = () => {
    navigate('/esqueci-senha');
  };*/

    const handleForgotPassword = () => {
    navigate('/esqueci-senha-admin');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <img src={logo} alt="Logo AAPS" className="login-image" />
        <div className="form-group">
          <label htmlFor="userName">Usuário</label>
          <input 
            type="text" 
            id="userName" 
            name ="userName"
            placeholder="Digite seu usuário" 
            value={credentials.userName}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="senha"
            name ="senha"
            placeholder="Digite sua senha"
            value={credentials.senha}
            onChange={handleChange}
          />
        </div>

        {/* {erro && <span className="erro-required">{erro}</span>}*/}

        {tentouEnviar && (!credentials.userName || !credentials.senha) ? (
            <span className="erro-required">Preencha todos os campos!</span>
        ) : (
            erro && <span className="erro-reset-senha">{erro}</span>
        )}

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
