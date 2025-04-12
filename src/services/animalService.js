import api from '../apis/api';

export const AnimalService = {
  async criarAnimal(animal) {
    const response = await api.post('/Animal/CriarAnimal', animal);
    return response.data.dados;
  },

  async listarAnimais(filtro = {}) {
    const response = await api.get('/Animal/ObterAnimais', { params: filtro });
    return response.data.dados;
  },

  async buscarAnimalPorId (id){
    const response = await api.get(`/Animal/ObterAnimalPorId/${id}`);
    return response.data.dados;
  },

  async atualizarAnimal(id, animal) {
    const response = await api.put(`/Animal/AtualizarAnimal/${id}`, animal);
    return response.data.dados;
  },

  async excluirAnimal(id) {
    const response = await api.put(`/Animal/ExcluirAnimal/${id}`);
    return response.data.dados;
  }
};