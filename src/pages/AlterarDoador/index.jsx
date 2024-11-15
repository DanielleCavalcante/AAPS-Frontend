import React, { useState } from 'react';
import './alterarDoador.css';

import BotaoCancelar from "/src/components/BotaoSalvar";
import BotaoCancelar from "/src/components/BotaoCancelar";
import BotaoAlterar from "/src/components/BotaoAlterar";
import BotaoLimpar from "/src/components/BotaoLimpar";
import BotaoExcluir from "/src/components/BotaoExcluir";

const AlteraDoador = () => {
    const [telefones, setTelefones] = useState(['']);

    const adicionarTelefone = () => {
        setTelefones([...telefones, '']);
    };

    const handleTelefoneChange = (index, value) => {
        const novosTelefones = [...telefones];
        novosTelefones[index] = value;
        setTelefones(novosTelefones);

        const [showModalAlterar, setShowModalAlterar] = useState(false); //Alteração
        const [showModalExcluir, setShowModalExcluir] = useState(false); //Exclusão
        const [showConfirmModal, setShowConfirmModal] = useState(false); //Confirmar

        const closeModalAlterar = () => setShowModalAlterar(false);

        const openModalAlterar = () => {
            const tipo = document.getElementById('nome').value;
            const nome = document.getElementById('rg').value;
            const cpf = document.getElementById('cpf').value;
            const celular = document.getElementById('celular').value;
            const senha = document.getElementById('cep').value;
            const cidade = document.getElementById('cidade').value;
            const estado = document.getElementById('estado').value;
            const endereco = document.getElementById('endereco').value;
            const numero = document.getElementById('numero').value;
            const complemento = document.getElementById('complemento').value;
            const bairro = document.getElementById('bairro').value;

            // Verifica se todos os campos estão preenchidos
            if (nome && rg && cpf && celular && cep && cidade && estado && endereco && numero && bairro) {
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
            <div className="doador-container">
                <form className="cadastroDoador-form" onSubmit={handleSubmit} >
                    <div className="form-group">
                        <label>Código</label>
                        <input type="text" id="codigo" />
                    </div>

                    <div className="form-group">
                        <label>Nome</label>
                        <input type="text" id="nome" />
                    </div>

                    <div className="form-group">
                        <label>RG</label>
                        <input type="text" id="rg" />
                    </div>

                    <div className="form-group">
                       <label>CPF</label>
                       <input type="text" id="cpf" />
                    </div>

                    <div className="form-group">
                        <label>Telefone</label>
                        {telefones.map((telefone, index) => (
                           <div key={index} className="form-group-phone">
                                <input
                                   type="text"
                                   value={telefone}
                                   onChange={(e) => handleTelefoneChange(index, e.target.value)}
                                />
                            </div>
                        ))}
                        <button onClick={adicionarTelefone} className="btn-add-phone">
                            + Telefone
                       </button>
                    </div>

                    <div className="form-group">
                        <label>Endereço</label>
                        <input type="text" id="endereco" />
                    </div>

                    <div className="form-group">
                        <label>CEP</label>
                        <input type="text" id="cep" />
                    </div>

                    <div className="form-group">
                        <label>Cidade</label>
                        <input type="text" id="cidade" />
                    </div>

                    <div className="form-group">
                        <label>Estado</label>
                        <input type="text" id="estado" />
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
    };
};


export default AlteraDoador;
