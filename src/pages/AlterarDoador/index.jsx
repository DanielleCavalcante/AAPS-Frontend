import React, { useState } from 'react';
import './alteraDoador.css';

import BotaoSalvar from "/src/components/BotaoSalvar";
import BotaoCancelar from "/src/components/BotaoCancelar";
import BotaoAlterar from "/src/components/BotaoAlterar";
import BotaoLimpar from "/src/components/BotaoLimpar";
import BotaoExcluir from "/src/components/BotaoExcluir";

const AlteraDoador = () => {
    const [telefones, setTelefones] = useState(['']);
    const [showModalAlterar, setShowModalAlterar] = useState(false);
    const [showModalExcluir, setShowModalExcluir] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isEditable, setIsEditable] = useState(false);  // Controle para habilitar edição

    const adicionarTelefone = () => {
        setTelefones([...telefones, '']);
    };

    const handleTelefoneChange = (index, value) => {
        const novosTelefones = [...telefones];
        novosTelefones[index] = value;
        setTelefones(novosTelefones);
    };

    const closeModalAlterar = () => setShowModalAlterar(false);
    const openModalAlterar = () => {
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

        if (nome && rg && cpf && celular && cep && cidade && estado && endereco && numero && bairro) {
            setShowModalAlterar(true);
            setIsEditable(true);  // Habilita todos os campos e botões após clicar em "Alterar"
        }
    };

    const closeModalExcluir = () => setShowModalExcluir(false);
    const openModalExcluir = () => {
        setShowConfirmModal(false);
        setShowModalExcluir(true);
    };

    const closeConfirmModal = () => {
        setShowConfirmModal(false);
    };
    const openConfirmModal = () => {
        setShowConfirmModal(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        event.target.reset();
        setTelefones(['']); // Limpa os telefones
    };

    return (
        <div className="doador-container">
            <form className="cadastroDoador-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Código</label>
                    <input type="text" id="codigo" disabled={!isEditable} />
                </div>

                <div className="form-group">
                    <label>Nome</label>
                    <input type="text" id="nome" disabled={!isEditable} />
                </div>

                <div className="form-group">
                    <label>RG</label>
                    <input type="text" id="rg" disabled={!isEditable} />
                </div>

                <div className="form-group">
                    <label>CPF</label>
                    <input type="text" id="cpf" disabled={!isEditable} />
                </div>

                <div className="form-group">
                    <label>Telefone</label>
                    {telefones.map((telefone, index) => (
                        <div key={index} className="form-group-phone">
                            <input
                                type="text"
                                value={telefone}
                                onChange={(e) => handleTelefoneChange(index, e.target.value)}
                                disabled={!isEditable}  // Desabilita todos os campos de telefone
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={adicionarTelefone}
                        className="btn-add-phone"
                        disabled={!isEditable}  // Desabilita o botão "Adicionar Telefone"
                    >
                        + Telefone
                    </button>
                </div>

                <div className="form-group">
                    <label>CEP</label>
                    <input type="text" id="cep" disabled={!isEditable} />
                </div>

                <div className="form-group">
                    <label>Cidade</label>
                    <input type="text" id="cidade" disabled={!isEditable} />
                </div>

                <div className="form-group">
                    <label>Estado</label>
                    <input type="text" id="estado" disabled={!isEditable} />
                </div>

                <div className="form-group">
                    <label>Endereço</label>
                    <input type="text" id="endereco" disabled={!isEditable} />
                </div>

                <div className="form-group">
                    <label>Nº</label>
                    <input type="text" id="numero" disabled={!isEditable} />
                </div>

                <div className="form-group">
                    <label>Complemento</label>
                    <input type="text" id="complemento" disabled={!isEditable} />
                </div>

                <div className="form-group">
                    <label>Bairro</label>
                    <input type="text" id="bairro" disabled={!isEditable} />
                </div>

                <div className="button-group-crud">
                    <BotaoSalvar disabled={!isEditable} />  {/* Desabilita o botão "Salvar" se os campos estiverem desabilitados */}
                    <BotaoCancelar disabled={!isEditable} />  {/* Desabilita o botão "Cancelar" se os campos estiverem desabilitados */}
                    <BotaoAlterar 
                        showModal={showModalAlterar} 
                        openModal={openModalAlterar} 
                        closeModal={closeModalAlterar}
                    />
                    <BotaoLimpar disabled={!isEditable} />  {/* Desabilita o botão "Limpar" se os campos estiverem desabilitados */}
                    <BotaoExcluir 
                        showModal={showModalExcluir} 
                        showConfirmModal={showConfirmModal} 
                        openModal={openModalExcluir} 
                        closeModal={closeModalExcluir}
                    />
                </div>
            </form>

            <div className="habilitar-edicao">
                <button onClick={openModalAlterar} className="btn-habilitar">
                    Alterar
                </button>
            </div>
        </div>
    );
};

export default AlteraDoador;
