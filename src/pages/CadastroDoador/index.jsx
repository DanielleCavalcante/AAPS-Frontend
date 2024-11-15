import { useState } from 'react';
import './cadastroDoador.css';

import BotaoSalvar from "/src/components/BotaoSalvar";
import BotaoCancelar from "/src/components/BotaoCancelar";
import BotaoAlterar from "/src/components/BotaoAlterar";
import BotaoLimpar from "/src/components/BotaoLimpar";
import BotaoExcluir from "/src/components/BotaoExcluir";

const CadastroDoador = () => {

    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);
    const openModal = () => {
        const nome = document.getElementById('nome').value;
        const rg = document.getElementById('rg').value;
        const cpf = document.getElementById('cpf').value;
        const celular = document.getElementById('celular').value;
        const cep = document.getElementById('cep').value;
        const cidade = document.getElementById('cidade').value;
        const estado = document.getElementById('estado').value;
        const endereco = document.getElementById('endereco').value;
        const numero = document.getElementById('numero').value;
        const complemento = document.getElementById('complemento').value;
        const bairro = document.getElementById('bairro').value;

        // Verifica se todos os campos estão preenchidos
        if (nome && rg && cpf && celular && cep && cidade && estado && endereco && numero && complemento && bairro) {
            setShowModal(true);
        } else {
            return null;
        }
    };

    function handleSubmit(event) {
        event.preventDefault();
        event.currentTarget.elements.nome.value = '';
        event.currentTarget.elements.rg.value = '';
        event.currentTarget.elements.cpf.value = '';
        event.currentTarget.elements.celular.value = '';
        event.currentTarget.elements.cep.value = '';
        event.currentTarget.elements.cidade.value = '';
        event.currentTarget.elements.estado.value = '';
        event.currentTarget.elements.endereco.value = '';
        event.currentTarget.elements.numero.value = '';
        event.currentTarget.elements.complemento.value = '';
        event.currentTarget.elements.bairro.value = '';
    }

    return (
        <div className="cadastro-container">
            <form className="cadastroDoador-form" onSubmit={handleSubmit} >
                <div className="form-group">
                    <label htmlFor="codigo">Código</label>
                    <input type="text" id="codigo" disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" placeholder="Digite o nome do Doador/Tutor" required />
                </div>
                <div className="form-group">
                    <label htmlFor="rg">RG</label>
                    <input type="text" id="rg" placeholder="Digite o rg do Doador/Tutor" required />
                </div>
                <div className="form-group">
                    <label htmlFor="cpf">CPF</label>
                    <input type="text" id="cpf" placeholder="Digite o CPF do Doador/Tutor" required />
                </div>
                <div className="form-group">
                    <label htmlFor="celular">Celular</label>
                    <input type="text" id="celular" placeholder="Digite o celular do Doador/Tutor" required />
                </div>
                <div className="form-group">
                    <label htmlFor="cep">CEP</label>
                    <input type="text" id="cep" placeholder="Digite o CEP do Doador/Tutor" required />
                </div>
                <div className="form-group">
                    <label htmlFor="cidade">Cidade</label>
                    <input type="text" id="cidade" placeholder="Digite a cidade do Doador/Tutor" required />
                </div>
                <div className="form-group">
                    <label htmlFor="estado">Estado</label>
                    <input type="text" id="estado" placeholder="Digite o estado do Doador/Tutor" required />
                </div>
                <div className="form-group">
                    <label htmlFor="endereco">Endereço</label>
                    <input type="text" id="endereco" placeholder="Digite o endereço do Doador/Tutor" required />
                </div>
                <div className="form-group">
                    <label htmlFor="numero">Nº</label>
                    <input type="text" id="numero" placeholder="Digite o nº do Doador/Tutor" required />
                </div>
                <div className="form-group">
                    <label htmlFor="bairro">Bairro</label>
                    <input type="text" id="bairro" placeholder="Digite o bairro do Doador/Tutor" required />
                </div>
                <div className="button-group-crud">
                    <BotaoSalvar showModal={showModal} openModal={openModal} closeModal={closeModal} />
                    <BotaoCancelar />
                    <BotaoAlterar className="botao-desabilitado" disabled />
                    <BotaoLimpar />
                    <BotaoExcluir className="botao-desabilitado" disabled />
                </div>
            </form>
        </div>
    );
}

export default CadastroDoador;
