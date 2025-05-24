import React, { useState } from 'react';

import { useDoadores } from '../../../hooks/useDoadores';
import { useError } from '../../../hooks/useError';
import { useBuscarCep } from '../../../hooks/useBuscarCep';

import BotaoSalvar from "/src/components/BotaoSalvar/BotaoSalvar.jsx";
import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoLimpar from "/src/components/BotaoLimpar/BotaoLimpar.jsx";
import './CadastrarDoador.css';

const CadastroDoador = () => {
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

    const handleChange = (e) => {
        const { id, value } = e.target;
        limparErro();
        setDadosDoador({
            ...dadosDoador,
            [id]: id === 'status' && value !== '' ? Number(value) : value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setTentouEnviar(true);
        limparErro();
        try {
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
        } catch (error) {
            tratarErro(error);
        }
    };

    const handleBuscarCep = async () => {
        try {
            const cepLimpo = dadosDoador.cep.match(/\d{8}/)?.[0];

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

    const [showModal, setShowModal] = useState(false);

    // Handlers do modal
    /* const closeModal = () => setShowModal(false);
    const openModal = () => {
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
            setShowModal(true); // Mostra o modal de sucesso
            setShowModal(true);
        } else {
            return null;
        }
    }; */

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
                            value={dadosDoador.status}
                            onChange={handleChange}
                        >
                            <option value="">Selecione</option>
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
                        id="nome"
                        name="nome"
                        type="text"
                        value={dadosDoador.nome}
                        onChange={handleChange}
                        placeholder="Digite o nome"
                    />

                    {(tentouEnviar && !dadosDoador.nome) && (
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
                            value={dadosDoador.rg}
                            onChange={handleChange}
                            placeholder="Digite o RG"
                        />

                        {(tentouEnviar && !dadosDoador.rg) && (
                            <span className="erro-required"> O campo 'RG' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>CPF</label>
                        <input
                            id="cpf"
                            name="cpf"
                            type="text"
                            value={dadosDoador.cpf}
                            onChange={handleChange}
                            placeholder="Digite o CPF"
                        />

                        {(tentouEnviar && !dadosDoador.cpf) && (
                            <span className="erro-required"> O campo 'CPF' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Celular</label>
                        <input
                            id="celular"
                            name="celular"
                            type="text"
                            value={dadosDoador.celular}
                            onChange={handleChange}
                            placeholder="Digite o celular com DDD"
                        />

                        {(tentouEnviar && !dadosDoador.celular) && (
                            <span className="erro-required"> O campo 'Celular' é obrigatório </span>
                        )}
                    </div>
                </div>

                <div className="group-doador">
                    <div className="form-group">
                        <label>Contato</label>
                        <input
                            id="contato"
                            name="contato"
                            type="text"
                            value={dadosDoador.contato}
                            onChange={handleChange}
                            placeholder="Digite um nº de contato"
                        />

                        {(tentouEnviar && !dadosDoador.contato) && (
                            <span className="erro-required"> O campo 'Contato' é obrigatório </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Responsável Contato</label>
                        <input
                            id='responsavelContato'
                            name="responsavelContato"
                            type="text"
                            placeholder="Nome do contato para recados"
                            value={dadosDoador.responsavelContato}
                            onChange={handleChange}
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
                    ))} */}
                    {/* <button type="button" className="add-btn" onClick={handleAddTelefone}>
                        + Telefones
                    </button> */}
                </div>

                <div className="cadastroDoador-linha1">
                    <div className="form-group">
                        <label htmlFor="cep">CEP</label>
                        <input
                            id="cep"
                            name="cep"
                            type="text"
                            value={dadosDoador.cep}
                            onChange={handleChange}
                            onBlur={handleBuscarCep}
                            placeholder="Digite o CEP"
                        />

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
                        />

                        {(tentouEnviar && !dadosDoador.bairro) && (
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

export default CadastroDoador;