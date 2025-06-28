import InputMask from 'react-input-mask';
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { validarData } from '/src/utils/ValidaData';

import { useError } from '../../../hooks/useError';
import { useAdocoes } from '../../../hooks/useAdocoes';
import { useVoluntarios } from '../../../hooks/useVoluntarios';
import { useAdotantes } from '../../../hooks/useAdotantes';
import { useAnimais } from '../../../hooks/useAnimais';
import { usePontosAdocao } from '../../../hooks/usePontosAdocao';
import { useEventos } from '../../../hooks/useEventos';

import AlertAtencao from "/src/components/AlertAtencao/AlertAtencao.jsx";
import CarregandoCat from '../../../components/Spinner/CarregandoCat';
import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoAlterar from "/src/components/BotaoAlterar/BotaoAlterar.jsx";
import BotaoSalvar from "/src/components/BotaoSalvar/BotaoSalvar.jsx";
import BotaoAnular from '../../../components/BotaoAnular/BotaoAnular';
import './VisualizarAdocao.css';

const VisualizarAdocao = () => {
    const { buscarAdocaoPorId, atualizarAdocao, cancelarAdocao } = useAdocoes();
    const { listarVoluntariosAtivos } = useVoluntarios();
    const { listarAdotantesAtivos } = useAdotantes();
    const { listarAnimais } = useAnimais();
    const { listarPontosAdocaoAtivos } = usePontosAdocao();
    const { listarEventosAtivos } = useEventos();

    const { erro, carregando, limparErro, tratarErro } = useError();

    const { id } = useParams();
    const navigate = useNavigate();

    const [adocao, setAdocao] = useState(null);
    const [voluntarios, setVoluntarios] = useState([]);
    const [adotantes, setAdotantes] = useState([]);
    const [animais, setAnimais] = useState([]);
    const [pontosAdocao, setPontosAdocao] = useState([]);
    const [formDados, setFormDados] = useState({});
    const [eventos, setEventos] = useState([]);

    const [editando, setEditando] = useState(false);
    const [tentouEnviar, setTentouEnviar] = useState(false);
    const [carregandoAnulacao, setCarregandoAnulacao] = useState(false);
    const [carregandoSubmit, setCarregandoSubmit] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [showModalAnulacao, setShowModalAnulacao] = useState(false);

    const [alertAtencao, setAlertAtencao] = useState(false);
    const [alertMensagem, setAlertMensagem] = useState('');
    const [campoAlerta, setCampoAlerta] = useState('');
    const dataRef = useRef(null);

    const adotanteSelecionado =
        formDados.adotanteId === adocao.adotanteId
            ? adocao
            : adotantes.find(a => a.id === formDados.adotanteId);

    useEffect(() => {
        buscarAdocaoPorId(id)
            .then((dados) => {
                const dadosFormatados = {
                    ...dados,
                    status: Number(dados.status),
                    data: dados.data || '',
                    adotanteId: Number(dados.adotanteId),
                    animalId: Number(dados.animalId),
                    doadorId: Number(dados.doadorId),
                    pontoAdocaoId: Number(dados.pontoAdocaoId),
                    cancelada: dados.cancelada ? true : false,
                };
                setAdocao(dadosFormatados);
                setFormDados(dadosFormatados);
            })
            .catch(console.error);

        listarVoluntariosAtivos()
            .then(setVoluntarios)
            .catch(console.error);
        listarAdotantesAtivos()
            .then(setAdotantes)
            .catch(console.error);
        listarAnimais()
            .then(setAnimais)
            .catch(console.error);
        listarPontosAdocaoAtivos()
            .then(setPontosAdocao)
            .catch(console.error);
        listarEventosAtivos()
            .then(setEventos)
            .catch(console.error);
    }, [id]);

    if (carregando) return <div>Carregando...</div>;
    if (erro) return <div className="erro">{erro}</div>;
    if (!adocao) return <div>Adocação não encontrada</div>; // apagar depois

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const numericFields = ['status', 'voluntarioId', 'adotanteId', 'animalId', 'doadorId', 'pontoAdocaoId'];
        const parsedValue = numericFields.includes(name) ? Number(value) : value;

        //valida Data
        if (name === 'data') {
            if (validarData(value)) {
                setCampoAlerta('data');
                setAlertMensagem('Data inválida! Insira novamente.');
                setAlertAtencao(true);
                return;
            }
        }

        if (name === "adotanteId") {
            if (value === '') {
                setFormDados({ ...formDados, [name]: '' });
                return;
            }
            const numero = parseInt(value, 10);
            if (isNaN(numero) || numero <= 0) {
                return;
            }
        }

        if (name === "animalId") {
            if (value === '') {
                setFormDados({ ...formDados, [name]: '' });
                return;
            }
            const numero = parseInt(value, 10);
            if (isNaN(numero) || numero <= 0) {
                return;
            }
        }

        if (name === "pontoAdocaoId") {
            if (value === '') {
                setFormDados({ ...formDados, [name]: '' });
                return;
            }
            const numero = parseInt(value, 10);
            if (isNaN(numero) || numero <= 0) {
                return;
            }
        }

        setFormDados({ ...formDados, [name]: parsedValue });
    };

    const handleVoluntarioChange = (e) => {
        const selecteVoluntarioId = Number(e.target.value);
        setFormDados({
            ...formDados,
            voluntarioId: selecteVoluntarioId
        });
    };

    const handleAdotanteChange = (e) => {
        const selectedAdotanteId = Number(e.target.value);
        setFormDados({
            ...formDados,
            adotanteId: selectedAdotanteId
        });
    };

    const handleAnimalChange = (e) => {
        const selectedAnimalId = Number(e.target.value);
        setFormDados({
            ...formDados,
            animalId: selectedAnimalId,
        });
    };

    const handlePontoAdocaoChange = (e) => {
        const selectedPontoAdocaoId = Number(e.target.value);
        setFormDados({
            ...formDados,
            pontoAdocaoId: selectedPontoAdocaoId
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTentouEnviar(true);
        limparErro();

        console.log('Dados do formulário:', formDados);

        if (!formDados.data?.trim()) return;
        if (!formDados.voluntarioId) return;
        if (!formDados.adotanteId) return;
        if (!formDados.animalId) return;
        if (!formDados.pontoAdocaoId) return

        setCarregandoSubmit(true);
        try {
            await atualizarAdocao(id, formDados);
            openModal();
            // setEditando(false);
            // setTentouEnviar(false);

        } catch (error) {
            tratarErro(error);
        } finally {
            setCarregandoSubmit(false);
        }
    };

    const handleConfirmarAnulacao = async (dadosAcompanhamento) => {
        setCarregandoAnulacao(true);
        limparErro();
        try {
            await cancelarAdocao(id, dadosAcompanhamento);
            setShowModalAnulacao(false);
            navigate('/listar-adocoes');
        } catch (error) {
            tratarErro(error);
        } finally {
            setCarregandoAnulacao(false);
        }
    };

    // CONFIGURAÇÕES DE MODAL
    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setShowModal(false);
        navigate('/listar-adocoes');
    }

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
            <form className="cadastroAdocao-form" onSubmit={handleSubmit}>
                <div id="group-adocao1">
                    <div className="form-group">
                        <label>Código</label>
                        <input
                            type="text"
                            id="codigo"
                            name="id"
                            value={adocao?.id || ''}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label>Data *</label>
                        <input
                            type="date"
                            id="data"
                            name="data"
                            value={formDados.data ? new Date(formDados.data).toISOString().split('T')[0] : ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                        />
                        {(tentouEnviar && !formDados.data) && (
                            <span className="erro-required"> O campo 'Data' é obrigatório</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Voluntária *</label>
                        <select
                            id="nomeVoluntario"
                            name="nomeVoluntario"
                            value={formDados.voluntarioId || ''}
                            onChange={handleVoluntarioChange}
                            disabled={!editando}
                        >
                            <option value={adocao.voluntarioId}>
                                {adocao.nomeVoluntario || 'Voluntário selecionado'}
                            </option>
                            {voluntarios
                                .filter(v => v.id !== adocao.voluntarioId)
                                .map(voluntario => (
                                    <option key={voluntario.id} value={voluntario.id}>
                                        {voluntario.nome}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>

                <div id="group-adocao2">
                    <div className="form-group">
                        <label htmlFor="codadotante">Código adotante *</label>
                        <input
                            type="number"
                            id="adotanteId"
                            name="adotanteId"
                            value={formDados.adotanteId || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nomeadotante">Nome adotante *</label>
                        {/* <select
                            id="nomeAdotante"
                            name="nomeAdotante"
                            value={formDados.adotanteId || ''}
                            onChange={handleAdotanteChange}
                            disabled={!editando}
                        >
                            {adotantes.map(adotante => (
                                <option key={adotante.id} value={adotante.id}>
                                    {adotante.nome}
                                </option>
                            ))}
                        </select> */}
                        <select
                            id="nomeAdotante"
                            name="nomeAdotante"
                            value={formDados.adotanteId || ''}
                            onChange={handleAdotanteChange}
                            disabled={!editando}
                        >
                            <option value={adocao.adotanteId}>
                                {adocao.nomeAdotante || 'Adotante selecionado'}
                            </option>
                            {adotantes
                                .filter(a => a.id !== adocao.adotanteId)
                                .map(adotante => (
                                    <option key={adotante.id} value={adotante.id}>
                                        {adotante.nome}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>

                <div id="group-adocao1">
                    <div className="form-group">
                        <label>RG</label>
                        <InputMask
                            mask="99.999.999-*"
                                value={adotanteSelecionado?.rgAdotante || adotanteSelecionado?.rg || ''}

                            onChange={handleInputChange}
                            disabled
                            placeholder="__.___.___-_">
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
                        <label>CPF</label>
                        <InputMask
                            mask="999.999.999-99"
                            value={adotanteSelecionado?.cpfAdotante || adotanteSelecionado?.cpf || ''}
                            onChange={handleInputChange}
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
                        <label>Celular</label>
                        <InputMask
                            mask="(99) 99999-9999"
                            value={adotanteSelecionado?.celularAdotante || adotanteSelecionado?.celular || ''}
                            onChange={handleInputChange}
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
                        <label htmlFor="animalId">Código animal *</label>
                        <input
                            type="number"
                            id="animalId"
                            name="animalId"
                            value={formDados.animalId || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nomeAnimal">Nome animal *</label>
                        <select
                            id="nomeAnimal"
                            name="nomeAnimal"
                            value={formDados.animalId || ''}
                            onChange={handleAnimalChange}
                            disabled={!editando}
                        >
                            <option value={adocao.animalId}>
                                {adocao.nomeAnimal || 'Animal selecionado'}
                            </option>
                            {animais
                                .filter(a => a.id !== adocao.animalId)
                                .map(animal => (
                                    <option key={animal.id} value={animal.id}>
                                        {animal.nome}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>

                <div id="group-adocao3">
                    <div className="form-group">
                        <label>Espécie</label>
                        <input
                            type="text"
                            id="especie"
                            name="especie"
                            value={
                                animais.find(a => a.id === formDados.animalId)?.especie || ''
                            }
                            onChange={handleInputChange}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label>Idade</label>
                        <input
                            type="text"
                            id="idade"
                            name="idade"
                            /* value={
                                animais.find(a => a.id === formDados.animalId)?.idade || ''
                            } */
                            value={
                                (() => {
                                    const dataNascimento = animais.find(a => a.id === formDados.animalId)?.dataNascimento;
                                    if (!dataNascimento) return '';
                                    const nascimento = new Date(dataNascimento);
                                    const hoje = new Date();
                                    let anos = hoje.getFullYear() - nascimento.getFullYear();
                                    let meses = hoje.getMonth() - nascimento.getMonth();
                                    let dias = hoje.getDate() - nascimento.getDate();

                                    if (dias < 0) {
                                        meses--;
                                    }
                                    if (meses < 0) {
                                        anos--;
                                        meses += 12;
                                    }
                                    if (isNaN(anos) || anos < 0) return '';

                                    if (anos === 0 && meses === 0) {
                                        return 'menos de 1 mês';
                                    }
                                    if (anos === 0) {
                                        return meses === 1 ? '1 mês' : `${meses} meses`;
                                    }
                                    if (meses === 0) {
                                        return anos === 1 ? '1 ano' : `${anos} anos`;
                                    }
                                    return `${anos} ${anos === 1 ? 'ano' : 'anos'} e ${meses} ${meses === 1 ? 'mês' : 'meses'}`;
                                })()
                            }
                            onChange={handleInputChange}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sexo">Sexo</label>
                        <select
                            id="sexo"
                            name="sexo"
                            value={
                                animais.find(a => a.id === formDados.animalId)?.sexo || ''
                            }
                            onChange={handleInputChange}
                            disabled
                        >
                            <option value="">Selecione</option>
                            <option value="F">Fêmea</option>
                            <option value="M">Macho</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label >Pelagem</label>
                        <input
                            type="text"
                            id="pelagem"
                            name="pelagem"
                            value={
                                animais.find(a => a.id === formDados.animalId)?.pelagem || ''
                            }
                            onChange={handleInputChange}
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
                            value={
                                animais.find(a => a.id === formDados.animalId)?.doadorId || ''
                            }
                            onChange={handleInputChange}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nomedoador">Nome doador</label>
                        <select
                            id="nomeDoador"
                            name="nomeDoador"
                            value={formDados.animalId || ''}
                            onChange={handleAnimalChange}
                            disabled
                        >
                            {animais.map(animal => (
                                <option key={animal.id} value={animal.id}>
                                    {animal.nomeDoador}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Telefone doador</label>
                        <InputMask
                            mask="(99) 99999-9999"
                            value={
                                animais.find(a => a.id === formDados.animalId)?.telefoneDoador || ''
                            }
                            onChange={handleInputChange}
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
                        <label htmlFor="codlocal">Código local *</label>
                        <input
                            type="number"
                            id="pontoAdocaoId"
                            name="pontoAdocaoId"
                            value={formDados.pontoAdocaoId || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nomelocaladocao">Nome local de adoção *</label>
                        <select
                            id="nomePontoAdocao"
                            name="nomePontoAdocao"
                            value={formDados.pontoAdocaoId || ''}
                            onChange={handlePontoAdocaoChange}
                            disabled={!editando}
                        >
                            <option value={adocao.pontoAdocaoId}>
                                {adocao.nomePontoAdocao || 'Ponto de adoção selecionado'}
                            </option>
                            {pontosAdocao
                                .filter(p => p.id !== adocao.pontoAdocaoId)
                                .map(ponto => (
                                    <option key={ponto.id} value={ponto.id}>
                                        {ponto.nomeFantasia}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>

{/*Alterar*/}   <div className="radio-group">
                    <label className="radio-label">
                        <input
                            id='cancelada'
                            type="checkbox"
                            name="cancelada"
                            value={formDados.cancelada}
                            checked={formDados.cancelada === true}
                            onChange={e =>
                                setFormDados({ ...formDados, cancelada: e.target.checked ? true : false })
                            }
                            disabled={!editando}
                        />
                        Adoção anulada
                    </label>
                </div>

                <div id="group3">
                    {/*  <div className="form-group">
                        <button
                            type="button"
                            id="button-anular"
                            className={`button-anular ${editando ? 'ativo' : 'desabilitado'}`}
                            disabled={!editando}
                            onClick={() => setShowModalAnulacao(true)}
                        >
                            <i className="fas fa-ban fa-lg"></i>

                            <span>Anular</span>
                        </button>
                    </div> */}
                    <BotaoAnular
                        disabled={!editando}
                        onConfirm={handleConfirmarAnulacao}
                        animalId={formDados.animalId}
                        eventos={eventos}
                        carregando={carregandoAnulacao}
                    />

                    <div className="button-group-crud">
                        {!editando ? (
                            <BotaoAlterar onClick={() => setEditando(true)}

                            //disabled={editando}
                        /* showModal={showModalAlterar} openModal={openModalAlterar} closeModal={closeModalAlterar}  */ />
                        ) : (
                            <BotaoSalvar showModal={showModal} openModal={handleSubmit} closeModal={closeModal} />
                        )}
                        <BotaoCancelar onClick={() => navigate('/listar-adocoes')} />
                    </div>
                </div>
            </form>

            {/* <ModalAnulacaoAdocao 
                show={showModalAnulacao}
                onClose={closeModalAnulacao}
                onConfirm={handleConfirmarAnulacao}
                animalId={formDados.animalId}
                eventos={eventos}
                carregando={carregandoAnulacao}
            /> */}
            {carregandoSubmit && <CarregandoCat />}

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

export default VisualizarAdocao;
