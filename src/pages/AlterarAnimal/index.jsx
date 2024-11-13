import { useState } from 'react'
import './alteraAnimal.css';

import BotaoCancelar from "/src/components/BotaoCancelar";
import BotaoAlterar from "/src/components/BotaoAlterar";
import BotaoLimpar from "/src/components/BotaoLimpar";
import BotaoExcluir from "/src/components/BotaoExcluir";

const AlteraAnimal = () => {

    const [showModalAlterar, setShowModalAlterar] = useState(false); //Alteração
    const [showModalExcluir, setShowModalExcluir] = useState(false); //Exclusão
    const [showConfirmModal, setShowConfirmModal] = useState(false); //Confirmar

    const closeModalAlterar = () => setShowModalAlterar(false);

    const openModalAlterar = () => {
        const statusAdocao = document.getElementById('statusAdocao').value;
        const nome = document.getElementById('nome').value;
        const especie = document.getElementById('especie').value;
        const raca = document.getElementById('raca').value;
        const dataNascimento = document.getElementById('dataNascimento').value;
        const pelagem = document.getElementById('pelagem').value;
        const sexo = document.getElementById('sexo').value;
        const doador = document.getElementById('doador').value;

        // Verifica se todos os campos estão preenchidos
        if (statusAdocao && nome && especie && raca && dataNascimento && pelagem && sexo && doador) {
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
        setShowConfirmModal(true);
    };


    function handleSubmit(event) {
        event.preventDefault();
        event.currentTarget.elements.statusAdocao.value = 1;
        event.currentTarget.elements.nome.value = '';
        event.currentTarget.elements.especie.value = '';
        event.currentTarget.elements.raca.value = '';
        event.currentTarget.elements.dataNascimento.value = '';
        event.currentTarget.elements.pelagem.value = '';
        event.currentTarget.elements.sexo.value = 1;
        event.currentTarget.elements.doador.value = 1;
    }

    return (
        <div className="cadastro-container">
            <form className="cadastroVoluntario-form" onSubmit={handleSubmit} >
                <div id="group1">
                    <div className="form-group">
                        <label htmlFor="codigo">Código</label>
                        <input type="text" id="codigo" disabled />
                    </div>
                    <div className="form-group">
                        <label htmlFor="statusAdocao">Status</label>
                        <select id="statusAdocao" name="statusAdocao">
                            <option value="1">Adotado</option>
                            <option value="2">Disponível</option>
                        </select>
                    </div>
                    <div className="buttonAcompanhamento">
                        <button>
                            Ver Acompanhamento
                        </button>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" placeholder="Digite o nome do animal" required />
                </div>
                <div id="group1">
                    <div className="form-group">
                        <label htmlFor="especie">Espécie</label>
                        <input type="text" id="especie" placeholder="Digite a espécie" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="raca">Raça</label>
                        <input type="text" id="raca" placeholder="Digite a raça" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dataNascimento">Data de Nascimento</label>
                        <input type="text" id="dataNascimento" placeholder="Digite a data de nascimento" required />
                    </div>
                </div>
                <div id='group1'>
                    <div className="form-group">
                        <label htmlFor="pelagem">Pelagem</label>
                        <input type="text" id="pelagem" placeholder="Digite a pelagem" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sexo">Sexo</label>
                        <select id="sexo" name="sexo">
                            <option value="1">Macho</option>
                            <option value="2">Fêmea</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="doador">Doador</label>
                        <select id="doador" name="doador">
                            <option value="1">Doador1</option>
                            <option value="2">Doador2</option>
                        </select>
                    </div>
                </div>
                <div className="button-group-crud">
                    <BotaoAlterar showModal={showModalAlterar} openModal={openModalAlterar} closeModal={closeModalAlterar} />
                    <BotaoCancelar />
                    <BotaoLimpar />
                    <BotaoExcluir showModal={showModalExcluir} showConfirmModal={showConfirmModal} 
                    openModal={openConfirmModal} closeModal2={closeConfirmModal} closeModal={openModalExcluir}
                    closeModalExcluir={closeModalExcluir} />
                </div>
            </form>
        </div>
    );
}

export default AlteraAnimal;