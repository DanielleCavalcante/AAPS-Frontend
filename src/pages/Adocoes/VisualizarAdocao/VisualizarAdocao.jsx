import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoAlterar from "/src/components/BotaoAlterar/BotaoAlterar.jsx";
import BotaoSalvar from "/src/components/BotaoSalvar/BotaoSalvar.jsx";
import './VisualizarAdocao.css';

const VisualizarAdocao = () => {
    const [telefones, setTelefones] = useState([{ telefone: '', responsavel: '' }]);
    const navigate = useNavigate();
<<<<<<< HEAD
    const [editando, setEditando] = useState(false);
=======
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
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
<<<<<<< HEAD
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
=======
                        <input type="text" disabled={!isEditable}/>
                    </div>
                    <div className="form-group">
                        <label>Data</label>
                        <input type="text" disabled={!isEditable}/>
                    </div>
                    <div className="form-group">
                        <label>Voluntária</label>
                        <input type="text" disabled={!isEditable}/>
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                    </div>
                </div>

                <div id="group-adocao2">
<<<<<<< HEAD
                    <div className="form-group">
                        <label htmlFor="codadotante">Código Adotante</label>
                        <select
                            type="number"
                            id="adotanteId"
                            name="adotanteId"
                            disabled={!isEditable}
                        >
=======
                <div className="form-group">
                        <label htmlFor="codadotante">Código Adotante</label>
                        <select id="codadotante" name="codadotante" disabled={!isEditable}>
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                            <option value="1">adotante01</option>
                            <option value="2">adotante02</option>
                        </select>
                    </div>
                    <div className="form-group">
<<<<<<< HEAD
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
=======
                    <label htmlFor="nomeadotante">Nome adotante</label>
                        <select id="nomeadotante" name="nomeadotante" disabled={!isEditable}>
                            <option value="1">adotante01</option>
                            <option value="2">adotante02</option>
                        </select>
                </div>
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                </div>



                <div id="group-adocao1">
                    <div className="form-group">
                        <label>RG</label>
<<<<<<< HEAD
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
=======
                        <input id="rg" name="rg" type="text" placeholder="Digite o RG" disabled={!isEditable}/>
                    </div>
                    <div className="form-group">
                        <label>CPF</label>
                        <input id="cpf" name="cpf" type="text" placeholder="Digite o CPF" disabled={!isEditable}/>
                    </div>
                    <div className="form-group">
                        <label>Celular</label>
                        <input id="celular-afotante" name="celular" type="text" placeholder="Digite o celular com DDD" disabled={!isEditable}/>
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                    </div>
                </div>

                <div id="group-adocao2">
<<<<<<< HEAD
                    <div className="form-group">
                        <label htmlFor="animalId">Código animal</label>
                        <select
                            type="number"
                            id="animalId"
                            name="animalId"
                            disabled={!isEditable}
                        >
=======
                <div className="form-group">
                        <label htmlFor="codanimal">Código animal</label>
                        <select id="codanimal" name="codanimal" disabled={!isEditable}>
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                            <option value="1">animal01</option>
                            <option value="2">animal02</option>
                        </select>
                    </div>
                    <div className="form-group">
<<<<<<< HEAD
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
=======
                    <label htmlFor="nomeanimal">Nome animal</label>
                        <select id="nomeanimal" name="nomeanimal" disabled={!isEditable}>
                            <option value="1">animal01</option>
                            <option value="2">animal02</option>
                        </select>
                </div>
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                </div>

                <div id="group-adocao3">
                    <div className="form-group">
                        <label>Espécie</label>
<<<<<<< HEAD
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
=======
                        <input type="text" disabled={!isEditable}/>
                    </div>
                    <div className="form-group">
                        <label>Idade</label>
                        <input type="text" disabled={!isEditable}/>
                    </div>
                    <div className="form-group">
                    <label htmlFor="sexo">Sexo</label>
                        <select id="sexo" name="sexo" disabled={!isEditable}>
                            <option value="1">F</option>
                            <option value="2">M</option>
                        </select>
                </div>
                    <div className="form-group">
                        <label >Pelagem</label>
                        <input id="pelagem" type="text" disabled={!isEditable}/>
                    </div>
                </div>

                <div id="group-adocao2">
                <div className="form-group">
                        <label htmlFor="coddoador">Código doador</label>
                        <select id="coddoador" name="coddoador" disabled={!isEditable}>
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                            <option value="1">doador01</option>
                            <option value="2">doador02</option>
                        </select>
                    </div>
                    <div className="form-group">
<<<<<<< HEAD
                        <label htmlFor="nomedoador">Nome doador</label>
=======
                    <label htmlFor="nomedoador">Nome doador</label>
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                        <select id="nomedoador" name="nomedoador" disabled={!isEditable}>
                            <option value="1">doador01</option>
                            <option value="2">doador02</option>
                        </select>
<<<<<<< HEAD
                    </div>
                    <div className="form-group">
                        <label >Telefone doador</label>
                        <input id="telefonedoador" type="text" disabled={!isEditable} />
                    </div>

                </div>



                <div id="group-adocao2">
                    <div className="form-group">
=======
                </div>
                </div>

                <div className="form-group">
                        <label >Telefone doador</label>
                        <input id="telefonedoador" type="text" disabled={!isEditable}/>
                    </div>

                    <div id="group-adocao2">
                <div className="form-group">
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                        <label htmlFor="codlocal">Código local</label>
                        <select id="codlocal" name="codlocal" disabled={!isEditable}>
                            <option value="1">local01</option>
                            <option value="2">local02</option>
                        </select>
                    </div>
                    <div className="form-group">
<<<<<<< HEAD
                        <label htmlFor="nomelocaladocao">Nome local de adoção</label>
=======
                    <label htmlFor="nomelocaladocao">Nome local de adoção</label>
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                        <select id="nomelocaladocao" name="nomelocaladocao" disabled={!isEditable}>
                            <option value="1">local01</option>
                            <option value="2">local02</option>
                        </select>
<<<<<<< HEAD
                    </div>
=======
                </div>
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                </div>


                <div className="button-group-crud">
<<<<<<< HEAD
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
=======
                    <BotaoCancelar disabled={!isEditable} />  {/* Desabilita o botão "Cancelar" se os campos estiverem desabilitados */}
                    <BotaoSalvar/>

                    <BotaoAlterar />                    
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                </div>
            </form>
        </div>
    );
};

export default VisualizarAdocao;
