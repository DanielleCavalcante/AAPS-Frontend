import React, { useState } from 'react';

import { useVoluntarios } from '../../hooks/useVoluntarios';

import AlertAtencao from "/src/components/AlertAtencao/AlertAtencao.jsx";
import CarregandoCat from '../../components/Spinner/CarregandoCat';
import logo from '../../assets/aaps_logo1.png';
import './AlterarSenha.css';

const AlterarSenha = () => {
    const { alterarSenha, erro, tratarErro, limparErro } = useVoluntarios();

    const voluntarioId = parseInt(localStorage.getItem('usuarioId'));    

    const [dadosSenha, setDadosSenha] = useState({
        senhaAtual: '',
        novaSenha: '',
        confirmarNovaSenha: ''
    });
    
    const [tentouEnviar, setTentouEnviar] = useState(false);
    const [alertAtencao, setAlertAtencao] = useState(false);
    const [carregandoAlterarSenha, setCarregandoAlterarSenha] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setTentouEnviar(false);
        setAlertAtencao(false);
        setDadosSenha({
            ...dadosSenha,
            [id]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!dadosSenha.senhaAtual || !dadosSenha.novaSenha || !dadosSenha.confirmarNovaSenha){
            setTentouEnviar(true);
            return
        }

        try {
            setAlertAtencao(false);
            setCarregandoAlterarSenha(true);

            await alterarSenha(voluntarioId, dadosSenha);

            setDadosSenha({ senhaAtual: '', novaSenha: '', confirmarNovaSenha: '' });
            setTentouEnviar(false);
        }catch (error) {
            tratarErro(error);
            setAlertAtencao(true);
        }finally{
            setCarregandoAlterarSenha(false);
        }
    };

    return (
        <div className="altera-senha-container">
            <form className="altera-senha-form" onSubmit={handleSubmit}>
                <img src={logo} alt="aaps-logo1" className="login-image" />

                <div className="form-group">
                    <label htmlFor="senhaAtual">Senha atual</label>
                    <input
                        type="password"
                        id="senhaAtual"
                        value={dadosSenha.senhaAtual}
                        onChange={handleChange}
                        placeholder="Digite sua senha atual"
                    />
                    {tentouEnviar && !dadosSenha.senhaAtual && (
                        <span className="erro-required">O campo 'Senha atual' é obrigatório.</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="novaSenha">Nova senha</label>
                    <input
                        type="password"
                        id="novaSenha"
                        value={dadosSenha.novaSenha}
                        onChange={handleChange}
                        placeholder="Digite a nova senha"
                    />
                    {tentouEnviar && !dadosSenha.novaSenha && (
                        <span className="erro-required">O campo 'Nova senha' é obrigatório.</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="confirmarNovaSenha">Confirmar nova senha</label>
                    <input
                        type="password"
                        id="confirmarNovaSenha"
                        value={dadosSenha.confirmarNovaSenha}
                        onChange={handleChange}
                        placeholder="Confirme a nova senha"
                    />
                    {tentouEnviar && !dadosSenha.confirmarNovaSenha && (
                        <span className="erro-required">O campo 'Confirmar nova senha' é obrigatório.</span>
                    )}
                </div>

                {alertAtencao && (
                    <AlertAtencao
                        mensagem={Array.isArray(erro) ? erro[0] : erro}
                        onClose={() => setAlertAtencao(false)}
                    />
                )}

                {carregandoAlterarSenha && <CarregandoCat />}

                <div className="button-group">
                    <button type="submit" className="btn-alterar-senha">Alterar senha</button>
                </div>
            </form>
        </div>
    );
}

export default AlterarSenha;
