import {useState} from 'react'
import './cadastroVoluntario.css';

import BotaoSalvar from "/src/components/BotaoSalvar";
import BotaoCancelar from "/src/components/BotaoCancelar";
import BotaoLimpar from "/src/components/BotaoLimpar";

const CadastroVoluntario = () => {

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

    // Função para redefinir a senha
    const resetarSenha = () => {
        document.getElementById('senha').value = '';
        alert("Senha redefinida com sucesso!");
    };

    // Função chamada ao clicar no botão Alterar
    const ativarBotaoSenha = () => {
        setBotaoAtivo(true); // Ativa o botão Redefinir Senha
    };


    function handleSubmit(event) {
        event.preventDefault();
        event.currentTarget.elements.tipo.value = 1;
        event.currentTarget.elements.nome.value = '';
        event.currentTarget.elements.cpf.value = '';
        event.currentTarget.elements.celular.value = '';
        event.currentTarget.elements.senha.value = '';
    }

    return (
        <div className="cadastro-container">
            <form className="cadastroVoluntario-form" onSubmit={handleSubmit} >

                <div className='cadastroVoluntario-linha'>
                    <div className="form-group">
                        <label htmlFor="codigo">Código</label>
                        <input type="text" id="codigo" disabled />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tipo">Tipo</label>
                        <select id="tipo" name="opcoesUsuario">
                            <option value="1">Voluntário</option>
                            <option value="2">Administrador</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" placeholder="Digite o nome do voluntário" required />
                </div>

                <div className='cadastroVoluntario-linha'>
                    <div className="form-group">
                        <label htmlFor="cpf">CPF</label>
                        <input type="text" id="cpf" placeholder="Digite o CPF do voluntário" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="celular">Celular</label>
                        <input type="text" id="celular" placeholder="Digite o celular do voluntário" required />
                    </div>
                </div>

                <div id="group-animal1">
                    <div className="form-group">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="text"
                            id="senha"
                            placeholder="Digite a senha provisória do voluntário"
                            required
                        />
                    </div>
                    <div className="form-group">

                    </div>
                    <div className="form-group">
                        <label htmlFor="situacao">Situação</label>
                        <select id="situacao" name="opcoesSituacao">
                            <option value="1">Ativo</option>
                            <option value="2">Suspenso</option>
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