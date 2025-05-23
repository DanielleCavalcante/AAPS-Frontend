import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useDoadores } from '../../../hooks/useDoadores';
import { useBuscarCep } from '../../../hooks/useBuscarCep';

import BotaoAlterar from "/src/components/BotaoAlterar/BotaoAlterar.jsx";
import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoSalvar from "/src/components/BotaoSalvar/BotaoSalvar.jsx";
import './VisualizarDoador.css';

const VisualizarDoador = () => {
    const { buscarDoadorPorId, atualizarDoador, erro, tratarErro, limparErro } = useDoadores();
    
    const { id } = useParams();
    const [doador, setDoador] = useState(null);
    const [editando, setEditando] = useState(false);
    const [formDados, setFormDados] = useState({});

    const [tentouEnviar, setTentouEnviar] = useState(false);
    const { buscarCep } = useBuscarCep();

    useEffect(() => {
        buscarDoadorPorId(id)
            .then((dados) => {
            const dadosFormatados = {
                ...dados,
                status: Number(dados.status)
            };
            setDoador(dadosFormatados);
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
    if (!doador) return <div>Doador não encontrado</div>; // apagar depois

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

        if (!formDados.nome?.trim()) {
            return; 
        }
        if (!formDados.rg?.trim()) {
            return; 
        }
        if (!formDados.cpf?.trim()) {
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
            await atualizarDoador(id, formDados);
            /* openModal(); */
            // setEditando(false);
            // setTentouEnviar(false);
            setEditando(false);
            setTentouEnviar(false);
        } catch (error) {
            tratarErro(error);
        }
    };






    /* const [showModalAlterar, setShowModalAlterar] = useState(false); //Alteração
    const [showModalExcluir, setShowModalExcluir] = useState(false); //Exclusão
    const [showConfirmModal, setShowConfirmModal] = useState(false); //Confirmar
    const [telefones, setTelefones] = useState([{ telefone: '', responsavel: '' }]); */
    /* const [foto, setFoto] = useState(null); */
    /* const [showModal, setShowModal] = useState(false); */

    // Handlers do modal
    /* const closeModalAlterar = () => setShowModalAlterar(false);

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
    }; */

    /* const closeModalExcluir = () => setShowModalExcluir(false);

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
 */
    return (
        <div className="cadastro-container">
            <form className="cadastroDoador-form" onSubmit={handleSubmit}>
                <div className='cadastroDoador-linha1'>
                    <div className="form-group">
                        <label>Código</label>
                        <input 
                            type="text" 
                            id="id" 
                            value={doador?.id || '' } 
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

                    {/* <div className="foto-upload">
                        <div class="foto-preview-container">
                            <span class="foto-label">Foto</span>
                            {foto && <img src={foto} alt="Foto do doador" className="foto" />}
                        </div>
                    </div> */}

                </div>

                <div className="form-group">
                    <label>Nome</label>
                    <input 
                        id="nome" 
                        name="nome" 
                        type="text" 
                        value={formDados?.nome || ''}
                        onChange={handleInputChange}
                        placeholder="Digite o nome" 
                        disabled={!editando}
                    />

                    {(tentouEnviar && !formDados.nome) && (
                        <span className="erro-required"> O campo 'Nome' é obrigatório </span>
                    )}
                </div>

                <div className='cadastroDoador-linha1'>
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

                <div className="form-group">
                    <label>Contato</label>
                  {/*   {telefones.map((item, index) => ( */}
                    <div /* key={index} */ className="telefone-group">
                        <input id='contato'
                            type="text"
                            name="contato"
                            placeholder="Contato para recados"
                            value={formDados?.contato || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                        />

                        {(tentouEnviar && !formDados.contato) && (
                            <span className="erro-required"> O campo 'Contato' é obrigatório </span>
                        )}
                        <label>Responsável Contato</label>
                        <input id='responsavel'
                            type="text"
                            name="responsavelContato"
                            placeholder="Contato para recados"
                            value={formDados?.responsavelContato || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                        />

                        {(tentouEnviar && !formDados.responsavelContato) && (
                            <span className="erro-required"> O campo 'Responsável Contato' é obrigatório </span>
                        )}
                        {/* {telefones.length > 1 && (
                            <button
                                type="button"
                                className="remove-btn-cad-doador"
                                onClick={() => handleRemoveTelefone(index)}
                            >
                                <img src="/src/assets/icone_excluir.png" alt="Ícone excluir" className="icon-remove-cad-doador" />
                            </button>
                        )} */}
                    </div>
                </div>

                <div className="cadastroDoador-linha1">
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
                    <label>Logradouro</label>
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

                <div className='cadastroDoador-linha1'>
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
                        /* showModal={showModalAlterar} openModal={openModalAlterar} closeModal={closeModalAlterar}  *//>
                        ) : (
                        <button 
                            type="submit" 
                            className="botao-alterar" 
                        > salvar
                        </button>
                        //<BotaoSalvar onClick={salvarAlteracoes}/*  showModal={showModal} openModal={openModal} closeModal={closeModal} */ />
                        )}
                    <BotaoCancelar />
                </div>
            </form>
        </div>
    );
};

export default VisualizarDoador;
