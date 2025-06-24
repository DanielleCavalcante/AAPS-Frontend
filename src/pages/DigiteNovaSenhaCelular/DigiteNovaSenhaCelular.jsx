import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '/src/components/Modal/Modal.jsx';
import logo from "/src/assets/aaps_logo1.png";
import iconeSmile from "/src/assets/emoji-smile.png";
import './DigiteNovaSenhaCelular.css';

const DigiteNovaSenhaCelular = () => {
    const handleSubmit = (event) => {
        event.preventDefault(); 
    };

    const navigate = useNavigate();

      //implementação de modal senha alterada com sucesso:
      const [showModal, setShowModal] = useState(false);
      const openModal = () => setShowModal(true);
      const closeModal = () => {
        setShowModal(false);
        console.log("Senha alterada!");
        navigate('/'); //redireciona para a página de login.
      }
    

    return (
        <div className="redefinir-senha-container">
            <form className="redefinir-senha-form" onSubmit={handleSubmit}>
                <img src={logo} alt="aaps-logo1" className="redefinir-login-image" />
                <div className="redefinir-form-group">
                    <label htmlFor="esqueciSenha">Redefinir senha</label>
                    <span>Por favor, digite a nova senha</span>
                </div>

                <div className="redefinir-form-group">
                    <label htmlFor="novasenha" id="redefinir-senha">Nova senha *</label>
                    <input id="novasenha" name="novasenha" />
                </div>

                <div className="redefinir-form-group">
                    <label htmlFor="repitasenha" id="redefinir-senha">Repita a nova senha *</label>
                    <input id="repitasenha" name="repitasenha" />
                </div>

                <div className="button-group">
                    <button type="submit" className="btn-redefinir-senha" onClick={openModal}>Redefinir</button>
                </div>
            </form>

                  {showModal && (
                    <Modal show={showModal} onClose={closeModal}>
                      <img src={iconeSmile} alt="Ícone de sucesso" className="icon" />
                      <p>Sua senha foi redefinida com sucesso! Realize o login.</p>
                    </Modal>
                  )}
        </div>
    );
};

export default DigiteNovaSenhaCelular;