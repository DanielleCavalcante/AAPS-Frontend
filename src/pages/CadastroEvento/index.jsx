import { useState } from 'react'
import './cadastroEvento.css';
import BotaoSalvar from "/src/components/BotaoSalvar";
import BotaoCancelar from "/src/components/BotaoCancelar";
import BotaoLimpar from "/src/components/BotaoLimpar";
import { useEventos } from '../../hooks/useEventos';

const CadastroEvento = () => {
    const { criarEvento, erro, carregando } = useEventos();
    const [dadosEvento, setdadosEvento] = useState({
        descricao: '',
        status: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        
        setdadosEvento({
            ...dadosEvento,
            [id]: id === 'status' && value !== '' ? Number(value) : value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await criarEvento(dadosEvento);
            setdadosEvento({
                descricao: '',
                status: '',
            });
        } catch (error) {
            alert("Erro ao cadastrar evento!");
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
                    <label htmlFor="codigo">Código</label>
                    <input type="text" id="imput-codigo" disabled />
                </div>

                <div className="form-group">
                    <label htmlFor="descricao">Evento</label>
                    <input 
                        type="text" 
                        id="descricao" 
                        name='descricao'
                        value={dadosEvento.descricao}
                        onChange={handleChange}
                        placeholder="Digite a descrição do evento" 
                        required 
                    />

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