import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '/src/components/Modal/Modal.jsx';
import logo from "/src/assets/aaps_logo1.png"
import './RedefinirSenhaCodigo.css';

const RedefinirSenhaCodigo = () => {
    const handleSubmit = (event) => {
        event.preventDefault(); 
        navigate('/digitar-senha-celular'); //redireciona para a página de login.
    };

    const navigate = useNavigate();

      //implementação de modal senha alterada com sucesso:
      const [showModal, setShowModal] = useState(false);
      const openModal = () => setShowModal(true);
      const closeModal = () => {
        setShowModal(false);
        console.log("Senha alterada!");
        
      }
      
    

    return (
        <div className="redefinir-senha-container">
            <form className="redefinir-senha-form" onSubmit={handleSubmit}>
                <img src={logo} alt="aaps-logo1" className="redefinir-login-image" />
                <div className="redefinir-form-group">
                    <label htmlFor="esqueciSenha">Redefinir senha</label>
                    <span>Por favor, digite o código que recebeu pelo WhatsApp para redefinir a senha</span>
                </div>

                <div className="redefinir-form-group">
                    <label htmlFor="codigo" id="redefinir-codigo">Código</label>
                    <input name="codigo" />
                </div>

                <div className="button-group">
                    <button type="submit" className="btn-redefinir-senha">Redefinir</button>
                </div>

            </form>

        </div>
    );
};

export default RedefinirSenhaCodigo;