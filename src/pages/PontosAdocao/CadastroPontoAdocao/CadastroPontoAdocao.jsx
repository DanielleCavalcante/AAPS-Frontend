import React, { useState } from 'react';
import { usePontosAdocao } from '../../../hooks/usePontosAdocao';
import { useError } from '../../../hooks/useError';
import { useBuscarCep } from '../../../hooks/useBuscarCep';

import BotaoSalvar from "/src/components/BotaoSalvar/BotaoSalvar.jsx";
import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoLimpar from "/src/components/BotaoLimpar/BotaoLimpar.jsx";
import './CadastroPontoAdocao.css';

const CadastroPontoAdocao = () => {
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
<<<<<<< HEAD
        uf: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
=======
        uf: '', 
        logradouro: '', 
        numero: '', 
        complemento: '', 
        bairro: '' ,
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
        status: 1
    });

    const { erro, tratarErro, limparErro } = useError();
    const [tentouEnviar, setTentouEnviar] = useState(false);
    const { buscarCep } = useBuscarCep();

    const handleChange = (e) => {
        const { id, value } = e.target;
        limparErro();
        setDadosPontoAdocao({
            ...dadosPontoAdocao,
            [id]: id === 'status' && value !== '' ? Number(value) : value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
<<<<<<< HEAD
        setTentouEnviar(true);
        limparErro();
        try {
            await criarPontoAdocao(dadosPontoAdocao);
            setDadosPontoAdocao({
=======
        setTentouEnviar(true); 
        limparErro();
        try {
            await criarPontoAdocao(dadosPontoAdocao);
            setDadosPontoAdocao({ 
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                nomeFantasia: '',
                cnpj: '',
                responsavel: '',
                celular: '',
                contato: '',
                responsavelContato: '',
                cep: '',
                cidade: '',
<<<<<<< HEAD
                uf: '',
                logradouro: '',
                numero: '',
                complemento: '',
                bairro: '',
=======
                uf: '', 
                logradouro: '', 
                numero: '', 
                complemento: '', 
                bairro: '' ,
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                status: 1
            });
            setTentouEnviar(false);
        } catch (error) {
            tratarErro(error);
        }
    };

    const handleBuscarCep = async () => {
        try {
            const cepLimpo = dadosPontoAdocao.cep.match(/\d{8}/)?.[0];

            const endereco = await buscarCep(cepLimpo);

            setDadosPontoAdocao((prev) => ({
<<<<<<< HEAD
                ...prev,
                logradouro: endereco.logradouro || '',
                bairro: endereco.bairro || '',
                cidade: endereco.localidade || '',
                uf: endereco.uf || ''
=======
            ...prev,
            logradouro: endereco.logradouro || '',
            bairro: endereco.bairro || '',
            cidade: endereco.localidade || '',
            uf: endereco.uf || ''
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
            }));
        } catch (error) {
            tratarErro(error);
        }
    };

    /* const [telefones, setTelefones] = useState([{ telefone: '', responsavel: '' }]); */
    const [showModal, setShowModal] = useState(false);

    // Handlers do modal
    /* const closeModal = () => setShowModal(false);
    const openModal = () => {
        // Pegando os valores dos campos
        const nome = document.getElementById("nome").value;
        const cnpj = document.getElementById("cnpj").value;
        const responsavel = document.getElementById("responsavel").value;
        const celular = document.getElementById("celular").value;
        const cep = document.getElementById("cep").value;
        const cidade = document.getElementById("cidade").value;
        const estado = document.getElementById("estado").value;
        const endereco = document.getElementById("endereco").value;
        const numero = document.getElementById("numero").value;
        const bairro = document.getElementById("bairro").value;

        // Validação dos campos
        if (nome && cnpj && responsavel && celular && cep && cidade && estado && endereco && numero && bairro) {
            setShowModal(true); // Mostra o modal de sucesso
        } else {
            return null;
        }
    }; */

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
<<<<<<< HEAD
                        <input type="text" disabled />
                    </div>

                    <div className="form-group"> 
                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
=======
                        <input type="text" disabled/>
                    </div>

                    <div> {/* sem classe pq peguei de outro lugar */}
                        <label htmlFor="status">Status</label>
                        <select 
                            id="status" 
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                            name="status"
                            value={dadosPontoAdocao.status}
                            onChange={handleChange}
                        >
                            <option value="">Selecione</option>
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
<<<<<<< HEAD
                    <input
                        id="nomeFantasia"
                        name="nomeFantasia"
                        type="text"
                        value={dadosPontoAdocao.nomeFantasia}
                        onChange={handleChange}
                        placeholder="Digite o nome"
=======
                    <input 
                        id="nomeFantasia" 
                        name="nomeFantasia" 
                        type="text"
                        value={dadosPontoAdocao.nomeFantasia}
                        onChange={handleChange}
                        placeholder="Digite o nome" 
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                    />

                    {(tentouEnviar && !dadosPontoAdocao.nomeFantasia) && (
                        <span className="erro-required"> O campo 'Nome Fantasia' é obrigatório </span>
                    )}
                </div>

                <div className='cadastroPonto-linha1'>
                    <div className="form-group">
                        <label>CNPJ</label>
<<<<<<< HEAD
                        <input
                            id="cnpj"
                            name="cnpj"
                            type="text"
                            value={dadosPontoAdocao.cnpj}
                            onChange={handleChange}
                            placeholder="Digite o CNPJ"
=======
                        <input 
                            id="cnpj" 
                            name="cnpj" 
                            type="text"
                            value={dadosPontoAdocao.cnpj}
                            onChange={handleChange}
                            placeholder="Digite o CNPJ" 
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                        />

                        {(tentouEnviar && !dadosPontoAdocao.cnpj) && (
                            <span className="erro-required"> O campo 'Cnpj' é obrigatório </span>
                        )}
                    </div>
<<<<<<< HEAD

                    <div className="form-group"> {/* Excluir esse campo */}
                        <label>Responsável - Pode excluir Dani</label>
                        <input
                            id="responsavel"
                            name="responsavel"
                            type="text"
                            value={dadosPontoAdocao.responsavel}
                            onChange={handleChange}
                            placeholder="Digite o Responsável"
=======
                    <div className="form-group">
                        <label>Responsável</label>
                        <input 
                            id="responsavel" 
                            name="responsavel" 
                            type="text"
                            value={dadosPontoAdocao.responsavel}
                            onChange={handleChange}
                            placeholder="Digite o Responsável" 
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                        />

                        {(tentouEnviar && !dadosPontoAdocao.responsavel) && (
                            <span className="erro-required"> O campo 'Responsável' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Celular</label>
<<<<<<< HEAD
                        <input
                            id="celular"
                            name="celular"
                            type="text"
                            value={dadosPontoAdocao.celular}
                            onChange={handleChange}
                            placeholder="Digite o celular com DDD"
=======
                        <input 
                            id="celular" 
                            name="celular" 
                            type="text" 
                            value={dadosPontoAdocao.celular}
                            onChange={handleChange}
                            placeholder="Digite o celular" 
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                        />

                        {(tentouEnviar && !dadosPontoAdocao.celular) && (
                            <span className="erro-required"> O campo 'Celular' é obrigatório </span>
                        )}
                    </div>
                </div>

<<<<<<< HEAD
                <div className='group-adocao'>
                    <div className="form-group">
                        <label>Contato</label>
                        <input
                            id="contato"
                            name="contato"
                            type="text"
                            value={dadosPontoAdocao.contato}
                            onChange={handleChange}
                            placeholder="Digite um nº de contato"
                        />

                        {(tentouEnviar && !dadosPontoAdocao.contato) && (
                            <span className="erro-required"> O campo 'Contato' é obrigatório </span>
                        )}

                    </div>
                    <div className="form-group">
                        <label>Responsável pelo Contato</label>
                        <input
                            id='responsavelContato'
                            name="responsavelContato"
                            type="text"
                            placeholder="Nome do contato para recados"
                            value={dadosPontoAdocao.responsavelContato}
                            onChange={handleChange}
                        />
                    </div>
=======
                <div className="form-group">
                    <label>Contato</label>
                    <input 
                        id="contato" 
                        name="contato" 
                        type="text" 
                        value={dadosPontoAdocao.contato}
                        onChange={handleChange}
                        placeholder="Digite o contato" 
                    />

                    {(tentouEnviar && !dadosPontoAdocao.contato) && (
                        <span className="erro-required"> O campo 'Contato' é obrigatório </span>
                    )}

                    <label>Responsável Contato</label>
                    <input 
                        id='responsavelContato'
                        name="responsavelContato" 
                        type="text"
                        placeholder="Contato para recados"
                        value={dadosPontoAdocao.responsavelContato}
                        onChange={handleChange}
                    />
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
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
<<<<<<< HEAD

=======
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                </div>

                <div className="cadastroPonto-linha1">
                    <div className="form-group">
                        <label htmlFor="cep">CEP</label>
<<<<<<< HEAD
                        <input
                            id="cep"
                            name="cep"
                            type="text"
                            value={dadosPontoAdocao.cep}
                            onChange={handleChange}
                            onBlur={handleBuscarCep}
                            placeholder="Digite o CEP"
=======
                        <input 
                            id="cep" 
                            name="cep" 
                            type="text" 
                            value={dadosPontoAdocao.cep}
                            onChange={handleChange}
                            onBlur={handleBuscarCep}
                            placeholder="Digite o CEP" 
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                        />

                        {(tentouEnviar && !dadosPontoAdocao.cep) && (
                            <span className="erro-required"> O campo 'Cep' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="cidade">Cidade</label>
<<<<<<< HEAD
                        <input
                            id="cidade"
                            name="cidade"
                            type="text"
                            value={dadosPontoAdocao.cidade}
                            onChange={handleChange}
                            placeholder="Digite a cidade"
=======
                        <input 
                            id="cidade" 
                            name="cidade" 
                            type="text" 
                            value={dadosPontoAdocao.cidade}
                            onChange={handleChange}
                            placeholder="Digite a cidade" 
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                        />

                        {(tentouEnviar && !dadosPontoAdocao.cidade) && (
                            <span className="erro-required"> O campo 'Cidade' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="estado">Estado</label>
<<<<<<< HEAD
                        <input
                            id="uf"
                            name="uf"
                            type="text"
                            value={dadosPontoAdocao.uf}
                            onChange={handleChange}
                            placeholder="Digite o estado"
=======
                        <input 
                            id="uf" 
                            name="uf" 
                            type="text" 
                            value={dadosPontoAdocao.uf}
                            onChange={handleChange}
                            placeholder="Digite o estado" 
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                        />

                        {(tentouEnviar && !dadosPontoAdocao.uf) && (
                            <span className="erro-required"> O campo 'Estado' é obrigatório </span>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label>Endereço</label>
<<<<<<< HEAD
                    <input
                        id="logradouro"
                        name="logradouro"
                        type="text"
                        value={dadosPontoAdocao.logradouro}
                        onChange={handleChange}
                        placeholder="Digite o Endereço"
=======
                    <input 
                        id="logradouro" 
                        name="logradouro" 
                        type="text" 
                        value={dadosPontoAdocao.logradouro}
                        onChange={handleChange}
                        placeholder="Digite o Endereço" 
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                    />

                    {(tentouEnviar && !dadosPontoAdocao.logradouro) && (
                        <span className="erro-required"> O campo 'Logradouro' é obrigatório </span>
                    )}
                </div>

                <div className='cadastroPonto-linha1'>
                    <div className="form-group">
                        <label>Número</label>
<<<<<<< HEAD
                        <input
                            id="numero"
                            name="numero"
                            type="text"
                            value={dadosPontoAdocao.numero}
                            onChange={handleChange}
                            placeholder="Digite o nº da residência"
=======
                        <input 
                            id="numero" 
                            name="numero" 
                            type="text" 
                            value={dadosPontoAdocao.numero}
                            onChange={handleChange}
                            placeholder="Digite o nº da residência" 
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                        />

                        {(tentouEnviar && !dadosPontoAdocao.numero) && (
                            <span className="erro-required"> O campo 'Número' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Complemento</label>
<<<<<<< HEAD
                        <input
                            id="complemento-ponto"
                            name="complemento"
                            type="text"
                            value={dadosPontoAdocao.complemento}
                            onChange={handleChange}
                            placeholder="Digite o complemento"
=======
                        <input 
                            id="complemento-ponto" 
                            name="complemento" 
                            type="text" 
                            value={dadosPontoAdocao.complemento}
                            onChange={handleChange}
                            placeholder="Digite o complemento" 
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                        />
                    </div>
                    <div className="form-group">
                        <label>Bairro</label>
<<<<<<< HEAD
                        <input
                            id="bairro"
                            name="bairro"
                            type="text"
                            value={dadosPontoAdocao.bairro}
                            onChange={handleChange}
                            placeholder="Digite o bairro"
=======
                        <input 
                            id="bairro" 
                            name="bairro" 
                            type="text" 
                            value={dadosPontoAdocao.bairro}
                            onChange={handleChange}
                            placeholder="Digite o bairro" 
>>>>>>> 9f43d04f5f4692b2a4e46b5944ca1465bd6c8f5c
                        />

                        {(tentouEnviar && !dadosPontoAdocao.bairro) && (
                            <span className="erro-required"> O campo 'Bairro' é obrigatório </span>
                        )}
                    </div>
                </div>

                <div className="button-group-crud">
                    <BotaoSalvar /* showModal={showModal} openModal={openModal} closeModal={closeModal} */ />
                    <BotaoCancelar />
                    <BotaoLimpar />
                </div>
            </form>
        </div>
    );
};

export default CadastroPontoAdocao;