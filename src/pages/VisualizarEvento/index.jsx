import { useState } from 'react';
import './visualizaEvento.css';

import BotaoCancelar from "/src/components/BotaoCancelar";
import BotaoAlterar from "/src/components/BotaoAlterar";
import BotaoExcluir from "/src/components/BotaoExcluir";

const VisualizaEvento = () => {
    const [codigo, setCodigo] = useState('');
    const [evento, setEvento] = useState('');
    const [isEditable, setIsEditable] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModalExcluir, setShowModalExcluir] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const closeModal = () => setShowModal(false);
    const openModal = () => {
        if (codigo && evento) {
            setShowModal(true);
        }
    };

    const closeModalExcluir = () => setShowModalExcluir(false);
    const openModalExcluir = () => {
        setShowConfirmModal(false);
        setShowModalExcluir(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setCodigo(''); // Limpa o campo código
        setEvento(''); // Limpa o campo evento
    };

    return (
        <div className="cadastro-evento">
            <form className="cadastroEvento-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="codigo">Código</label>
                    <input
                        type="text"
                        id="imput-codigo"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        disabled
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="evento">Evento</label>
                    <input
                        type="text"
                        id="imput-evento"
                        value={evento} // Corrigido de nome para evento
                        onChange={(e) => setEvento(e.target.value)} // Corrigido de setNome para setEvento
                        placeholder="Digite o evento"
                        required
                    />
                </div>

                <div className="button-group-crud">
                    <BotaoCancelar disabled={!isEditable} />
                    <BotaoAlterar
                        showModal={showModal}
                        openModal={openModal}
                        closeModal={closeModal}
                    />
                    <BotaoExcluir
                        showModal={showModalExcluir}
                        showConfirmModal={showConfirmModal}
                        openModal={openModalExcluir}
                        closeModal={closeModalExcluir}
                    />
                </div>
            </form>
        </div>
    );
};

export default VisualizaEvento;
