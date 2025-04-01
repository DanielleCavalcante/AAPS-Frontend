import api from '../apis/api';

export const AnimalService = {
  async criarAnimal(animal) {
    try {
      const response = await api.post('/Animal/CriarAnimal', animal);
      return response.data.dados;
    } catch (error) {
      throw new Error('Erro ao criar animal: ' + error.message);
    }
  },

  async listarAnimais(filtro = {}) {
    try {
      const response = await api.get('/Animal/ObterAnimais', { params: filtro });
      return response.data.dados;
    } catch (error) {
      throw new Error('Erro ao listar animais: ' + error.message);
    }
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