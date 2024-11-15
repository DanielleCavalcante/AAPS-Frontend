import { useState } from 'react'
import './cadastroAnimal.css';

import BotaoSalvar from "/src/components/BotaoSalvar";
import BotaoCancelar from "/src/components/BotaoCancelar";
import BotaoAlterar from "/src/components/BotaoAlterar";
import BotaoLimpar from "/src/components/BotaoLimpar";
import BotaoExcluir from "/src/components/BotaoExcluir";

const CadastroAnimal = () => {

    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);
    const openModal = () => {
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
            setShowModal(true);
        } else {
            return null;
        }
    };


    function handleSubmit(event) {
        event.preventDefault()
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
            <form className="cadastroAnimal-form" onSubmit={handleSubmit} >
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
                </div>
                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" placeholder="Digite o nome do animal" required />
                </div>
                <div id="group1">
                    <div className="form-group">
                        <label htmlFor="especie">Espécie</label>
                        <input type="text" id="especie" placeholder="Digite a espécie do animal" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="raca">Raça</label>
                        <input type="text" id="raca" placeholder="Digite a raça do animal" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dataNascimento">Data de Nascimento</label>
                        <input type="text" id="dataNascimento" placeholder="Digite a data de nascimento do animal" required />
                    </div>
                </div>
                <div id='group1'>
                    <div className="form-group">
                        <label htmlFor="pelagem">Pelagem</label>
                        <input type="text" id="pelagem" placeholder="Digite a pelagem do animal" required />
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

export default CadastroAnimal;