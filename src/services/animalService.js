import api from '../apis/aapsApi';

export const AnimalService = {
  async criarAnimal(animal) {
    const response = await api.post('/Animal/CriarAnimal', animal);
    return response.data.dados;
  },

  async listarAnimais(filtro = {}) {
    const response = await api.get('/Animal/ObterAnimais', { params: filtro });
    return response.data.dados;
  },

<<<<<<< HEAD
=======
  async listarAnimaisAtivos() {
    const response = await api.get('/Animal/ObterAnimaisAtivos');
    return response.data.dados;
  },

>>>>>>> 4c8121d70a0682d3480368506f449e6b4a81ae70
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