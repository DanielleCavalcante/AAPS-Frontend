import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useAdotantes } from '../../../hooks/useAdotantes';

import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoAlterar from "/src/components/BotaoAlterar/BotaoAlterar.jsx";
import BotaoSalvar from "/src/components/BotaoSalvar/BotaoSalvar.jsx";
import './VisualizarAdotante.css';

const VisualizarAdotante = () => {
    const { buscarAdotantePorId, atualizarAdotante, erro, tratarErro, limparErro } = useAdotantes();

    const { id } = useParams();
    const [adotante, setAdotante] = useState(null);
    const [formDados, setFormDados] = useState({});

    const [editando, setEditando] = useState(false);
    const [tentouEnviar, setTentouEnviar] = useState(false);

    useEffect(() => {
        buscarAdotantePorId(id)
            .then((dados) => {
            const dadosFormatados = {
                ...dados,
                status: Number(dados.status),
                bloqueio: Number(dados.bloqueio),
            };
            setAdotante(dadosFormatados);
            setFormDados(dadosFormatados);
            })
            .catch(console.error);
    }, [id]);

    if (erro) return <div className="erro">{erro}</div>;
    if (!adotante) return <div>Adotante não encontrado</div>;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const numericFields = 'status';
        const parsedValue = numericFields.includes(name) ? Number(value) : value;
        setFormDados({ ...formDados, [name]: parsedValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        setTentouEnviar(true);

        limparErro();

        if (!formDados.nome?.trim()) return;
        if (!formDados.rg?.trim()) return;
        if (!formDados.cpf?.trim()) return;
        if (!formDados.responsavelContato?.trim()) return;
        if (!formDados.contato?.trim()) return;
        if (!formDados.celular?.trim()) return;
        if (!formDados.email?.trim()) return;
        if (!formDados.localTrabalho?.trim()) return;
        if (!formDados.facebook?.trim()) return;
        if (!formDados.instagram?.trim()) return;
        if (!formDados.situacaoEndereco?.trim()) return;
        if (!formDados.cep?.trim()) return;
        if (!formDados.cidade?.trim()) return;
        if (!formDados.uf?.trim()) return;
        if (!formDados.logradouro?.trim()) return;
        if (!formDados.numero || Number(formDados.numero) <= 0) return;
        if (!formDados.bairro?.trim()) return;

        try {
            await atualizarAdotante(id, formDados);
           /*  openModal(); */
            // setEditando(false);
            // setTentouEnviar(false);
        } catch (error) {
            tratarErro(error);
        }
    };

    /* const [showModalAlterar, setShowModalAlterar] = useState(false);
    const [showModalExcluir, setShowModalExcluir] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isEditable, setIsEditable] = useState(false);  // Controle para habilitar edição
    const [foto, setFoto] = useState(null);  // Para controlar a foto carregada
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
    }); */

    // Handlers para telefones e responsáveis
    /*const handleAddTelefone = () => setTelefones([...telefones, { telefone: '', responsavel: '' }]);
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
    };*/

    /* const closeModalAlterar = () => setShowModalAlterar(false);
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
    }; */

    /* const closeModalExcluir = () => setShowModalExcluir(false);
    const openModalExcluir = () => {
        setShowConfirmModal(false);
        setShowModalExcluir(true);
    }; */

    /* const closeConfirmModal = () => {
        setShowConfirmModal(false);
    };
    const openConfirmModal = () => {
        setShowConfirmModal(true);
    }; */

    /*const handleFotoCamera = async () => {
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
    };*/

    return (
        <div className="cadastro-container">
            <form className="cadastroAdotante-form" onSubmit={handleSubmit}>
                <div className='cadastroAdotante-linha1'>
                    <div className="form-group">
                        <label>Código</label>
                        <input 
                            type="text" 
                            id="id"
                            value={adotante?.id || ''}
                            disabled
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={formDados?.status}
                            onChange={handleInputChange}
                            disabled={!editando}
                        >
                            <option value={1}>Ativo</option>
                            <option value={0}>Inativo</option>
                        </select>
                    </div>

                    {/*<div className="foto-upload">

                        <div class="foto-preview-container">
                            <span class="foto-label">Foto</span>
                            {foto && <img src={foto} alt="Foto do doador" className="foto" />}
                        </div>
                    </div>*/}
                </div>

                <div className="form-group">
                    <label>Nome</label>
                    <input
                        id="nome"
                        name="nome"
                        type="text"
                        placeholder="Digite o nome"
                        value={formDados?.nome || ''}
                        onChange={handleInputChange}
                        disabled={!editando}
                    />
                    {(tentouEnviar && !formDados.nome) && (
                        <span className="erro-required"> O campo 'Nome' é obrigatório </span>
                    )}
                </div>

                <div className='cadastroAdotante-linha1'>
                    <div className="form-group">
                        <label>RG</label>
                        <input
                            id="rg"
                            name="rg"
                            type="text"
                            placeholder="Digite o RG"
                            value={formDados?.rg || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                        />
                        {(tentouEnviar && !formDados.rg) && (
                            <span className="erro-required"> O campo 'RG' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>CPF</label>
                        <input
                            id="cpf"
                            name="cpf"
                            type="text"
                            placeholder="Digite o CPF"
                            value={formDados?.cpf || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                        />
                        {(tentouEnviar && !formDados.cpf) && (
                            <span className="erro-required"> O campo 'CPF' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Celular</label>
                        <input
                            id="celular"
                            name="celular"
                            type="text"
                            placeholder="Digite o celular com DDD"
                            value={formDados?.celular || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                        />
                        {(tentouEnviar && !formDados.celular) && (
                            <span className="erro-required"> O campo 'Celular' é obrigatório </span>
                        )}
                    </div>
                </div>

                <div className="group-adocao">
                    <div className="form-group">
                        <label>Contato</label>
                        <input
                            id='contato'
                            type="text"
                            name="contato"
                            placeholder="Digite um nº de contato"
                            value={formDados?.contato || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                        />
                        {(tentouEnviar && !formDados.contato) && (
                            <span className="erro-required"> O campo 'Nome' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Responsável Contato</label>
                        <input
                            id='responsavelContato'
                            name="responsavelContato"
                            type="text"
                            placeholder="Nome do contato para recados"
                            value={formDados?.responsavelContato || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                        />
                        {(tentouEnviar && !formDados.responsavelContato) && (
                            <span className="erro-required"> O campo 'Responsável Contato' é obrigatório </span>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label>E-mail</label>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Digite o e-mail"
                        value={formDados?.email || ''}
                        onChange={handleInputChange}
                        disabled={!editando}
                    />
                    {(tentouEnviar && !formDados.email) && (
                        <span className="erro-required"> O campo 'E-mail' é obrigatório </span>
                    )}
                </div>

                <div className="form-group">
                    <label>Local de Trabalho</label>
                    <input
                        id="localTrabalho"
                        name="localTrabalho"
                        type="text"
                        placeholder="Digite o nome do local de trabalho"
                        value={formDados?.localTrabalho || ''}
                        onChange={handleInputChange}
                        disabled={!editando}
                    />
                    {(tentouEnviar && !formDados.localTrabalho) && (
                        <span className="erro-required"> O campo 'Local de Trabalho' é obrigatório </span>
                    )}
                </div>

                {/*<div className="radio-group">
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
                </div>*/}

                <div className="radio-group">
                    <label className="radio-label">
                        <input
                            id="situacaoEndereco"
                            type="radio"
                            name="situacaoEndereco"
                            value="Própria"
                            checked={formDados.situacaoEndereco === "Própria"}
                            onChange={handleInputChange}
                        />
                        Própria
                    </label>
                    <label className="radio-label">
                        <input
                            id="situacaoEndereco"
                            type="radio"
                            name="situacaoEndereco"
                            value="Alugada"
                            checked={formDados.situacaoEndereco === "Alugada"}
                            onChange={handleInputChange}
                        />
                        Alugada
                    </label>
                </div>

                <div className="cadastroAdotante-linha1">
                    <div className="form-group">
                        <label htmlFor="cep">CEP</label>
                        <input
                            id="cep"
                            name="cep"
                            type="text"
                            placeholder="Digite o CEP"
                            value={formDados?.cep || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                        />
                        {(tentouEnviar && !formDados.cep) && (
                            <span className="erro-required"> O campo 'CEP' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="cidade">Cidade</label>
                        <input
                            id="cidade"
                            name="cidade"
                            type="text"
                            placeholder="Digite a cidade"
                            value={formDados?.cidade || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                        />
                        {(tentouEnviar && !formDados.cidade) && (
                            <span className="erro-required"> O campo 'Cidade' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="estado">Estado</label>
                        <input
                            id="uf"
                            name="uf"
                            type="text"
                            placeholder="Digite o estado"
                            value={formDados?.uf || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                        />
                        {(tentouEnviar && !formDados.cidade) && (
                            <span className="erro-required"> O campo 'Cidade' é obrigatório </span>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label>Endereço</label>
                    <input
                        id="logradouro"
                        name="logradouro"
                        type="text"
                        placeholder="Digite o Endereço"
                        value={formDados?.logradouro || ''}
                        onChange={handleInputChange}
                        disabled={!editando}
                    />
                    {(tentouEnviar && !formDados.logradouro) && (
                        <span className="erro-required"> O campo 'Endereço' é obrigatório </span>
                    )}
                </div>

                <div className='cadastroAdotante-linha1'>
                    <div className="form-group">
                        <label>Número</label>
                        <input
                            id="numero"
                            name="numero"
                            type="text"
                            placeholder="Digite o nº da residência"
                            value={formDados?.numero || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                        />
                        {(tentouEnviar && !formDados.numero) && (
                            <span className="erro-required"> O campo 'Número' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Complemento</label>
                        <input
                            id="complemento"
                            name="complemento"
                            type="text"
                            placeholder="Digite o complemento"
                            value={formDados?.complemento || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                        />
                    </div>
                    <div className="form-group">
                        <label>Bairro</label>
                        <input
                            id="bairro"
                            name="bairro"
                            type="text"
                            placeholder="Digite o bairro"
                            value={formDados?.bairro || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                        />
                        {(tentouEnviar && !formDados.bairro) && (
                            <span className="erro-required"> O campo 'Bairro' é obrigatório </span>
                        )}
                    </div>
                </div>

                <div id="group4">
                    <div className="form-group">
                        <label htmlFor="facebook">Facebook</label>
                        <input
                            id="facebook"
                            name="facebook"
                            type="text"
                            value={formDados?.facebook || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                        />
                        {(tentouEnviar && !formDados.facebook) && (
                            <span className="erro-required"> O campo 'Facebook' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="instagram">Instagram</label>
                        <input
                            id="instagram"
                            name="instagram"
                            type="text"
                            value={formDados?.instagram || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                        />
                        {(tentouEnviar && !formDados.instagram) && (
                            <span className="erro-required"> O campo 'Instagram' é obrigatório </span>
                        )}
                    </div>
                </div>

                <div className="radio-group">
                    <label className="radio-label">
                        <input
                            id='bloqueio'
                            type="checkbox"
                            name="bloqueio"
                            value={formDados.bloqueio}
                            checked={formDados.bloqueio === 1}
                            onChange={e =>
                                setFormDados({ ...formDados, bloqueio: e.target.checked ? 1 : 0 })
                            }
                            disabled={!editando}
                        />
                        Bloqueado
                    </label>
                </div>
                <textarea
                    id="observacaoBloqueio"
                    name="observacaoBloqueio"
                    placeholder="Observação"
                    value={formDados?.observacaoBloqueio || ''}
                    onChange={handleInputChange}
                    disabled={!editando}
                />

                <div className="button-group-crud">
                    {!editando ? (
                        <BotaoAlterar onClick={() => setEditando(true)}
                            //disabled={editando}
                        /* showModal={showModalAlterar} openModal={openModalAlterar} closeModal={closeModalAlterar}  */ />
                    ) : (
                        <button 
                            type="submit" 
                        >
                            Salvar
                        </button>
                        //<BotaoSalvar onClick={salvarAlteracoes}/*  showModal={showModal} openModal={openModal} closeModal={closeModal} */ />
                    )}
                    <BotaoCancelar />
                </div>
            </form>
        </div>
    );
};

export default VisualizarAdotante;
