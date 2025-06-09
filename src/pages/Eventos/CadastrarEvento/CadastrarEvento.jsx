import { useState } from 'react'
import { useEventos } from '../../../hooks/useEventos';
import { useError } from '../../../hooks/useError';
import { useNavigate } from 'react-router-dom';
import BotaoSalvar from "/src/components/BotaoSalvar/BotaoSalvar.jsx";
import BotaoCancelar from "/src/components/BotaoCancelar/BotaoCancelar.jsx";
import BotaoLimpar from "/src/components/BotaoLimpar/BotaoLimpar.jsx";
import './CadastrarEvento.css';

const CadastroEvento = () => {
    const navigate = useNavigate();
    const { criarEvento } = useEventos();    
    const [dadosEvento, setdadosEvento] = useState({ descricao: '', status: 1 });

    const { erro, tratarErro, limparErro } = useError();
    const [tentouEnviar, setTentouEnviar] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        limparErro();
        setdadosEvento({
            ...dadosEvento,
            [id]: id === 'status' && value !== '' ? Number(value) : value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setTentouEnviar(true); 
        limparErro();
        try {
            await criarEvento(dadosEvento);
            setdadosEvento({ descricao: '', status: '' });
            setTentouEnviar(false);
        } catch (error) {
            tratarErro(error);
        }
    };

    // Configurações do modal
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => setShowModal(false);

    const openModal = () => {
        const descricao = document.getElementById('descricao').value;
        const status = document.getElementById('status').value;

        // Verifica se todos os campos estão preenchidos
        if (descricao && status) {
            setShowModal(true);
        } else {
            return null;
        }
    };

    return (
        <div className="cadastro-evento">
            <form className="cadastroEvento-form" onSubmit={handleSubmit} >
                <div className="form-group">
                    <label htmlFor="id">Código</label>
                    <input type="text" id="codigo" disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="descricao">Descrição</label>
                    <input 
                        type="text" 
                        id="descricao" 
                        name='descricao'
                        value={dadosEvento.descricao}
                        onChange={handleChange}
                        placeholder="Digite a descrição do evento" 
                    />

                    {(tentouEnviar && !dadosEvento.descricao) && (
                        <span className="erro-required"> O campo 'Descrição' é obrigatório </span>
                    )}

                    <label htmlFor="status">Status</label>
                    <select
                        id="status" // arrumar na tela
                        name="status"
                        value={dadosEvento.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione</option>
                        <option value={1}>Ativo</option>
                        <option value={0}>Inativo</option>
                    </select>

                    {(tentouEnviar && !dadosEvento.status) && (
                        <span className="erro-required"> O campo 'Status' é obrigatório </span>
                    )}
                </div>
                <div className="button-group-crud">
                    <BotaoSalvar showModal={showModal} openModal={openModal} closeModal={closeModal} />
                    <BotaoCancelar onClick={() => navigate('/listar-eventos')}/>
                    <BotaoLimpar />
                </div>
            </form>
        </div>
    );
}

export default CadastroEvento;