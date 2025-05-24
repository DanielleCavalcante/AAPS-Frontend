import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoAlterar from "/src/components/BotaoAlterar/BotaoAlterar.jsx";
import BotaoSalvar from "/src/components/BotaoSalvar/BotaoSalvar.jsx";
import './VisualizarAdocao.css';

const VisualizarAdocao = () => {
    const [telefones, setTelefones] = useState([{ telefone: '', responsavel: '' }]);
    const navigate = useNavigate();
    const [editando, setEditando] = useState(false);
    const [isEditable, setIsEditable] = useState(false);  // Controle para habilitar edição

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
                        <input
                            type="text"
                            id="codigo"
                            disabled={!isEditable}
                        />
                    </div>
                    <div className="form-group">
                        <label>Data</label>
                        <input
                            type="date"
                            id="data"
                            disabled={!isEditable}
                        />
                    </div>
                    <div className="form-group">
                        <label>Voluntária</label>
                        <input
                            type="text"
                            id="nomeVoluntario"
                            disabled={!isEditable}
                        />
                    </div>
                </div>

                <div id="group-adocao2">
                    <div className="form-group">
                        <label htmlFor="codadotante">Código Adotante</label>
                        <select
                            type="number"
                            id="adotanteId"
                            name="adotanteId"
                            disabled={!isEditable}
                        >
                            <option value="1">adotante01</option>
                            <option value="2">adotante02</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="nomeadotante">Nome adotante</label>
                        <select
                            id="nomeadotante"
                            name="nomeadotante"
                            disabled={!isEditable}
                        >
                            <option value="1">adotante01</option>
                            <option value="2">adotante02</option>
                        </select>
                    </div>
                </div>



                <div id="group-adocao1">
                    <div className="form-group">
                        <label>RG</label>
                        <input
                            type="text"
                            id="rg"
                            name="rg"
                            placeholder="Digite o RG"
                            disabled={!isEditable}
                        />
                    </div>
                    <div className="form-group">
                        <label>CPF</label>
                        <input
                            type="text"
                            id="cpf"
                            name="cpf"
                            placeholder="Digite o CPF"
                            disabled={!isEditable}
                        />
                    </div>
                    <div className="form-group">
                        <label>Celular</label>
                        <input
                            id="celular"
                            name="celular"
                            type="text"
                            placeholder="Digite o celular com DDD" disabled={!isEditable} />
                    </div>
                </div>

                <div id="group-adocao2">
                    <div className="form-group">
                        <label htmlFor="animalId">Código animal</label>
                        <select
                            type="number"
                            id="animalId"
                            name="animalId"
                            disabled={!isEditable}
                        >
                            <option value="1">animal01</option>
                            <option value="2">animal02</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="nomeanimal">Nome animal</label>
                        <select
                            id="nomeanimal"
                            name="nomeanimal"
                            disabled={!isEditable}
                        >
                            <option value="1">animal01</option>
                            <option value="2">animal02</option>
                        </select>
                    </div>
                </div>

                <div id="group-adocao3">
                    <div className="form-group">
                        <label>Espécie</label>
                        <input
                            type="text"
                            id="especie"
                            name="especie"
                            disabled={!isEditable}
                        />
                    </div>
                    <div className="form-group">
                        <label>Idade</label>
                        <input
                            type="text"
                            id="idade"
                            name="idade"
                            disabled={!isEditable}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sexo">Sexo</label>
                        <select
                            id="sexo"
                            name="sexo"
                            disabled={!isEditable}
                        >
                            <option value="1">Fêmea</option>
                            <option value="2">Macho</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label >Pelagem</label>
                        <input
                            type="text"
                            id="pelagem"
                            name="pelagem"
                            disabled={!isEditable}
                        />
                    </div>
                </div>

                <div id="group-adocao1">
                    <div className="form-group">
                        <label htmlFor="doadorId">Código doador</label>
                        <select id="doadorId" name="doadorId" disabled={!isEditable}>
                            <option value="1">doador01</option>
                            <option value="2">doador02</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="nomedoador">Nome doador</label>
                        <select id="nomedoador" name="nomedoador" disabled={!isEditable}>
                            <option value="1">doador01</option>
                            <option value="2">doador02</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label >Telefone doador</label>
                        <input id="telefonedoador" type="text" disabled={!isEditable} />
                    </div>

                </div>



                <div id="group-adocao2">
                    <div className="form-group">
                        <label htmlFor="codlocal">Código local</label>
                        <select id="codlocal" name="codlocal" disabled={!isEditable}>
                            <option value="1">local01</option>
                            <option value="2">local02</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="nomelocaladocao">Nome local de adoção</label>
                        <select id="nomelocaladocao" name="nomelocaladocao" disabled={!isEditable}>
                            <option value="1">local01</option>
                            <option value="2">local02</option>
                        </select>
                    </div>
                </div>


                <div className="button-group-crud">
                    {!editando ? (
                        <BotaoAlterar onClick={() => setEditando(true)}
                            //disabled={editando}
                        /* showModal={showModalAlterar} openModal={openModalAlterar} closeModal={closeModalAlterar}  */ />
                    ) : (
                        <button
                            type="submit"
                            className="botao-alterar"
                        > <BotaoSalvar />
                        </button>
                        //<BotaoSalvar onClick={salvarAlteracoes}/*  showModal={showModal} openModal={openModal} closeModal={closeModal} */ />
                    )}
                    <BotaoCancelar />
                </div>
            </form>
        </div>
    );
};

export default VisualizarAdocao;
