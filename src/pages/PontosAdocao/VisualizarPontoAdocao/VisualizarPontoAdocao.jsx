import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { usePontosAdocao } from '../../../hooks/usePontosAdocao';
import { useBuscarCep } from '../../../hooks/useBuscarCep';

import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoAlterar from "/src/components/BotaoAlterar/BotaoAlterar.jsx";
import BotaoSalvar from "/src/components/BotaoSalvar/BotaoSalvar.jsx";
import './VisualizarPontoAdocao.css';

const VisualizarPontoAdocao = () => {
    const { buscarPontoAdocaoPorId, atualizarPontoAdocao, erro, tratarErro, limparErro } = usePontosAdocao();

    const { id } = useParams();
    const [pontoAdocao, setPontoAdocao] = useState(null);
    const [editando, setEditando] = useState(false);
    const [formDados, setFormDados] = useState({});

    const [tentouEnviar, setTentouEnviar] = useState(false);
    const { buscarCep } = useBuscarCep();

    useEffect(() => {
        buscarPontoAdocaoPorId(id)
            .then((dados) => {
                const dadosFormatados = {
                    ...dados,
                    status: Number(dados.status)
                };
                setPontoAdocao(dadosFormatados);
                setFormDados(dadosFormatados);
            })
            .catch(console.error);
    }, [id]);

    const handleBuscarCep = async () => {
        try {
            const cepLimpo = formDados.cep.match(/\d{8}/)?.[0];

            const endereco = await buscarCep(cepLimpo);

            setFormDados((prev) => ({
                ...prev,
                logradouro: endereco.logradouro || '',
                bairro: endereco.bairro || '',
                cidade: endereco.localidade || '',
                uf: endereco.uf || ''
            }));
        } catch (error) {
            tratarErro(error);
        }
    };

    if (erro) return <div className="erro">{erro}</div>;
    if (!pontoAdocao) return <div>Ponto de adoção não encontrado</div>; // apagar depois

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

        if (!formDados.nomeFantasia?.trim()) {
            return;
        }
        if (!formDados.cnpj?.trim()) {
            return;
        }
        if (!formDados.responsavel?.trim()) {
            return;
        }
        if (!formDados.celular?.trim()) {
            return;
        }
        if (!formDados.responsavelContato?.trim()) {
            return;
        }
        if (!formDados.contato?.trim()) {
            return;
        }
        if (!formDados.cep?.trim()) {
            return;
        }
        if (!formDados.cidade?.trim()) {
            return;
        }
        if (!formDados.uf?.trim()) {
            return;
        }
        if (!formDados.logradouro?.trim()) {
            return;
        }
        if (!formDados.numero || Number(formDados.numero) <= 0) {
            return;
        }
        if (!formDados.bairro?.trim()) {
            return;
        }

        try {
            await atualizarPontoAdocao(id, formDados);
            /* openModal(); */
            // setEditando(false);
            // setTentouEnviar(false);
            setEditando(false);
            setTentouEnviar(false);
        } catch (error) {
            tratarErro(error);
        }
    };

    /* const [showModalAlterar, setShowModalAlterar] = useState(false);
    const [showModalExcluir, setShowModalExcluir] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isEditable, setIsEditable] = useState(false);  // Controle para habilitar edição

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
        const cnpj = document.getElementById('cnpj').value;
        const responsavel = document.getElementById('responsavel').value;
        const celular = document.getElementById('celular').value;
        const cep = document.getElementById('cep').value;
        const cidade = document.getElementById('cidade').value;
        const estado = document.getElementById('estado').value;
        const endereco = document.getElementById('endereco').value;
        const numero = document.getElementById('numero').value;
        const complemento = document.getElementById('complemento').value;
        const bairro = document.getElementById('bairro').value;

        if (nome && cnpj && responsavel && celular && cep && cidade && estado && endereco && numero && bairro) {
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
    }; */

    return (
        <div className="ponto-container">
            <form className="cadastroPonto-form" onSubmit={handleSubmit}>

                <div className='cadastroPonto-linha1'>
                    <div className="form-group">
                        <label>Código</label>
                        <input
                            type="text"
                            id="id"
                            value={pontoAdocao?.id || ''}
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
                </div>



                <div className="form-group">
                    <label>Nome Fantasia</label>
                    <input
                        id="nomeFantasia"
                        name="nomeFantasia"
                        type="text"
                        value={formDados?.nomeFantasia || ''}
                        onChange={handleInputChange}
                        placeholder="Digite o nome fantasia"
                        disabled={!editando}
                    />

                    {(tentouEnviar && !formDados.nomeFantasia) && (
                        <span className="erro-required"> O campo 'Nome Fantasia' é obrigatório </span>
                    )}
                </div>

                <div className='cadastroPonto-linha1'>
                    <div className="form-group">
                        <label>CNPJ</label>
                        <input
                            id="cnpj"
                            name="cnpj"
                            type="text"
                            value={formDados?.cnpj || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                        />

                        {(tentouEnviar && !formDados.cnpj) && (
                            <span className="erro-required"> O campo 'CNPJ' é obrigatório </span>
                        )}
                    </div>

                   {/* <div className="form-group">  Excluir esse campo 
                        <label>Responsável - Pode excluir Dani</label>
                        <input
                            id="responsavel"
                            name="responsavel"
                            type="text"
                            value={formDados?.responsavel || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                        />

                        {(tentouEnviar && !formDados.responsavel) && (
                            <span className="erro-required"> O campo 'Responsável' é obrigatório </span>
                        )}
                    </div>*/}
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

                <div className='group-adocao'>
                    <div className="form-group">
                    <label>Contato</label>
                   
                        <input id='contato'
                            type="text"
                            name="contato"
                            placeholder="Telefone"
                            value={formDados?.contato || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                        />

                        {(tentouEnviar && !formDados.contato) && (
                            <span className="erro-required"> O campo 'Contato' é obrigatório </span>
                        )}

                        </div>

                         <div className="form-group">
                            <label>Responsável pelo contato</label>
                        <input id='responsavel'
                            type="text"
                            name="responsavelContato"
                            placeholder="Responsável"
                            value={formDados?.responsavelContato || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                        />

                        {(tentouEnviar && !formDados.responsavelContato) && (
                            <span className="erro-required"> O campo 'Responsável Contato' é obrigatório </span>
                        )}
                        </div>
                    
                </div>

                <div className="cadastroPonto-linha1">
                    <div className="form-group">
                        <label htmlFor="cep">CEP</label>
                        <input
                            id="cep"
                            name="cep"
                            type="text"
                            placeholder="Digite o CEP"
                            value={formDados?.cep || ''}
                            onChange={handleInputChange}
                            onBlur={handleBuscarCep}
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

                        {(tentouEnviar && !formDados.uf) && (
                            <span className="erro-required"> O campo 'Estado' é obrigatório </span>
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
                        <span className="erro-required"> O campo 'Logradouro' é obrigatório </span>
                    )}
                </div>

                <div className='cadastroPonto-linha1'>
                    <div className="form-group">
                        <label>Número</label>
                        <input
                            id="numero"
                            name="numero"
                            type="number"
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
                    <BotaoCancelar />  {/* Desabilita o botão "Cancelar" se os campos estiverem desabilitados */}
                </div>
            </form>
        </div>
    );
};

export default VisualizarPontoAdocao;
