import { useState } from 'react'
import './alteraVoluntario.css';

import BotaoCancelar from "/src/components/BotaoSalvar";
import BotaoCancelar from "/src/components/BotaoCancelar";
import BotaoAlterar from "/src/components/BotaoAlterar";
import BotaoLimpar from "/src/components/BotaoLimpar";
import BotaoExcluir from "/src/components/BotaoExcluir";

const AlteraVoluntario = () => {

    const [showModalAlterar, setShowModalAlterar] = useState(false); //Alteração
    const [showModalExcluir, setShowModalExcluir] = useState(false); //Exclusão
    const [showConfirmModal, setShowConfirmModal] = useState(false); //Confirmar

    const closeModalAlterar = () => setShowModalAlterar(false);

    const openModalAlterar = () => {
        const tipo = document.getElementById('tipo').value;
        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const celular = document.getElementById('celular').value;
        const senha = document.getElementById('senha').value;
        const situacao = document.getElementById('situacao').value;

        // Verifica se todos os campos estão preenchidos
        if (tipo && nome && cpf && celular && senha && situacao) {
            setShowModalAlterar(true);
        } else {
            return null;
        }
    };

    const closeModalExcluir = () => setShowModalExcluir(false);

    const closeConfirmModal = () => {
        setShowConfirmModal(false);
    }


    const openModalExcluir = () => {
        setShowConfirmModal(false);
        setShowModalExcluir(true);
    };

    const openConfirmModal = () => {
        const tipo = document.getElementById('tipo').value;
        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const celular = document.getElementById('celular').value;
        const senha = document.getElementById('senha').value;
        const situacao = document.getElementById('situacao').value;

        // Verifica se todos os campos estão preenchidos
        if (tipo && nome && cpf && celular && senha && situacao) {
            setShowConfirmModal(true);
        } else {
            return null;
        }
    };

    function handleSubmit(event) {
        event.preventDefault();
        event.currentTarget.elements.tipo.value = 1;
        event.currentTarget.elements.nome.value = '';
        event.currentTarget.elements.cpf.value = '';
        event.currentTarget.elements.celular.value = '';
        event.currentTarget.elements.senha.value = '';
        event.currentTarget.elements.situacao.value = 1;
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
                    <BotaoSalvar />
                    <BotaoCancelar />
                    <BotaoAlterar showModal={showModalAlterar} openModal={openModalAlterar} closeModal={closeModalAlterar} />
                    <BotaoLimpar />
                    <BotaoExcluir showModal={showModalExcluir} showConfirmModal={showConfirmModal}
                        openModal={openConfirmModal} closeModal2={closeConfirmModal} closeModal={openModalExcluir}
                        closeModalExcluir={closeModalExcluir} />
                </div>
            </form>
        </div>
    );
}

export default AlteraVoluntario;