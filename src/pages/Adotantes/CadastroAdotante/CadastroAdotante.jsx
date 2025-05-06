import React, { useState } from 'react';
import './CadastroAdotante.css';

import BotaoSalvar from "/src/components/BotaoSalvar/BotaoSalvar.jsx";
import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoLimpar from "/src/components/BotaoLimpar/BotaoLimpar.jsx";

const CadastroAdotante = () => {
    const [telefones, setTelefones] = useState([{ telefone: '', responsavel: '' }]);
    const [foto, setFoto] = useState(null);
    const [showModal, setShowModal] = useState(false);
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

    // Handlers do modal
    const closeModal = () => setShowModal(false);
    const openModal = () => {
        // Pegando os valores dos campos
        const nome = document.getElementById("nome").value;
        const rg = document.getElementById("rg").value;
        const cpf = document.getElementById("cpf").value;
        const celular = document.getElementById("celular").value;
        const localtrabalho = document.getElementById("localtrabalho").value;
        const cep = document.getElementById("cep").value;
        const cidade = document.getElementById("cidade").value;
        const estado = document.getElementById("estado").value;
        const endereco = document.getElementById("endereco").value;
        const numero = document.getElementById("numero").value;
        const bairro = document.getElementById("bairro").value;
        const facebook = document.getElementById("facebook").value;
        const instagram = document.getElementById("instagram").value;
        const moradiaSelecionada = formData.tipoMoradia === "Casa" || formData.tipoMoradia === "Apto";
        const propriedadeSelecionada = formData.tipoMoradia === "Própria" || formData.tipoMoradia === "Alugada";

        if (!moradiaSelecionada || !propriedadeSelecionada) {
            alert("Por favor, selecione uma opção de tipo de moradia (Casa ou Apto) e uma de propriedade (Própria ou Alugada).");
            return;
        }

        // Validação dos campos
        if (nome && rg && cpf && celular && localtrabalho && cep && cidade && estado && endereco && numero && bairro && facebook && instagram) {
            setShowModal(true); // Mostra o modal de sucesso
        } else {
            return null;
        }
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

    // Handler para upload de foto
    const handleFotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) setFoto(URL.createObjectURL(file));
    };

    // Limpeza dos campos do formulário
    const handleSubmit = (event) => {
        event.preventDefault();
        // Lógica de envio de formulário ou limpeza
        event.target.reset();
        setTelefones([{ telefone: '', responsavel: '' }]);
        setFoto(null);
        setFormData({
            tipoMoradia: "",
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

                <div className='cadastroAdotante-linha1'>
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
                        <input id="celular-adotante" name="celular" type="text" placeholder="Digite o celular com DDD" />
                    </div>
                </div>

                <div className="form-group">
                    <label>Local de Trabalho</label>
                    <input id="localtrabalho" name="localtrabalho" type="text" />
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


                <div className="radio-group">
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
                </div>

                <div className="radio-group">
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="tipoMoradiaPropriedade"
                            value="Própria"
                            checked={formData.tipoMoradiaPropriedade === "Própria"}
                            onChange={handleInputChange}
                        />
                        Própria
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="tipoMoradiaPropriedade"
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

                <div className='cadastroAdotante-linha1'>
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

                <div id="group4">
                    <div className="form-group">
                        <label htmlFor="facebook">Facebook</label>
                        <input id="imput-facebook" name="facebook" type="text" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="instagram">Instagram</label>
                        <input id="imput-instagram" name="instagram" type="text" />
                    </div>
                </div>

                <div className="radio-group">
                    <label className="radio-label">
                        <input
                            type="checkbox"
                            name="bloqueado"
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
                    <BotaoSalvar showModal={showModal} openModal={openModal} closeModal={closeModal} />
                    <BotaoCancelar />
                    <BotaoLimpar />
                </div>
            </form >
        </div >
    );
};

export default CadastroAdotante;
