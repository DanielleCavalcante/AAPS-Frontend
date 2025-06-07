import React,  { useState }  from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from "../../hooks/useAuth"; 
import { useError } from '../../hooks/useError';
import { useLoading } from '../../hooks/useLoading';

import CarregandoLogin from '../../components/Spinner/CarregandoLogin';
import logo from '../../assets/aaps_logo1.png';
import './Login.css';

const Login = () => {
  const { login } = useAuth();

  const [credentials, setCredentials] = useState({ userName: "", senha: "" });

  const { erro, tratarErro, limparErro } = useError();
  const [tentouEnviar, setTentouEnviar] = useState(false);
  const { carregando, iniciarCarregamento, finalizarCarregamento } = useLoading();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    limparErro();
    setTentouEnviar(false); 
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setTentouEnviar(true); 

    iniciarCarregamento();
    try {
      await login(credentials);
      setCredentials({ userName: "", senha: "" });
      setTentouEnviar(false);
    } catch (error) {
      tratarErro(error);
    } finally {
      finalizarCarregamento();
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
        ) : carregando ? (
          <CarregandoLogin />
        ) : erro && tentouEnviar ? (
          <span className="erro-reset-senha">{erro}</span>
        ) : null}

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
