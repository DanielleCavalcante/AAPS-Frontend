import { useState } from 'react'

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

    const handleChange = (e) => {
        const { id, value } = e.target;
        limparErro();
        setDadosVoluntario({
            ...dadosVoluntario,
            [id]: id === 'status' && value !== '' ? Number(value) : value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setTentouEnviar(true); 
        limparErro();
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
        } catch (error) {
            tratarErro(error);
        }
    };
   
    //configurações de modal
    const [showModal, setShowModal] = useState(false);
    const [botaoAtivo, setBotaoAtivo] = useState(false);

    const closeModal = () => setShowModal(false);
    const openModal = () => {
        const tipo = document.getElementById('tipo').value;
        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const celular = document.getElementById('celular').value;
        const senha = document.getElementById('senha').value;

        // Verifica se todos os campos estão preenchidos
        if (tipo && nome && cpf && celular && senha) {
            setShowModal(true);
        } else {
            return null;
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
                        value={dadosVoluntario.nome}
                        onChange={handleChange}
                        placeholder="Digite o nome do voluntário" 
                        required // ver se vai tirar
                    />
                </div>

                <div className='cadastroVoluntario-linha'>
                    <div className="form-group">
                        <label htmlFor="cpf">CPF</label>
                        <input 
                            type="text" 
                            id="cpf" 
                            name='cpf'
                            value={dadosVoluntario.cpf}
                            onChange={handleChange}
                            placeholder="Digite o CPF do voluntário" 
                            required // ver se vai tirar
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="celular">Celular</label>
                        <input 
                            type="text" 
                            id="phoneNumber" 
                            name='phoneNumber'
                            value={dadosVoluntario.phoneNumber}
                            onChange={handleChange}
                            placeholder="Digite o celular do voluntário" 
                            required // ver se vai tirar
                        />
                    </div>
                </div>

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
                    <BotaoSalvar showModal={showModal} openModal={openModal} closeModal={closeModal} />
                    <BotaoCancelar />
                    <BotaoLimpar />
                </div>
            </form>
        </div>
    );
}

export default CadastroVoluntario;