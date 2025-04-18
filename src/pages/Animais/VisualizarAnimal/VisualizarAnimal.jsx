import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAnimais } from '../../../hooks/useAnimais';
import { useDoadores } from '../../../hooks/useDoadores';

import BotaoAlterar from "/src/components/BotaoAlterar/BotaoAlterar";
import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoExcluir from "/src/components/BotaoExcluir/BotaoExcluir.jsx";

import foto from '../../../assets/aaps_logo1.png';
import './VisualizarAnimal.css';

const VisualizaAnimal = () => {
    const { buscarAnimalPorId, atualizarAnimal, carregando, erro } = useAnimais();
    const { listarDoadoresAtivos } = useDoadores();
    const { id } = useParams();
    const [animal, setAnimal] = useState(null);
    const [editando, setEditando] = useState(false);
    const [formDados, setFormDados] = useState({});
    const [doadores, setDoadores] = useState([]); 

    useEffect(() => {
        buscarAnimalPorId(id)
            .then((dados) => {
            const dadosFormatados = {
                ...dados,
                status: Number(dados.status),
                doadorId: Number(dados.doadorId),
                disponibilidade: Number(dados.disponibilidade),
                dataNascimento: dados.dataNascimento || ''
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
        setFormDados({ ...formDados, [name]: parsedValue });
    };

    const handleDoadorChange = (e) => {
        const selectedDoadorId = Number(e.target.value);
        setFormDados({
            ...formDados,
            doadorId: selectedDoadorId
        });
    };

    const handleSubmit = async () => {
        try {
            await atualizarAnimal(id, formDados);
            setEditando(false);
        } catch (error) {
            console.error("Erro ao salvar:", error);
        }
    };
    
    // configurações de modals
    // const [showModalAlterar, setShowModalAlterar] = useState(false); //Alteração
    // const [showModalExcluir, setShowModalExcluir] = useState(false); //Exclusão
    // const [showConfirmModal, setShowConfirmModal] = useState(false); //Confirmar
    // const [foto, setFoto] = useState(null);

    // const closeModalAlterar = () => setShowModalAlterar(false);

    // const openModalAlterar = () => {
    //     const statusAdocao = document.getElementById('statusAdocao').value;
    //     const nome = document.getElementById('nome').value;
    //     const especie = document.getElementById('especie').value;
    //     const raca = document.getElementById('raca').value;
    //     const dataNascimento = document.getElementById('dataNascimento').value;
    //     const pelagem = document.getElementById('pelagem').value;
    //     const sexo = document.getElementById('sexo').value;
    //     const doador = document.getElementById('doador').value;

    //     // Verifica se todos os campos estão preenchidos
    //     if (statusAdocao && nome && especie && raca && dataNascimento && pelagem && sexo && doador) {
    //         setShowModalAlterar(true);
    //     } else {
    //         return null;
    //     }
    // };

    // const closeModalExcluir = () => setShowModalExcluir(false);

    // const closeConfirmModal = () => {
    //     setShowConfirmModal(false);
    // }

    // const openModalExcluir = () => {
    //     setShowConfirmModal(false);
    //     setShowModalExcluir(true);
    // };

    // const openConfirmModal = () => {
    //     setShowConfirmModal(true);
    // };

    return (
        <div className="visualizar-container">
            <form className="cadastroAnimal-form" onSubmit={handleSubmit} >
                <div id="group2">
                    <div className="form-group">
                        <label htmlFor="codigo">Código</label>
                        <input type="text" id="id" value={animal?.id || ''} disabled />
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
                    </div>
                    <div className="foto-upload">
                        <div className="foto-preview-container">
                            <span className="foto-label">Foto</span>
                            {foto && <img src={foto} alt="Foto do doador" className="foto" />}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input 
                        type="text"
                        id="nome"
                        name="nome"
                        placeholder="Digite o nome do animal"
                        value={formDados?.nome || ''}
                        onChange={handleInputChange}
                        required
                        disabled={!editando}
                    />
                </div>
                <div id="group2">
                    <div className="form-group">
                        <label htmlFor="especie">Espécie</label>
                        <input 
                            type="text"
                            id="especie"
                            name="especie"
                            placeholder="Digite a espécie do animal"
                            value={formDados?.especie || ''}
                            onChange={handleInputChange}
                            required
                            disabled={!editando}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="raca">Raça</label>
                        <input 
                            type="text"
                            id="raca"
                            name="raca"
                            placeholder="Digite a raça do animal"
                            value={formDados?.raca || ''}
                            onChange={handleInputChange}
                            required
                            disabled={!editando}
                        />
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
                            placeholder="cor e tipo"
                            value={formDados?.pelagem || ''}
                            onChange={handleInputChange}
                            required
                            disabled={!editando}
                        />
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
                    </div>
                </div>
                <div id='group3'>
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
                        <button type="button" className="acompanhamento">
                            <img src="/src/assets/icone_acompanhamento.png" alt="Ícone acompanhamento" className="icon" />
                            Acompanhamento
                        </button>
                    </div>
                    <div className="button-group-crud">

                    {!editando ? (
                        <BotaoAlterar onClick={() => setEditando(true)} //disabled={editando}
                        /* showModal={showModalAlterar} openModal={openModalAlterar} closeModal={closeModalAlterar}  *//>
                    ) : (
                        <button 
                            type="button" 
                            className="botao-alterar" 
                            onClick={() => handleSubmit()}
                        >
                            Salvar
                        </button>
                        //<BotaoSalvar onClick={salvarAlteracoes}/*  showModal={showModal} openModal={openModal} closeModal={closeModal} */ />
                    )}
                        <BotaoCancelar />
                        <BotaoExcluir /* showModal={showModalExcluir} showConfirmModal={showConfirmModal}
                            openModal={openConfirmModal} closeModal2={closeConfirmModal} closeModal={openModalExcluir}
                            closeModalExcluir={closeModalExcluir}  *//>
                    </div>
                </div>
            </form >
        </div >
    );
}

export default VisualizaAnimal;