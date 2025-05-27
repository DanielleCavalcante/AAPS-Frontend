import React, { useState } from 'react';

import { useAdotantes } from '../../../hooks/useAdotantes';
import { useError } from '../../../hooks/useError';
import { useBuscarCep } from '../../../hooks/useBuscarCep';

import BotaoSalvar from "/src/components/BotaoSalvar/BotaoSalvar.jsx";
import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoLimpar from "/src/components/BotaoLimpar/BotaoLimpar.jsx";
import './CadastroAdotante.css';

const CadastroAdotante = () => {
    const { criarAdotante } = useAdotantes();
    const [dadosAdotante, setDadosAdotante] = useState({
        nome: '',
        rg: '',
        cpf: '',
        celular: '',
        status: 1,
        localTrabalho: '',
        contato: '',
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

    const handleChange = (e) => {
        const { id, value } = e.target;
        limparErro();
        setDadosAdotante({
            ...dadosAdotante,
            [id]: id === 'status' && value !== '' ? Number(value) : value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setTentouEnviar(true);
        limparErro();
        try {
            await criarAdotante(dadosAdotante);
            setDadosAdotante({
                nome: '',
                rg: '',
                cpf: '',
                celular: '',
                localTrabalho: '',
                status: 1,
                contato: '',
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
            setTentouEnviar(false);
        } catch (error) {
            tratarErro(error);
        }
    };

    // const [showModal, setShowModal] = useState(false);

    // // Handlers do modal
    // const closeModal = () => setShowModal(false);
    // const openModal = () => {
    //     // Pegando os valores dos campos
    //     const nome = document.getElementById("nome").value;
    //     const rg = document.getElementById("rg").value;
    //     const cpf = document.getElementById("cpf").value;
    //     const celular = document.getElementById("celular").value;
    //     const localtrabalho = document.getElementById("localtrabalho").value;
    //     const cep = document.getElementById("cep").value;
    //     const cidade = document.getElementById("cidade").value;
    //     const estado = document.getElementById("estado").value;
    //     const endereco = document.getElementById("endereco").value;
    //     const numero = document.getElementById("numero").value;
    //     const bairro = document.getElementById("bairro").value;
    //     const facebook = document.getElementById("facebook").value;
    //     const instagram = document.getElementById("instagram").value;
    //     const moradiaSelecionada = formData.tipoMoradia === "Casa" || formData.tipoMoradia === "Apto";
    //     const propriedadeSelecionada = formData.tipoMoradia === "Própria" || formData.tipoMoradia === "Alugada";

    //     if (!moradiaSelecionada || !propriedadeSelecionada) {
    //         alert("Por favor, selecione uma opção de tipo de moradia (Casa ou Apto) e uma de propriedade (Própria ou Alugada).");
    //         return;
    //     }

    //     // Validação dos campos
    //     if (nome && rg && cpf && celular && localtrabalho && cep && cidade && estado && endereco && numero && bairro && facebook && instagram) {
    //         setShowModal(true); // Mostra o modal de sucesso
    //     } else {
    //         return null;
    //     }
    // };

    const handleBuscarCep = async () => {
        try {
            const cepLimpo = dadosAdotante.cep.match(/\d{8}/)?.[0];

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
                            <option value="">Selecione</option>
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
                        id="nome"
                        name="nome"
                        type="text"
                        placeholder="Digite o nome"
                        value={dadosAdotante.nome}
                        onChange={handleChange}
                    />

                    {(tentouEnviar && !dadosAdotante.nome) && (
                        <span className="erro-required"> O campo 'Nome' é obrigatório </span>
                    )}
                </div>

                <div className='cadastroAdotante-linha1'>
                    <div className="form-group">
                        <label>RG</label>
                        <input
                            id="rg"
                            name="rg"
                            type="text"
                            placeholder="Digite o RG"
                            value={dadosAdotante.rg}
                            onChange={handleChange}
                        />

                        {(tentouEnviar && !dadosAdotante.rg) && (
                            <span className="erro-required"> O campo 'RG' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>CPF</label>
                        <input
                            id="cpf"
                            name="cpf"
                            type="text"
                            placeholder="Digite o CPF"
                            value={dadosAdotante.cpf}
                            onChange={handleChange}
                        />

                        {(tentouEnviar && !dadosAdotante.cpf) && (
                            <span className="erro-required"> O campo 'CPF' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Celular</label>
                        <input
                            id="celular"
                            name="celular"
                            type="text"
                            placeholder="Digite o celular com DDD"
                            value={dadosAdotante.celular}
                            onChange={handleChange}
                        />

                        {(tentouEnviar && !dadosAdotante.celular) && (
                            <span className="erro-required"> O campo 'Celular' é obrigatório </span>
                        )}
                    </div>
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

                <div className="group-adocao">
                    <div className="form-group">
                        <label>Contato</label>
                        <input
                            id="contato"
                            type="text"
                            name="contato"
                            placeholder="Digite um nº de contato"
                            value={dadosAdotante.contato}
                            onChange={handleChange}
                        />

                        {(tentouEnviar && !dadosAdotante.contato) && (
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
                            value={dadosAdotante.responsavelContato}
                            onChange={handleChange}
                        />

                        {(tentouEnviar && !dadosAdotante.responsavelContato) && (
                            <span className="erro-required"> O campo 'Responsável Contato' é obrigatório </span>
                        )}
                    </div>
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

                <div className="cadastroAdotante-linha1">
                    <div className="form-group">
                        <label htmlFor="cep">CEP</label>
                        <input
                            id="cep"
                            name="cep"
                            type="text"
                            placeholder="Digite o CEP"
                            value={dadosAdotante.cep}
                            onBlur={handleBuscarCep}
                            onChange={handleChange}
                        />

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
                            type="text"
                            placeholder="Digite o nº da residência"
                            value={dadosAdotante.numero}
                            onChange={handleChange}
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
                    <BotaoSalvar /* showModal={showModal} openModal={openModal} closeModal={closeModal} */ />
                    <BotaoCancelar />
                    <BotaoLimpar />
                </div>
            </form >
        </div >
    );
};

export default CadastroAdotante;
