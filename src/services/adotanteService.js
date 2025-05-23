import api from '../apis/aapsApi';

export const  AdotanteService = {
  async criarAdotante(adotante) {
    const response = await api.post('/Adotante/CriarAdotante', adotante);
    return response.data.dados;
  },
  
  async listarAdotantes(filtro = {}) {
    const response = await api.get('/Adotante/ObterAdotantes', { params: filtro });
    return response.data.dados;
  },

  async listarAdotantesAtivos() {
    const response = await api.get('/Adotante/ObterAdotantesAtivos');
    return response.data.dados;
  },

  async buscarAdotantePorId (id){
    const response = await api.get(`/Adotante/ObterAdotantePorId/${id}`);
    return response.data.dados;
  },

  async atualizarAdotante(id, adotante) {
    const response = await api.put(`/Adotante/AtualizarAdotante/${id}`, adotante);
    return response.data.dados;
  },

  async excluirAdotante(id) {
    const response = await api.put(`/Adotante/ExcluirAdotante/${id}`);
    return response.data.dados;
  }
};