import api from '../apis/aapsApi';

export const DoadorService = {
  async criarDoador(doador) {
    const response = await api.post('/Doador/CriarDoador', doador);
    return response.data.dados;
  },

  async listarDoadores(filtro = {}) {
    const response = await api.get('/Doador/ObterDoadores', { params: filtro });
    return response.data.dados;
  },

  async listarDoadoresAtivos() {
    const response = await api.get('/Doador/ObterDoadoresAtivos');
    return response.data.dados;
  },

  async buscarDoadorPorId (id){
    const response = await api.get(`/Doador/ObterDoadorPorId/${id}`);
    return response.data.dados;
  },

  async atualizarDoador(id, doador) {
    const response = await api.put(`/Doador/AtualizarDoador/${id}`, doador);
    return response.data.dados;
  },

  async excluirDoador(id) {
    const response = await api.put(`/Doador/ExcluirDoador/${id}`);
    return response.data.dados;
  }
};