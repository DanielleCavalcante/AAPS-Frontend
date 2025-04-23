import api from '../apis/aapsApi';

export const  PontoAdocaoService = {
    async criarPontoAdocao(pontoAdocao) {
        const response = await api.post('/PontoAdocao/CriarPontoAdocao', pontoAdocao);
        return response.data.dados;
      },
    
      async listarPontosAdocao(filtro = {}) {
        const response = await api.get('/PontoAdocao/ObterPontosAdocao', { params: filtro });
        return response.data.dados;
      },
    
      async listarPontosAdocaoAtivos() {
        const response = await api.get('/PontoAdocao/ObterPontosAdocaoAtivos');
        return response.data.dados;
      },
    
      async buscarPontoAdocaoPorId (id){
        const response = await api.get(`/PontoAdocao/ObterPontoAdocaoPorId/${id}`);
        return response.data.dados;
      },
    
      async atualizarPontoAdocao(id, pontoAdocao) {
        const response = await api.put(`/PontoAdocao/AtualizarPontoAdocao/${id}`, pontoAdocao);
        return response.data.dados;
      },
    
      async excluirPontoAdocao(id) {
        const response = await api.put(`/PontoAdocao/ExcluirPontoAdocao/${id}`);
        return response.data.dados;
      }
};