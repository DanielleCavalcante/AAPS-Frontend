import InputMask from 'react-input-mask';
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useDoadores } from '../../../hooks/useDoadores';
import { useError } from '../../../hooks/useError';
import { useBuscarCep } from '../../../hooks/useBuscarCep';

import { validarCPF } from '../../../utils/ValidaCPF';
import { validarRG } from '../../../utils/ValidaRG';
import { validarNome } from '../../../utils/ValidaNome';
import { validarTelefone } from '../../../utils/ValidaTelefone';

import AlertAtencao from "/src/components/AlertAtencao/AlertAtencao.jsx";
import BotaoAlterar from "/src/components/BotaoAlterar/BotaoAlterar.jsx";
import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoSalvar from "/src/components/BotaoSalvar/BotaoSalvar.jsx";
import './VisualizarDoador.css';

const VisualizarDoador = () => {
    const { buscarDoadorPorId, atualizarDoador} = useDoadores();
    const { tratarErro, limparErro, erro } = useError();
    const navigate = useNavigate();
    const { id } = useParams();
    const [doador, setDoador] = useState(null);
    const [editando, setEditando] = useState(false);
    const [formDados, setFormDados] = useState({});
    const [showModal, setShowModal] = useState(false);

    const [tentouEnviar, setTentouEnviar] = useState(false);
    const { buscarCep } = useBuscarCep();

    const [alertAtencao, setAlertAtencao] = useState(false);
    const [alertMensagem, setAlertMensagem] = useState('');
    const [campoAlerta, setCampoAlerta] = useState('');
    const [alertErroApi, setAlertErroApi] = useState(false);

    const rgRef = useRef(null);
    const cpfRef = useRef(null);
    const celularRef = useRef(null);
    const contatoRef = useRef(null);

    //Modais:
    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setEditando(false);
        setShowModal(false);
        navigate('/listar-doadores');
    }

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

    if (!doador) return <div>Doador não encontrado</div>; // apagar depois

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const numericFields = 'status';
        const parsedValue = numericFields.includes(name) ? Number(value) : value;

        setAlertErroApi(false);
        //Chama a validação do RG
        if (name === 'rg') {
            // Remove caracteres não numéricos
            const rgLimpo = value.replace(/[^\d]+/g, '');

            // Se CPF tiver exatamente 9 dígitos, faz a validação
            if (rgLimpo.length === 9) {
                if (!validarRG(rgLimpo)) {
                    setCampoAlerta('rg'); // ou 'email'
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
                    setCampoAlerta('cpf'); // ou 'email'
                    setAlertMensagem('CPF inválido. Insira novamente.');
                    setAlertAtencao(true);
                }
            }
        }

        //Chama a validação de Celular
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

        //Chama a validação de Contato
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
                setDadosDoador({ ...dadosDoador, [name]: '' });
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
        if (!formDados.celular?.trim()) return;
        if (!formDados.responsavelContato?.trim()) return;
        if (!formDados.contato?.trim()) return;
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
            setCampoAlerta('rg'); // ou 'email'
            setAlertMensagem('RG inválido. Insira novamente.');
            setAlertAtencao(true);
            return;
        }

        if (!validarCPF(cpfLimpo)) {
            setCampoAlerta('cpf'); // ou 'email'
            setAlertMensagem('CPF inválido. Insira novamente.');
            setAlertAtencao(true);
            return;
        }

        //Chama validação de celular
        if (!validarTelefone(formDados.celular)) {
            setCampoAlerta('celular');
            setAlertMensagem('Número de celular inválido. Insira novamente.');
            setAlertAtencao(true);
            return;
        }

        //Chama validação de contato
        if (!validarTelefone(formDados.contato)) {
            setCampoAlerta('contato');
            setAlertMensagem('Número de contato inválido. Insira novamente.');
            setAlertAtencao(true);
            return;
        }

        try {
            setTentouEnviar(false);
            setAlertErroApi(false);

            formDados.cpf = cpfLimpo;
            formDados.rg = rgLimpo;
            formDados.cep = cepLimpo;
            formDados.celular = celularLimpo;
            formDados.contato = contatoLimpo;
            await atualizarDoador(id, formDados);
            openModal();
            // setEditando(false);
            // setTentouEnviar(false);
        } catch (error) {
            tratarErro(error);
            setAlertErroApi(true);
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
            <form className="cadastroDoador-form" onSubmit={handleSubmit}>
                <div className='cadastroDoador-linha1'>
                    <div className="form-group">
                        <label>Código</label>
                        <input
                            type="text"
                            id="id"
                            value={doador?.id || ''}
                            disabled
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">Status *</label>
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
                    <label>Nome *</label>
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

                <div className='cadastroDoador-linha1'>
                    <div className="form-group">
                        <label>RG *</label>
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
                                    disabled={!editando}
                                    ref={rgRef}
                                />
                            )}
                        </InputMask>
                        {(tentouEnviar && !formDados.rg) && (
                            <span className="erro-required"> O campo 'RG' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>CPF *</label>
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
                        <label>Celular *</label>
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

                <div className="group-doador">
                    <div className="form-group">
                        <label>Contato *</label>
                        {/*   {telefones.map((item, index) => ( 
                        <div key={index} className="telefone-group"> */}
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
                            <span className="erro-required"> O campo 'Contato' é obrigatório </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Responsável Contato *</label>
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
                        <label htmlFor="cep">CEP *</label>
                        <InputMask
                            mask="99999-999"
                            value={formDados?.cep || ''}
                            onChange={handleInputChange}
                            onBlur={handleBuscarCep}
                            disabled={!editando}
                            placeholder="_____-___"
                        /* required */
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
                        <label htmlFor="cidade">Cidade *</label>
                        <input
                            id="cidade"
                            name="cidade"
                            type="text"
                            placeholder="Digite a cidade"
                            value={formDados?.cidade || ''}
                            onChange={handleInputChange}
                        /* disabled={!editando} */
                        />

                        {(tentouEnviar && !formDados.cidade) && (
                            <span className="erro-required"> O campo 'Cidade' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="estado">Estado *</label>
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
                    <label>Logradouro *</label>
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
                        <label>Número *</label>
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
                        <label>Bairro *</label>
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
                        <BotaoSalvar showModal={showModal} openModal={handleSubmit} closeModal={closeModal} />
                    )}
                    <BotaoCancelar onClick={() => navigate('/listar-doadores')}/>
                </div>
            </form >
            {alertAtencao && (
                <AlertAtencao
                    mensagem={alertMensagem}
                    onClose={() => {
                        const refs = {
                            rg: rgRef,
                            cpf: cpfRef,
                            celular: celularRef,
                            contato: contatoRef
                        };
                        fecharAlertaEFocarCampo(refs[campoAlerta], campoAlerta);
                    }}
                />
            )}

            {(alertErroApi && !tentouEnviar) && (
                <AlertAtencao
                    mensagem={Array.isArray(erro) ? erro[0] : erro}
                    onClose={() => setAlertErroApi(false)}
                />
            )}
        </div >
    );
};

export default VisualizarDoador;
