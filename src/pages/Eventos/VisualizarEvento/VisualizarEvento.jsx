import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEventos } from '../../../hooks/useEventos';
import { useError } from '../../../hooks/useError';

import AlertAtencao from "/src/components/AlertAtencao/AlertAtencao.jsx";
import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoAlterar from "/src/components/BotaoAlterar/BotaoAlterar.jsx";
import BotaoSalvar from "/src/components/BotaoSalvar/BotaoSalvar.jsx";
import CarregandoCat from '../../../components/Spinner/CarregandoCat';
import './VisualizarEvento.css';

const VisualizaEvento = () => {
    const navigate = useNavigate();
    const { buscarEventoPorId, atualizarEvento} = useEventos();
    const { erro, tratarErro, limparErro } = useError();

    const { id } = useParams();
    const [evento, setEvento] = useState(null);
    const [editando, setEditando] = useState(false);
    const [formDados, setFormDados] = useState({});

    const [tentouEnviar, setTentouEnviar] = useState(false);
    const [carregandoSubmit, setCarregandoSubmit] = useState(false);

    const [alertErroApi, setAlertErroApi] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    
    const closeModal = () => {
        setShowModal(false);
        setEditando(false);
        setTentouEnviar(false);
        navigate('/listar-eventos');
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

    if (!evento) return <div>Evento não encontrado</div>; // apagar depois

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const numericFields = 'status';
        const parsedValue = numericFields.includes(name) ? Number(value) : value;

        setAlertErroApi(false);

        setFormDados({ ...formDados, [name]: parsedValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTentouEnviar(true); 
        limparErro();

        if (!formDados.descricao?.trim()) return; 

        setCarregandoSubmit(true);
        try {
            setTentouEnviar(false);
            setAlertErroApi(false);

            await atualizarEvento(id, formDados);
            openModal();
            // setEditando(false);
            // setTentouEnviar(false);
        } catch (error) {
            tratarErro(error);
            setAlertErroApi(true);
        } finally {
            setCarregandoSubmit(false);
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
                    <label htmlFor="descricao">Descrição *</label>
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

                    <label htmlFor="status">Status *</label>
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
                        <BotaoSalvar showModal={showModal} openModal={handleSubmit} closeModal={closeModal} />
                    )}
                    <BotaoCancelar onClick={() => navigate('/listar-eventos')} />
                </div>
            </form>

            {carregandoSubmit && <CarregandoCat />}

            {(alertErroApi && !tentouEnviar) && (
                <AlertAtencao
                    mensagem={Array.isArray(erro) ? erro[0] : erro}
                    onClose={() => setAlertErroApi(false)}
                />
            )}
        </div>
    );
};

export default VisualizaEvento;