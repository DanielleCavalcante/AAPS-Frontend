import api from '../apis/api';

export const DoadorService = {
  async criarDoador(doador) {
    try {
      const response = await api.post('/Doador/CriarDoador', doador);
      return response.data.dados;
    } catch (error) {
      throw new Error('Erro ao criar doador: ' + error.message);
    }
  },

  async listarDoadores(filtro = {}) {
    try {
      const response = await api.get('/Doador/ObterDoadores', { params: filtro });
      return response.data.dados;
    } catch (error) {
      throw new Error('Erro ao listar doadores: ' + error.message);
    }
  },

  async listarDoadoresAtivos() {
    try {
      const response = await api.get('/Doador/ObterDoadoresAtivos');
      return response.data.dados;
    } catch (error) {
      throw new Error('Erro ao listar doadores: ' + error.message);
    }
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