import React,  { useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth"; 
import logo from '../../assets/aaps_logo1.png';
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ userName: "", senha: "" });
  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!credentials.userName || !credentials.senha) {
      setErro("Por favor, preencha todos os campos");
      return;
    }
    try {
      await login(credentials);
    } catch (error) {
      setErro("Usuário ou senha incorretos");
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
          <label htmlFor="userName">Usuário</label>
          <input 
            type="text" 
            id="userName" 
            name ="userName"
            placeholder="Digite seu usuário" 
            value={credentials.userName}
            onChange={handleChange}
            required 
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
