import api from '../apis/api';

export const AnimalService = {
  async listarAnimais() {
    const response = await api.get('/api/Animal/ObterAnimais');
    return response.data.dados;
  
  },

  async criarAnimal(animalDto) {
    const response = await api.post('/api/Animal/CriarAnimal', animalDto);
    return response.data.dados;
  },

  async atualizarAnimal(id, animalDto) {
    const response = await api.put(`/api/Animal/AtualizarAnimal/${id}`, animalDto);
    return response.data.dados;
  },

  async excluirAnimal(id) {
    const response = await api.delete(`/api/Animal/ExcluirAnimal/${id}`);
    return response.data.dados;
  }
};