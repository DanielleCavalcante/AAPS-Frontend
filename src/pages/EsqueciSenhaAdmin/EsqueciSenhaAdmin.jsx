import InputMask from 'react-input-mask';
import React from 'react';
import Modal from "/src/components/Modal/Modal.jsx";
import AlertAtencao from "/src/components/AlertAtencao/AlertAtencao.jsx";
import { useState, useEffect, useRef } from 'react'
import { useEsqueciSenha } from '../../hooks/useEsqueciSenha';
import { useError } from '../../hooks/useError';
import { useNavigate } from 'react-router-dom';
import logoAaps from '/src/assets/aaps_logo1.png';
import iconeSmile from "/src/assets/emoji-smile.png"
import CarregandoCat from '../../components/Spinner/CarregandoCat';
import './EsqueciSenhaAdmin.css';

const EsqueciSenhaAdmin = () => {
    const navigate = useNavigate();
    const { solicitarResetSenha } = useEsqueciSenha();
    const [dadosResetSenha, setdadosResetSenha] = useState({ userName: '', telefone: '' });

    const { erro, tratarErro, limparErro } = useError();
    const [tentouEnviar, setTentouEnviar] = useState(false);

    const [carregandoSolicitacao, setcarregandoSolicitacao] = useState(false);

    const [alertAtencao, setAlertAtencao] = useState(false);
    const [alertMensagem, setAlertMensagem] = useState('');
    const [campoAtencao, setCampoAtencao] = useState('');
    const telefoneRef = useRef(null);
    const userNameRef = useRef(null);

    //implementação de modal:
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setShowModal(false);
        navigate('/');
    }

    // useEffect(() => {
    //     if (alertAtencao) {
    //         // Fecha o alert após 5 segundos (5000 ms)
    //         const timer = setTimeout(() => {
    //             fecharAlertaEFocarCampos({
    //                 telefone: telefoneRef,
    //                 userName: userNameRef,
    //             });
    //         }, 5000);

    //         // Limpa o timer caso o componente seja desmontado ou o alertAtencao mude
    //         return () => clearTimeout(timer);
    //     }
    // }, [alertAtencao]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTentouEnviar(false);
        setdadosResetSenha((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setTentouEnviar(true);
        const telefoneLimpo = dadosResetSenha.telefone.replace(/[^\d]+/g, '');
        limparErro();
        setcarregandoSolicitacao(true);
        try {
            dadosResetSenha.telefone = telefoneLimpo;
            await solicitarResetSenha(dadosResetSenha);
            limparErro();
            setTentouEnviar(false);
            setdadosResetSenha({ userName: '', telefone: '' });
            openModal();
        } catch (error) {
            setCampoAtencao('telefone');
            setAlertMensagem('Dados inválidos. Tente novamente!');
            setAlertAtencao(true);
            // alert(error.mensagem);
            // tratarErro(error);
        }
        finally{
            setcarregandoSolicitacao(false);
            setTentouEnviar(false);
        }
    };

    const fecharAlertaEFocarCampos = (refs) => {
        setAlertAtencao(false);

        // Limpa estado
        setdadosResetSenha(prev => Object.fromEntries(
            Object.keys(refs).map(chave => [chave, ''])
        ));

        // Limpa os inputs
        Object.values(refs).forEach(ref => {
            if (ref.current) ref.current.value = '';
        });
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
                    <label name="celular-senha" htmlFor="telefone" id="celular">DDD + celular *</label>
                    <InputMask
                        mask="(99)99999-9999"
                        value={dadosResetSenha.telefone}
                        onChange={handleInputChange}
                        placeholder="(__)_____-____"
                        required
                        disabled={alertAtencao}>
                        {(inputProps) => (
                            <input
                                {...inputProps}
                                id="telefone"
                                name="telefone"
                                type="text"
                                disabled={alertAtencao}
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

                    <label name="userName" htmlFor="userName" id="celular">Nome de Usuário *</label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={dadosResetSenha.userName}
                        onChange={handleInputChange}
                        placeholder="Ex: nome.sobrenome"
                        disabled={alertAtencao} 
                    />

                    {(tentouEnviar && !dadosResetSenha.userName) && (
                        <span className="erro-required"> O campo 'Nome de Usuário' é obrigatório </span>
                    )}

                    {carregandoSolicitacao && <CarregandoCat />}
                </div>

                <div className="button-group">
                    <button type="submit" className="btn-alterar-senha">Enviar</button>
                </div>
            </form>
            {showModal && (
                <Modal show={showModal} onClose={closeModal}>
                    <img src={iconeSmile} alt="Ícone de sucesso" className="icon" />
                    <p>Solicitação enviada com sucesso!</p>
                    <p>Aguarde o contato do administrador.</p>
                </Modal>
            )}

            {alertAtencao && (
                <AlertAtencao
                    mensagem={alertMensagem}
                    onClose={() => {
                        fecharAlertaEFocarCampos({
                            telefone: telefoneRef,
                            userName: userNameRef
                        });
                    }}
                />
            )}
        </div>
    );
};

export default EsqueciSenhaAdmin;
