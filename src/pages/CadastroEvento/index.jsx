import {useState} from 'react'
import './cadastroEvento.css';

import BotaoSalvar from "/src/components/BotaoSalvar";
import BotaoCancelar from "/src/components/BotaoCancelar";
import BotaoAlterar from "/src/components/BotaoAlterar";
import BotaoLimpar from "/src/components/BotaoLimpar";
import BotaoExcluir from "/src/components/BotaoExcluir";

const CadastroEvento = () => {

    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);
    const openModal = () => {
        const tipo = document.getElementById('codigo').value;
        const nome = document.getElementById('nome').value;

        // Verifica se todos os campos estão preenchidos
        if (codigo && nome) {
            setShowModal(true);
        } else {
            return null;
        }
    };


    function handleSubmit(event) {
        event.preventDefault();
        event.currentTarget.elements.codigo.value = '';
        event.currentTarget.elements.nome.value = '';
    }

    return (
        <div className="cadastro-evento">
            <form className="cadastroEvento-form" onSubmit={handleSubmit} >
                <div className="form-group">
                    <label htmlFor="codigo">Código</label>
                    <input type="text" id="imput-codigo" disabled />
                </div>

                <div className="form-group">
                    <label htmlFor="evento">Evento</label>
                    <input type="text" id="imput-evento" placeholder="Digite o evento" required />
                </div>

                <div className="button-group-crud">
                    <BotaoSalvar showModal={showModal} openModal={openModal} closeModal={closeModal} />
                    <BotaoCancelar />
                    <BotaoAlterar disabled={true} />
                    <BotaoLimpar />
                    <BotaoExcluir disabled={true} />
                </div>
            </form>
        </div>
    );
}

export default CadastroEvento;