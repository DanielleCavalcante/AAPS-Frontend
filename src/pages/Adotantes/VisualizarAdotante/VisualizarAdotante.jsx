import React, { useState } from 'react';

import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoAlterar from "/src/components/BotaoAlterar/BotaoAlterar.jsx";
import BotaoSalvar from "/src/components/BotaoSalvar/BotaoSalvar.jsx";
import './VisualizarAdotante.css';

const VisualizarAdotante = () => {
    const [telefones, setTelefones] = useState([{ telefone: '', responsavel: '' }]);
    const [showModalAlterar, setShowModalAlterar] = useState(false);
    const [showModalExcluir, setShowModalExcluir] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isEditable, setIsEditable] = useState(false);  // Controle para habilitar edição
    const [foto, setFoto] = useState(null);  // Para controlar a foto carregada
<<<<<<< HEAD
    const [editando, setEditando] = useState(false);
=======
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
    const [formData, setFormData] = useState({
        tipoMoradiaResidencial: "", // Casa ou Apto
        tipoMoradiaPropriedade: "", // Própria ou Alugada
        nome: "",
        rg: "",
        cpf: "",
        celular: "",
        localtrabalho: "",
        cep: "",
        cidade: "",
        estado: "",
        endereco: "",
        numero: "",
        bairro: "",
        complemento: "",
        facebook: "",
        instagram: "",
    });

    // Handlers para telefones e responsáveis
<<<<<<< HEAD
    /*const handleAddTelefone = () => setTelefones([...telefones, { telefone: '', responsavel: '' }]);
=======
    const handleAddTelefone = () => setTelefones([...telefones, { telefone: '', responsavel: '' }]);
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
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
<<<<<<< HEAD
    };*/
=======
    };
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c

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
        const moradiaSelecionada = formData.tipoMoradia === "Casa" || formData.tipoMoradia === "Apto";
        const propriedadeSelecionada = formData.tipoMoradia === "Própria" || formData.tipoMoradia === "Alugada";

        if (!moradiaSelecionada || !propriedadeSelecionada) {
            alert("Por favor, selecione uma opção de tipo de moradia (Casa ou Apto) e uma de propriedade (Própria ou Alugada).");
            return;
        }

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

<<<<<<< HEAD
    /*const handleFotoCamera = async () => {
=======
    const handleFotoCamera = async () => {
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const videoElement = document.createElement('video');
            videoElement.srcObject = stream;
            videoElement.play();
    
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
    
            const capturePhoto = () => {
                canvas.width = videoElement.videoWidth;
                canvas.height = videoElement.videoHeight;
                context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    
                // Parar o stream
                stream.getTracks().forEach((track) => track.stop());
    
                // Atualizar o estado da foto
                setFoto(canvas.toDataURL('image/png'));
            };
    
            // Exibe um modal ou uma janela para tirar a foto
            const confirmPhoto = window.confirm("Pronto para capturar a foto?");
            if (confirmPhoto) {
                capturePhoto();
            }
        } catch (error) {
            console.error("Erro ao acessar a câmera:", error);
            alert("Não foi possível acessar a câmera. Verifique as permissões.");
        }
<<<<<<< HEAD
    };*/

=======
    };
    
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };


    return (
        <div className="cadastro-container">
            <form className="cadastroAdotante-form" onSubmit={handleSubmit}>

                <div className='cadastroAdotante-linha1'>
                    <div className="form-group">
                        <label>Código</label>
                        <input type="text" />
                    </div>

<<<<<<< HEAD
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
                            name="status"

                        >
                            <option value={1}>Ativo</option>
                            <option value={0}>Inativo</option>
                        </select>
                    </div>

                    {/*<div className="foto-upload">
=======
                    <div className="foto-upload">
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c

                        <div class="foto-preview-container">
                            <span class="foto-label">Foto</span>
                            {foto && <img src={foto} alt="Foto do doador" className="foto" />}
                        </div>
<<<<<<< HEAD
                    </div>*/}
=======
                    </div>
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                </div>

                <div className="form-group">
                    <label>Nome</label>
<<<<<<< HEAD
                    <input
                        id="nome"
                        name="nome"
                        type="text"
                        placeholder="Digite o nome"
                    />
=======
                    <input id="nome" name="nome" type="text" placeholder="Digite o nome" />
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                </div>

                <div className='cadastroAdotante-linha1'>
                    <div className="form-group">
                        <label>RG</label>
<<<<<<< HEAD
                        <input
                            id="rg"
                            name="rg"
                            type="text"
                            placeholder="Digite o RG"
                        />
                    </div>
                    <div className="form-group">
                        <label>CPF</label>
                        <input
                            id="cpf"
                            name="cpf"
                            type="text"
                            placeholder="Digite o CPF"
                        />
                    </div>
                    <div className="form-group">
                        <label>Celular</label>
                        <input
                            id="celular"
                            name="celular"
                            type="text"
                            placeholder="Digite o celular com DDD"
                        />
=======
                        <input id="rg" name="rg" type="text" placeholder="Digite o RG" />
                    </div>
                    <div className="form-group">
                        <label>CPF</label>
                        <input id="cpf" name="cpf" type="text" placeholder="Digite o CPF" />
                    </div>
                    <div className="form-group">
                        <label>Celular</label>
                        <input id="celular-adotante" name="celular" type="text" placeholder="Digite o celular com DDD" />
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                    </div>
                </div>

                <div className="form-group">
                    <label>Local de Trabalho</label>
<<<<<<< HEAD
                    <input
                        id="localtrabalho"
                        name="localtrabalho"
                        type="text"
                        placeholder="Digite o nome do local de trabalho"
                    />
                </div>

                <div className="group-adocao">
                    <div className="form-group">
                        <label>Contato</label>
                        {/*{telefones.map((item, index) => ( 
                        <div key={index}  className = "telefone-group" >*/}
                        <input 
                            id='contato'
                            type="text"
                            name="contato"
                            placeholder="Digite um nº de contato"

                        />
                    </div>
                    <div className="form-group">
                        <label>Responsável Contato</label>
                        <input
                            id='responsavelContato'
                            name="responsavelContato"
                            type="text"
                            placeholder="Nome do contato para recados"

                        />

                    </div>

                    {/*))}*/}
                </div>

                {/*<div className="radio-group">
=======
                    <input id="localtrabalho" name="localtrabalho" type="text" placeholder="Digite o nome" />
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
    
                        </div>
                    ))}
                </div>

                <div className="radio-group">
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="tipoMoradiaResidencial"
                            value="Casa"
                            checked={formData.tipoMoradiaResidencial === "Casa"}
                            onChange={handleInputChange}
                        />
                        Casa
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="tipoMoradiaResidencial"
                            value="Apto"
                            checked={formData.tipoMoradiaResidencial === "Apto"}
                            onChange={handleInputChange}
                        />
                        Apto
                    </label>
<<<<<<< HEAD
                </div>*/}
=======
                </div>
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c

                <div className="radio-group">
                    <label className="radio-label">
                        <input
<<<<<<< HEAD
                            id="situacaoEndereco"
                            type="radio"
                            name="situacaoEndereco"
=======
                            type="radio"
                            name="tipoMoradiaPropriedade"
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                            value="Própria"
                            checked={formData.tipoMoradiaPropriedade === "Própria"}
                            onChange={handleInputChange}
                        />
                        Própria
                    </label>
                    <label className="radio-label">
                        <input
<<<<<<< HEAD
                            id="situacaoEndereco"
                            type="radio"
                            name="situacaoEndereco"
=======
                            type="radio"
                            name="tipoMoradiaPropriedade"
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                            value="Alugada"
                            checked={formData.tipoMoradiaPropriedade === "Alugada"}
                            onChange={handleInputChange}
                        />
                        Alugada
                    </label>
                </div>

                <div className="cadastroAdotante-linha1">
                    <div className="form-group">
                        <label htmlFor="cep">CEP</label>
<<<<<<< HEAD
                        <input
                            id="cep"
                            name="cep"
                            type="text"
                            placeholder="Digite o CEP"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cidade">Cidade</label>
                        <input
                            id="cidade"
                            name="cidade"
                            type="text"
                            placeholder="Digite a cidade"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="estado">Estado</label>
                        <input
                            id="uf"
                            name="uf"
                            type="text"
                            placeholder="Digite o estado"
                        />
=======
                        <input id="imput-cep" name="cep" type="text" placeholder="Digite o CEP" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cidade">Cidade</label>
                        <input id="imput-cidade" name="cidade" type="text" placeholder="Digite a cidade" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="estado">Estado</label>
                        <input id="imput-estado" name="estado" type="text" placeholder="Digite o estado" />
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                    </div>
                </div>


                <div className="form-group">
                    <label>Endereço</label>
<<<<<<< HEAD
                    <input
                        id="logradouro"
                        name="logradouro"
                        type="text"
                        placeholder="Digite o Endereço"
                    />
=======
                    <input id="endereco" name="endereco" type="text" placeholder="Digite o Endereço" />
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                </div>

                <div className='cadastroAdotante-linha1'>
                    <div className="form-group">
                        <label>Número</label>
<<<<<<< HEAD
                        <input
                            id="numero"
                            name="numero"
                            type="text"
                            placeholder="Digite o nº da residência"
                        />
                    </div>
                    <div className="form-group">
                        <label>Complemento</label>
                        <input
                            id="complemento"
                            name="complemento"
                            type="text"
                            placeholder="Digite o complemento"
                        />
                    </div>
                    <div className="form-group">
                        <label>Bairro</label>
                        <input
                            id="bairro"
                            name="bairro"
                            type="text"
                            placeholder="Digite o bairro"
                        />
=======
                        <input id="numero" name="numero" type="text" placeholder="Digite o nº da residência" />
                    </div>
                    <div className="form-group">
                        <label>Complemento</label>
                        <input id="complemento" name="complemento" type="text" placeholder="Digite o complemento" />
                    </div>
                    <div className="form-group">
                        <label>Bairro</label>
                        <input id="bairro" name="bairro" type="text" placeholder="Digite o bairro" />
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                    </div>
                </div>

                <div id="group4">
                    <div className="form-group">
                        <label htmlFor="facebook">Facebook</label>
<<<<<<< HEAD
                        <input
                            id="facebook"
                            name="facebook"
                            type="text"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="instagram">Instagram</label>
                        <input
                            id="instagram"
                            name="instagram"
                            type="text"
                        />
=======
                        <input id="imput-facebook" name="facebook" type="text" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="instagram">Instagram</label>
                        <input id="imput-instagram" name="instagram" type="text" />
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                    </div>
                </div>

                <div className="radio-group">
                    <label className="radio-label">
                        <input
<<<<<<< HEAD
                            id='bloqueio'
                            type="checkbox"
                            name="bloqueio"
=======
                            type="checkbox"
                            name="bloqueado"
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                            checked={formData.bloqueado}
                            onChange={handleInputChange}
                        />
                        Bloqueado
                    </label>
                </div>
                <textarea
                    name="observacao"
                    placeholder="Observação"
                    value={formData.observacao}
                    onChange={handleInputChange}
                />

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
                     <BotaoSalvar /> 
                  
                    <BotaoAlterar
                        showModal={showModalAlterar}
                        openModal={openModalAlterar}
                        closeModal={closeModalAlterar}
                    />
                   
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                </div>
            </form>
        </div>
    );
};

export default VisualizarAdotante;
