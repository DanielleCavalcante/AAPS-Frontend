import { useState, useRef } from 'react';
import InputMask from 'react-input-mask';
import { validarCPF } from '../../../utils/ValidaCPF';
import { validarNome } from '../../../utils/ValidaNome';
import { validarTelefone } from '../../../utils/ValidaTelefone';
import { useVoluntarios } from '../../../hooks/useVoluntarios';
import { useError } from '../../../hooks/useError';
import { useNavigate } from 'react-router-dom';
import AlertAtencao from "/src/components/AlertAtencao/AlertAtencao.jsx";
import BotaoSalvar from "/src/components/BotaoSalvar/BotaoSalvar.jsx";
import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoLimpar from "/src/components/BotaoLimpar/BotaoLimpar.jsx";
import './CadastrarVoluntario.css';

const CadastroVoluntario = () => {
    const navigate = useNavigate();
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
    const [alertAtencao, setAlertAtencao] = useState(false);
    const [alertMensagem, setAlertMensagem] = useState('');
    const [campoAlerta, setCampoAlerta] = useState('');
    const cpfRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);

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
                    // setErroCPF('Eita! CPF inválido');
                    setCampoAlerta('cpf'); // ou 'email'
                    setAlertMensagem('CPF inválido. Insira novamente.');
                    setAlertAtencao(true);
                    // exibirAlerta('CPF inválido. Insira novamente.')
                    // setAlertAtencao(true);
                } 
                // else {
                //     setErroCPF('');
                // }
            }
            // else {
            //     // Enquanto não tiver 11 dígitos, não mostra erro
            //     setErroCPF('');
            // }
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

        //Chama validação de telefone
        if (!validarTelefone(dadosVoluntario.phoneNumber)) {
            setCampoAlerta('phoneNumber');
            setAlertMensagem('Número de celular inválido. Insira novamente.');
            setAlertAtencao(true);
            return;
        }

        if (!dadosVoluntario.email.includes('@')) {
            setCampoAlerta('email');
            setAlertMensagem('E-mail inválido. Insira novamente.');
            setAlertAtencao(true);
            return;
        }

        const cpfLimpo = dadosVoluntario.cpf.replace(/[^\d]+/g, '');

        if (cpfLimpo.length > 1 && cpfLimpo.length < 11) {
            setAlertAtencao(true);
        }

        if (!validarCPF(cpfLimpo)) {
            setCampoAlerta('cpf');
            setAlertMensagem('CPF inválido. Insira novamente.');
            setAlertAtencao(true);
            return;
        }

        try {
            dadosVoluntario.cpf = cpfLimpo; //enviar o cpf limpo (apenas numero) para criação do voluntário.
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

    // Configurações do modal
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {
        setShowModal(false);
        navigate('/listar-voluntarios');
    }
    const openModal = () => {
        setShowModal(true);
    };

    // const fecharAlertaEFocarCPF = () => {
    //     setAlertAtencao(false);
    //     setDadosVoluntario(prev => ({ ...prev, cpf: '' }));  // limpa o CPF no estado
    //     if (cpfRef.current) {
    //         cpfRef.current.value = '';
    //         cpfRef.current.focus();
    //     }
    // };

    const fecharAlertaEFocarCampo = (campoRef, campo) => {
        setAlertAtencao(false);
        setDadosVoluntario(prev => ({ ...prev, [campo]: '' }));  // limpa o valor no estado

        if (campoRef.current) {
            campoRef.current.value = '';   // limpa o input na tela
            campoRef.current.focus();      // foca no campo
        }
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
                        >
                            <option value="">Selecione</option>
                            <option value="Padrao">Voluntário</option>
                            <option value="Admin">Administrador</option>
                        </select>

                        {(tentouEnviar && !dadosVoluntario.acesso) && (
                            <span className="erro-required"> O campo 'Acesso' é obrigatório </span>
                        )}
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
                    />

                    {(tentouEnviar && !dadosVoluntario.nome) && (
                        <span className="erro-required"> O campo 'Nome' é obrigatório </span>
                    )}
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
                        />

                        {(tentouEnviar && !dadosVoluntario.userName) && (
                            <span className="erro-required"> O campo 'Nome de Usuário' é obrigatório </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="cpf">CPF</label>
                        {/* <input 
                            type="text" 
                            id="cpf" 
                            name='cpf'
                            value={dadosVoluntario.cpf}
                            onChange={handleChange}
                            placeholder="Digite o CPF do voluntário" 
                        /> */}
                        <InputMask
                            mask="999.999.999-99"
                            value={dadosVoluntario.cpf}
                            onChange={handleChange}
                            placeholder="___.___.___-__"
                            required>
                            {(inputProps) => (
                                <input
                                    {...inputProps}
                                    id="cpf"
                                    name="cpf"
                                    type="text"
                                    ref={cpfRef}
                                    className={erroCPF ? 'input-error' : ''}
                                />
                            )}
                        </InputMask>
                        {erroCPF && <span className="error">{erroCPF}</span>}
                        {(tentouEnviar && !dadosVoluntario.cpf) && (
                            <span className="erro-required"> O campo 'CPF' é obrigatório </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="celular">Celular</label>
                        {/* <input 
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={dadosVoluntario.phoneNumber}
                            onChange={handleChange}
                        /> */}
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
                                    ref={phoneRef}
                                />
                            )}
                        </InputMask>
                        {(tentouEnviar && !dadosVoluntario.phoneNumber) && (
                            <span className="erro-required"> O campo 'Celular' é obrigatório </span>
                        )}
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
                        ref={emailRef}
                        required // ver se vai tirar
                    />

                    {(tentouEnviar && !dadosVoluntario.email) && (
                        <span className="erro-required"> O campo 'Email' é obrigatório </span>
                    )}
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

                        {(tentouEnviar && !dadosVoluntario.status) && (
                            <span className="erro-required"> O campo 'Status' é obrigatório </span>
                        )}
                    </div>
                </div>


                <div className="button-group-crud">
                    <BotaoSalvar showModal={showModal} openModal={handleSubmit} closeModal={closeModal} />
                    <BotaoCancelar />
                    <BotaoLimpar />
                </div>
            </form>
            {alertAtencao && (
                <AlertAtencao
                    mensagem={alertMensagem}
                    onClose={() => {
                        const refs = {
                            cpf: cpfRef,
                            email: emailRef,
                            phoneNumber: phoneRef
                        };
                        fecharAlertaEFocarCampo(refs[campoAlerta], campoAlerta);
                    }}
                />
            )}
            {/* {alertAtencao && (
                <AlertAtencao
                    mensagem="CPF inválido. Insira novamente."
                    onClose={fecharAlertaEFocarCPF}
                />
            )} */}
        </div>
    );
}

export default CadastroVoluntario;