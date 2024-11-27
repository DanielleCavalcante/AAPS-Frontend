import React, { useState } from 'react';
import './alteraAdocao.css';

import BotaoSalvar from "/src/components/BotaoSalvar";
import BotaoCancelar from "/src/components/BotaoCancelar";
import BotaoAlterar from "/src/components/BotaoAlterar";
import BotaoLimpar from "/src/components/BotaoLimpar";
import BotaoExcluir from "/src/components/BotaoExcluir";

const AlteraAdocao = () => {
    const [telefones, setTelefones] = useState([{ telefone: '', responsavel: '' }]);
    const [showModalAlterar, setShowModalAlterar] = useState(false);
    const [showModalExcluir, setShowModalExcluir] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isEditable, setIsEditable] = useState(false);  // Controle para habilitar edição


    const closeModalAlterar = () => setShowModalAlterar(false);
    const openModalAlterar = () => {
        const nome = document.getElementById('nome').value;
        const rg = document.getElementById('rg').value;
        const cpf = document.getElementById('cpf').value;
        const celular = document.getElementById('celular').value;
        const localtrabalho = document.getElementById('localtrabalho').value;
        const cep = document.getElementById('cep').value;
        const cidade = document.getElementById('cidade').value;
        const estado = document.getElementById('estado').value;
        const endereco = document.getElementById('endereco').value;
        const numero = document.getElementById('numero').value;
        const bairro = document.getElementById('bairro').value;
 
        if (nome && rg && cpf && celular && localtrabalho && cep && cidade && estado && endereco && numero && bairro && facebook && instagram) {
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
        <div className="cadastro-container">
            <form className="cadastroAdocao-form" onSubmit={handleSubmit}>

                <div id="group-adocao1">
                    <div className="form-group">
                        <label>Código</label>
                        <input type="text" />
                    </div>
                    <div className="form-group">
                        <label>Data</label>
                        <input type="text" />
                    </div>
                    <div className="form-group">
                        <label>Voluntária</label>
                        <input type="text" />
                    </div>
                </div>

                <div id="group-adocao2">
                <div className="form-group">
                        <label htmlFor="codadotante">Código Adotante</label>
                        <select id="codadotante" name="codadotante">
                            <option value="1">adotante01</option>
                            <option value="2">adotante02</option>
                        </select>
                    </div>
                    <div className="form-group">
                    <label htmlFor="nomeadotante">Nome adotante</label>
                        <select id="nomeadotante" name="nomeadotante">
                            <option value="1">adotante01</option>
                            <option value="2">adotante02</option>
                        </select>
                </div>
                </div>



                <div id="group-adocao1">
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

                <div id="group-adocao2">
                <div className="form-group">
                        <label htmlFor="codanimal">Código animal</label>
                        <select id="codanimal" name="codanimal">
                            <option value="1">animal01</option>
                            <option value="2">animal02</option>
                        </select>
                    </div>
                    <div className="form-group">
                    <label htmlFor="nomeanimal">Nome animal</label>
                        <select id="nomeanimal" name="nomeanimal">
                            <option value="1">animal01</option>
                            <option value="2">animal02</option>
                        </select>
                </div>
                </div>

                <div id="group-adocao3">
                    <div className="form-group">
                        <label>Espécie</label>
                        <input type="text" />
                    </div>
                    <div className="form-group">
                        <label>Idade</label>
                        <input type="text" />
                    </div>
                    <div className="form-group">
                    <label htmlFor="sexo">Sexo</label>
                        <select id="sexo" name="sexo">
                            <option value="1">F</option>
                            <option value="2">M</option>
                        </select>
                </div>
                    <div className="form-group">
                        <label >Pelagem</label>
                        <input id="pelagem" type="text" />
                    </div>
                </div>

                <div id="group-adocao2">
                <div className="form-group">
                        <label htmlFor="coddoador">Código doador</label>
                        <select id="coddoador" name="coddoador">
                            <option value="1">doador01</option>
                            <option value="2">doador02</option>
                        </select>
                    </div>
                    <div className="form-group">
                    <label htmlFor="nomedoador">Nome doador</label>
                        <select id="nomedoador" name="nomedoador">
                            <option value="1">doador01</option>
                            <option value="2">doador02</option>
                        </select>
                </div>
                </div>

                <div className="form-group">
                        <label >Telefone doador</label>
                        <input id="telefonedoador" type="text" />
                    </div>

                    <div id="group-adocao2">
                <div className="form-group">
                        <label htmlFor="codlocal">Código local</label>
                        <select id="codlocal" name="codlocal">
                            <option value="1">local01</option>
                            <option value="2">local02</option>
                        </select>
                    </div>
                    <div className="form-group">
                    <label htmlFor="nomelocaladocao">Nome local de adoção</label>
                        <select id="nomelocaladocao" name="nomelocaladocao">
                            <option value="1">local01</option>
                            <option value="2">local02</option>
                        </select>
                </div>
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
        </div>
    );
};

export default AlteraAdocao;
