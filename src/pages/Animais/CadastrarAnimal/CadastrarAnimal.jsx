import { useState, useEffect, useRef } from 'react'
import { useAnimais } from '../../../hooks/useAnimais';
import { useDoadores } from '../../../hooks/useDoadores';
import { useError } from '../../../hooks/useError';
import { useLocation, useNavigate } from 'react-router-dom';
import { validarNome } from '../../../utils/ValidaNome';
import { validarData } from '/src/utils/ValidaData';
import AlertAtencao from "/src/components/AlertAtencao/AlertAtencao.jsx";
import BotaoSalvar from "/src/components/BotaoSalvar/BotaoSalvar.jsx";
import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoLimpar from "/src/components/BotaoLimpar/BotaoLimpar.jsx";
import CarregandoCat from '../../../components/Spinner/CarregandoCat';
import './CadastrarAnimal.css';

const CadastroAnimal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from;
    const novoDoadorId = location.state?.novoDoadorId;
    //    const { criarAnimal, erro, carregando } = useAnimais();
    const { criarAnimal } = useAnimais();
    const [dadosAnimal, setDadosAnimal] = useState({
        nome: '',
        especie: '',
        raca: '',
        dataNascimento: null,
        pelagem: '',
        sexo: '',
        status: 1,
        disponibilidade: 1,
        doadorId: '',
        nomeDoador: '',
        resgatado: false,
    });

    const { listarDoadoresAtivos } = useDoadores();
    const [doadores, setDoadores] = useState([]);

    const { erro, tratarErro, limparErro } = useError();
    const [tentouEnviar, setTentouEnviar] = useState(false);
    const [carregandoSubmit, setCarregandoSubmit] = useState(false);

    const [alertAtencao, setAlertAtencao] = useState(false);
    const [alertMensagem, setAlertMensagem] = useState('');
    const [campoAlerta, setCampoAlerta] = useState('');
    const [alertErroApi, setAlertErroApi] = useState(false);

    const dataRef = useRef(null);
    const especieRef = useRef(null);

    useEffect(() => {
        const state = location.state;
        const veioDePaginaProtegida = state?.veioDePaginaProtegida;

        if (veioDePaginaProtegida) {
            const dadosSalvos = localStorage.getItem('dadosAnimal');
            if (dadosSalvos) {
                const dados = JSON.parse(dadosSalvos);
                setDadosAnimal(prev => ({
                    ...prev,
                    ...dados
                }));
            }
        } else {
            localStorage.removeItem('dadosAnimal');
        }
    }, []);

    useEffect(() => {
        const fetchDoadores = async () => {
            const doadoresData = await listarDoadoresAtivos();
            setDoadores(doadoresData);
        };
        fetchDoadores();
    }, []);

    useEffect(() => {
        if (novoDoadorId && doadores.length > 0) {
            const doadorSelecionado = doadores.find(d => d.id === Number(novoDoadorId));
            if (doadorSelecionado) {
                const novosDados = {
                    ...dadosAnimal,
                    doadorId: novoDoadorId,
                    nomeDoador: doadorSelecionado ? doadorSelecionado.nome : ''
                };
                setDadosAnimal(novosDados);
                // 🔥 Salva imediatamente no localStorage
                localStorage.setItem('dadosAnimal', JSON.stringify(novosDados));
            }
            // Limpa o state para não ficar no histórico da navegação
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [novoDoadorId, doadores, navigate, location.pathname]);

    //CHAMA O CADASTRO DE ADOTANTE
    const handleCadastrarDoador = () => {
        navigate('/cadastrar-doador', { state: { from: '/cadastrar-animal' } });
    };

    const handleChange = (e) => {
        const { id, value } = e.target;

        setAlertErroApi(false);

        if (id === 'doadorId') {
            if (value === '') {
                setDadosAnimal({ ...dadosAnimal, [id]: '' });
                return;
            }
            const numero = parseInt(value, 10);
            if (isNaN(numero) || numero <= 0) {
                return;
            }
        }

        //valida Data
        if (id === 'dataNascimento') {
            if (validarData(value)) {
                setCampoAlerta('dataNascimento');
                setAlertMensagem('Data de Nascimento inválida. Insira novamente.');
                setAlertAtencao(true);
                return;
            }
        }

        //valida especie
        // if (id === 'especie') {
        //     const especie = value.trim().toLowerCase();
        //     if (especie === "cachorro" || especie === "gato") {
        //         // ✅ Enviar os dados
        //         alert("Dados enviados:", dadosAnimal);
        //     } else {
        //         // 🚫 Mostrar erro
        //         alert("Espécie inválida. Digite 'Cachorro' ou 'Gato'.");
        //     }
        // }

        const novosDados = {
            ...dadosAnimal,
            [id]: ['status', 'disponibilidade', 'doadorId'].includes(id) ? Number(value) : value
        };

        setDadosAnimal(novosDados);

        const doadorSelecionado = doadores.find(d => d.id === Number(value));
        setDadosAnimal(prevState => ({
            ...prevState,
            nomeDoador: doadorSelecionado ? doadorSelecionado.nome : ''
        }));

        localStorage.setItem('dadosAnimal', JSON.stringify(novosDados));
    };

    const handleDoadorChange = (e) => {
        const doadorId = e.target.value;
        const doadorSelecionado = doadores.find(d => d.id === Number(doadorId));
        setDadosAnimal({
            ...dadosAnimal,
            doadorId,
            nomeDoador: doadorSelecionado ? doadorSelecionado.nome : ''
        });
    };

        const handleBlurEspecie = (e) => {
        const especie = e.target.value.trim().toLowerCase();

        if (especie === "cachorro" || especie === "gato") {
            setDadosAnimal({
                ...dadosAnimal,
                especie: especie.charAt(0).toUpperCase() + especie.slice(1)
            });
        } else if (especie !== "") {
            setCampoAlerta('especie');
            setAlertMensagem('Espécie invalida. Insira novamente.');
            setAlertAtencao(true);
            // especieRef.current.value = ""; // 🔥 Limpa o input na tela
            // especieRef.current.focus();    // 🔥 Foca no input
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setTentouEnviar(true);
        limparErro();

        if (!dadosAnimal.nome?.trim()) return;
        if (!dadosAnimal.especie?.trim()) return;
        if (!dadosAnimal.raca?.trim()) return;
        if (!dadosAnimal.pelagem?.trim()) return; 
        if (!dadosAnimal.sexo?.trim()) return;
        if (!dadosAnimal.sexo?.trim()) return;
        if (!dadosAnimal.doadorId || Number(dadosAnimal.doadorId) <= 0) return;
        
        setCarregandoSubmit(true);
        try {
            setTentouEnviar(false);
            setAlertErroApi(false);

            const novoAnimal = await criarAnimal(dadosAnimal);
            setDadosAnimal({
                nome: '',
                especie: '',
                raca: '',
                dataNascimento: '',
                pelagem: '',
                sexo: '',
                status: 1,
                disponibilidade: '',
                resgatado: false,
                doadorId: '',
                nomeDoador: ''
            });
            if (from === '/cadastrar-adocao') {
                navigate(from, {
                    state: {
                        novoAnimalid: novoAnimal.id,
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

    function handleCancelar() {
        if (from === '/cadastrar-adocao') {
            navigate(from, {
                state: {
                    // novoAdotanteid: novoAdotante.id,
                    veioDePaginaProtegida: true
                }
            });
        } else {
            navigate('/listar-animais');
        }
    }

    // Configurações do modal
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {
        setShowModal(false);
        navigate('/listar-animais');
    }
    const openModal = () => setShowModal(true);

    const fecharAlertaEFocarCampo = (campoRef, campo) => {
        setAlertAtencao(false);
        setDadosAnimal(prev => ({ ...prev, [campo]: '' }));  // limpa o valor no estado

        if (campoRef.current) {
            campoRef.current.value = '';   // limpa o input na tela
            campoRef.current.focus();      // foca no campo
        }
    };

    return (
        <div className="cadastro-container">
            <form className="cadastroAnimal-form" onSubmit={handleSubmit} >
                <div id="group2">
                    <div className="form-group">
                        <label htmlFor="codigo">Código</label>
                        <input type="text" id="codigo" disabled />
                    </div>
                    <div className="form-group">
                        <label htmlFor="disponibilidade">Disponibilidade *</label>
                        <select
                            id="disponibilidade"
                            name="disponibilidade"
                            value={dadosAnimal.disponibilidade}
                            onChange={handleChange}
                        >
                            <option value={0}>Adotado</option>
                            <option value={1}>Disponível</option>
                        </select>
                        {(tentouEnviar && !dadosAnimal.disponibilidade) && (
                            <span className="erro-required"> O campo 'Disponibilidade' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">

                        <label htmlFor="status">Status *</label>
                        <select
                            id="status"
                            name="status"
                            value={dadosAnimal.status}
                            onChange={handleChange}
                        >
                            <option value={1}>Ativo</option>
                            <option value={0}>Inativo</option>
                        </select>
                        {(tentouEnviar && !dadosAnimal.status) && (
                            <span className="erro-required"> O campo 'Status' é obrigatório </span>
                        )}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="nome">Nome *</label>
                    <input
                        type="text"
                        id="nome"
                        name='nome'
                        maxLength={50} //verificar tamanho maximo.
                        value={dadosAnimal.nome}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                            if (!validarNome(e.key) && e.key.length === 1) {
                                e.preventDefault();
                            }
                        }}
                        placeholder="Digite o nome"
                    />
                    {(tentouEnviar && !dadosAnimal.nome) && (
                        <span className="erro-required"> O campo 'Nome' é obrigatório </span>
                    )}
                </div>
                <div id="group2">
                    <div className="form-group">
                        <label htmlFor="especie">Espécie *</label>
                        <input
                            type="text"
                            id="especie"
                            name="especie"
                            maxLength={50} //verificar tamanho maximo.
                            value={dadosAnimal.especie}
                            ref={especieRef}
                            onBlur={handleBlurEspecie}
                            onChange={handleChange}
                            placeholder="Digite a espécie do animal"
                            onKeyDown={(e) => {
                                if (!validarNome(e.key) && e.key.length === 1) {
                                    e.preventDefault();
                                }
                            }}
                        />
                        {(tentouEnviar && !dadosAnimal.especie) && (
                            <span className="erro-required"> O campo 'Espécie' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="raca">Raça *</label>
                        <input
                            type="text"
                            id="raca"
                            maxLength={50} //verificar tamanho maximo.
                            value={dadosAnimal.raca}
                            onChange={handleChange}
                            placeholder="Digite a raça do animal"
                            onKeyDown={(e) => {
                                if (!validarNome(e.key) && e.key.length === 1) {
                                    e.preventDefault();
                                }
                            }}
                        />
                        {/* <input
                            type="text"
                            id="raca"
                            pattern="[A-Za-zÀ-ÿ\s]+"
                            value={dadosAnimal.raca}
                            onChange={handleChange}
                            placeholder="Digite a raça do animal"
                        /> */}
                        {(tentouEnviar && !dadosAnimal.raca) && (
                            <span className="erro-required"> O campo 'Raça' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="dataNascimento">Data de Nascimento</label>
                        <input
                            type="date"
                            id="dataNascimento"
                            value={dadosAnimal.dataNascimento}
                            onChange={handleChange}
                            placeholder="Digite a data de nascimento do animal"
                        />
                    </div>
                </div>
                <div id='group3'>
                    <div className="form-group">
                        <label htmlFor="pelagem">Pelagem *</label>
                        <input
                            type="text"
                            id="pelagem"
                            maxLength={50} //verificar tamanho maximo.
                            value={dadosAnimal.pelagem}
                            onChange={handleChange}
                            placeholder="cor e tipo"
                            onKeyDown={(e) => {
                                if (!validarNome(e.key) && e.key.length === 1) {
                                    e.preventDefault();
                                }
                            }}
                        />
                        {/* <input
                            type="text"
                            id="pelagem"
                            pattern="[A-Za-zÀ-ÿ\s]+"
                            value={dadosAnimal.pelagem}
                            onChange={handleChange}
                            placeholder="cor e tipo"
                        /> */}
                        {(tentouEnviar && !dadosAnimal.pelagem) && (
                            <span className="erro-required"> O campo 'Pelagem' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="sexo">Sexo *</label>
                        <select
                            id="sexo"
                            name='sexo'
                            value={dadosAnimal.sexo}
                            onChange={handleChange}
                        >
                            <option value="">Selecione</option>
                            <option value="M">Macho</option>
                            <option value="F">Fêmea</option>
                        </select>
                        {(tentouEnviar && !dadosAnimal.sexo) && (
                            <span className="erro-required"> O campo 'Sexo' é obrigatório </span>
                        )}
                    </div>
                </div>

                <label className="radio-label-animal">
                    <input
                        type="checkbox"
                        name="resgatado"
                        id="resgatado"
                        value={dadosAnimal.resgatado}
                        checked={dadosAnimal.resgatado === true}
                        onChange={e =>
                            setDadosAnimal({ ...dadosAnimal, resgatado: e.target.checked })
                        }
                    />
                    Resgatado
                </label>

                <div className='group-adocao'>
                    <div className="form-group">
                        <label htmlFor="doadorId">Código Doador *</label>
                        <input
                            type="number"
                            id="doadorId"
                            name="doadorId"
                            value={dadosAnimal.doadorId}
                            onChange={handleChange}
                        // onKeyDown={(e) => bloquearTeclas(e, dadosAnimal.doadorId)}
                        />
                        {(tentouEnviar && !dadosAnimal.doadorId) && (
                            <span className="erro-required"> O campo 'Código Doador' é obrigatório </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="nomeDoador">Nome do Doador *</label>
                        <div className="campo-com-botao">
                            <select
                                id="nomeDoador"
                                value={dadosAnimal.doadorId}
                                onChange={handleDoadorChange}
                            >
                                <option value="">Selecione um doador</option>
                                {doadores.map(doador => (
                                    <option key={doador.id} value={doador.id}>
                                        {doador.nome}
                                    </option>
                                ))}
                            </select>
                            <button onClick={handleCadastrarDoador} type='button' className='addCadastro' title="Cadastrar Doador/Tutor">+</button>
                            {/* <button onClick={handleCadastrarDoador} type='button' className='addCadastro'>+</button> */}
                        </div>
                    </div>

                </div>
                <div className="button-group-crud">
                    <BotaoSalvar showModal={showModal} openModal={handleSubmit} closeModal={closeModal} />
                    <BotaoCancelar onClick={handleCancelar} />
                    <BotaoLimpar />
                </div>
            </form>
            
            {alertAtencao && (
                <AlertAtencao
                    mensagem={alertMensagem}
                    onClose={() => {
                        const refs = {
                            dataNascimento: dataRef,
                            especie: especieRef
                        };
                        fecharAlertaEFocarCampo(refs[campoAlerta], campoAlerta);
                    }}
                />
            )}

            {carregandoSubmit && <CarregandoCat />}

            {/* {(alertErroApi && !tentouEnviar) && (
                <AlertAtencao
                    mensagem={Array.isArray(erro) ? erro[0] : erro}
                    onClose={() => setAlertAtencao(false)}
                />
            )} */}
        </div>
    );
}

export default CadastroAnimal;