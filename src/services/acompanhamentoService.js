import api from '../apis/aapsApi';

export const AcompanhamentoService = {
    async criarAcompanhamento(acompanhamento) {
        const response = await api.post('/Acompanhamento/CriarAcompanhamento', acompanhamento);
        return response.data.dados;
    },
    async listarAcompanhamentos(filtro = {}) {
        const response = await api.get('/Acompanhamento/ObterAcompanhamentos');
        return response.data.dados;
    },
    async buscarAcompanhamentoPorId(id) {
        const response = await api.get(`/Acompanhamento/ObterAcompanhamentoPorId/${id}`);
        return response.data.dados;
    },
    async buscarAcompanhamentosPorAnimalId(id) {
        const response = await api.get(`/Acompanhamento/ObterAcompanhamentosPorAnimalId/${id}`);
        return response.data.dados;
    },
    async excluirAcompanhamento(id) {
        const response = await api.delete(`/Acompanhamento/ExcluirAcompanhamento/${id}`);
        return response.data.dados;
    }
}