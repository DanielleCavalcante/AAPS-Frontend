import React, { useState } from 'react';
import './visualizarDoador.css';

import BotaoAlterar from "/src/components/BotaoAlterar";
import BotaoCancelar from "/src/components/BotaoCancelar";
import BotaoExcluir from "/src/components/BotaoExcluir";

const VisualizarDoador = () => {
    const [showModalAlterar, setShowModalAlterar] = useState(false); //Alteração
    const [showModalExcluir, setShowModalExcluir] = useState(false); //Exclusão
    const [showConfirmModal, setShowConfirmModal] = useState(false); //Confirmar
    const [telefones, setTelefones] = useState([{ telefone: '', responsavel: '' }]);
    const [foto, setFoto] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Handlers do modal
    const closeModalAlterar = () => setShowModalAlterar(false);

    const openModalAlterar = () => {
        // Pegando os valores dos campos
        const nome = document.getElementById("nome").value;
        const rg = document.getElementById("rg").value;
        const cpf = document.getElementById("cpf").value;
        const celular = document.getElementById("celular").value;
        const cep = document.getElementById("cep").value;
        const cidade = document.getElementById("cidade").value;
        const estado = document.getElementById("estado").value;
        const endereco = document.getElementById("endereco").value;
        const numero = document.getElementById("numero").value;
        const bairro = document.getElementById("bairro").value;

        // Validação dos campos
        if (nome && rg && cpf && celular && cep && cidade && estado && endereco && numero && bairro) {
            setShowModalAlterar(true); // Mostra o modal de sucesso
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

    // Handlers para telefones e responsáveis
    const handleAddTelefone = () => setTelefones([...telefones, { telefone: '', responsavel: '' }]);
    const handleRemoveTelefone = (index) => {
        setTelefones(telefones.filter((_, i) => i !== index));
    };
    const handleTelefoneChange = (index, value) => {
        const novosTelefones = [...telefones];
        novosTelefones[index].telefone = value;
        setTelefones(novosTelefones);
    };
    const handleResponsavelChange = (index, value) => {
        const novosTelefones = [...telefones];
        novosTelefones[index].responsavel = value;
        setTelefones(novosTelefones);
    };


    // Limpeza dos campos do formulário
    const handleSubmit = (event) => {
        event.preventDefault();
        // Lógica de envio de formulário ou limpeza
        event.target.reset();
        setTelefones([{ telefone: '', responsavel: '' }]);
        setFoto(null);
    };

  

    return (
        <div className="cadastro-container">
            <form className="cadastroDoador-form" onSubmit={handleSubmit}>

                <div className='cadastroDoador-linha1'>
                    <div className="form-group">
                        <label>Código</label>
                        <input type="text" />
                    </div>

                    <div className="foto-upload">
                        <div class="foto-preview-container">
                            <span class="foto-label">Foto</span>
                            {foto && <img src={foto} alt="Foto do doador" className="foto" />}
                        </div>
                    </div>

                </div>

                <div className="form-group">
                    <label>Nome</label>
                    <input id="nome" name="nome" type="text" placeholder="Digite o nome" />
                </div>

                <div className='cadastroDoador-linha1'>
                    <div className="form-group">
                        <label>RG</label>
                        <input id="rg" name="rg" type="text" placeholder="Digite o RG" />
                    </div>
                    <div className="form-group">
                        <label>CPF</label>
                        <input id="cpf" name="cpf" type="text" placeholder="Digite o CPF" />
                    </div>
                    <div className="form-group">
                        <label>Celular</label>
                        <input id="celular" name="celular" type="text" placeholder="Digite o celular com DDD" />
                    </div>
                </div>

                <div className="form-group">
                    <label>Telefone</label>
                    {telefones.map((item, index) => (
                        <div key={index} className="telefone-group">
                            <input id='input-telefone'
                                type="text"
                                placeholder="Telefone"
                                value={item.telefone}
                                onChange={(e) => handleTelefoneChange(index, e.target.value)}
                            />
                            <input id='input-responsavel'
                                type="text"
                                placeholder="Responsável"
                                value={item.responsavel}
                                onChange={(e) => handleResponsavelChange(index, e.target.value)}
                            />
                            {telefones.length > 1 && (
                                <button
                                    type="button"
                                    className="remove-btn-cad-doador"
                                    onClick={() => handleRemoveTelefone(index)}
                                >
                                    <img src="/src/assets/icone_excluir.png" alt="Ícone excluir" className="icon-remove-cad-doador" />
                                </button>
                            )}
                        </div>
                    ))}

                </div>

                <div className="cadastroDoador-linha1">
                    <div className="form-group">
                        <label htmlFor="cep">CEP</label>
                        <input id="imput-cep" name="cep" type="text" placeholder="Digite o CEP" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cidade">Cidade</label>
                        <input id="imput-cidade" name="cidade" type="text" placeholder="Digite a cidade" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="estado">Estado</label>
                        <input id="imput-estado" name="estado" type="text" placeholder="Digite o estado" />
                    </div>
                </div>


                <div className="form-group">
                    <label>Endereço</label>
                    <input id="endereco" name="endereco" type="text" placeholder="Digite o Endereço" />
                </div>

                <div className='cadastroDoador-linha1'>
                    <div className="form-group">
                        <label>Número</label>
                        <input id="numero" name="numero" type="text" placeholder="Digite o nº da residência" />
                    </div>
                    <div className="form-group">
                        <label>Complemento</label>
                        <input id="complemento" name="complemento" type="text" placeholder="Digite o complemento" />
                    </div>
                    <div className="form-group">
                        <label>Bairro</label>
                        <input id="bairro" name="bairro" type="text" placeholder="Digite o bairro" />
                    </div>
                </div>

                <div className="button-group-crud">
                    <BotaoAlterar showModal={showModalAlterar} openModal={openModalAlterar} closeModal={closeModalAlterar} />
                    <BotaoCancelar />
                    <BotaoExcluir showModal={showModalExcluir} showConfirmModal={showConfirmModal}
                            openModal={openConfirmModal} closeModal2={closeConfirmModal} closeModal={openModalExcluir}
                            closeModalExcluir={closeModalExcluir} />
                </div>
            </form>
        </div>
    );
};

export default VisualizarDoador;
