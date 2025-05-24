import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { validarCPF } from '../../../utils/ValidaCPF';
import { validarNome } from '../../../utils/ValidaNome';


import { useVoluntarios } from '../../../hooks/useVoluntarios';
import { useError } from '../../../hooks/useError';

import BotaoSalvar from "/src/components/BotaoSalvar/BotaoSalvar.jsx";
import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoLimpar from "/src/components/BotaoLimpar/BotaoLimpar.jsx";
import './CadastrarVoluntario.css';

const CadastroVoluntario = () => {
    const { criarVoluntario } = useVoluntarios();
    const [dadosVoluntario, setDadosVoluntario] = useState({ 
        nome: '', 
        cpf: '', 
        status: '',
        userName: '',
        email: '',
        phoneNumber: '', 
        acesso: 'Padrao'
    });

    const { erro, tratarErro, limparErro } = useError();
    const [tentouEnviar, setTentouEnviar] = useState(false);
    const [erroCPF, setErroCPF] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        limparErro();

        //Chama a validação do CPF
        if (id === 'cpf') {
            // Remove caracteres não numéricos
            const cpfLimpo = value.replace(/[^\d]+/g, '');

            // Se CPF tiver exatamente 11 dígitos, faz a validação
            if (cpfLimpo.length === 11) {
                if (!validarCPF(cpfLimpo)) {
                    setErroCPF('Eita! CPF inválido');
                } else {
                    setErroCPF('');
                }
            } 
            else {
                // Enquanto não tiver 11 dígitos, não mostra erro
                setErroCPF('');
            }
        }

        setDadosVoluntario({
            ...dadosVoluntario,
            [id]: id === 'status' && value !== '' ? Number(value) : value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setTentouEnviar(true); 
        limparErro();

        const cpfLimpo = dadosVoluntario.cpf.replace(/[^\d]+/g, '');
        if (!validarCPF(cpfLimpo)) {
            setErroCPF('Eita! CPF inválido');
            return;
        }

        try {
            await criarVoluntario(dadosVoluntario);
            setDadosVoluntario({ 
                nome: '', 
                cpf: '', 
                status: '',
                userName: '',
                email: '',
                phoneNumber: '', 
                acesso: 'Padrao'
             });
            setTentouEnviar(false);
            openModal();
        } catch (error) {
            tratarErro(error);
        }
    };
   
    //configurações de modal
    const [showModal, setShowModal] = useState(false);
    const [botaoAtivo, setBotaoAtivo] = useState(false);

    const closeModal = () => setShowModal(false);
    const openModal = () => {
        // const tipo = document.getElementById('tipo').value;
        // const nome = document.getElementById('nome').value;
        // const cpf = document.getElementById('cpf').value;
        // const celular = document.getElementById('celular').value;
        // const senha = document.getElementById('senha').value;

        // // Verifica se todos os campos estão preenchidos
        // if (tipo && nome && cpf && celular && senha) {
            setShowModal(true);
        // } else {
        //     return null;
        // }
    };

    return (
        <div className="cadastro-container">
            <form className="cadastroVoluntario-form" onSubmit={handleSubmit} >

                <div className='cadastroVoluntario-linha'>
                    <div className="form-group">
                        <label htmlFor="id">Código</label>
                        <input type="text" id="codigo" disabled />
                    </div>

                    <div className="form-group">
                        <label htmlFor="acesso">Acesso</label>
                        <select 
                            id="acesso" 
                            name="acesso"
                            value={dadosVoluntario.acesso}
                            onChange={handleChange}
                            required // ver se vai tirar
                        >
                            <option value="">Selecione</option>
                            <option value="Padrao">Voluntário</option>
                            <option value="Admin">Administrador</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input 
                        type="text"
                        id="nome" 
                        name='nome'
                        maxLength={50} //verificar tamanho maximo.
                        value={dadosVoluntario.nome}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                            if (!validarNome(e.key) && e.key.length === 1) {
                            e.preventDefault();
                            }
                        }}
                        placeholder="Digite o nome do voluntário" 
                        required // ver se vai tirar
                    />
                </div>

                <div className='cadastroVoluntario-linha'>
                    <div className="form-group">
                        <label htmlFor="userName">Nome de Usuário</label>
                        <input 
                            type="text"
                            id="userName" 
                            name='userName'
                            value={dadosVoluntario.userName}
                            onChange={handleChange}
                            placeholder="Digite o nome de usuário do voluntário" 
                            required // ver se vai tirar
                       />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cpf">CPF</label>
                            <InputMask
                                mask="999.999.999-99"
                                value={dadosVoluntario.cpf}
                                onChange={handleChange}
                                placeholder="___.___.___-__"
                                required
                            >
                                {(inputProps) => (
                                <input
                                    {...inputProps}
                                    id="cpf"
                                    name="cpf"
                                    type="text"
                                    className={erroCPF ? 'input-error' : ''}
                                />
                                )}
                            </InputMask>
                            {erroCPF && <span className="error">{erroCPF}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="celular">Celular</label>
                        <InputMask
                            mask="(99) 99999-9999"
                            value={dadosVoluntario.phoneNumber}
                            onChange={handleChange}
                            placeholder="(__) _____-____"
                            required
                        >
                            {(inputProps) => (
                            <input
                                {...inputProps}
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                            />
                            )}
                        </InputMask>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text"
                        id="email" 
                        name='email'
                        value={dadosVoluntario.email}
                        onChange={handleChange}
                        placeholder="Digite o email do voluntário" 
                        required // ver se vai tirar
                    />
                </div>

                <div id="group-animal1">

                    {/* <div className="form-group">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="text"
                            id="senha"
                            name='senha'
                            placeholder="Digite a senha provisória do voluntário"
                            required
                        />
                    </div> */}
                    {/* <div className="form-group">

                    </div> */}
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select 
                            id="status" 
                            name="status"
                            value={dadosVoluntario.status}
                            onChange={handleChange}
                            required // ver se vai tirar
                        >
                            <option value="">Selecione</option>
                            <option value={1}>Ativo</option>
                            <option value={0}>Inativo</option>
                        </select>
                    </div>
                </div>


                <div className="button-group-crud">
                    <BotaoSalvar showModal={showModal} openModal={handleSubmit} closeModal={closeModal} />
                    <BotaoCancelar />
                    <BotaoLimpar />
                </div>
            </form>
        </div>
    );
}

export default CadastroVoluntario;