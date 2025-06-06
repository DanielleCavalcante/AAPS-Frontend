import InputMask from 'react-input-mask';
import { useState } from 'react';
import { useDoadores } from '../../../hooks/useDoadores';
import { useError } from '../../../hooks/useError';
import { useBuscarCep } from '../../../hooks/useBuscarCep';
import { useNavigate } from 'react-router-dom';
import { validarCPF } from '../../../utils/ValidaCPF';
import { validarRG } from '../../../utils/ValidaRG';
import { validarNome } from '../../../utils/ValidaNome';

import BotaoSalvar from "/src/components/BotaoSalvar/BotaoSalvar.jsx";
import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoLimpar from "/src/components/BotaoLimpar/BotaoLimpar.jsx";
import './CadastrarDoador.css';

const CadastroDoador = () => {
    const navigate = useNavigate();
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
    const { buscarCep } = useBuscarCep();
    const [erroCPF, setErroCPF] = useState('');
    const [erroRG, setErroRG] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        limparErro();

        //Chama a validação do RG
        if (id === 'rg') {
            // Remove caracteres não numéricos
            const rgLimpo = value.replace(/[^\d]+/g, '');

            // Se CPF tiver exatamente 9 dígitos, faz a validação
            if (rgLimpo.length === 9) {
                if (!validarRG(rgLimpo)) {
                    setErroRG('Eita! RG inválido');
                } else {
                    setErroRG('');
                }
            }
            else {
                // Enquanto não tiver 9 dígitos, não mostra erro
                setErroRG('');
            }
        }

        //Chama a validação do CPF
        if (id === 'cpf') {
            // Remove caracteres não numéricos
            const cpfLimpo = value.replace(/[^\d]+/g, '');

            // Se CPF tiver exatamente 11 dígitos, faz a validação
            if (cpfLimpo.length === 11) {
                if (!validarCPF(cpfLimpo)) {
                    setErroCPF('Eita! CPF inválido');
                } else {
                    setErroCPF('');
                }
            }
            else {
                // Enquanto não tiver 11 dígitos, não mostra erro
                setErroCPF('');
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

        const cpfLimpo = dadosDoador.cpf.replace(/[^\d]+/g, '');
        const rgLimpo = dadosDoador.rg.replace(/[^0-9Xx]+/g, '');
        const cepLimpo = dadosDoador.cep.replace(/[^\d]+/g, '');
        const celularLimpo = dadosDoador.celular.replace(/[^\d]+/g, '');
        const contatoLimpo = dadosDoador.contato.replace(/[^\d]+/g, '');

        if (!validarRG(rgLimpo)) {
            setErroRG('Eita! RG inválido');
            alert("RG invalido. Insira novamente");
            return;
        }

        if (!validarCPF(cpfLimpo)) {
            setErroCPF('Eita! CPF inválido');
            alert("CPF invalido. Insira novamente");
            return;
        }

        try {
            dadosDoador.cpf = cpfLimpo;
            dadosDoador.rg = rgLimpo;
            dadosDoador.cep = cepLimpo;
            dadosDoador.celular = celularLimpo;
            dadosDoador.contato = contatoLimpo;

            await criarDoador(dadosDoador);
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
            setTentouEnviar(false);
            openModal();
        } catch (error) {
            tratarErro(error);
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
    const closeModal = () => {
        setShowModal(false);
        navigate('/listar-doadores');
    }
    const openModal = () => {
        const status = document.getElementById('status').value;
        const nome = document.getElementById('nome').value;
        const rg = document.getElementById('rg').value;
        const cpf = document.getElementById('cpf').value;
        const celular = document.getElementById('celular').value;
        const contato = document.getElementById('contato').value;
        const cep = document.getElementById('cep').value;
        const numero = document.getElementById('numero').value;

        // Verifica se todos os campos estão preenchidos
        if (status && nome && rg && cpf && celular && contato && cep && numero) {
            setShowModal(true);
        } else {
            return null;
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
                            value={dadosDoador.doador?.id || ''}
                            disabled
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">Status</label>
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
                    <label>Nome</label>
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
                        <label>RG</label>
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
                                    className={erroRG ? 'input-error' : ''}
                                />
                            )}
                        </InputMask>
                        {erroRG && <span className="error">{erroRG}</span>}
                        {(tentouEnviar && !dadosDoador.rg) && (
                            <span className="erro-required"> O campo 'RG' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>CPF</label>
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
                                    className={erroCPF ? 'input-error' : ''}
                                />
                            )}
                        </InputMask>
                        {erroCPF && <span className="error">{erroCPF}</span>}
                        {(tentouEnviar && !dadosDoador.cpf) && (
                            <span className="erro-required"> O campo 'CPF' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Celular</label>
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
                        <label>Contato</label>
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
                                />
                            )}
                        </InputMask>
                        {(tentouEnviar && !dadosDoador.contato) && (
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
                        <label htmlFor="cep">CEP</label>
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
                        <label htmlFor="cidade">Cidade</label>
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
                        <label htmlFor="estado">Estado</label>
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
                    <label>Endereço</label>
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
                        <label>Número</label>
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
                        <label>Bairro</label>
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
                    <BotaoCancelar />
                    <BotaoLimpar />
                </div>
            </form>
        </div>
    );
};

export default CadastroDoador;