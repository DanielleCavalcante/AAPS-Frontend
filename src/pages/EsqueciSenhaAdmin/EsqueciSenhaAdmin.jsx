import InputMask from 'react-input-mask';
import React from 'react';
import Modal from "/src/components/Modal/Modal.jsx";
import { useState } from 'react'
import { useEsqueciSenha } from '../../hooks/useEsqueciSenha';
import { useError } from '../../hooks/useError';
import { useNavigate } from 'react-router-dom';
import logoAaps from '/src/assets/aaps_logo1.png';
import './EsqueciSenhaAdmin.css';

const EsqueciSenhaAdmin = () => {
    const navigate = useNavigate();
    const { solicitarResetSenha } = useEsqueciSenha();
    const [dadosResetSenha, setdadosResetSenha] = useState({ userName: '', telefone: '' });

    const { erro, tratarErro, limparErro } = useError();
    const [tentouEnviar, setTentouEnviar] = useState(false);

    //implementação de modal:
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setShowModal(false);
        navigate('/');
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setdadosResetSenha((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setTentouEnviar(true);
        limparErro();
        const telefoneLimpo = dadosResetSenha.telefone.replace(/[^\d]+/g, '');
        try {
            dadosResetSenha.telefone = telefoneLimpo;
            await solicitarResetSenha(dadosResetSenha);
            setdadosResetSenha({ userName: '', telefone: '' });
            setTentouEnviar(false);
            openModal();
        } catch (error) {
            tratarErro(error);
        }
    };

    return (
        <div className="esqueci-senha-container">
            <form className="esqueci-senha-form" onSubmit={handleSubmit}>
                <img src={logoAaps} alt="aaps-logo1" className="esqueci-login-image" />
                <div className="esqueci-form-group">
                    <label htmlFor="esqueciSenha">Esqueci minha senha</label>
                    <span>Confirme o número do seu celular com DDD para enviar uma solicitação de redefinição de senha para o administrador</span>
                </div>

                <div className="esqueci-form-group">
                    <label name="celular-senha" htmlFor="telefone" id="celular">DDD + celular</label>
                    <InputMask
                        mask="(99)99999-9999"
                        value={dadosResetSenha.telefone}
                        onChange={handleInputChange}
                        placeholder="(__)_____-____"
                        required>
                        {(inputProps) => (
                            <input
                                {...inputProps}
                                id="telefone"
                                name="telefone"
                                type="text"
                            />
                        )}
                    </InputMask>
                    {/* <input
                        type="text"
                        id="telefone"
                        name="telefone"
                        value={dadosResetSenha.telefone}
                        onChange={handleInputChange}
                        placeholder="Ex: 11 91234-5678"
                    /> */}

                    {(tentouEnviar && !dadosResetSenha.telefone) && (
                        <span className="erro-required"> O campo 'Celular' é obrigatório </span>
                    )}

                    <label name="userName" htmlFor="userName" id="celular">Nome de Usuário</label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={dadosResetSenha.userName}
                        onChange={handleInputChange}
                        placeholder="Ex: nome.sobrenome"
                    />

                    {(tentouEnviar && !dadosResetSenha.userName) && (
                        <span className="erro-required"> O campo 'Nome de Usuário' é obrigatório </span>
                    )}
                </div>

                <div className="button-group">
                    <button type="submit" className="btn-alterar-senha">Enviar</button>
                </div>
            </form>
            {showModal && (
                <Modal show={showModal} onClose={closeModal}>
                    <img src="/src/assets/emoji-smile.png" alt="Ícone de sucesso" className="icon" />
                    <p>Solicitação enviada com sucesso!</p>
                    <p>Aguarde o contato do administrador.</p>
                </Modal>
            )}
        </div>
    );
};

export default EsqueciSenhaAdmin;
