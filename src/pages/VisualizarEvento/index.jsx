import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useEventos } from '../../hooks/useEventos';
import { useError } from '../../hooks/useError';

import BotaoCancelar from "/src/components/BotaoCancelar";
import BotaoAlterar from "/src/components/BotaoAlterar";
import BotaoExcluir from "/src/components/BotaoExcluir";
import './visualizaEvento.css';

const VisualizaEvento = () => {
    const { buscarEventoPorId, atualizarEvento } = useEventos();

    const { id } = useParams();
    const [evento, setEvento] = useState(null);
    const [editando, setEditando] = useState(false);
    const [formDados, setFormDados] = useState({});

    const { erro, tratarErro, limparErro } = useError();
    const [tentouEnviar, setTentouEnviar] = useState(false);

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

    const handleSubmit = async () => {
        setTentouEnviar(true); 
        limparErro();

        if (!formDados.descricao?.trim()) {
            return; 
        }

        try {
            await atualizarEvento(id, formDados);
            setEditando(false);
            setTentouEnviar(false);
        } catch (error) {
            tratarErro(error);
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
            <form className="cadastroEvento-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="codigo">Código</label>
                    <input type="text" id="id" value={evento?.id || '' } disabled
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
                        <button 
                            type="button" 
                            className="botao-alterar" 
                            onClick={() => handleSubmit()}
                        >
                            Salvar
                        </button>
                        //<BotaoSalvar onClick={salvarAlteracoes}/*  showModal={showModal} openModal={openModal} closeModal={closeModal} */ />
                    )}
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