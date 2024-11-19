import React, { useState } from 'react';
import './alteraDoador.css';

import BotaoSalvar from "/src/components/BotaoSalvar";
import BotaoCancelar from "/src/components/BotaoCancelar";
import BotaoAlterar from "/src/components/BotaoAlterar";
import BotaoLimpar from "/src/components/BotaoLimpar";
import BotaoExcluir from "/src/components/BotaoExcluir";

const AlteraDoador = () => {
    const [telefones, setTelefones] = useState([{ telefone: '', responsavel: '' }]);
    const [showModalAlterar, setShowModalAlterar] = useState(false);
    const [showModalExcluir, setShowModalExcluir] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isEditable, setIsEditable] = useState(false);  // Controle para habilitar edição
    const [foto, setFoto] = useState(null);  // Para controlar a foto carregada


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

    // Handler para upload de foto
    const handleFotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) setFoto(URL.createObjectURL(file));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        event.target.reset();
        setTelefones(['']); // Limpa os telefones
    };

    const handleFotoCamera = async () => {
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
                        <div className="foto-buttons">
                            {/* Botão de capturar foto */}
                            <button type="button" className="camera" onClick={handleFotoCamera}>
                                <img src="/src/assets/icone_camera.png" alt="Ícone câmera" className="icon" />
                            </button>

                            {/* Botão de upload */}
                            <label className="upload">
                                <img src="/src/assets/icone_upload.png" alt="Ícone upload" className="icon" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFotoUpload}
                                    style={{ display: 'none' }}
                                />
                            </label>
                        </div>
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
                    <button type="button" className="add-btn" onClick={handleAddTelefone}>
                        + Telefones
                    </button>
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

export default AlteraDoador;
