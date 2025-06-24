import InputMask from 'react-input-mask';
import { useState, useRef } from 'react';
import { useDoadores } from '../../../hooks/useDoadores';
import { useError } from '../../../hooks/useError';
import { useBuscarCep } from '../../../hooks/useBuscarCep';
import { useNavigate, useLocation } from 'react-router-dom';
import { validarCPF } from '../../../utils/ValidaCPF';
import { validarRG } from '../../../utils/ValidaRG';
import { validarNome } from '../../../utils/ValidaNome';
import { validarTelefone } from '../../../utils/ValidaTelefone';
import AlertAtencao from "/src/components/AlertAtencao/AlertAtencao.jsx";
import BotaoSalvar from "/src/components/BotaoSalvar/BotaoSalvar.jsx";
import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoLimpar from "/src/components/BotaoLimpar/BotaoLimpar.jsx";
import CarregandoCat from '../../../components/Spinner/CarregandoCat';
import './CadastrarDoador.css';

const CadastroDoador = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from;
    const { criarDoador } = useDoadores();
    const [dadosDoador, setDadosDoador] = useState({
        nome: '',
        rg: '',
        cpf: '',
        celular: '',
        contato: '',
        responsavelContato: '',
        responsavel: '',
        status: 1,
        cep: '',
        cidade: '',
        uf: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: ''
    });

    const { erro, tratarErro, limparErro } = useError();
    const [tentouEnviar, setTentouEnviar] = useState(false);
    const [carregandoSubmit, setCarregandoSubmit] = useState(false);

    const { buscarCep } = useBuscarCep();

    const [alertAtencao, setAlertAtencao] = useState(false);
    const [alertMensagem, setAlertMensagem] = useState('');
    const [campoAlerta, setCampoAlerta] = useState('');
    const [alertErroApi, setAlertErroApi] = useState(false);

    const rgRef = useRef(null);
    const cpfRef = useRef(null);
    const celularRef = useRef(null);
    const contatoRef = useRef(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        limparErro();

        setAlertErroApi(false);

        //Chama a validação do RG
        if (id === 'rg') {
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
        if (id === 'cpf') {
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
        if (id === 'celular') {
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
        if (id === 'contato') {
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

        if (id === 'numero') {
            if (value === '') {
                setDadosDoador({ ...dadosDoador, [id]: '' });
                return;
            }
            const numero = parseInt(value, 10);
            if (isNaN(numero) || numero <= 0) {
                return;
            }
        }

        setDadosDoador({
            ...dadosDoador,
            [id]: id === 'status' && value !== '' ? Number(value) : value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setTentouEnviar(true);
        limparErro();

        if (!dadosDoador.nome?.trim()) return;
        if (!dadosDoador.rg?.trim()) return;
        if (!dadosDoador.cpf?.trim()) return;
        if (!dadosDoador.celular?.trim()) return;
        if (!dadosDoador.responsavelContato?.trim()) return;
        if (!dadosDoador.contato?.trim()) return;
        if (!dadosDoador.cep?.trim()) return;
        if (!dadosDoador.cidade?.trim()) return;
        if (!dadosDoador.uf?.trim()) return;
        if (!dadosDoador.logradouro?.trim()) return;
        if (!dadosDoador.numero || Number(dadosDoador.numero) <= 0) return;
        if (!dadosDoador.bairro?.trim()) return;

        const cpfLimpo = dadosDoador.cpf.replace(/[^\d]+/g, '');
        const rgLimpo = dadosDoador.rg.replace(/[^0-9Xx]+/g, '');
        const cepLimpo = dadosDoador.cep.replace(/[^\d]+/g, '');
        const celularLimpo = dadosDoador.celular.replace(/[^\d]+/g, '');
        const contatoLimpo = dadosDoador.contato.replace(/[^\d]+/g, '');

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
        if (!validarTelefone(dadosDoador.celular)) {
            setCampoAlerta('celular');
            setAlertMensagem('Número de celular inválido. Insira novamente.');
            setAlertAtencao(true);
            return;
        }

        //Chama validação de contato
        if (!validarTelefone(dadosDoador.contato)) {
            setCampoAlerta('contato');
            setAlertMensagem('Número de contato inválido. Insira novamente.');
            setAlertAtencao(true);
            return;
        }

        setCarregandoSubmit(true);
        try {
            setTentouEnviar(false);
            setAlertErroApi(false);

            dadosDoador.cpf = cpfLimpo;
            dadosDoador.rg = rgLimpo;
            dadosDoador.cep = cepLimpo;
            dadosDoador.celular = celularLimpo;
            dadosDoador.contato = contatoLimpo;

            const novoDoador = await criarDoador(dadosDoador);
            setDadosDoador({
                nome: '',
                rg: '',
                cpf: '',
                celular: '',
                contato: '',
                responsavelContato: '',
                responsavel: '',
                status: 1,
                cep: '',
                cidade: '',
                uf: '',
                logradouro: '',
                numero: '',
                complemento: '',
                bairro: ''
            });
            if (from === '/cadastrar-animal') {
                navigate(from, {
                    state: {
                        novoDoadorId: novoDoador.id,
                        veioDePaginaProtegida: true
                    }
                });
            } else {
                openModal();
            }
        } catch (error) {
            tratarErro(error);
            setAlertErroApi(true);
        } finally {
            setCarregandoSubmit(false);
        }
    };

    const handleBuscarCep = async () => {
        try {
            const cepLimpo = dadosDoador.cep.replace(/[^\d]+/g, '');
            // const cepLimpo = dadosDoador.cep.match(/\d{8}/)?.[0];
            const endereco = await buscarCep(cepLimpo);

            setDadosDoador((prev) => ({
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

    // Configurações do modal
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setShowModal(false);
        navigate('/listar-doadores');
    }

    const fecharAlertaEFocarCampo = (campoRef, campo) => {
        setAlertAtencao(false);
        setDadosDoador(prev => ({ ...prev, [campo]: '' }));  // limpa o valor no estado

        if (campoRef.current) {
            campoRef.current.value = '';   // limpa o input na tela
            campoRef.current.focus();      // foca no campo
        }
    };

    function handleCancelar() {
        if (from === '/cadastrar-animal') {
            navigate(from, {
                state: {
                    veioDePaginaProtegida: true
                }
            });
        } else {
            navigate('/listar-doadores');
        }
    }

    return (
        <div className="cadastro-container">
            <form className="cadastroDoador-form" onSubmit={handleSubmit}>
                <div className='cadastroDoador-linha1'>
                    <div className="form-group">
                        <label>Código</label>
                        <input
                            type="text"
                            id="id"
                            value={dadosDoador.doador?.id || ''}
                            disabled
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">Status *</label>
                        <select
                            id="status"
                            name="status"
                            value={dadosDoador.status}
                            onChange={handleChange}
                        >
                            <option value={1}>Ativo</option>
                            <option value={0}>Inativo</option>
                        </select>

                        {(tentouEnviar && !dadosDoador.status) && (
                            <span className="erro-required"> O campo 'Status' é obrigatório </span>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label>Nome *</label>
                    <input
                        type="text"
                        id="nome"
                        name='nome'
                        maxLength={50} //verificar tamanho maximo.
                        value={dadosDoador.nome}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                            if (!validarNome(e.key) && e.key.length === 1) {
                                e.preventDefault();
                            }
                        }}
                        placeholder="Digite o nome"
                    />
                    {(tentouEnviar && !dadosDoador.nome) && (
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
                            value={dadosDoador.rg}
                            onChange={handleChange}
                            placeholder="__.___.___-_"
                            required>
                            {(inputProps) => (
                                <input
                                    {...inputProps}
                                    id="rg"
                                    name="rg"
                                    type="text"
                                    ref={rgRef}
                                />
                            )}
                        </InputMask>
                        {(tentouEnviar && !dadosDoador.rg) && (
                            <span className="erro-required"> O campo 'RG' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>CPF *</label>
                        <InputMask
                            mask="999.999.999-99"
                            value={dadosDoador.cpf}
                            onChange={handleChange}
                            placeholder="___.___.___-__"
                            required>
                            {(inputProps) => (
                                <input
                                    {...inputProps}
                                    id="cpf"
                                    name="cpf"
                                    type="text"
                                    ref={cpfRef}
                                />
                            )}
                        </InputMask>
                        {(tentouEnviar && !dadosDoador.cpf) && (
                            <span className="erro-required"> O campo 'CPF' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Celular *</label>
                        <InputMask
                            mask="(99) 99999-9999"
                            value={dadosDoador.celular}
                            onChange={handleChange}
                            placeholder="(__) _____-____"
                            required
                        >
                            {(inputProps) => (
                                <input
                                    {...inputProps}
                                    type="text"
                                    id="celular"
                                    name="celular"
                                    ref={celularRef}
                                />
                            )}
                        </InputMask>
                        {(tentouEnviar && !dadosDoador.celular) && (
                            <span className="erro-required"> O campo 'Celular' é obrigatório </span>
                        )}
                    </div>
                </div>

                <div className="group-doador">
                    <div className="form-group">
                        <label>Contato *</label>
                        <InputMask
                            mask="(99) 99999-9999"
                            value={dadosDoador.contato}
                            onChange={handleChange}
                            placeholder="(__) _____-____"
                            required
                        >
                            {(inputProps) => (
                                <input
                                    {...inputProps}
                                    type="text"
                                    id="contato"
                                    name="contato"
                                    ref={contatoRef}
                                />
                            )}
                        </InputMask>
                        {(tentouEnviar && !dadosDoador.contato) && (
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
                            value={dadosDoador.responsavelContato}
                            onChange={handleChange}
                            placeholder="Nome do contato para recados"
                            onKeyDown={(e) => {
                                if (!validarNome(e.key) && e.key.length === 1) {
                                    e.preventDefault();
                                }
                            }}
                        />
                        {(tentouEnviar && !dadosDoador.responsavelContato) && (
                            <span className="erro-required"> O campo 'Responsável Contato' é obrigatório </span>
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
                    ))} */}
                    {/* <button type="button" className="add-btn" onClick={handleAddTelefone}>
                        + Telefones
                    </button> */}
                </div>

                <div className="cadastroDoador-linha1">
                    <div className="form-group">
                        <label htmlFor="cep">CEP *</label>
                        <InputMask
                            mask="99999-999"
                            value={dadosDoador.cep}
                            onChange={handleChange}
                            onBlur={handleBuscarCep}
                            placeholder="_____-___"
                            required
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
                        {/* <input
                            id="cep"
                            name="cep"
                            type="text"
                            value={dadosDoador.cep}
                            onChange={handleChange}
                            onBlur={handleBuscarCep}
                            placeholder="Digite o CEP"
                        /> */}
                        {(tentouEnviar && !dadosDoador.cep) && (
                            <span className="erro-required"> O campo 'CEP' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="cidade">Cidade *</label>
                        <input
                            id="cidade"
                            name="cidade"
                            type="text"
                            value={dadosDoador.cidade}
                            onChange={handleChange}
                            placeholder="Digite a cidade"
                            disabled
                        />

                        {(tentouEnviar && !dadosDoador.cidade) && (
                            <span className="erro-required"> O campo 'Cidade' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="estado">Estado *</label>
                        <input
                            id="uf"
                            name="uf"
                            type="text"
                            value={dadosDoador.uf}
                            onChange={handleChange}
                            placeholder="Digite o estado"
                            disabled
                        />

                        {(tentouEnviar && !dadosDoador.uf) && (
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
                        value={dadosDoador.logradouro}
                        onChange={handleChange}
                        placeholder="Digite o Endereço"
                        disabled
                    />

                    {(tentouEnviar && !dadosDoador.logradouro) && (
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
                            value={dadosDoador.numero}
                            onChange={handleChange}
                            placeholder="Digite o nº da residência"
                        />
                        {(tentouEnviar && !dadosDoador.numero) && (
                            <span className="erro-required"> O campo 'Número' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Complemento</label>
                        <input
                            id="complemento"
                            name="complemento"
                            type="text"
                            value={dadosDoador.complemento}
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
                            value={dadosDoador.bairro}
                            onChange={handleChange}
                            placeholder="Digite o bairro"
                            disabled
                        />

                        {(tentouEnviar && !dadosDoador.bairro) && (
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
                            rg: rgRef,
                            cpf: cpfRef,
                            celular: celularRef,
                            contato: contatoRef
                        };
                        fecharAlertaEFocarCampo(refs[campoAlerta], campoAlerta);
                    }}
                />
            )}

            {carregandoSubmit && <CarregandoCat />}

            {(alertErroApi && !tentouEnviar) && (
                <AlertAtencao
                    mensagem={Array.isArray(erro) ? erro[0] : erro}
                    onClose={() => setAlertErroApi(false)}
                />
            )}
        </div>
    );
};

export default CadastroDoador;