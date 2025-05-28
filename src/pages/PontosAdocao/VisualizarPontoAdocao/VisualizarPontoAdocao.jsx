import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { usePontosAdocao } from '../../../hooks/usePontosAdocao';
import { useBuscarCep } from '../../../hooks/useBuscarCep';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { validarNome } from '../../../utils/ValidaNome';
import { validarCNPJ } from '../../../utils/ValidaCNPJ';

import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoAlterar from "/src/components/BotaoAlterar/BotaoAlterar.jsx";
import BotaoSalvar from "/src/components/BotaoSalvar/BotaoSalvar.jsx";
import './VisualizarPontoAdocao.css';

const VisualizarPontoAdocao = () => {
    const { buscarPontoAdocaoPorId, atualizarPontoAdocao, erro, tratarErro, limparErro } = usePontosAdocao();
    const navigate = useNavigate();
    const { id } = useParams();
    const [pontoAdocao, setPontoAdocao] = useState(null);
    const [editando, setEditando] = useState(false);
    const [formDados, setFormDados] = useState({});
    const [erroCNPJ, setErroCNPJ] = useState('');
    const [tentouEnviar, setTentouEnviar] = useState(false);
    const { buscarCep } = useBuscarCep();
    const [showModal, setShowModal] = useState(false);

    //Modais:
    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setEditando(false);
        setShowModal(false);
        navigate('/listar-pontos-adocao');
    }

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
            // const cepLimpo = formDados.cep.match(/\d{8}/)?.[0];
            const cepLimpo = formDados.cep.replace(/[^\d]+/g, '');

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

        //Chama a validação do CNPJ
        if (name === 'cnpj') {
            // Remove caracteres não numéricos
            const cnpjLimpo = value.replace(/[^\d]+/g, '');

            // Se CPF tiver exatamente 11 dígitos, faz a validação
            if (cnpjLimpo.length === 14) {
                if (!validarCNPJ(cnpjLimpo)) {
                    setErroCNPJ('Eita! CNPJ inválido');
                } else {
                    setErroCNPJ('');
                }
            }
            else {
                // Enquanto não tiver 11 dígitos, não mostra erro
                setErroCNPJ('');
            }
        }

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

        const cnpjLimpo = formDados.cnpj.replace(/[^\d]+/g, '');

        if (!validarCNPJ(cnpjLimpo)) {
            setErroCNPJ('Eita! CNPJ inválido');
            alert("CNPJ invalido. Insira novamente");
            return;
        }

        try {
            formDados.cnpj = cnpjLimpo;
            await atualizarPontoAdocao(id, formDados);
            openModal();
            // setEditando(false);
            // setTentouEnviar(false);
        } catch (error) {
            tratarErro(error);
        }
    };

    // const openModal = () => {
    //     const status = document.getElementById('status').value;
    //     const nome = document.getElementById('nomeFantasia').value;
    //     const cnpj = document.getElementById('cnpj').value;
    //     const responsavel = document.getElementById('responsavel').value;
    //     const celular = document.getElementById('celular').value;
    //     const contato = document.getElementById('contato').value;
    //     const responsavelContato = document.getElementById('responsavelContato').value;
    //     const cep = document.getElementById('cep').value;
    //     const numero = document.getElementById('numero').value;

    //     // Verifica se todos os campos estão preenchidos
    //     if (status && nome && cnpj && responsavel && celular && contato && responsavelContato && cep && numero) {
    //         setShowModal(true);
    //     } else {
    //         return null;
    //     }
    // };

    /*// Handlers para telefones e responsáveis
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
                        type="text"
                        id="nomeFantasia"
                        name="nomeFantasia"
                        maxLength={50} //verificar tamanho maximo.
                        value={formDados?.nomeFantasia || ''}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (!validarNome(e.key) && e.key.length === 1) {
                                e.preventDefault();
                            }
                        }}
                        placeholder="Digite a Razão Social"
                        disabled={!editando}
                    />
                    {(tentouEnviar && !formDados.nomeFantasia) && (
                        <span className="erro-required"> O campo 'Nome Fantasia' é obrigatório </span>
                    )}
                </div>

                <div className='cadastroPonto-linha1'>
                    <div className="form-group">
                        <label>CNPJ</label>
                        <InputMask
                            mask="99.999.999/9999-99"
                            value={formDados?.cnpj || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                            placeholder="__.___.___/____-__"
                        >
                            {(inputProps) => (
                                <input
                                    {...inputProps}
                                    type="text"
                                    id="cnpj"
                                    name="cnpj"
                                    disabled={!editando}
                                />
                            )}
                        </InputMask>
                        {erroCNPJ && <span className="error">{erroCNPJ}</span>}
                        {(tentouEnviar && !formDados.cnpj) && (
                            <span className="erro-required"> O campo 'CNPJ' é obrigatório </span>
                        )}
                    </div>

                   {/* <div className="form-group">  Excluir esse campo 
                        <label>Responsável - Pode excluir Dani</label>
                        <input
                            type="text"
                            id="responsavel"
                            name="responsavel"
                            maxLength={50} //verificar tamanho maximo.
                            value={formDados?.responsavel || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                            onKeyDown={(e) => {
                                if (!validarNome(e.key) && e.key.length === 1) {
                                    e.preventDefault();
                                }
                            }}
                            placeholder="Digite o Responsável"
                        />
                        {(tentouEnviar && !formDados.responsavel) && (
                            <span className="erro-required"> O campo 'Responsável' é obrigatório </span>
                        )}
                    </div>*/}
                    <div className="form-group">
                        <label>Celular</label>
                        <InputMask
                            mask="(99) 99999-9999"
                            value={formDados?.celular || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                            placeholder="(__) _____-____"
                        // required
                        >
                            {(inputProps) => (
                                <input
                                    {...inputProps}
                                    type="text"
                                    id="celular"
                                    name="celular"
                                    disabled={!editando}
                                />
                            )}
                        </InputMask>
                        {(tentouEnviar && !formDados.celular) && (
                            <span className="erro-required"> O campo 'Celular' é obrigatório </span>
                        )}
                    </div>
                </div>

                <div className='group-adocao'>
                    <div className="form-group">
                        <label>Contato</label>
                        <InputMask
                            mask="(99) 99999-9999"
                            value={formDados?.contato || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                            placeholder="(__) _____-____"
                        // required
                        >
                            {(inputProps) => (
                                <input
                                    {...inputProps}
                                    type="text"
                                    id="contato"
                                    name="contato"
                                    disabled={!editando}
                                />
                            )}
                        </InputMask>
                        {(tentouEnviar && !formDados.contato) && (
                            <span className="erro-required"> O campo 'Contato' é obrigatório </span>
                        )}

                    </div>

                    <div className="form-group">
                        <label>Responsável pelo Contato</label>
                        <input
                            type="text"
                            id='responsavelContato'
                            name="responsavelContato"
                            maxLength={50} //verificar tamanho maximo.
                            value={formDados?.responsavelContato || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                            onKeyDown={(e) => {
                                if (!validarNome(e.key) && e.key.length === 1) {
                                    e.preventDefault();
                                }
                            }}
                        />
                        {(tentouEnviar && !formDados.responsavelContato) && (
                            <span className="erro-required"> O campo 'Responsável Contato' é obrigatório </span>
                        )}
                    </div>

                </div>

                <div className="cadastroPonto-linha1">
                    <div className="form-group">
                        <label htmlFor="cep">CEP</label>
                        <InputMask
                            mask="99999-999"
                            value={formDados?.cep || ''}
                            onChange={handleInputChange}
                            onBlur={handleBuscarCep}
                            disabled={!editando}
                            placeholder="_____-___"
                        // required
                        >
                            {(inputProps) => (
                                <input
                                    {...inputProps}
                                    type="text"
                                    id="cep"
                                    name="cep"
                                    disabled={!editando}
                                />
                            )}
                        </InputMask>
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
                            // disabled={!editando}
                            disabled
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
                            // disabled={!editando}
                            disabled
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
                        // disabled={!editando}
                        disabled
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
                            // disabled={!editando}
                            disabled
                        />

                        {(tentouEnviar && !formDados.bairro) && (
                            <span className="erro-required"> O campo 'Bairro' é obrigatório </span>
                        )}
                    </div>
                </div>

                <div className="button-group-crud">
                    {!editando ? (
                        <BotaoAlterar onClick={() => setEditando(true)} />
                    ) : (
                        <BotaoSalvar showModal={showModal} openModal={handleSubmit} closeModal={closeModal} />
                    )}
                    <BotaoCancelar />
                </div>
            </form>
        </div>
    );
};

export default VisualizarPontoAdocao;
