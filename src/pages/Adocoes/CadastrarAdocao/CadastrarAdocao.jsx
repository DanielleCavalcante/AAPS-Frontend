import InputMask from 'react-input-mask';
import { useState, useEffect, useRef } from 'react';
import { validarData } from '/src/utils/ValidaData';
import AlertAtencao from "/src/components/AlertAtencao/AlertAtencao.jsx";
import { useAdocoes } from '../../../hooks/useAdocoes';
import { useAdotantes } from '../../../hooks/useAdotantes';
import { useAnimais } from '../../../hooks/useAnimais';
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom';
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
    const location = useLocation();
    const novoAnimalid = location.state?.novoAnimalid;
    const novoAdotanteid = location.state?.novoAdotanteid;
    const novoPontonome = location.state?.novoPontonome;

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
        const state = location.state;
        const veioDePaginaProtegida = state?.veioDePaginaProtegida;

        if (veioDePaginaProtegida) {
            const dadosSalvos = localStorage.getItem('dadosAdocao');
            if (dadosSalvos) {
                const dados = JSON.parse(dadosSalvos);
                setDadosAdocao(prev => ({
                    ...prev,
                    ...dados
                }));
            }
        } else {
            localStorage.removeItem('dadosAdocao');
        }
    }, []);

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

    //BUSCA O CADASTRO DE NOVO ADOTANTE
    useEffect(() => {
        if (novoAdotanteid && adotantes.length > 0) {
            const adotanteSelecionado = adotantes.find(a => a.id === Number(novoAdotanteid));
            if (adotanteSelecionado) {
                const novosDados = {
                    ...dadosAdocao,
                    adotanteId: novoAdotanteid,
                    nomeAdotante: adotanteSelecionado.nome || '',
                    cpf: adotanteSelecionado.cpf || '',
                    rg: adotanteSelecionado.rg || '',
                    telefoneAdotante: adotanteSelecionado.celular || '',
                };

                setDadosAdocao(novosDados);

                // 🔥 Salva imediatamente no localStorage
                localStorage.setItem('dadosAdocao', JSON.stringify(novosDados));
            }

            // Limpa o state para não ficar no histórico da navegação
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [novoAdotanteid, adotantes, navigate, location.pathname]);


    //BUSCA O CADASTRO DE NOVO ANIMAL
    useEffect(() => {
        if (novoAnimalid && animais.length > 0) {
            const animalSelecionado = animais.find(a => a.id === Number(novoAnimalid));
            if (animalSelecionado) {
                const novosDados = {
                    ...dadosAdocao,
                    animalId: novoAnimalid,
                    especie: animalSelecionado.especie || '',
                    idade: animalSelecionado.dataNascimento || '',
                    sexo: animalSelecionado.sexo || '',
                    pelagem: animalSelecionado.pelagem || '',
                    doadorId: animalSelecionado.doadorId || '',
                    nomeDoador: animalSelecionado.nomeDoador || '',
                    telefoneDoador: animalSelecionado.telefoneDoador || '',
                };

                setDadosAdocao(novosDados);

                // 🔥 SALVA no localStorage imediatamente
                localStorage.setItem('dadosAdocao', JSON.stringify(novosDados));
            }

            // Limpa o state da rota
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [novoAnimalid, animais, navigate, location.pathname]);

    //BUSCA O CADASTRO DO NOVO PONTO DE ADOCAO
    useEffect(() => {
        if (novoPontonome && pontosAdocao.length > 0) {
            const pontoSelecionado = pontosAdocao.find(a => a.nomeFantasia === novoPontonome);
            if (pontoSelecionado) {
                const novosDados = {
                    ...dadosAdocao,
                    pontoAdocaoId: pontoSelecionado.id
                };

                setDadosAdocao(novosDados);

                // 🔥 Salva imediatamente no localStorage
                localStorage.setItem('dadosAdocao', JSON.stringify(novosDados));
            }

            // Limpa o state para não ficar no histórico da navegação
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [novoPontonome, pontosAdocao, navigate, location.pathname]);


    useEffect(() => {
        const dadosSalvos = localStorage.getItem('dadosAdocao');
        if (dadosSalvos) {
            const dados = JSON.parse(dadosSalvos);
            setDadosAdocao(prev => ({
                ...prev,
                ...dados // joga todas as propriedades de 'dados' dentro do estado
            }));
        }
    }, []);

    //CHAMA O CADASTRO DE ADOTANTE
    const handleCadastrarAdotante = () => {
        // Navega para a tela de cadastro do adotante levando o estado
        navigate('/cadastrar-adotante', { state: { from: '/cadastrar-adocao' } });
    };

    //CHAMA O CADASTRO DE ANIMAL
    const handleCadastrarAnimal = () => {
        // Navega para a tela de cadastro do animal levando o estado
        navigate('/cadastrar-animal', { state: { from: '/cadastrar-adocao' } });
    };

    //CHAMA O CADASTRO DE PONTO DE ADOCAO
    const handleCadastrarPontoAdocao = () => {
        // Navega para a tela de cadastro do animal levando o estado
        navigate('/cadastrar-ponto-adocao', { state: { from: '/cadastrar-adocao' } });
    };

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

        const novosDados = {
            ...dadosAdocao,
            [id]: ['adotanteId', 'animalId', 'doadorId', 'voluntarioId', 'pontoAdocaoId'].includes(id)
                ? Number(value)
                : value
        };

        setDadosAdocao(novosDados);

        // Armazena no localStorage
        localStorage.setItem('dadosAdocao', JSON.stringify(novosDados));

        // setDadosAdocao({
        //     ...dadosAdocao,
        //     [id]: ['adotanteId', 'animalId', 'doadorId', 'voluntarioId', 'pontoAdocaoId'].includes(id)
        //         ? Number(value)
        //         : value
        // });

    };

    const handleAdotanteChange = (e) => {
        const adotanteId = e.target.value;
        const adotanteSelecionado = adotantes.find(a => a.id === Number(adotanteId));

        // setDadosAdocao({
        //     ...dadosAdocao,
        //     adotanteId,
        //     nomeAdotante: adotanteSelecionado.nome ? adotanteSelecionado.nome : '',
        //     cpf: adotanteSelecionado.cpf ? adotanteSelecionado.cpf : '',
        //     rg: adotanteSelecionado.rg ? adotanteSelecionado.rg : '',
        //     telefoneAdotante: adotanteSelecionado.celular ? adotanteSelecionado.celular : ''
        // });

        const novosDados = {
            ...dadosAdocao,
            adotanteId,
            nomeAdotante: adotanteSelecionado?.nome ? adotanteSelecionado.nome : '',
            cpf: adotanteSelecionado?.cpf ? adotanteSelecionado.cpf : '',
            rg: adotanteSelecionado?.rg ? adotanteSelecionado.rg : '',
            telefoneAdotante: adotanteSelecionado?.celular ? adotanteSelecionado.celular : ''
        };

        setDadosAdocao(novosDados);

        // Armazena no localStorage
        localStorage.setItem('dadosAdocao', JSON.stringify(novosDados));
    };

    const handleAnimalChange = (e) => {
        const animalId = e.target.value;
        const animalSelecionado = animais.find(a => a.id === Number(animalId));

        // setDadosAdocao({
        //     ...dadosAdocao,
        //     animalId,
        //     nomeAnimal: animalSelecionado.nome ? animalSelecionado.nome : '',
        //     especie: animalSelecionado.especie ? animalSelecionado.especie : '',
        //     idade: animalSelecionado.dataNascimento ? animalSelecionado.dataNascimento : '',
        //     sexo: animalSelecionado.sexo ? animalSelecionado.sexo : '',
        //     pelagem: animalSelecionado.pelagem ? animalSelecionado.pelagem : '',
        //     doadorId: animalSelecionado.doadorId ? animalSelecionado.doadorId : '',
        //     nomeDoador: animalSelecionado.nomeDoador ? animalSelecionado.nomeDoador : '',
        //     telefoneDoador: animalSelecionado.telefoneDoador ? animalSelecionado.telefoneDoador : '',
        // });

        const novosDados = {
            ...dadosAdocao,
            animalId,
            nomeAnimal: animalSelecionado?.nome ? animalSelecionado.nome : '',
            especie: animalSelecionado?.especie ? animalSelecionado.especie : '',
            idade: animalSelecionado?.dataNascimento ? animalSelecionado.dataNascimento : '',
            sexo: animalSelecionado?.sexo ? animalSelecionado.sexo : '',
            pelagem: animalSelecionado?.pelagem ? animalSelecionado.pelagem : '',
            doadorId: animalSelecionado?.doadorId ? animalSelecionado.doadorId : '',
            nomeDoador: animalSelecionado?.nomeDoador ? animalSelecionado.nomeDoador : '',
            telefoneDoador: animalSelecionado?.telefoneDoador ? animalSelecionado.telefoneDoador : '',
        };

        setDadosAdocao(novosDados);

        // Armazena no localStorage
        localStorage.setItem('dadosAdocao', JSON.stringify(novosDados));
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
        // setDadosAdocao({
        //     ...dadosAdocao,
        //     pontoAdocaoId,
        //     nomePontoAdocao: pontoSelecionado.nomeFantasia ? pontoSelecionado.nomeFantasia : ''
        // });

        const novosDados = {
            ...dadosAdocao,
            pontoAdocaoId,
            nomePontoAdocao: pontoSelecionado?.nomeFantasia ? pontoSelecionado.nomeFantasia : ''
        };

        setDadosAdocao(novosDados);

        // Armazena no localStorage
        localStorage.setItem('dadosAdocao', JSON.stringify(novosDados));
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
                        <div className="campo-com-botao">
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
                            <button onClick={handleCadastrarAdotante} type='button' className='addCadastro' title="Cadastrar Adotante">+</button>
                        </div>
                        {(tentouEnviar && !dadosAdocao.nomeAdotante) && (
                            <span className="erro-required"> É obrigatório informar um adotante </span>
                        )}
                    </div>
                </div>

                <div id="group-adocao1">
                    <div className="form-group">
                        <label htmlFor="rg">RG</label>
                        <InputMask
                            mask="99.999.999-*"
                            value={dadosAdocao.rg}
                            onChange={handleAdotanteChange}
                            placeholder="__.___.___-_"
                            disabled>
                            {(inputProps) => (
                                <input
                                    {...inputProps}
                                    id="rg"
                                    name="rg"
                                    type="text"
                                    disabled
                                />
                            )}
                        </InputMask>
                    </div>

                    <div className="form-group">
                        <label htmlFor="cpf">CPF</label>
                        <InputMask
                            mask="999.999.999-99"
                            value={dadosAdocao.cpf}
                            onChange={handleAdotanteChange}
                            disabled
                            placeholder="___.___.___-__">
                            {(inputProps) => (
                                <input
                                    {...inputProps}
                                    id="cpf"
                                    name="cpf"
                                    type="text"
                                    disabled
                                />
                            )}
                        </InputMask>
                    </div>

                    <div className="form-group">
                        <label htmlFor="telefoneAdotante" >Celular</label>
                        <InputMask
                            mask="(99) 99999-9999"
                            value={dadosAdocao.telefoneAdotante || ''}
                            onChange={handleAdotanteChange}
                            disabled
                            placeholder="(__) _____-____"
                        >
                            {(inputProps) => (
                                <input
                                    {...inputProps}
                                    type="text"
                                    id="telefoneAdotante"
                                    name="telefoneAdotante"
                                    disabled
                                />
                            )}
                        </InputMask>
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
                        <div className="campo-com-botao">
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
                            <button type='button' onClick={handleCadastrarAnimal} className='addCadastro' title="Cadastrar Animal">+</button>
                        </div>
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
                        <InputMask
                            mask="(99) 99999-9999"
                            value={dadosAdocao.telefoneDoador || ''}
                            onChange={handleAnimalChange}
                            disabled
                            placeholder="(__) _____-____"
                        >
                            {(inputProps) => (
                                <input
                                    {...inputProps}
                                    type="text"
                                    id="telefoneDoador"
                                    name="telefoneDoador"
                                    disabled
                                />
                            )}
                        </InputMask>
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
                        <div className="campo-com-botao">
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
                            <button onClick={handleCadastrarPontoAdocao} type='button' className='addCadastro' title="Cadastrar Ponto de Adoção">+</button>
                        </div>
                        {(tentouEnviar && !dadosAdocao.nomePontoAdocao) && (
                            <span className="erro-required"> É obrigatório informar um ponto de adoção </span>
                        )}
                    </div>
                </div>

                <div className="button-group-crud">
                    <BotaoSalvar showModal={showModal} openModal={handleSubmit} closeModal={closeModal} />
                    <BotaoCancelar onClick={() => navigate('/listar-adocoes')} />
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
