import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useEventos } from '../../hooks/useEventos';
import './visualizaEvento.css';

import BotaoCancelar from "/src/components/BotaoCancelar";
import BotaoAlterar from "/src/components/BotaoAlterar";
import BotaoExcluir from "/src/components/BotaoExcluir";

const VisualizaEvento = () => {
    const { buscarEventoPorId, atualizarEvento, carregando, erro } = useEventos();
    const { id } = useParams();
    const [evento, setEvento] = useState(null);
    const [editando, setEditando] = useState(false);
    const [formDados, setFormDados] = useState({});

    useEffect(() => {
        buscarEventoPorId(id)
            .then((dados) => {
            const dadosFormatados = {
                ...dados,
                status: Number(dados.status)
            };
            setEvento(dadosFormatados);
            setFormDados(dadosFormatados);
            })
            .catch(console.error);
    }, [id]);

    if (carregando) return <div>Carregando...</div>;
    if (erro) return <div className="erro">{erro}</div>;
    if (!evento) return <div>Evento não encontrado</div>; // apagar depois

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const numericFields = 'status';
        const parsedValue = numericFields.includes(name) ? Number(value) : value;
        setFormDados({ ...formDados, [name]: parsedValue });
    };

    const salvarAlteracoes = async () => {
        try {
            await atualizarEvento(id, formDados);
            setEditando(false);
        } catch (error) {
            console.error("Erro ao salvar:", error);
        }
    };

    // const [showModal, setShowModal] = useState(false);
    // const [showModalExcluir, setShowModalExcluir] = useState(false);
    // const [showConfirmModal, setShowConfirmModal] = useState(false);

    // const closeModal = () => setShowModal(false);
    // const openModal = () => {
    //     if (codigo && evento) {
    //         setShowModal(true);
    //     }
    // };

    // const closeModalExcluir = () => setShowModalExcluir(false);
    // const openModalExcluir = () => {
    //     setShowConfirmModal(false);
    //     setShowModalExcluir(true);
    // };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     setCodigo(''); // Limpa o campo código
    //     setEvento(''); // Limpa o campo evento
    // };

    return (
        <div className="cadastro-evento">
            <form className="cadastroEvento-form" onSubmit={salvarAlteracoes} /* handleSubmit depois*/> 
                <div className="form-group">
                    <label htmlFor="codigo">Código</label>
                    <input type="text" id="id" value={evento?.id || '' } disabled
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="descricao">Evento</label>
                    <input
                        type="text"
                        id="descricao"
                        name="descricao"
                        value={formDados?.descricao || ''}
                        onChange={handleInputChange}
                        placeholder="Digite a descrição do evento"
                        required
                        disabled={!editando}
                    />
                    
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

                <div className="button-group-crud">
                    <button 
                        type="button" 
                        className="botao-alterar" 
                        onClick={() => salvarAlteracoes()}
                        disabled={!editando}
                    >
                        Salvar
                    </button>
                    <BotaoAlterar onClick={() => setEditando(true)} 
                        /* showModal={showModal}
                        openModal={openModal}
                        closeModal={closeModal} */
                    />
                    <BotaoCancelar /*  disabled={!isEditable} */ />
                    <BotaoExcluir
                        /* showModal={showModalExcluir}
                        showConfirmModal={showConfirmModal}
                        openModal={openModalExcluir}
                        closeModal={closeModalExcluir} */
                    />
                </div>
            </form>
        </div>
    );
};

export default VisualizaEvento;
