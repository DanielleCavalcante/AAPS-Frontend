import React, { useState, useEffect } from 'react';
import { useAdocoes } from '../../hooks/useAdocoes';

import './ModalAnulacaoAdocao.css';

const ModalAnulacaoAdocao = ({
    show,
    onClose,
    onConfirm,
    animalId,
    eventos,
    carregando
}) => {
    const { cancelarAdocao } = useAdocoes();
    const [dataAcompanhamento, setDataAcompanhamento] = useState('');
    const [eventoId, setEventoId] = useState('');
    const [observacao, setObservacao] = useState('');
    const [erro, setErro] = useState('');

    
    const [tentouEnviar, setTentouEnviar] = useState(false);

    useEffect(() => {
    if (show) {
        const hoje = new Date();
        const dataFormatada = hoje.toISOString().split('T')[0];
        setDataAcompanhamento(dataFormatada);
        setEventoId('1');
        setObservacao('');
        setErro('');
    }
    }, [show]);

    const handleSubmit = () => {
        setTentouEnviar(true);
        if (!dataAcompanhamento || !eventoId) return;

        onConfirm({
            dataAcompanhamento,
            eventoId: Number(eventoId),
            observacao,
            animalId
        });
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Anulação de Adoção</h2>
                </div>

                <div className="modal-body">
                    <div className="row">
                        <div className="form-group half">
                            <label>Data do Acompanhamento *</label>
                            <input
                            type="date"
                            value={dataAcompanhamento}
                            onChange={(e) => setDataAcompanhamento(e.target.value)}
                            />

                            {tentouEnviar && !dataAcompanhamento && <div className="erro-modal">A data é obrigatória</div>}
                        </div>

                        <div className="form-group half">
                            <label>Descrição do Procedimento *</label>
                            <select
                                value={eventoId}
                                onChange={(e) => setEventoId(e.target.value)}
                            >
                                {eventos.map((evento) => (
                                    <option key={evento.id} value={evento.id}>
                                    {evento.descricao}
                                    </option>
                                ))}
                            </select>
                            {tentouEnviar && !eventoId && <div className="erro-modal">Selecione um procedimento</div>}
                        </div>
                    </div>

                    <div className="form-group full">
                    <label>Motivo da Anulação</label>
                    <textarea
                        value={observacao}
                        onChange={(e) => setObservacao(e.target.value)}
                        placeholder="Digite observações adicionais"
                        rows="5"
                    />
                    </div>

                    {erro && <div className="erro-modal">{erro}</div>}

                    <div className="modal-buttons">
                        <button
                            className="btn-cancelar"
                            onClick={onClose}
                            disabled={carregando}
                        >
                            Cancelar
                        </button>
                        <button
                            className="btn-anular"
                            onClick={handleSubmit}
                            disabled={carregando}
                        >
                            {carregando ? 'Processando...' : 'Anular Adoção'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalAnulacaoAdocao;