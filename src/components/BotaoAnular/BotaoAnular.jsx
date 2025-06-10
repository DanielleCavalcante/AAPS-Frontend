import React, { useState } from 'react';
import ModalAnulacaoAdocao from '/src/components/ModalAnulacaoAdocao/ModalAnulacaoAdocao.jsx';
import './BotaoAnular.css';

const BotaoAnular = ({ disabled, onConfirm, animalId, eventos, carregando }) => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return (
        <div>
            <button
                type="button"
                className={`button-anular ${disabled ? 'desabilitado' : 'ativo'}`}
                disabled={disabled}
                onClick={openModal}
            >
                <i className="fas fa-ban fa-lg"></i>
                <span>Anular</span>
            </button>

            {showModal && (
                <ModalAnulacaoAdocao
                    show={showModal}
                    onClose={closeModal}
                    onConfirm={onConfirm}
                    animalId={animalId}
                    eventos={eventos}
                    carregando={carregando}
                />
            )}
        </div>
    );
};

export default BotaoAnular;