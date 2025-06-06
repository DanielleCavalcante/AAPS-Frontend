import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useEventos } from '../../../hooks/useEventos';

import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoAlterar from "/src/components/BotaoAlterar/BotaoAlterar.jsx";
import BotaoSalvar from "/src/components/BotaoSalvar/BotaoSalvar.jsx";
import './VisualizarEvento.css';

const VisualizaEvento = () => {
    const { buscarEventoPorId, atualizarEvento, erro, tratarErro, limparErro } = useEventos();

    const { id } = useParams();
    const [evento, setEvento] = useState(null);
    const [editando, setEditando] = useState(false);
    const [formDados, setFormDados] = useState({});

    const [tentouEnviar, setTentouEnviar] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    
    const closeModal = () => {
        setShowModal(false);
        setEditando(false);
        setTentouEnviar(false);
    }

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

    if (erro) return <div className="erro">{erro}</div>;
    if (!evento) return <div>Evento não encontrado</div>; // apagar depois

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const numericFields = 'status';
        const parsedValue = numericFields.includes(name) ? Number(value) : value;
        setFormDados({ ...formDados, [name]: parsedValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTentouEnviar(true); 
        limparErro();

        if (!formDados.descricao?.trim()) {
            return; 
        }

        try {
            await atualizarEvento(id, formDados);
            openModal();
            // setEditando(false);
            // setTentouEnviar(false);
        } catch (error) {
            tratarErro(error);
        }
    };

    return (
        <div className="cadastro-evento">
            <form className="cadastroEvento-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="codigo">Código</label>
                    <input 
                        type="text" 
                        id="id" 
                        value={evento?.id || '' } 
                        disabled
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="descricao">Descrição</label>
                    <input
                        type="text"
                        id="descricao"
                        name="descricao"
                        value={formDados?.descricao || ''}
                        onChange={handleInputChange}
                        placeholder="Digite a descrição do evento"
                        disabled={!editando}
                    />
                    
                    {(tentouEnviar && !formDados.descricao) && (
                        <span className="erro-required"> O campo 'Descrição' é obrigatório </span>
                    )}

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
                    {!editando ? (
                        <BotaoAlterar onClick={() => setEditando(true)} //disabled={editando}
                        /* showModal={showModalAlterar} openModal={openModalAlterar} closeModal={closeModalAlterar}  *//>
                    ) : (
                        <BotaoSalvar showModal={showModal} openModal={openModal} closeModal={closeModal} />
                    )}
                    <BotaoCancelar /*  disabled={!isEditable} */ />
                </div>
            </form>
        </div>
    );
};

export default VisualizaEvento;