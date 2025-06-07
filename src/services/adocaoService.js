import api from '../apis/aapsApi';

export const AdocaoService = {
    async criarAdocao(adocao) {
        const response = await api.post('/Adocao/CriarAdocao', adocao);
        return response.data.dados;
    },

    async listarAdocoes(filtro = {}) {
        const response = await api.get('/Adocao/ObterAdocoes', { params: filtro });
        return response.data.dados;
    },

    async buscarAdocaoPorId (id){
        const response = await api.get(`/Adocao/ObterAdocaoPorId/${id}`);
        return response.data.dados;
    },

    async atualizarAdocao(id, acompanhamentoDevolvido) {
        const response = await api.put(`/Adocao/AtualizarAdocao/${id}`, acompanhamentoDevolvido);
        return response.data.dados;
    },

    async cancelarAdocao(id, adocao) {
        const response = await api.put(`/Adocao/CancelarAdocao/${id}`, acompanhamentoDevolvido);
        return response.data.dados;
    },

    async excluirAdocao(id) {
        const response = await api.delete(`/Adocao/ExcluirAdocao/${id}`);
        return response.data.dados;
    }
}