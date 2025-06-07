import React, { useState, useEffect, useRef } from 'react';
import { validarData } from '../../../utils/validaData';
import AlertAtencao from "/src/components/AlertAtencao/AlertAtencao.jsx";
import { useAdocoes } from '../../../hooks/useAdocoes';
import { useAdotantes } from '../../../hooks/useAdotantes';
import { useAnimais } from '../../../hooks/useAnimais';
import { useNavigate } from 'react-router-dom';
import { usePontosAdocao } from '../../../hooks/usePontosAdocao';
import { useAuth } from '../../../hooks/useAuth';

import BotaoSalvar from "/src/components/BotaoSalvar/BotaoSalvar.jsx";
import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoLimpar from "/src/components/BotaoLimpar/BotaoLimpar.jsx";
import './CadastrarAdocao.css';
import { use } from 'react';

const CadastroAdocao = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
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
        voluntarioId: user.usuarioId,
        nomeVoluntario: '',
        nomePontoAdocao: '',
        pontoAdocaoId: ''
    });

    const [tentouEnviar, setTentouEnviar] = useState(false);

    const { listarAdotantesAtivos } = useAdotantes();
    const [adotantes, setAdotantes] = useState([]);

    const { listarAnimaisAtivos } = useAnimais();
    const [animais, setAnimais] = useState([]);

    const { listarPontosAdocaoAtivos } = usePontosAdocao();
    const [pontosAdocao, setPontosAdocao] = useState([]);

    const [alertAtencao, setAlertAtencao] = useState(false);
    const [alertMensagem, setAlertMensagem] = useState('');
    const [campoAlerta, setCampoAlerta] = useState('');
    const dataRef = useRef(null);

    useEffect(() => {
        const fetchAdotantes = async () => {
            const adotantesData = await listarAdotantesAtivos();
            setAdotantes(adotantesData);
        };
        const fetchAnimais = async () => {
            const animaisData = await listarAnimaisAtivos();
            setAnimais(animaisData);
        };
        const fetchPontosAdocao = async () => {
            const pontosAdocaoData = await listarPontosAdocaoAtivos();
            setPontosAdocao(pontosAdocaoData);
        };
        fetchAdotantes();
        fetchAnimais();
        fetchPontosAdocao();
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        limparErro();

        //valida Data
        if (id === 'data') {
            if (validarData(value)) {
                setCampoAlerta('data');
                setAlertMensagem('Data inválida! Insira novamente.');
                setAlertAtencao(true);
                return;
            }
        }

        if (id === 'adotanteId') {
            if (value === '') {
                setDadosAdocao({ ...dadosAdocao, [id]: '' });
                return;
            }
            const numero = parseInt(value, 10);
            if (isNaN(numero) || numero <= 0) {
                return;
            } else {
                const adotanteSelecionado = adotantes.find(a => a.id === Number(value));
                if (adotanteSelecionado) {
                    setDadosAdocao(prevState => ({
                        ...prevState,
                        nomeAdotante: adotanteSelecionado.nome ? adotanteSelecionado.nome : '',
                        cpf: adotanteSelecionado.cpf ? adotanteSelecionado.cpf : '',
                        rg: adotanteSelecionado.rg ? adotanteSelecionado.rg : '',
                        telefoneAdotante: adotanteSelecionado.celular ? adotanteSelecionado.celular : ''
                    }));
                }
            }
        }

        if (id === "animalId") {
            if (value === '') {
                setDadosAdocao({ ...dadosAdocao, [id]: '' });
                return;
            }
            const numero = parseInt(value, 10);
            if (isNaN(numero) || numero <= 0) {
                return;
            } else {
                const animalSelecionado = animais.find(a => a.id === Number(value));
                if (animalSelecionado) {
                    setDadosAdocao(prevState => ({
                        ...prevState,
                        nomeAnimal: animalSelecionado.nome ? animalSelecionado.nome : '',
                        especie: animalSelecionado.especie ? animalSelecionado.especie : '',
                        idade: animalSelecionado.dataNascimento ? animalSelecionado.dataNascimento : '',
                        sexo: animalSelecionado.sexo ? animalSelecionado.sexo : '',
                        pelagem: animalSelecionado.pelagem ? animalSelecionado.pelagem : '',
                        doadorId: animalSelecionado.doadorId ? animalSelecionado.doadorId : '',
                        nomeDoador: animalSelecionado.nomeDoador ? animalSelecionado.nomeDoador : '',
                        telefoneDoador: animalSelecionado.telefoneDoador ? animalSelecionado.telefoneDoador : '',
                    }));
                }
            }
        }

        if (id === "pontoAdocaoId") {
            if (value === '') {
                setDadosAdocao({ ...dadosAdocao, [id]: '' });
                return;
            }
            const numero = parseInt(value, 10);
            if (isNaN(numero) || numero <= 0) {
                return;
            } else {
                const pontoSelecionado = pontosAdocao.find(p => p.id === Number(value));
                if (pontoSelecionado) {
                    setDadosAdocao(prevState => ({
                        ...prevState,
                        nomePontoAdocao: pontoSelecionado.nome ? pontoSelecionado.nome : ''
                    }));
                }
            }
        }

        setDadosAdocao({
            ...dadosAdocao,
            [id]: ['adotanteId', 'animalId', 'doadorId', 'voluntarioId', 'pontoAdocaoId'].includes(id)
                ? Number(value)
                : value
        });

    };

    const handleAdotanteChange = (e) => {
        const adotanteId = e.target.value;
        const adotanteSelecionado = adotantes.find(a => a.id === Number(adotanteId));

        setDadosAdocao({
            ...dadosAdocao,
            adotanteId,
            nomeAdotante: adotanteSelecionado.nome ? adotanteSelecionado.nome : '',
            cpf: adotanteSelecionado.cpf ? adotanteSelecionado.cpf : '',
            rg: adotanteSelecionado.rg ? adotanteSelecionado.rg : '',
            telefoneAdotante: adotanteSelecionado.celular ? adotanteSelecionado.celular : ''
        });
    };

    const handleAnimalChange = (e) => {
        const animalId = e.target.value;
        const animalSelecionado = animais.find(a => a.id === Number(animalId));

        setDadosAdocao({
            ...dadosAdocao,
            animalId,
            nomeAnimal: animalSelecionado.nome ? animalSelecionado.nome : '',
            especie: animalSelecionado.especie ? animalSelecionado.especie : '',
            idade: animalSelecionado.dataNascimento ? animalSelecionado.dataNascimento : '',
            sexo: animalSelecionado.sexo ? animalSelecionado.sexo : '',
            pelagem: animalSelecionado.pelagem ? animalSelecionado.pelagem : '',
            doadorId: animalSelecionado.doadorId ? animalSelecionado.doadorId : '',
            nomeDoador: animalSelecionado.nomeDoador ? animalSelecionado.nomeDoador : '',
            telefoneDoador: animalSelecionado.telefoneDoador ? animalSelecionado.telefoneDoador : '',
        });
    };

    /*     const handleVoluntarioChange = (e) => {
            const voluntarioId = e.target.value;
            const voluntarioSelecionado = voluntarios.find(v => v.id === Number(voluntarioId));
            setDadosAdocao({
                ...dadosAdocao,
                nomeVoluntario: voluntarioSelecionado ? voluntarioSelecionado.nome : ''
            });
        }; */

    const handlePontoAdocaoChange = (e) => {
        const pontoAdocaoId = e.target.value;
        const pontoSelecionado = pontosAdocao.find(p => p.id === Number(pontoAdocaoId));
        setDadosAdocao({
            ...dadosAdocao,
            pontoAdocaoId,
            nomePontoAdocao: pontoSelecionado.nomeFantasia ? pontoSelecionado.nomeFantasia : ''
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
                nomePontoAdocao: '',
                pontoAdocaoId: ''
            });
            setTentouEnviar(false);
            openModal();
        } catch (error) {
            tratarErro(error);
        }
    };

    // CONFIGURAÇÕES DE MODAL
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setShowModal(false);
        navigate('/listar-adocoes');
    }


    const fecharAlertaEFocarCampo = (campoRef, campo) => {
        setAlertAtencao(false);
        setDadosAdocao(prev => ({ ...prev, [campo]: '' }));  // limpa o valor no estado

        if (campoRef.current) {
            campoRef.current.value = '';   // limpa o input na tela
            campoRef.current.focus();      // foca no campo
        }
    };

    return (
        <div className="cadastro-container">
            <form className="cadastroAdocao-form" onSubmit={handleSubmit}>
                <div id="group-adocao1">
                    <div className="form-group">
                        <label htmlFor="id" >Código</label>
                        <input
                            type="text"
                            id="codigo"
                            disabled
                        />
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
                        <input
                            type="text"
                            value={user.nomeUsuario}
                            disabled
                        />
                        {/* <select
                            type="text"
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
                        </select> */}
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
                        {(tentouEnviar && !dadosAdocao.adotanteId) && (
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
                        {(tentouEnviar && !dadosAdocao.nomeAdotante) && (
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
                            disabled
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cpf">CPF</label>
                        <input
                            type="text"
                            id="cpf"
                            name="cpf"
                            value={dadosAdocao.cpf}
                            onChange={handleAdotanteChange}
                            disabled
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="telefoneAdotante" >Celular</label>
                        <input
                            id="telefoneAdotante"
                            name="telefoneAdotante"
                            type="text"
                            value={dadosAdocao.telefoneAdotante || ''}
                            onChange={handleAdotanteChange}
                            disabled
                        />
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
                        {(tentouEnviar && !dadosAdocao.animalId) && (
                            <span className="erro-required"> É obrigatório informar um animal </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="nomeAnimal">Nome animal</label>
                        <select
                            id="nomeAnimal"
                            name='nomeAnimal'
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
                        {(tentouEnviar && !dadosAdocao.nomeAnimal) && (
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
                    </div>
                    <div className="form-group">
                        <label htmlFor="idade">Idade</label>
                        <input
                            type="text"
                            id="idade"
                            name="idade"
                            value={
                                dadosAdocao.idade
                                    ? (() => {
                                        const nascimento = new Date(dadosAdocao.idade);
                                        const hoje = new Date();
                                        let idade = hoje.getFullYear() - nascimento.getFullYear();
                                        const m = hoje.getMonth() - nascimento.getMonth();
                                        if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
                                            idade--;
                                        }
                                        if (isNaN(idade) || idade < 0) return '';
                                        return idade + (idade === 1 ? ' ano' : ' anos');
                                    })()
                                    : ''
                            }
                            /* value={new Date().getFullYear() - new Date(dadosAdocao.idade).getFullYear()} */
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
                            <option value=""></option>
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

                <div id="group-adocao1">
                    <div className="form-group">
                        <label htmlFor="doadorId">Código doador</label>
                        <input
                            type="number"
                            id="doadorId"
                            name="doadorId"
                            value={dadosAdocao.doadorId}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nomeDoador">Nome doador</label>
                        <select
                            id="nomeDoador"
                            value={dadosAdocao.doadorId}
                            onChange={handleAnimalChange}
                            disabled
                        >
                            <option value=""></option>
                            {animais.map(animal => (
                                <option key={animal.doadorId} value={animal.doadorId}>
                                    {animal.nomeDoador}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="telefoneDoador">Telefone doador</label>
                        <input
                            type="text"
                            id="telefoneDoador"
                            name="telefoneDoador"
                            value={dadosAdocao.telefoneDoador || ''}
                            onChange={handleAnimalChange}
                            disabled
                        />
                    </div>
                </div>

                <div id="group-adocao2">
                    <div className="form-group">
                        <label htmlFor="codlocal">Código local</label>
                        <input
                            type="number"
                            id="pontoAdocaoId"
                            name="pontoAdocaoId"
                            value={dadosAdocao.pontoAdocaoId}
                            onChange={handleChange}
                            disabled
                        />
                        {(tentouEnviar && !dadosAdocao.pontoAdocaoId) && (
                            <span className="erro-required"> É obrigatório informar um local de adoção </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="nomelocaladocao">Nome local de adoção</label>
                        <select
                            id="nomePontoAdocao"
                            name="nomePontoAdocao"
                            value={dadosAdocao.pontoAdocaoId}
                            onChange={handlePontoAdocaoChange}
                        >
                            <option value="">Selecione um ponto de adoção</option>
                            {pontosAdocao.map(ponto => (
                                <option key={ponto.id} value={ponto.id}>
                                    {ponto.nomeFantasia}
                                </option>
                            ))}
                        </select>
                        {(tentouEnviar && !dadosAdocao.nomePontoAdocao) && (
                            <span className="erro-required"> É obrigatório informar um ponto de adoção </span>
                        )}
                    </div>
                </div>

                <div className="button-group-crud">
                    <BotaoSalvar showModal={showModal} openModal={handleSubmit} closeModal={closeModal} />
                    <BotaoCancelar />
                    <BotaoLimpar />
                </div>
            </form>
            {alertAtencao && (
                <AlertAtencao
                    mensagem={alertMensagem}
                    onClose={() => {
                        const refs = {
                            data: dataRef
                        };
                        fecharAlertaEFocarCampo(refs[campoAlerta], campoAlerta);
                    }}
                />
            )}
        </div>
    );
};

export default CadastroAdocao;
