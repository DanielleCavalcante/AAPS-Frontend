import { useState } from 'react'
import { useEventos } from '../../../hooks/useEventos';
import { useError } from '../../../hooks/useError';
import { useNavigate } from 'react-router-dom';

import AlertAtencao from "/src/components/AlertAtencao/AlertAtencao.jsx";
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

    const [alertErroApi, setAlertErroApi] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        limparErro();

        setAlertErroApi(false);

        setdadosEvento({
            ...dadosEvento,
            [id]: id === 'status' && value !== '' ? Number(value) : value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setTentouEnviar(true); 
        limparErro();

        if(!dadosEvento.descricao.trim() || !dadosEvento.status) return;

        try {
            setTentouEnviar(false);
            setAlertErroApi(false);

            await criarEvento(dadosEvento);
            setdadosEvento({ descricao: '', status: '' });
            setTentouEnviar(false);
            openModal();
        } catch (error) {
            tratarErro(error);
            setAlertErroApi(true);
        }
    };

    // Configurações do modal
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setShowModal(false);
        navigate('/listar-eventos');
    }

    return (
        <div className="cadastro-evento">
            <form className="cadastroEvento-form" onSubmit={handleSubmit} >
                <div className="form-group">
                    <label htmlFor="id">Código</label>
                    <input type="text" id="codigo" disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="descricao">Descrição *</label>
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

                    <label htmlFor="status">Status *</label>
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
                    <BotaoSalvar showModal={showModal} openModal={handleSubmit} closeModal={closeModal} />
                    <BotaoCancelar onClick={() => navigate('/listar-eventos')}/>
                    <BotaoLimpar />
                </div>
            </form>

            {(alertErroApi && !tentouEnviar) && (
                <AlertAtencao
                    mensagem={Array.isArray(erro) ? erro[0] : erro}
                    onClose={() => setAlertAtencao(false)}
                />
            )}
        </div>
    );
}

export default CadastroEvento;