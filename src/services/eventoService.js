import api from '../apis/api';

export const EventoService = {
  async criarEvento(evento) {
    try {
      const response = await api.post('/Evento/CriarEvento', evento);
      return response.data.dados;
    } catch (error) {
      throw new Error('Erro ao criar evento: ' + error.message);
    }
  },

  async listarEventos(filtro = {}) {
    try {
      const response = await api.get('/Evento/ObterEventos', { params: filtro });
      return response.data.dados;
    } catch (error) {
      throw new Error('Erro ao listar eventos: ' + error.message);
    }
  },

  async buscarEventoPorId (id){
    const response = await api.get(`/Evento/ObterEventoPorId/${id}`);
    return response.data.dados;
  },

  async atualizarEvento(id, evento) {
    const response = await api.put(`/Evento/AtualizarEvento/${id}`, evento);
    return response.data.dados;
  },

  async excluirEvento(id) {
    const response = await api.put(`/Evento/ExcluirEvento/${id}`);
    return response.data.dados;
  }
};