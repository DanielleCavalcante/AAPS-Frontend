import InputMask from 'react-input-mask';
import { useState, useRef } from 'react';
import { useAdotantes } from '../../../hooks/useAdotantes';
import { useError } from '../../../hooks/useError';
import { useBuscarCep } from '../../../hooks/useBuscarCep';
import { useLocation, useNavigate } from 'react-router-dom';
import { validarCPF } from '../../../utils/ValidaCPF';
import { validarRG } from '../../../utils/ValidaRG';
import { validarNome } from '../../../utils/ValidaNome';
import { validarTelefone } from '../../../utils/ValidaTelefone';
import AlertAtencao from "/src/components/AlertAtencao/AlertAtencao.jsx";
import BotaoSalvar from "/src/components/BotaoSalvar/BotaoSalvar.jsx";
import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoLimpar from "/src/components/BotaoLimpar/BotaoLimpar.jsx";
import './CadastroAdotante.css';

const CadastroAdotante = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from;
    const { criarAdotante } = useAdotantes();
    const [dadosAdotante, setDadosAdotante] = useState({
        nome: '',
        rg: '',
        cpf: '',
        celular: '',
        status: 1,
        localTrabalho: '',
        contato: '',
        email: '',
        responsavelContato: '',
        cep: '',
        cidade: '',
        uf: '',
        logradouro: '',
        numero: '',
        bairro: '',
        complemento: '',
        situacaoEndereco: '',
        facebook: '',
        instagram: '',
        bloqueio: 0,
        observacaoBloqueio: '',
    });

    const { erro, tratarErro, limparErro } = useError();
    const [tentouEnviar, setTentouEnviar] = useState(false);
    const { buscarCep } = useBuscarCep();
    const [alertAtencao, setAlertAtencao] = useState(false);
    const [alertMensagem, setAlertMensagem] = useState('');
    const [campoAlerta, setCampoAlerta] = useState('');
    const rgRef = useRef(null);
    const cpfRef = useRef(null);
    const emailRef = useRef(null);
    const celularRef = useRef(null);
    const contatoRef = useRef(null);


    const handleChange = (e) => {
        const { id, value } = e.target;
        limparErro();

        //Chama a validação do RG
        if (id === 'rg') {
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
        if (id === 'cpf') {
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
                setDadosAdotante({ ...dadosAdotante, [id]: '' });
                return;
            }
            const numero = parseInt(value, 10);
            if (isNaN(numero) || numero <= 0) {
                return;
            }
        }

        setDadosAdotante({
            ...dadosAdotante,
            [id]: id === 'status' && value !== '' ? Number(value) : value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setTentouEnviar(true);
        limparErro();

        const cpfLimpo = dadosAdotante.cpf.replace(/[^\d]+/g, '');
        const rgLimpo = dadosAdotante.rg.replace(/[^0-9Xx]+/g, '');
        const cepLimpo = dadosAdotante.cep.replace(/[^\d]+/g, '');
        const celularLimpo = dadosAdotante.celular.replace(/[^\d]+/g, '');
        const contatoLimpo = dadosAdotante.contato.replace(/[^\d]+/g, '');

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

        if (!validarTelefone(dadosAdotante.celular)) {
            setCampoAlerta('celular');
            setAlertMensagem('Número de celular inválido. Insira novamente.');
            setAlertAtencao(true);
            return;
        }

        if (!validarTelefone(dadosAdotante.contato)) {
            setCampoAlerta('contato');
            setAlertMensagem('Número de contato inválido. Insira novamente.');
            setAlertAtencao(true);
            return;
        }

        if (!dadosAdotante.email.includes('@')) {
            setCampoAlerta('email');
            setAlertMensagem('E-mail inválido. Insira novamente.');
            setAlertAtencao(true);
            return;
        }

        try {
            dadosAdotante.cpf = cpfLimpo;
            dadosAdotante.rg = rgLimpo;
            dadosAdotante.cep = cepLimpo;
            dadosAdotante.celular = celularLimpo;
            dadosAdotante.contato = contatoLimpo;

            const novoAdotante = await criarAdotante(dadosAdotante);
            setDadosAdotante({
                nome: '',
                rg: '',
                cpf: '',
                celular: '',
                localTrabalho: '',
                status: 1,
                contato: '',
                email: '',
                responsavelContato: '',
                cep: '',
                cidade: '',
                uf: '',
                logradouro: '',
                numero: '',
                bairro: '',
                complemento: '',
                situacaoEndereco: '',
                facebook: '',
                instagram: '',
                bloqueio: 0,
                observacaoBloqueio: '',
            });
            if (from === '/cadastrar-adocao') {
                navigate(from, {
                    state: {
                        novoAdotanteid: novoAdotante.id,
                        veioDePaginaProtegida: true
                    }
                });
            } else {
                openModal();
            }
        } catch (error) {
            tratarErro(error);
        }
    };

    const handleBuscarCep = async () => {
        try {
            const cepLimpo = dadosAdotante.cep.replace(/[^\d]+/g, '');
            // const cepLimpo = dadosAdotante.cep.match(/\d{8}/)?.[0];

            const endereco = await buscarCep(cepLimpo);

            setDadosAdotante((prev) => ({
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
            navigate('/listar-adotantes');
        }
    }

    // Configurações do modal
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setShowModal(false);
        navigate('/listar-adotantes');
    }


    const fecharAlertaEFocarCampo = (campoRef, campo) => {
        setAlertAtencao(false);
        setDadosAdotante(prev => ({ ...prev, [campo]: '' }));  // limpa o valor no estado

        if (campoRef.current) {
            campoRef.current.value = '';   // limpa o input na tela
            campoRef.current.focus();      // foca no campo
        }
    };

    const verificaRota = () => {
        if (from === '/cadastrar-adocao') {
            navigate(from, {
                state: {
                    novoAdotanteid: novoAdotante.id,
                    veioDePaginaProtegida: true
                }
            });
        } else {
            openModal();
        }
    }

    return (
        <div className="cadastro-container">
            <form className="cadastroAdotante-form" onSubmit={handleSubmit}>
                <div className='cadastroAdotante-linha1'>
                    <div className="form-group">
                        <label>Código</label>
                        <input type="text" disabled />
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={dadosAdotante.status}
                            onChange={handleChange}
                        >
                            <option value={1}>Ativo</option>
                            <option value={0}>Inativo</option>
                        </select>

                        {(tentouEnviar && !dadosAdotante.status) && (
                            <span className="erro-required"> O campo 'Status' é obrigatório </span>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label>Nome</label>
                    <input
                        type="text"
                        id="nome"
                        name='nome'
                        maxLength={50} //verificar tamanho maximo.
                        value={dadosAdotante.nome}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                            if (!validarNome(e.key) && e.key.length === 1) {
                                e.preventDefault();
                            }
                        }}
                        placeholder="Digite o nome"
                    />
                    {(tentouEnviar && !dadosAdotante.nome) && (
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
                            value={dadosAdotante.rg}
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
                        {(tentouEnviar && !dadosAdotante.rg) && (
                            <span className="erro-required"> O campo 'RG' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>CPF</label>
                        <InputMask
                            mask="999.999.999-99"
                            value={dadosAdotante.cpf}
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
                        {(tentouEnviar && !dadosAdotante.cpf) && (
                            <span className="erro-required"> O campo 'CPF' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Celular</label>
                        <InputMask
                            mask="(99) 99999-9999"
                            value={dadosAdotante.celular}
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
                        {(tentouEnviar && !dadosAdotante.celular) && (
                            <span className="erro-required"> O campo 'Celular' é obrigatório </span>
                        )}
                    </div>
                </div>

                <div className="group-adocao">
                    <div className="form-group">
                        <label>Contato</label>
                        <InputMask
                            mask="(99) 99999-9999"
                            value={dadosAdotante.contato}
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
                        {(tentouEnviar && !dadosAdotante.contato) && (
                            <span className="erro-required"> O campo 'Contato' é obrigatório </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Responsável Contato</label>
                        <input
                            type="text"
                            id='responsavelContato'
                            name="responsavelContato"
                            maxLength={50} //verificar tamanho maximo.
                            value={dadosAdotante.responsavelContato}
                            onChange={handleChange}
                            placeholder="Nome do contato para recados"
                            onKeyDown={(e) => {
                                if (!validarNome(e.key) && e.key.length === 1) {
                                    e.preventDefault();
                                }
                            }}
                        />
                        {(tentouEnviar && !dadosAdotante.responsavelContato) && (
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
                        value={dadosAdotante.email}
                        onChange={handleChange}
                        ref={emailRef}
                    />

                    {(tentouEnviar && !dadosAdotante.localTrabalho) && (
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
                        value={dadosAdotante.localTrabalho}
                        onChange={handleChange}
                    />

                    {(tentouEnviar && !dadosAdotante.localTrabalho) && (
                        <span className="erro-required"> O campo 'Local de Trabalho' é obrigatório </span>
                    )}
                </div>

                {/* <div className="radio-group">
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
                </div> */}

                <div className='form-group'>
                    <label className='tipoMoradia'>Tipo de moradia:</label>
                    <div className="radio-group">
                        <label className="radio-label">
                            <input
                                id="situacaoEndereco"
                                type="radio"
                                name="situacaoEndereco"
                                value="Própria"
                                checked={dadosAdotante.situacaoEndereco === "Própria"}
                                onChange={handleChange}
                            />
                            Própria
                        </label>
                        <label className="radio-label">
                            <input
                                id="situacaoEndereco"
                                type="radio"
                                name="situacaoEndereco"
                                value="Alugada"
                                checked={dadosAdotante.situacaoEndereco === "Alugada"}
                                onChange={handleChange}
                            />
                            Alugada
                        </label>
                    {(tentouEnviar && !dadosAdotante.situacaoEndereco) && (
                        <span className="erro-required"> É obrigatório informar a situação de moradia </span>
                    )}
                    </div>
                </div>
                
                <div className="cadastroAdotante-linha1">
                    <div className="form-group">
                        <label htmlFor="cep">CEP</label>
                        <InputMask
                            mask="99999-999"
                            value={dadosAdotante.cep}
                            onBlur={handleBuscarCep}
                            onChange={handleChange}
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
                        {(tentouEnviar && !dadosAdotante.cep) && (
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
                            value={dadosAdotante.cidade}
                            onChange={handleChange}
                            disabled
                        />

                        {(tentouEnviar && !dadosAdotante.cidade) && (
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
                            value={dadosAdotante.uf}
                            onChange={handleChange}
                            disabled
                        />

                        {(tentouEnviar && !dadosAdotante.uf) && (
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
                        value={dadosAdotante.logradouro}
                        onChange={handleChange}
                        disabled
                    />

                    {(tentouEnviar && !dadosAdotante.logradouro) && (
                        <span className="erro-required"> O campo 'Logradouro' é obrigatório </span>
                    )}
                </div>

                <div className='cadastroAdotante-linha1'>
                    <div className="form-group">
                        <label>Número</label>
                        <input
                            id="numero"
                            name="numero"
                            type="number"
                            value={dadosAdotante.numero}
                            onChange={handleChange}
                            placeholder="Digite o nº da residência"
                        />
                        {(tentouEnviar && !dadosAdotante.numero) && (
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
                            value={dadosAdotante.complemento}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Bairro</label>
                        <input
                            id="bairro"
                            name="bairro"
                            type="text"
                            placeholder="Digite o bairro"
                            value={dadosAdotante.bairro}
                            onChange={handleChange}
                            disabled
                        />
                        {(tentouEnviar && !dadosAdotante.bairro) && (
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
                            value={dadosAdotante.facebook}
                            onChange={handleChange}
                        />

                        {(tentouEnviar && !dadosAdotante.facebook) && (
                            <span className="erro-required"> O campo 'Facebook' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="instagram">Instagram</label>
                        <input
                            id="instagram"
                            name="instagram"
                            type="text"
                            value={dadosAdotante.instagram}
                            onChange={handleChange}
                        />

                        {(tentouEnviar && !dadosAdotante.instagram) && (
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
                            checked={dadosAdotante.bloqueio === 1}
                            value={dadosAdotante.bloqueio}
                            onChange={e =>
                                setDadosAdotante({ ...dadosAdotante, bloqueio: e.target.checked ? 1 : 0 })
                            }
                        />
                        Bloqueado
                    </label>
                    {/* 
                    {(tentouEnviar && !dadosAdotante.bloqueio) && (
                        <span className="erro-required"> O campo 'Bloqueado' é obrigatório </span>
                    )} */}
                </div>
                <textarea
                    name="observacaoBloqueio"
                    id="observacaoBloqueio"
                    placeholder="Observação sobre o bloqueio"
                    value={dadosAdotante.observacaoBloqueio}
                    onChange={handleChange}
                />

                <div className="button-group-crud">
                    <BotaoSalvar showModal={showModal} openModal={handleSubmit} closeModal={closeModal} />
                    <BotaoCancelar onClick={handleCancelar}/>
                    <BotaoLimpar />
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
                            contato: contatoRef,
                            email: emailRef
                        };
                        fecharAlertaEFocarCampo(refs[campoAlerta], campoAlerta);
                    }}
                />
            )}
        </div >
    );
};

export default CadastroAdotante;
