import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useError } from '../../../hooks/useError';
import { useAdocoes } from '../../../hooks/useAdocoes';
import { useVoluntarios } from '../../../hooks/useVoluntarios';
import { useAdotantes } from '../../../hooks/useAdotantes';
import { useAnimais } from '../../../hooks/useAnimais';
import { usePontosAdocao } from '../../../hooks/usePontosAdocao';

import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoAlterar from "/src/components/BotaoAlterar/BotaoAlterar.jsx";
import BotaoSalvar from "/src/components/BotaoSalvar/BotaoSalvar.jsx";
import './VisualizarAdocao.css';


const VisualizarAdocao = () => {
    const { buscarAdocaoPorId, atualizarAdocao } = useAdocoes();
    const { listarVoluntariosAtivos } = useVoluntarios();
    const { listarAdotantesAtivos } = useAdotantes();
    const { listarAnimaisAtivos } = useAnimais();
    const { listarPontosAdocaoAtivos } = usePontosAdocao();
    const { erro, carregando, limparErro } = useError();

    const { id } = useParams();
    const navigate = useNavigate();

    const [adocao, setAdocao] = useState(null);
    const [voluntarios, setVoluntarios] = useState([]);
    const [adotantes, setAdotantes] = useState([]);
    const [animais, setAnimais] = useState([]);
    const [pontosAdocao, setPontosAdocao] = useState([]);
    const [formDados, setFormDados] = useState({});

    const [editando, setEditando] = useState(false);
    const [tentouEnviar, setTentouEnviar] = useState(false);

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
        listarAnimaisAtivos()
            .then(setAnimais)
            .catch(console.error);
        listarPontosAdocaoAtivos()
            .then(setPontosAdocao)
            .catch(console.error);
    }, [id]);

    if (carregando) return <div>Carregando...</div>;
    if (erro) return <div className="erro">{erro}</div>;
    if (!adocao) return <div>Adocação não encontrada</div>; // apagar depois

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const numericFields = ['status', 'voluntarioId', 'adotanteId', 'animalId', 'doadorId', 'pontoAdocaoId'];
        const parsedValue = numericFields.includes(name) ? Number(value) : value;

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

        if (!formDados.data?.trim()) return;
        if (!formDados.voluntarioId) return;
        if (!formDados.nomeAdotante?.trim()) return;
        if (!formDados.rg?.trim()) return;
        if (!formDados.cpf?.trim()) return;
        if (!formDados.telefoneAdotante?.trim()) return;
        if (!formDados.nomeAnimal?.trim()) return;
        if (!formDados.especie?.trim()) return;
        if (!formDados.idade?.trim()) return;
        if (!formDados.sexo?.trim()) return;
        if (!formDados.pelagem?.trim()) return;
        if (!formDados.nomeDoador?.trim()) return;
        if (!formDados.telefoneDoador?.trim()) return;
        if (!formDados.nomePontoAdocao?.trim()) return;

        try {
            await atualizarAdocao(id, formDados);
            openModal();
        } catch (error) {
            tratarErro(error);
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
                            value={adocao?.id || '' } 
                            disabled={!editando}
                        />
                    </div>
                    <div className="form-group">
                        <label>Data</label>
                        <input
                            type="date"
                            id="data"
                            name="data"
                            value={formDados.data ? new Date(formDados.data).toISOString().split('T')[0] : ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                        />
                    </div>
                    <div className="form-group">
                        <label>Voluntária</label>
                        <select
                            id="nomeVoluntario"
                            name="nomeVoluntario"
                            value={formDados.voluntarioId || ''}
                            onChange={handleVoluntarioChange}
                            disabled={!editando}
                        >
                            <option value=""></option>
                            {voluntarios.map(voluntario => (
                                <option key={voluntario.id} value={voluntario.id}>
                                    {voluntario.nome}
                                </option>
                            ))}
                        </select>
                        {(tentouEnviar && !formDados.nomeVoluntario) && (
                            <span className="erro-required"> O campo 'Voluntário' é obrigatório </span>
                        )}
                    </div>
                </div>

                <div id="group-adocao2">
                    <div className="form-group">
                        <label htmlFor="codadotante">Código Adotante</label>
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
                        <label htmlFor="nomeadotante">Nome adotante</label>
                        <select
                            id="nomeAdotante"
                            name="nomeAdotante"
                            value={formDados.adotanteId || ''}
                            onChange={handleAdotanteChange}
                            disabled={!editando}
                        >
                            <option value=""></option>
                            {adotantes.map(adotante => (
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
                        <input
                            type="text"
                            id="rg"
                            name="rg"
                            value={
                                adotantes.find(a => a.id === formDados.adotanteId)?.rg || ''
                            }
                            onChange={handleInputChange}
                            disabled={!editando}
                        />
                    </div>
                    <div className="form-group">
                        <label>CPF</label>
                        <input
                            type="text"
                            id="cpf"
                            name="cpf"
                            value={
                                adotantes.find(a => a.id === formDados.adotanteId)?.cpf || ''
                            }
                            onChange={handleInputChange}
                            disabled={!editando}
                        />
                    </div>
                    <div className="form-group">
                        <label>Celular</label>
                        <input
                            id="telefoneAdotante"
                            name="telefoneAdotante"
                            type="text"
                            value={
                                adotantes.find(a => a.id === formDados.adotanteId)?.celular || ''
                            }
                            onChange={handleInputChange}
                            disabled={!editando} 
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
                            value={formDados.animalId || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nomeanimal">Nome animal</label>
                        <select
                            id="nomeAnimal"
                            name="nomeAnimal"
                            value={formDados.animalId || ''}
                            onChange={handleAnimalChange}
                            disabled={!editando}
                        >
                            <option value=""></option>
                            {animais.map(animal => (
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
                            disabled={!editando}
                        />
                    </div>
                    <div className="form-group">
                        <label>Idade</label>
                        <input
                            type="text"
                            id="idade"
                            name="idade"
                            value={
                                animais.find(a => a.id === formDados.animalId)?.idade || ''
                            }
                            onChange={handleInputChange}
                            disabled={!editando}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sexo">Sexo</label>
                        <select
                            id="sexo"
                            name="sexo"
                            value={formDados.sexo || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                        >
                            <option value="">Selecione</option>
                            <option value="M">Macho</option>
                            <option value="F">Fêmea</option>
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
                            disabled={!editando}
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
                            value={formDados.doadorId || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nomedoador">Nome doador</label>
                        <select 
                            id="nomedoador" 
                            name="nomedoador" 
                            onChange={handleAnimalChange}
                            disabled={!editando}
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
                        <label>Telefone doador</label>
                        <input 
                            id="telefoneDoador"
                            name="telefoneDoador" 
                            type="text" 
                            value={formDados.telefoneDoador || ''}
                            onChange={handleInputChange}
                            disabled={!editando} 
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
                            value={formDados.pontoAdocaoId || ''}
                            onChange={handleInputChange}
                            disabled={!editando}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nomelocaladocao">Nome local de adoção</label>
                        <select 
                            id="nomePontoAdocao" 
                            name="nomePontoAdocao" 
                            onChange={handlePontoAdocaoChange}
                            disabled={!editando}
                        >
                            {pontosAdocao.map(ponto => (
                                <option key={ponto.pontoAdocaoId} value={ponto.pontoAdocaoId}>
                                    {ponto.nomeFantasia}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div id="group3">
                    <div className="form-group">
                        <button
                            type="button"
                            id="button-anular"
                            className={`button-anular ${editando ? 'ativo' : 'desabilitado'}`}
                            disabled={!editando}
                        //onClick={irParaAcompanhamento}
                        >
                            <i className="fas fa-ban fa-lg"></i>

                            <span>Anular</span>
                        </button>
                    </div>

                    <div className="button-group-crud">
                        {!editando ? (
                            <BotaoAlterar onClick={() => setEditando(true)}

                            //disabled={editando}
                        /* showModal={showModalAlterar} openModal={openModalAlterar} closeModal={closeModalAlterar}  */ />
                        ) : (
                            <button
                                type="submit"
                                className="botao-alterar"
                            > <BotaoSalvar />
                            </button>
                            //<BotaoSalvar onClick={salvarAlteracoes}/*  showModal={showModal} openModal={openModal} closeModal={closeModal} */ />
                        )}
                        <BotaoCancelar />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default VisualizarAdocao;
