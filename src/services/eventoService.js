import api from '../apis/aapsApi';

export const EventoService = {
  async criarEvento(evento) {
    const response = await api.post('/Evento/CriarEvento', evento);
    return response.data.dados;
  },

  async listarEventos(filtro = {}) {
    const response = await api.get('/Evento/ObterEventos', { params: filtro });
    return response.data.dados;
  },

  async buscarEventoPorId(id) {
    const response = await api.get(`/Evento/ObterEventoPorId/${id}`);
    return response.data.dados;
  },

  async atualizarEvento(id, evento) {
    const response = await api.put(`/Evento/AtualizarEvento/${id}`, evento);
    return response.data.dados;
  },

  async excluirEvento(id) {
<<<<<<< HEAD
    const response = await api.put(`/Evento/ExcluirEvento/${id}`);
=======
    const response = await api.delete(`/Evento/ExcluirEvento/${id}`);
>>>>>>> 4c8121d70a0682d3480368506f449e6b4a81ae70
    return response.data.dados;
  }
};