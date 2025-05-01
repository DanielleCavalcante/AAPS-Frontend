import React, { useState, useEffect } from 'react';

import { useAdocoes } from '../../../hooks/useAdocoes';
import { useAdotantes } from '../../../hooks/useAdotantes';
import { useAnimais } from '../../../hooks/useAnimais';
import { useVoluntarios } from '../../../hooks/useVoluntarios';
import { usePontosAdocao } from '../../../hooks/usePontosAdocao';

import BotaoSalvar from "/src/components/BotaoSalvar/BotaoSalvar.jsx";
import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoLimpar from "/src/components/BotaoLimpar/BotaoLimpar.jsx";
import './CadastrarAdocao.css';

const CadastroAdocao = () => {
    const { criarAdocao, erro, tratarErro, limparErro } = useAdocoes();
    const [dadosAdocao, setDadosAdocao] = useState({
        data: '',
        nomeAdotante: '',
        adotanteId: '',
        rg: '',
        cpf: '',
        telefoneAdotante: '',
        nomeAnimal: '',
        animalId: '',
        especie: '',
        idade: '',
        sexo: '',
        pelagem: '',
        doadorId: '',
        nomeDoador: '',
        telefoneDoador: '',
        nomeVoluntario: '',
        nomePontoAdocao: '',
        pontoAdocaoId: ''
    });

    const [tentouEnviar, setTentouEnviar] = useState(false);

    const { listarAdotantesAtivos } = useAdotantes();
    const [adotantes, setAdotantes] = useState([]);

    const { listarAnimaisAtivos } = useAnimais();
    const [animais, setAnimais] = useState([]);

    const { listarVoluntariosAtivos } = useVoluntarios();
    const [voluntarios, setVoluntarios] = useState([]);

    const { listarPontosAdocaoAtivos } = usePontosAdocao();
    const [pontosAdocao, setPontosAdocao] = useState([]);

    useEffect(() => {
        const fetchAdotantes = async () => {
            const adotantesData = await listarAdotantesAtivos();
            setAdotantes(adotantesData);
        };
        const fetchAnimais = async () => {
            const animaisData = await listarAnimaisAtivos();
            setAnimais(animaisData);
        };
        const fetchVoluntarios = async () => {
            const voluntariosData = await listarVoluntariosAtivos();
            setVoluntarios(voluntariosData);
        };
        const fetchPontosAdocao = async () => {
            const pontosAdocaoData = await listarPontosAdocaoAtivos();
            setVoluntarios(pontosAdocaoData);
        };
        fetchAdotantes();
        fetchAnimais();
        fetchVoluntarios();
        fetchPontosAdocao();
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        limparErro();

        setDadosAdocao({
            ...dadosAdocao,
            [id]: ['adotanteId', 'animalId', 'doadorId', 'voluntarioId', 'pontoAdocaoId'].includes(id)
                ? Number(value)
                : value
        });
    
        if (id === "adotanteId") {
            const adotanteSelecionado = adotantes.find(a => a.id === Number(value));
            if (adotanteSelecionado) {
                setDadosAdocao(prevState => ({
                    ...prevState,
                    nomeAdotante: adotanteSelecionado.nome ? adotanteSelecionado.nome : '',
                    cpf: adotanteSelecionado.cpf ? adotanteSelecionado.cpf : '',
                    rg: adotanteSelecionado.rg ? adotanteSelecionado.rg : '',
                    telefoneAdotante: adotanteSelecionado.telefones ? adotanteSelecionado.telefones : '' // VER COMO LISTA DEPOIS
                }));
            }
        }
    
        if (id === "animalId") {
            const animalSelecionado = animais.find(a => a.id === Number(value));
            if (animalSelecionado) {
                setDadosAdocao(prevState => ({
                    ...prevState,
                    nomeAnimal: animalSelecionado.nome ? animalSelecionado.nome : '',
                    especie: animalSelecionado ? animalSelecionado.especie : '',
                    idade: animalSelecionado ? animalSelecionado.dataNascimento : '',
                    sexo: animalSelecionado ? animalSelecionado.sexo : '',
                    pelagem: animalSelecionado ? animalSelecionado.pelagem : '',
                    doadorId: animalSelecionado ? animalSelecionado.doadorId : '',
                    nomeDoador: animalSelecionado ? animalSelecionado.nomeDoador : '',
                    telefoneDoador: animalSelecionado ? animalSelecionado.telefones : '',
                }));
            }
        }
    
        if (id === "pontoAdocaoId") {
            const pontoSelecionado = pontosAdocao.find(p => p.id === Number(value));
            if (pontoSelecionado) {
                setDadosAdocao(prevState => ({
                    ...prevState,
                    nomePontoAdocao: pontoSelecionado.nome
                }));
            }
        }
    };

    const handleAdotanteChange = (e) => {
        const adotanteId = e.target.value;
        const adotanteSelecionado = adotantes.find(a => a.id === Number(adotanteId));
        setDadosAdocao({
            ...dadosAdocao,
            adotanteId,
            nomeAdotante: adotanteSelecionado ? adotanteSelecionado.nome : '',
            cpf: adotanteSelecionado.cpf ? adotanteSelecionado.cpf : '',
            rg: adotanteSelecionado.rg ? adotanteSelecionado.rg : '',
            telefoneAdotante: adotanteSelecionado.telefones ? adotanteSelecionado.telefones : ''
        });
    };

    const handleAnimalChange = (e) => {
        const animalId = e.target.value;
        const animalSelecionado = animais.find(a => a.id === Number(animalId));
        setDadosAdocao({
            ...dadosAdocao,
            animalId,
            nomeAnimal: animalSelecionado ? animalSelecionado.nome : '',
            especie: animalSelecionado ? animalSelecionado.especie : '',
            idade: animalSelecionado ? animalSelecionado.dataNascimento : '',
            sexo: animalSelecionado ? animalSelecionado.sexo : '',
            pelagem: animalSelecionado ? animalSelecionado.pelagem : '',
            doadorId: animalSelecionado ? animalSelecionado.doadorId : '',
            nomeDoador: animalSelecionado ? animalSelecionado.nomeDoador : '',
            telefoneDoador: animalSelecionado ? animalSelecionado.telefones : '',
        });
    };

    const handleVoluntarioChange = (e) => {
        const voluntarioId = e.target.value;
        const voluntarioSelecionado = voluntarios.find(v => v.id === Number(voluntarioId));
        setDadosAdocao({
            ...dadosAdocao,
            nomeVoluntario: voluntarioSelecionado ? voluntarioSelecionado.nome : ''
        });
    };

    const handlePontoAdocaoChange = (e) => {
        const pontoAdocaoId = e.target.value;
        const pontoSelecionado = pontosAdocao.find(p => p.id === Number(pontoAdocaoId));
        setDadosAdocao({
            ...dadosAdocao,
            pontoAdocaoId,
            nomePontoAdocao: pontoSelecionado ? pontoSelecionado.nome : ''
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setTentouEnviar(true); 
        limparErro();
        try {
            await criarAdocao(dadosAdocao);
            setDadosAdocao({
                data: '',
                nomeAdotante: '',
                adotanteId: '',
                rg: '',
                cpf: '',
                telefoneAdotante: '',
                nomeAnimal: '',
                animalId: '',
                especie: '',
                idade: '',
                sexo: '',
                pelagem: '',
                doadorId: '',
                nomeDoador: '',
                telefoneDoador: '',
                nomeVoluntario: '',
                nomePontoAdocao: '',
                pontoAdocaoId: ''
            });
            setTentouEnviar(false);
        } catch (error) {
            tratarErro(error);
        }
    };

    // CONFIGURAÇÕES DE MODAL
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);
    const openModal = () => {
        // Pegando os valores dos campos
        const codadotante = document.getElementById("codadotante").value;
        const nomeadotante = document.getElementById("nomeadotante").value;
        const cpf = document.getElementById("cpf").value;
        const rg = document.getElementById("rg").value;
        const celular = document.getElementById("celular").value;
        const codanimal = document.getElementById("codanimal").value;
        const nomeanimal = document.getElementById("nomeanimal").value;
        const especie = document.getElementById("especie").value;
        const idade = document.getElementById("idade").value;
        const sexo = document.getElementById("sexo").value;
        const pelagem = document.getElementById("pelagem").value;
        const coddoador = document.getElementById("coddoador").value;
        const nomedoador = document.getElementById("nomedoador").value;
        const telefonedoador = document.getElementById("telefonedoador").value;
        const codlocal = document.getElementById("codlocal").value;
        const local = document.getElementById("local").value;

        // Validação dos campos
        if (codadotante && nomeadotante && rg && cpf && celular && codanimal && nomeanimal && especie && idade && sexo && pelagem && coddoador && nomedoador && telefonedoador && codlocal && local) {
            setShowModal(true); // Mostra o modal de sucesso
        } else {
            return null;
        }
    };

    return (
        <div className="cadastro-container">
            <form className="cadastroAdocao-form" onSubmit={handleSubmit}>
                <div id="group-adocao1">
                    <div className="form-group">
                        <label htmlFor="id" >Código</label>
                        <input type="text" id="codigo" disabled />
                    </div>

                    <div className="form-group">
                        <label>Data</label>
                        <input 
                            type="date" 
                            id="data"
                            value={dadosAdocao.data}
                            onChange={handleChange}
                            placeholder="Digite a data da adoção"
                        />

                        {(tentouEnviar && !dadosAdocao.data) && (
                            <span className="erro-required"> O campo 'Data' é obrigatório </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="nomeVoluntario">Voluntário</label>
                        <select
                            id="nomeVoluntario"
                            value={dadosAdocao.voluntarioId}
                            onChange={handleVoluntarioChange}
                        >
                            <option value="">Selecione um voluntário</option>
                            {voluntarios.map((vol) => (
                                <option key={vol.id} value={vol.id}>
                                    {vol.nome}
                                </option>
                            ))}
                        </select>

                        {(tentouEnviar && !dadosAdocao.data) && (
                            <span className="erro-required"> É obrigatório informar um adotante </span>
                        )}
                    </div>
                </div>

                <div id="group-adocao2">
                    <div className="form-group">
                        <label htmlFor="adotanteId">Código Adotante</label>
                        <input 
                            type="number"
                            id="adotanteId" 
                            name="adotanteId"
                            value={dadosAdocao.adotanteId}
                            onChange={handleChange}
                        />
                        {(tentouEnviar && !dadosAdocao.data) && (
                            <span className="erro-required"> É obrigatório informar um adotante </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="nomeAdotante">Nome adotante</label>
                        <select 
                            id="nomeAdotante" 
                            name="nomeAdotante"
                            value={dadosAdocao.adotanteId}
                            onChange={handleAdotanteChange}
                        >
                            <option value="">Selecione um adotante</option>
                            {adotantes.map(adotante => (
                                <option key={adotante.id} value={adotante.id}>
                                    {adotante.nome}
                                </option>
                            ))}
                        </select>

                        {(tentouEnviar && !dadosAdocao.data) && (
                            <span className="erro-required"> É obrigatório informar um adotante </span>
                        )}
                    </div>
                </div>

                <div id="group-adocao1">
                    <div className="form-group">
                        <label htmlFor="rg">RG</label>
                        <input 
                            type="text"
                            id="rg" 
                            name="rg"  
                            value={dadosAdocao.rg}
                            onChange={handleAdotanteChange}
                            placeholder="Digite o RG"
                        />

                        {(tentouEnviar && !dadosAdocao.data) && (
                            <span className="erro-required"> O campo 'RG' é obrigatório </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="cpf">CPF</label>
                        <input 
                            type="text"
                            id="cpf" 
                            name="cpf"  
                            value={dadosAdocao.cpf}
                            onChange={handleAdotanteChange}
                            placeholder="Digite o CPF" 
                        />

                        {(tentouEnviar && !dadosAdocao.data) && (
                            <span className="erro-required"> O campo 'CPF' é obrigatório </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="telefoneAdotante" >Celular</label>
                        <input 
                            type="text"
                            id="telefones" 
                            name="telefones"  
                            value={dadosAdocao.telefoneAdotante[0] || ''}
                            onChange={handleAdotanteChange}
                            placeholder="Digite o celular com DDD" />

                        {(tentouEnviar && !dadosAdocao.data) && (
                            <span className="erro-required"> O campo 'Celular' é obrigatório </span>
                        )}
                    </div>
                </div>

                <div id="group-adocao2">
                    <div className="form-group">
                        <label htmlFor="animalId">Código animal</label>
                        <input 
                            type="number"
                            id="animalId"
                            name="animalId"
                            value={dadosAdocao.animalId}
                            onChange={handleChange}
                        />

                        {(tentouEnviar && !dadosAdocao.data) && (
                            <span className="erro-required"> É obrigatório informar um animal </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="nomeAnimal">Nome animal</label>
                        <select
                            id="nomeAnimal"
                            value={dadosAdocao.animalId}
                            onChange={handleAnimalChange}
                        >
                            <option value="">Selecione um animal</option>
                            {animais.map(animal => (
                                <option key={animal.id} value={animal.id}>
                                    {animal.nome}
                                </option>
                            ))}
                        </select>
                        {(tentouEnviar && !dadosAdocao.data) && (
                        <span className="erro-required"> É obrigatório informar um animal </span>
                    )}
                    </div>
                </div>

                <div id="group-adocao3">
                    <div className="form-group">
                        <label htmlFor="especie">Espécie</label>
                        <input 
                            type="text"
                            id="especie" 
                            name="especie"  
                            value={dadosAdocao.especie}
                            onChange={handleAnimalChange}
                            disabled
                        />

                        {(tentouEnviar && !dadosAdocao.data) && (
                            <span className="erro-required"> O campo 'Espécie' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="idade">Idade</label>
                        <input 
                            type="text" 
                            id="idade" 
                            name="idade"  
                            value={new Date().getFullYear() - new Date(dadosAdocao.idade).getFullYear()}
                            onChange={handleAnimalChange}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sexo">Sexo</label>
                        <select 
                            id="sexo" 
                            name="sexo"
                            value={dadosAdocao.sexo}
                            onChange={handleAnimalChange}
                            disabled
                        >
                            <option value="">Selecione</option>
                            <option value="F">Fêmea</option>
                            <option value="M">Macho</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pelagem">Pelagem</label>
                        <input 
                            type="text" 
                            id="pelagem" 
                            name="pelagem"  
                            value={dadosAdocao.pelagem}
                            onChange={handleAnimalChange}
                            disabled
                        />
                    </div>
                </div>

                <div id="group-adocao2">
                    <div className="form-group">
                        <label htmlFor="doadorId">Código doador</label>
                        <input 
                            type="number"
                            id="doadorId"
                            name="doadorId"
                            value={dadosAdocao.doadorId}
                            onChange={handleAnimalChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nomeDoador">Nome doador</label>
                        <select
                            id="nomeDoador"
                            value={dadosAdocao.doadorId}
                            onChange={handleAnimalChange}
                        >
                            <option value="">Selecione um doador</option>
                            {animais.map(animais => (
                                <option key={animais.id} value={animais.doadorId}>
                                    {animais.nomeDoador}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="telefoneDoador">Telefone doador</label>
                    <input 
                        type="text"
                        id="telefones"
                        name="telefones"
                        value={dadosAdocao.telefoneDoador|| ''}
                        onChange={handleAnimalChange}
                    />
                </div>

                <div id="group-adocao2">
                    <div className="form-group">
                        <label htmlFor="codlocal">Código local</label>
                        <select id="codlocal" name="codlocal">
                            <option value="1">local01</option>
                            <option value="2">local02</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="nomelocaladocao">Nome local de adoção</label>
                        <select id="nomelocaladocao" name="nomelocaladocao">
                            <option value="1">local01</option>
                            <option value="2">local02</option>
                        </select>
                    </div>
                </div>


                <div className="button-group-crud">
                    <BotaoSalvar showModal={showModal} openModal={openModal} closeModal={closeModal} />
                    <BotaoCancelar />
                    <BotaoLimpar />
                </div>
            </form>
        </div>
    );
};

export default CadastroAdocao;
