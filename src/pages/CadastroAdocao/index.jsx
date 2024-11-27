import React, { useState } from 'react';
import './cadastroAdocao.css';

import BotaoSalvar from "/src/components/BotaoSalvar";
import BotaoCancelar from "/src/components/BotaoCancelar";
import BotaoAlterar from "/src/components/BotaoAlterar";
import BotaoLimpar from "/src/components/BotaoLimpar";
import BotaoExcluir from "/src/components/BotaoExcluir";

const CadastroAdocao = () => {
    const [showModal, setShowModal] = useState(false);

    // Handlers do modal
    const closeModal = () => setShowModal(false);
    const openModal = () => {
        // Pegando os valores dos campos
        const codadotante = document.getElementById("codadotante").value;
        const nomeadotante = document.getElementById("nomeadotante").value;
        const cpf = document.getElementById("cpf").value;
        const rg = document.getElementById("rg").value;
        const celular = document.getElementById("celular").value;
        const codanimal = document.getElementById("codanimal").value;
        const nomeanimal = document.getElementById("nomeanimal").value;
        const especie = document.getElementById("especie").value;
        const idade = document.getElementById("idade").value;
        const sexo = document.getElementById("sexo").value;
        const pelagem = document.getElementById("pelagem").value;
        const coddoador = document.getElementById("coddoador").value;
        const nomedoador = document.getElementById("nomedoador").value;
        const telefonedoador = document.getElementById("telefonedoador").value;
        const codlocal = document.getElementById("codlocal").value;
        const local = document.getElementById("local").value;

        // Validação dos campos
        if (codadotante && nomeadotante && rg && cpf && celular && codanimal && nomeanimal && especie && idade && sexo && pelagem && coddoador && nomedoador && telefonedoador && codlocal && local) {
            setShowModal(true); // Mostra o modal de sucesso
        } else {
            return null;
        }
    };

    
    // Limpeza dos campos do formulário
    const handleSubmit = (event) => {
        event.preventDefault();
        event.target.reset();
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
                    <BotaoSalvar showModal={showModal} openModal={openModal} closeModal={closeModal} />
                    <BotaoCancelar />
                    <BotaoAlterar disabled={true} />
                    <BotaoLimpar />
                    <BotaoExcluir disabled={true} />
                </div>
            </form>
        </div>
    );
};

export default CadastroAdocao;
