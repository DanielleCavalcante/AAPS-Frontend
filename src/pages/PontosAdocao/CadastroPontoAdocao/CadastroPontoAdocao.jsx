import { useState } from 'react';
import { usePontosAdocao } from '../../../hooks/usePontosAdocao';
import { useError } from '../../../hooks/useError';
import { useBuscarCep } from '../../../hooks/useBuscarCep';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { validarNome } from '../../../utils/ValidaNome';
import { validarCNPJ } from '../../../utils/ValidaCNPJ';

import BotaoSalvar from "/src/components/BotaoSalvar/BotaoSalvar.jsx";
import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoLimpar from "/src/components/BotaoLimpar/BotaoLimpar.jsx";
import './CadastroPontoAdocao.css';

const CadastroPontoAdocao = () => {
    const navigate = useNavigate();
    const { criarPontoAdocao } = usePontosAdocao();
    const [dadosPontoAdocao, setDadosPontoAdocao] = useState({
        nomeFantasia: '',
        cnpj: '',
        responsavel: '',
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
    const [erroCNPJ, setErroCNPJ] = useState('');
    const { buscarCep } = useBuscarCep();

    const handleChange = (e) => {
        const { id, value } = e.target;
        limparErro();

        //Chama a validação do CNPJ
        if (id === 'cnpj') {
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

        setDadosPontoAdocao({
            ...dadosPontoAdocao,
            [id]: id === 'status' && value !== '' ? Number(value) : value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setTentouEnviar(true);
        limparErro();

        const cnpjLimpo = dadosPontoAdocao.cnpj.replace(/[^\d]+/g, '');

        if (!validarCNPJ(cnpjLimpo)) {
            setErroCNPJ('Eita! CNPJ inválido');
            alert("CNPJ invalido. Insira novamente");
            return;
        }

        try {
            dadosPontoAdocao.cnpj = cnpjLimpo;
            await criarPontoAdocao(dadosPontoAdocao);
            setDadosPontoAdocao({
                nomeFantasia: '',
                cnpj: '',
                responsavel: '',
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
            setTentouEnviar(false);
            openModal();
        } catch (error) {
            tratarErro(error);
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

    // Configurações do modal
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {
        setShowModal(false);
        navigate('/listar-pontos-adocao');
    }
    const openModal = () => {
        const status = document.getElementById('status').value;
        const nome = document.getElementById('nomeFantasia').value;
        const cnpj = document.getElementById('cnpj').value;
        const responsavel = document.getElementById('responsavel').value;
        const celular = document.getElementById('celular').value;
        const contato = document.getElementById('contato').value;
        const responsavelContato = document.getElementById('responsavelContato').value;
        const cep = document.getElementById('cep').value;
        const numero = document.getElementById('numero').value;

        // Verifica se todos os campos estão preenchidos
        if (status && nome && cnpj && responsavel && celular && contato && responsavelContato && cep && numero) {
            setShowModal(true);
        } else {
            return null;
        }
    };

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

    return (
        <div className="cadastro-container">
            <form className="cadastroPonto-form" onSubmit={handleSubmit}>
                <div className='cadastroPonto-linha1'>
                    <div className="form-group">
                        <label>Código</label>
                        <input type="text" disabled />
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">Status</label>
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
                    <label>Nome Fantasia</label>
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
                        <label>CNPJ</label>
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
                        {erroCNPJ && <span className="error">{erroCNPJ}</span>}
                        {(tentouEnviar && !dadosPontoAdocao.cnpj) && (
                            <span className="erro-required"> O campo 'CNPJ' é obrigatório </span>
                        )}
                    </div>

                    <div className="form-group"> {/* Excluir esse campo */}
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
                    </div>
                    <div className="form-group">
                        <label>Celular</label>
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
                        <label>Contato</label>
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
                        <label>Responsável pelo Contato</label>
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
                        />
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
                        <label htmlFor="cep">CEP</label>
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
                        <label htmlFor="cidade">Cidade</label>
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
                        <label htmlFor="estado">Estado</label>
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
                    <label>Endereço</label>
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
                        <label>Número</label>
                        <input
                            id="numero"
                            name="numero"
                            type="text"
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
                        <label>Bairro</label>
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
                    <BotaoCancelar />
                    <BotaoLimpar />
                </div>
            </form>
        </div>
    );
};

export default CadastroPontoAdocao;