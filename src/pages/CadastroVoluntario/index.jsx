import {useState} from 'react'
import './cadastroVoluntario.css';

import BotaoSalvar from "/src/components/BotaoSalvar";
import BotaoCancelar from "/src/components/BotaoCancelar";
import BotaoAlterar from "/src/components/BotaoAlterar";
import BotaoLimpar from "/src/components/BotaoLimpar";
import BotaoExcluir from "/src/components/BotaoExcluir";

const CadastroVoluntario = () => {

    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);


    function handleSubmit(event) {
        event.preventDefault()

        event.currentTarget.elements.nome.value = '';
    }

    return (
        <div className="cadastro-container">
            <form className="cadastroVoluntario-form" onSubmit={handleSubmit} >
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
                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" placeholder="Digite o nome do voluntário" required />
                </div>
                <div className="form-group">
                    <label htmlFor="cpf">CPF</label>
                    <input type="text" id="cpf" placeholder="Digite o CPF do voluntário" required />
                </div>
                <div className="form-group">
                    <label htmlFor="celular">Celular</label>
                    <input type="text" id="celular" placeholder="Digite o celular do voluntário" required />
                </div>
                <div className="form-group">
                    <label htmlFor="senha">Senha</label>
                    <input type="text" id="senha" placeholder="Digite a senha provisória do voluntário" required />
                </div>
                <div className="form-group">
                    <label htmlFor="situacao">Situação</label>
                    <select id="situacao" name="opcoesSituacao">
                        <option value="1">Ativo</option>
                        <option value="2">Suspenso</option>
                    </select>
                </div>
                <div className="button-group-crud">
                    <BotaoSalvar showModal={showModal} openModal={openModal} closeModal={closeModal} />
                    <BotaoCancelar />
                    <BotaoAlterar />
                    <BotaoLimpar />
                    <BotaoExcluir />
                </div>
            </form>
        </div>
    );
}

export default CadastroVoluntario;