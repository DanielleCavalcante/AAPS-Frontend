import InputMask from 'react-input-mask';
import React, { useState, useEffect, useRef } from 'react';
import { validarCPF } from '../../../utils/ValidaCPF';
import { validarRG } from '../../../utils/ValidaRG';
import { validarNome } from '../../../utils/ValidaNome';
import { validarTelefone } from '../../../utils/ValidaTelefone';
import AlertAtencao from "/src/components/AlertAtencao/AlertAtencao.jsx";
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAdotantes } from '../../../hooks/useAdotantes';

import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoAlterar from "/src/components/BotaoAlterar/BotaoAlterar.jsx";
import BotaoSalvar from "/src/components/BotaoSalvar/BotaoSalvar.jsx";
import './VisualizarAdotante.css';

const VisualizarAdotante = () => {
    const navigate = useNavigate();
    const { buscarAdotantePorId, atualizarAdotante, erro, tratarErro, limparErro } = useAdotantes();

    const { id } = useParams();
    const [adotante, setAdotante] = useState(null);
    const [formDados, setFormDados] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [editando, setEditando] = useState(false);
    const [tentouEnviar, setTentouEnviar] = useState(false);
    const [alertAtencao, setAlertAtencao] = useState(false);
    const [alertMensagem, setAlertMensagem] = useState('');
    const [campoAlerta, setCampoAlerta] = useState('');
    const rgRef = useRef(null);
    const cpfRef = useRef(null);
    const emailRef = useRef(null);
    const celularRef = useRef(null);
    const contatoRef = useRef(null);

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

        //Chama a validação do RG
        if (name === 'rg') {
            // Remove caracteres não numéricos
            const rgLimpo = value.replace(/[^\d]+/g, '');

            // Se RG tiver exatamente 9 dígitos, faz a validação
            if (rgLimpo.length === 9) {
                if (!validarRG(rgLimpo)) {
                    setCampoAlerta('rg');
                    setAlertMensagem('RG inválido. Insira novamente.');
                    setAlertAtencao(true);
                }
            }
        }

        //Chama a validação do CPF
        if (name === 'cpf') {
            // Remove caracteres não numéricos
            const cpfLimpo = value.replace(/[^\d]+/g, '');

            // Se CPF tiver exatamente 11 dígitos, faz a validação
            if (cpfLimpo.length === 11) {
                if (!validarCPF(cpfLimpo)) {
                    setCampoAlerta('cpf');
                    setAlertMensagem('CPF inválido. Insira novamente.');
                    setAlertAtencao(true);
                }
            }
        }

        if (name === 'celular') {
            const numeros = value.replace(/\D/g, ''); // remove tudo que não for número
            if (numeros.length == 11) {
                if (!validarTelefone(numeros)) {
                    setCampoAlerta('celular');
                    setAlertMensagem('Número de celular inválido. Insira novamente.');
                    setAlertAtencao(true);
                    return;
                }
            }
        }

        if (name === 'contato') {
            const numeros = value.replace(/\D/g, ''); // remove tudo que não for número
            if (numeros.length == 11) {
                if (!validarTelefone(value)) {
                    setCampoAlerta('contato');
                    setAlertMensagem('Número de contato inválido. Insira novamente.');
                    setAlertAtencao(true);
                    return;
                }
            }
        }

        if (name === 'numero') {
            if (value === '') {
                setFormDados({ ...formDados, [name]: '' });
                return;
            }
            const numero = parseInt(value, 10);
            if (isNaN(numero) || numero <= 0) {
                return;
            }
        }
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

        const cpfLimpo = formDados.cpf.replace(/[^\d]+/g, '');
        const rgLimpo = formDados.rg.replace(/[^0-9Xx]+/g, '');
        const cepLimpo = formDados.cep.replace(/[^\d]+/g, '');
        const celularLimpo = formDados.celular.replace(/[^\d]+/g, '');
        const contatoLimpo = formDados.contato.replace(/[^\d]+/g, '');

        if (!validarRG(rgLimpo)) {
            setCampoAlerta('rg');
            setAlertMensagem('RG inválido. Insira novamente.');
            setAlertAtencao(true);
            return;
        }

        if (!validarCPF(cpfLimpo)) {
            setCampoAlerta('cpf');
            setAlertMensagem('CPF inválido. Insira novamente.');
            setAlertAtencao(true);
            return;
        }

        if (!validarTelefone(formDados.celular)) {
            setCampoAlerta('celular');
            setAlertMensagem('Número de celular inválido. Insira novamente.');
            setAlertAtencao(true);
            return;
        }

        if (!validarTelefone(formDados.contato)) {
            setCampoAlerta('contato');
            setAlertMensagem('Número de contato inválido. Insira novamente.');
            setAlertAtencao(true);
            return;
        }

        if (!formDados.email.includes('@')) {
            setCampoAlerta('email');
            setAlertMensagem('E-mail inválido. Insira novamente.');
            setAlertAtencao(true);
            return;
        }

        try {
            formDados.cpf = cpfLimpo;
            formDados.rg = rgLimpo;
            formDados.cep = cepLimpo;
            formDados.celular = celularLimpo;
            formDados.contato = contatoLimpo;
            await atualizarAdotante(id, formDados);
            openModal();
            // setEditando(false);
            // setTentouEnviar(false);
        } catch (error) {
            tratarErro(error);
        }
    };
    
    //Modais:
    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setEditando(false);
        setShowModal(false);
        navigate('/listar-adotantes');
    }

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

    const fecharAlertaEFocarCampo = (campoRef, campo) => {
        setAlertAtencao(false);
        setFormDados(prev => ({ ...prev, [campo]: '' }));  // limpa o valor no estado

        if (campoRef.current) {
            campoRef.current.value = '';   // limpa o input na tela
            campoRef.current.focus();      // foca no campo
        }
    };

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
                        type="text"
                        id="nome"
                        name='nome'
                        maxLength={50} //verificar tamanho maximo.
                        value={formDados?.nome || ''}
                        onChange={handleInputChange}
                        disabled={!editando}
                        onKeyDown={(e) => {
                            if (!validarNome(e.key) && e.key.length === 1) {
                                e.preventDefault();
                            }
                        }}
                        placeholder="Digite o nome"
                    />
                    {(tentouEnviar && !formDados.nome) && (
                        <span className="erro-required"> O campo 'Nome' é obrigatório </span>
                    )}
                </div>

                <div className='cadastroAdotante-linha1'>
                    <div className="form-group">
                        <label>RG</label>
                        <InputMask
                            mask="99.999.999-*"
                            formatChars={{
                                '9': '[0-9]',
                                '*': '[0-9Xx]'  // aqui o '*' aceita dígitos de 0 a 9 e também X ou x
                            }}
                            value={formDados?.rg || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                            placeholder="__.___.___-_"
                            required>
                            {(inputProps) => (
                                <input
                                    {...inputProps}
                                    id="rg"
                                    name="rg"
                                    type="text"
                                    ref={rgRef}
                                    disabled={!editando}
                                />
                            )}
                        </InputMask>
                        {(tentouEnviar && !formDados.rg) && (
                            <span className="erro-required"> O campo 'RG' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>CPF</label>
                        <InputMask
                            mask="999.999.999-99"
                            value={formDados?.cpf || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                            placeholder="___.___.___-__"
                            required>
                            {(inputProps) => (
                                <input
                                    {...inputProps}
                                    id="cpf"
                                    name="cpf"
                                    type="text"
                                    disabled={!editando}
                                    ref={cpfRef}
                                />
                            )}
                        </InputMask>
                        {(tentouEnviar && !formDados.cpf) && (
                            <span className="erro-required"> O campo 'CPF' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Celular</label>
                        <InputMask
                            mask="(99) 99999-9999"
                            value={formDados?.celular || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                            placeholder="(__) _____-____"
                            required
                        >
                            {(inputProps) => (
                                <input
                                    {...inputProps}
                                    type="text"
                                    id="celular"
                                    name="celular"
                                    disabled={!editando}
                                    ref={celularRef}
                                />
                            )}
                        </InputMask>
                        {(tentouEnviar && !formDados.celular) && (
                            <span className="erro-required"> O campo 'Celular' é obrigatório </span>
                        )}
                    </div>
                </div>

                <div className="group-adocao">
                    <div className="form-group">
                        <label>Contato</label>
                        <InputMask
                            mask="(99) 99999-9999"
                            value={formDados?.contato || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                            placeholder="(__) _____-____"
                            required
                        >
                            {(inputProps) => (
                                <input
                                    {...inputProps}
                                    type="text"
                                    id="contato"
                                    name="contato"
                                    disabled={!editando}
                                    ref={contatoRef}
                                />
                            )}
                        </InputMask>
                        {(tentouEnviar && !formDados.contato) && (
                            <span className="erro-required"> O campo 'Nome' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Responsável Contato</label>
                        <input
                            type="text"
                            id='responsavelContato'
                            name="responsavelContato"
                            maxLength={50} //verificar tamanho maximo.
                            value={formDados?.responsavelContato || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                            placeholder="Nome do contato para recados"
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
                        ref={emailRef}
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
                        <InputMask
                            mask="99999-999"
                            value={formDados?.cep || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                            // onBlur={handleBuscarCep}
                            placeholder="_____-___"
                            required
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
                            disabled
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
                        disabled
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
                            disabled
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
                        <BotaoSalvar showModal={showModal} openModal={handleSubmit} closeModal={closeModal} />
                    )}
                    <BotaoCancelar onClick={() => navigate('/listar-adotantes')}/>
                </div>
            </form>
            {alertAtencao && (
                <AlertAtencao
                    mensagem={alertMensagem}
                    onClose={() => {
                        const refs = {
                            rg: rgRef,
                            cpf: cpfRef,
                            celular: celularRef,
                            contato: contatoRef,
                            email: emailRef
                        };
                        fecharAlertaEFocarCampo(refs[campoAlerta], campoAlerta);
                    }}
                />
            )}
        </div>
    );
};

export default VisualizarAdotante;
