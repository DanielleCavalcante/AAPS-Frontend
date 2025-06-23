import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { validarNome } from '../../../utils/ValidaNome';
import { validarData } from '../../../utils/ValidaData';
import AlertAtencao from "/src/components/AlertAtencao/AlertAtencao.jsx";
import { useAnimais } from '../../../hooks/useAnimais';
import { useDoadores } from '../../../hooks/useDoadores';
import { useError } from '../../../hooks/useError';

import iconeAcompanhamento from "/src/assets/icone_acompanhamento.png"
import BotaoAlterar from "/src/components/BotaoAlterar/BotaoAlterar.jsx";
import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoSalvar from "/src/components/BotaoSalvar/BotaoSalvar.jsx";
import './VisualizarAnimal.css';

const VisualizaAnimal = () => {
    const navigate = useNavigate();
    // const { buscarAnimalPorId, atualizarAnimal, carregando, erro, limparErro } = useAnimais();
    const { buscarAnimalPorId, atualizarAnimal, carregando, erro, tratarErro, limparErro } = useAnimais();
    const { listarDoadoresAtivos } = useDoadores();
    const { id } = useParams();
    const [animal, setAnimal] = useState(null);
    const [editando, setEditando] = useState(false);
    const [formDados, setFormDados] = useState({});
    const [tentouEnviar, setTentouEnviar] = useState(false);
    const [doadores, setDoadores] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [alertAtencao, setAlertAtencao] = useState(false);
    const [alertMensagem, setAlertMensagem] = useState('');
    const [campoAlerta, setCampoAlerta] = useState('');
    const dataRef = useRef(null);

    //Modais:
    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setEditando(false);
        setShowModal(false);
        navigate('/listar-animais');
    }

    useEffect(() => {
        buscarAnimalPorId(id)
            .then((dados) => {
                const dadosFormatados = {
                    ...dados,
                    status: Number(dados.status),
                    doadorId: Number(dados.doadorId),
                    disponibilidade: Number(dados.disponibilidade),
                    dataNascimento: dados.dataNascimento || null,
                    resgatado: dados.resgatado || false,
                };
                setAnimal(dadosFormatados);
                setFormDados(dadosFormatados);
            })
            .catch(console.error);

        listarDoadoresAtivos()
            .then(setDoadores)
            .catch(console.error);
    }, [id]);

    if (carregando) return <div>Carregando...</div>;
    if (erro) return <div className="erro">{erro}</div>;
    if (!animal) return <div>Animal não encontrado</div>; // apagar depois

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const numericFields = ['status', 'disponibilidade', 'doadorId'];
        const parsedValue = numericFields.includes(name) ? Number(value) : value;

        if (name === 'doadorId') {
            if (value === '') {
                setFormDados({ ...formDados, [name]: '' });
                return;
            }
            const numero = parseInt(value, 10);
            if (isNaN(numero) || numero <= 0) {
                return;
            }
        }

        //valida Data
        if (name === 'dataNascimento') {
            if (validarData(value)) {
                setCampoAlerta('dataNascimento');
                setAlertMensagem('Data de Nascimento inválida. Insira novamente.');
                setAlertAtencao(true);
                return;
            }
        }

        setFormDados({ ...formDados, [name]: parsedValue });
    };

    const handleDoadorChange = (e) => {
        const selectedDoadorId = Number(e.target.value);
        setFormDados({
            ...formDados,
            doadorId: selectedDoadorId
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); //evita o reload da página e mantém o modal aberto
        setTentouEnviar(true);
        limparErro();

        if (!formDados.nome?.trim()) {
            return;
        }
        if (!formDados.especie?.trim()) {
            return;
        }
        if (!formDados.raca?.trim()) {
            return;
        }
        if (!formDados.pelagem?.trim()) {
            return;
        }
        if (!formDados.sexo?.trim()) {
            return;
        }
        if (!formDados.sexo?.trim()) {
            return;
        }
        if (!formDados.doadorId || Number(formDados.doadorId) <= 0) {
            return;
        }

        try {
            await atualizarAnimal(id, formDados);
            openModal();
        } catch (error) {
            tratarErro(error);
        }
    };

    const irParaAcompanhamento = () => {
        navigate(`/acompanhamento/${animal.id}`);
    };

    const fecharAlertaEFocarCampo = (campoRef, campo) => {
        setAlertAtencao(false);
        setFormDados(prev => ({ ...prev, [campo]: '' }));  // limpa o valor no estado

        if (campoRef.current) {
            campoRef.current.value = '';   // limpa o input na tela
            campoRef.current.focus();      // foca no campo
        }
    };

    return (
        <div className="cadastro-container">
            <form className="cadastroAnimal-form" onSubmit={handleSubmit}>
                <div id="group2">
                    <div className="form-group">
                        <label htmlFor="codigo">Código</label>
                        <input type="text" id="id" value={animal?.id || ''} disabled />
                    </div>

                    <div className="form-group">
                        <label htmlFor="disponibilidade">Disponibilidade</label>
                        <select
                            id="disponibilidade"
                            name="disponibilidade"
                            value={formDados?.disponibilidade}
                            onChange={handleInputChange}
                            disabled={!editando}
                        >
                            <option value={1}>Disponível</option>
                            <option value={0}>Adotado</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={formDados?.status}
                            onChange={handleInputChange}
                            disabled={!editando}
                        >
                            <option value={1}>Ativo</option>
                            <option value={0}>Inativo</option>
                        </select>
                    </div>

                </div>
                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        id="nome"
                        name='nome'
                        maxLength={50} //verificar tamanho maximo.
                        placeholder="Digite o nome do animal"
                        value={formDados?.nome || ''}
                        onChange={handleInputChange}
                        disabled={!editando}
                        onKeyDown={(e) => {
                            if (!validarNome(e.key) && e.key.length === 1) {
                                e.preventDefault();
                            }
                        }}
                    />
                    {(tentouEnviar && !formDados.nome) && (
                        <span className="erro-required"> O campo 'Nome' é obrigatório </span>
                    )}
                </div>
                <div id="group2">
                    <div className="form-group">
                        <label htmlFor="especie">Espécie</label>
                        <input
                            type="text"
                            id="especie"
                            name="especie"
                            maxLength={50} //verificar tamanho maximo.
                            placeholder="Digite a espécie do animal"
                            value={formDados?.especie || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                            onKeyDown={(e) => {
                                if (!validarNome(e.key) && e.key.length === 1) {
                                    e.preventDefault();
                                }
                            }}
                        />
                        {(tentouEnviar && !formDados.especie) && (
                            <span className="erro-required"> O campo 'Espécie' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="raca">Raça</label>
                        <input
                            type="text"
                            id="raca"
                            name="raca"
                            maxLength={50} //verificar tamanho maximo.
                            placeholder="Digite a raça do animal"
                            value={formDados?.raca || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                            onKeyDown={(e) => {
                                if (!validarNome(e.key) && e.key.length === 1) {
                                    e.preventDefault();
                                }
                            }}
                        />
                        {(tentouEnviar && !formDados.raca) && (
                            <span className="erro-required"> O campo 'Raça' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="dataNascimento">Data de Nascimento</label>
                        <input
                            type="date"
                            id="dataNascimento"
                            name="dataNascimento"
                            value={formDados.dataNascimento ? new Date(formDados.dataNascimento).toISOString().split('T')[0] : ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                        />
                    </div>
                </div>
                <div id='group3'>
                    <div className="form-group">
                        <label htmlFor="pelagem">Pelagem</label>
                        <input
                            type="text"
                            id="pelagem"
                            name="pelagem"
                            maxLength={50} //verificar tamanho maximo.
                            placeholder="cor e tipo"
                            value={formDados?.pelagem || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                            onKeyDown={(e) => {
                                if (!validarNome(e.key) && e.key.length === 1) {
                                    e.preventDefault();
                                }
                            }}
                        />
                        {(tentouEnviar && !formDados.pelagem) && (
                            <span className="erro-required"> O campo 'Pelagem' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="sexo">Sexo</label>
                        <select
                            id="sexo"
                            name="sexo"
                            value={formDados?.sexo || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                        >
                            <option value="M">Macho</option>
                            <option value="F">Fêmea</option>
                        </select>
                        {(tentouEnviar && !formDados.sexo) && (
                            <span className="erro-required"> O campo 'Sexo' é obrigatório </span>
                        )}
                    </div>
                </div>

                <label className="radio-label-animal">
                    <input
                        type="checkbox"
                        name="resgatado"
                        id="resgatado"
                        value={formDados.resgatado}
                        checked={formDados.resgatado === true}
                        onChange={e =>
                            setFormDados({ ...formDados, resgatado: e.target.checked })
                        }
                        disabled={!editando}
                    />
                    Resgatado
                </label>

                <div className='group-adocao'>
                    <div className="form-group">
                        <label htmlFor="doadorId">Código Doador</label>
                        <input
                            type="number"
                            id="doadorId"
                            name="doadorId"
                            value={formDados?.doadorId ?? ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                        />
                        {(tentouEnviar && !formDados.doadorId) && (
                            <span className="erro-required"> O campo 'Código do Doador' é obrigatório </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="nomeDoador">Nome do Doador</label>
                        <select
                            id="nomeDoador"
                            value={formDados?.doadorId ?? ''}
                            onChange={handleDoadorChange}
                            disabled={!editando}
                        >
                            <option value="">Selecione um doador</option>
                            {doadores.map(doador => (
                                <option key={doador.id} value={doador.id}>
                                    {doador.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div id="group3">
                    <div className="form-group">
                        <button
                            type="button"
                            id="button-acompanhamento"
                            className={`button-acompanhamento ${editando ? 'ativo' : 'desabilitado'}`}
                            disabled={!editando}
                            onClick={irParaAcompanhamento}
                        >
                            <img src={iconeAcompanhamento} alt="Ícone acompanhamento" className="icon" />
                            <span>Acompanhamento</span>
                        </button>
                    </div>

                    <div className="button-group-crud">

                        {!editando ? (
                            <BotaoAlterar onClick={() => setEditando(true)} /> //disabled={editando}
                        ) : (
                            <BotaoSalvar showModal={showModal} openModal={handleSubmit} closeModal={closeModal} />
                        )}
                        <BotaoCancelar onClick={() => navigate('/listar-animais')}/>
                    </div>
                </div>
            </form >
            {alertAtencao && (
                <AlertAtencao
                    mensagem={alertMensagem}
                    onClose={() => {
                        const refs = {
                            dataNascimento: dataRef
                        };
                        fecharAlertaEFocarCampo(refs[campoAlerta], campoAlerta);
                    }}
                />
            )}
        </div >
    );
}

export default VisualizaAnimal;