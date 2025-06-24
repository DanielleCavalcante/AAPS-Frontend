import InputMask from 'react-input-mask';
import { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { usePontosAdocao } from '../../../hooks/usePontosAdocao';
import { useError } from '../../../hooks/useError';
import { useBuscarCep } from '../../../hooks/useBuscarCep';

import { validarNome } from '../../../utils/ValidaNome';
import { validarCNPJ } from '../../../utils/ValidaCNPJ';
import { validarTelefone } from '../../../utils/ValidaTelefone';

import AlertAtencao from "/src/components/AlertAtencao/AlertAtencao.jsx";
import BotaoSalvar from "/src/components/BotaoSalvar/BotaoSalvar.jsx";
import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoLimpar from "/src/components/BotaoLimpar/BotaoLimpar.jsx";
import './CadastroPontoAdocao.css';

const CadastroPontoAdocao = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from;
    const { criarPontoAdocao } = usePontosAdocao();
    const [dadosPontoAdocao, setDadosPontoAdocao] = useState({
        nomeFantasia: '',
        cnpj: '',
        celular: '',
        telefone: '',
        responsavelContato: '',
        cep: '',
        cidade: '',
        uf: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        status: 1
    });

    const { erro, tratarErro, limparErro } = useError();
    const [tentouEnviar, setTentouEnviar] = useState(false);

    // const [erroCNPJ, setErroCNPJ] = useState('');
    const [alertAtencao, setAlertAtencao] = useState(false);
    const [alertMensagem, setAlertMensagem] = useState('');
    const [campoAlerta, setCampoAlerta] = useState('');
    const [alertErroApi, setAlertErroApi] = useState(false);

    const cnpjRef = useRef(null);
    const celularRef = useRef(null);
    const contatoRef = useRef(null);
    const { buscarCep } = useBuscarCep();

    const handleChange = (e) => {
        const { id, value } = e.target;
        limparErro();

        setAlertErroApi(false);

        //Chama a validação do CNPJ
        if (id === 'cnpj') {
            // Remove caracteres não numéricos
            const cnpjLimpo = value.replace(/[^\d]+/g, '');

            // Se CPF tiver exatamente 11 dígitos, faz a validação
            if (cnpjLimpo.length === 14) {
                if (!validarCNPJ(cnpjLimpo)) {
                    setCampoAlerta('cnpj'); // ou 'email'
                    setAlertMensagem('CNPJ inválido. Insira novamente.');
                    setAlertAtencao(true);
                }
            }
        }

        if (id === "numero") {
            const numero = parseInt(value, 10);
            if (numero <= 0 || isNaN(numero)) {
                setDadosPontoAdocao({ ...dadosPontoAdocao, [id]: '' });
                return;
            }
        }

        setDadosPontoAdocao({
            ...dadosPontoAdocao,
            [id]: id === 'status' && value !== '' ? Number(value) : value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setTentouEnviar(true);
        limparErro();

        if (!dadosPontoAdocao.nomeFantasia?.trim()) return;
        if (!dadosPontoAdocao.cnpj?.trim()) return;
        if (!dadosPontoAdocao.celular?.trim()) return;
        if (!dadosPontoAdocao.responsavelContato?.trim()) return;
        if (!dadosPontoAdocao.contato?.trim()) return;
        if (!dadosPontoAdocao.cep?.trim()) return;
        if (!dadosPontoAdocao.cidade?.trim()) return;
        if (!dadosPontoAdocao.uf?.trim()) return;
        if (!dadosPontoAdocao.logradouro?.trim()) return;
        if (!dadosPontoAdocao.numero || Number(dadosPontoAdocao.numero) <= 0) return;
        if (!dadosPontoAdocao.bairro?.trim()) return;

        const cnpjLimpo = dadosPontoAdocao.cnpj.replace(/[^\d]+/g, '');
        const cepLimpo = dadosPontoAdocao.cep.replace(/[^\d]+/g, '');
        const celularLimpo = dadosPontoAdocao.celular.replace(/[^\d]+/g, '');
        const contatoLimpo = dadosPontoAdocao.contato.replace(/[^\d]+/g, '');

        //Chama a validação de CNPJ
        if (!validarCNPJ(cnpjLimpo)) {
            setCampoAlerta('cnpj'); // ou 'email'
            setAlertMensagem('CNPJ inválido. Insira novamente.');
            setAlertAtencao(true);
            return;
        }

        //Chama validação de celular
        if (!validarTelefone(dadosPontoAdocao.celular)) {
            setCampoAlerta('celular');
            setAlertMensagem('Número de celular inválido. Insira novamente.');
            setAlertAtencao(true);
            return;
        }

        //Chama validação de contato
        if (!validarTelefone(dadosPontoAdocao.contato)) {
            setCampoAlerta('contato');
            setAlertMensagem('Número de contato inválido. Insira novamente.');
            setAlertAtencao(true);
            return;
        }

        try {
            setTentouEnviar(false);
            setAlertErroApi(false);

            dadosPontoAdocao.cnpj = cnpjLimpo;
            dadosPontoAdocao.cep = cepLimpo;
            dadosPontoAdocao.celular = celularLimpo;
            dadosPontoAdocao.contato = contatoLimpo;

            const novoPontoAdocao = await criarPontoAdocao(dadosPontoAdocao);
            console.log(novoPontoAdocao);
            setDadosPontoAdocao({
                nomeFantasia: '',
                cnpj: '',
                celular: '',
                contato: '',
                responsavelContato: '',
                cep: '',
                cidade: '',
                uf: '',
                logradouro: '',
                numero: '',
                complemento: '',
                bairro: '',
                status: 1
            });
            if (from === '/cadastrar-adocao') {
                navigate(from, {
                    state: {
                        novoPontonome: novoPontoAdocao.nomeFantasia,
                        veioDePaginaProtegida: true
                    }
                });
            } else {
                openModal();
            }
        } catch (error) {
            tratarErro(error);
            setAlertErroApi(true);
        }
    };

    const handleBuscarCep = async () => {
        try {
            const cepLimpo = dadosPontoAdocao.cep.replace(/[^\d]+/g, '');
            // const cepLimpo = dadosPontoAdocao.cep.match(/\d{8}/)?.[0];

            const endereco = await buscarCep(cepLimpo);

            setDadosPontoAdocao((prev) => ({
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

    function handleCancelar() {
        if (from === '/cadastrar-adocao') {
            navigate(from, {
                state: {
                    // novoAdotanteid: novoAdotante.id,
                    veioDePaginaProtegida: true
                }
            });
        } else {
            navigate('/listar-pontos-adocao');
        }
    }

    // Configurações do modal
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setShowModal(false);
        navigate('/listar-pontos-adocao');
    }


    /* // Handlers para telefones e responsáveis
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

    const fecharAlertaEFocarCampo = (campoRef, campo) => {
        setAlertAtencao(false);
        setDadosPontoAdocao(prev => ({ ...prev, [campo]: '' }));  // limpa o valor no estado

        if (campoRef.current) {
            campoRef.current.value = '';   // limpa o input na tela
            campoRef.current.focus();      // foca no campo
        }
    };

    return (
        <div className="cadastro-container">
            <form className="cadastroPonto-form" onSubmit={handleSubmit}>
                <div className='cadastroPonto-linha1'>
                    <div className="form-group">
                        <label>Código</label>
                        <input type="text" disabled />
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">Status *</label>
                        <select
                            id="status"
                            name="status"
                            value={dadosPontoAdocao.status}
                            onChange={handleChange}
                        >
                            <option value={1}>Ativo</option>
                            <option value={0}>Inativo</option>
                        </select>
                        {(tentouEnviar && !dadosPontoAdocao.status) && (
                            <span className="erro-required"> O campo 'Status' é obrigatório </span>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label>Nome Fantasia *</label>
                    <input
                        type="text"
                        id="nomeFantasia"
                        name="nomeFantasia"
                        maxLength={50} //verificar tamanho maximo.
                        value={dadosPontoAdocao.nomeFantasia}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                            if (!validarNome(e.key) && e.key.length === 1) {
                                e.preventDefault();
                            }
                        }}
                        placeholder="Digite a Razão Social"
                    />
                    {(tentouEnviar && !dadosPontoAdocao.nomeFantasia) && (
                        <span className="erro-required"> O campo 'Nome Fantasia' é obrigatório </span>
                    )}
                </div>

                <div className='cadastroPonto-linha1'>
                    <div className="form-group">
                        <label>CNPJ *</label>
                        <InputMask
                            mask="99.999.999/9999-99"
                            value={dadosPontoAdocao.cnpj}
                            onChange={handleChange}
                            placeholder="__.___.___/____-__"
                        // required
                        >
                            {(inputProps) => (
                                <input
                                    {...inputProps}
                                    type="text"
                                    id="cnpj"
                                    name="cnpj"
                                />
                            )}
                        </InputMask>
                        {/* {erroCNPJ && <span className="error">{erroCNPJ}</span>} */}
                        {(tentouEnviar && !dadosPontoAdocao.cnpj) && (
                            <span className="erro-required"> O campo 'CNPJ' é obrigatório </span>
                        )}
                    </div>

                    {/*<div className="form-group"> Excluir esse campo
                        <label>Responsável</label>
                        <input
                            type="text"
                            id="responsavel"
                            name="responsavel"
                            maxLength={50} //verificar tamanho maximo.
                            value={dadosPontoAdocao.responsavel}
                            onChange={handleChange}
                            onKeyDown={(e) => {
                                if (!validarNome(e.key) && e.key.length === 1) {
                                    e.preventDefault();
                                }
                            }}
                            placeholder="Digite o Responsável"
                        />
                        {(tentouEnviar && !dadosPontoAdocao.responsavel) && (
                            <span className="erro-required"> O campo 'Responsável' é obrigatório </span>
                        )}
                    </div>*/}

                    <div className="form-group">
                        <label>Celular *</label>
                        <InputMask
                            mask="(99) 99999-9999"
                            value={dadosPontoAdocao.celular}
                            onChange={handleChange}
                            placeholder="(__) _____-____"
                        // required
                        >
                            {(inputProps) => (
                                <input
                                    {...inputProps}
                                    type="text"
                                    id="celular"
                                    name="celular"
                                />
                            )}
                        </InputMask>
                        {(tentouEnviar && !dadosPontoAdocao.celular) && (
                            <span className="erro-required"> O campo 'Celular' é obrigatório </span>
                        )}
                    </div>
                </div>

                <div className='group-adocao'>
                    <div className="form-group">
                        <label>Contato *</label>
                        <InputMask
                            mask="(99) 99999-9999"
                            value={dadosPontoAdocao.contato}
                            onChange={handleChange}
                            placeholder="(__) _____-____"
                        // required
                        >
                            {(inputProps) => (
                                <input
                                    {...inputProps}
                                    type="text"
                                    id="contato"
                                    name="contato"
                                />
                            )}
                        </InputMask>
                        {(tentouEnviar && !dadosPontoAdocao.contato) && (
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
                            value={dadosPontoAdocao.responsavelContato}
                            onChange={handleChange}
                            onKeyDown={(e) => {
                                if (!validarNome(e.key) && e.key.length === 1) {
                                    e.preventDefault();
                                }
                            }}
                            placeholder="Digite o Responsável"
                        />
                        {(tentouEnviar && !dadosPontoAdocao.responsavelContato) && (
                            <span className="erro-required"> O campo 'Responsável' é obrigatório </span>
                        )}
                    </div>

                    {/* {telefones.map((item, index) => (
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
                    </button> */}

                </div>

                <div className="cadastroPonto-linha1">
                    <div className="form-group">
                        <label htmlFor="cep">CEP *</label>
                        <InputMask
                            mask="99999-999"
                            value={dadosPontoAdocao.cep}
                            onChange={handleChange}
                            onBlur={handleBuscarCep}
                            placeholder="_____-___"
                        // required
                        >
                            {(inputProps) => (
                                <input
                                    {...inputProps}
                                    type="text"
                                    id="cep"
                                    name="cep"
                                />
                            )}
                        </InputMask>
                        {(tentouEnviar && !dadosPontoAdocao.cep) && (
                            <span className="erro-required"> O campo 'Cep' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="cidade">Cidade *</label>
                        <input
                            id="cidade"
                            name="cidade"
                            type="text"
                            value={dadosPontoAdocao.cidade}
                            onChange={handleChange}
                            // placeholder="Digite a cidade"
                            disabled
                        />

                        {(tentouEnviar && !dadosPontoAdocao.cidade) && (
                            <span className="erro-required"> O campo 'Cidade' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="estado">Estado *</label>
                        <input
                            id="uf"
                            name="uf"
                            type="text"
                            value={dadosPontoAdocao.uf}
                            onChange={handleChange}
                            // placeholder="Digite o estado"
                            disabled
                        />

                        {(tentouEnviar && !dadosPontoAdocao.uf) && (
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
                        value={dadosPontoAdocao.logradouro}
                        onChange={handleChange}
                        // placeholder="Digite o Endereço"
                        disabled
                    />

                    {(tentouEnviar && !dadosPontoAdocao.logradouro) && (
                        <span className="erro-required"> O campo 'Logradouro' é obrigatório </span>
                    )}
                </div>

                <div className='cadastroPonto-linha1'>
                    <div className="form-group">
                        <label>Número *</label>
                        <input
                            type="number"
                            id="numero"
                            name="numero"
                            value={dadosPontoAdocao.numero}
                            onChange={handleChange}
                            placeholder="Digite o nº da residência"
                        />
                        {(tentouEnviar && !dadosPontoAdocao.numero) && (
                            <span className="erro-required"> O campo 'Número' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Complemento</label>
                        <input
                            id="complemento"
                            name="complemento"
                            type="text"
                            value={dadosPontoAdocao.complemento}
                            onChange={handleChange}
                            placeholder="Digite o complemento"
                        />
                    </div>
                    <div className="form-group">
                        <label>Bairro *</label>
                        <input
                            id="bairro"
                            name="bairro"
                            type="text"
                            value={dadosPontoAdocao.bairro}
                            onChange={handleChange}
                            // placeholder="Digite o bairro"
                            disabled
                        />

                        {(tentouEnviar && !dadosPontoAdocao.bairro) && (
                            <span className="erro-required"> O campo 'Bairro' é obrigatório </span>
                        )}
                    </div>
                </div>

                <div className="button-group-crud">
                    <BotaoSalvar showModal={showModal} openModal={handleSubmit} closeModal={closeModal} />
                    <BotaoCancelar onClick={handleCancelar}/>
                    <BotaoLimpar />
                </div>
            </form>
            {alertAtencao && (
                <AlertAtencao
                    mensagem={alertMensagem}
                    onClose={() => {
                        const refs = {
                            cnpj: cnpjRef,
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
                    onClose={() => setAlertAtencao(false)}
                />
            )}
        </div>
    );
};

export default CadastroPontoAdocao;