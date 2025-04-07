import {useState} from 'react'
import './cadastroEvento.css';

import BotaoSalvar from "/src/components/BotaoSalvar";
import BotaoCancelar from "/src/components/BotaoCancelar";
import BotaoLimpar from "/src/components/BotaoLimpar";

const CadastroEvento = () => {
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => setShowModal(false);

    const openModal = () => {
        const evento = document.getElementById('evento').value;

        // Verifica se todos os campos estão preenchidos
        if (evento) {
            setShowModal(true);
        } else {
            return null;
        }
    };

    function handleSubmit(event) {
        event.preventDefault();
        event.currentTarget.elements.codigo.value = '';
        event.currentTarget.elements.evento.value = '';
    }

    return (
        <div className="cadastro-evento">
            <form className="cadastroEvento-form" onSubmit={handleSubmit} >
                <div className="form-group">
                    <label htmlFor="codigo">Código</label>
                    <input type="text" id="codigo" disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="evento">Evento</label>
                    <input type="text" id="evento" placeholder="Digite o evento" required />
                </div>
                <div className="button-group-crud">
                    <BotaoSalvar showModal={showModal} openModal={openModal} closeModal={closeModal} />
                    <BotaoCancelar />
                    <BotaoLimpar />
                </div>
            </form>
        </div>
    );
}

export default CadastroEvento;