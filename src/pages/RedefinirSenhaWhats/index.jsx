import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './redefinirSenhaWhats.css';
import Modal from '/src/components/Modal';

const RedefinirSenhaWhats = () => {
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
                    <button type="submit" className="btn-redefinir-senha" onClick={openModal}>Redefinir</button>
                </div>
            </form>

                  {showModal && (
                    <Modal show={showModal} onClose={closeModal}>
                      <img src="/src/assets/emoji-smile.png" alt="Ícone de sucesso" className="icon" />
                      <p>Sua senha foi redefinida com sucesso! Realize o login.</p>
                    </Modal>
                  )}
        </div>
    );
};

export default RedefinirSenhaWhats;
