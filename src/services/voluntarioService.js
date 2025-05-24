import api from '../apis/aapsApi';

export const VoluntarioService = {
    async criarVoluntario(voluntario) {
      const response = await api.post('/Voluntario/CriarVoluntario', voluntario);
      return response.data.dados;
    },
  
    async listarVoluntarios(filtro = {}) {
      const response = await api.get('/Voluntario/ObterVoluntarios', { params: filtro });
      return response.data.dados;
    },

    async listarVoluntariosAtivos() {
        const response = await api.get('/Voluntario/ObterVoluntariosAtivos');
        return response.data.dados;
      },
  
    async buscarVoluntarioPorId(id) {
      const response = await api.get(`/Voluntario/ObterVoluntarioPorId/${id}`);
      return response.data.dados;
    },
  
    async atualizarVoluntario(id, voluntario) {
      const response = await api.put(`/Voluntario/AtualizarVoluntario/${id}`, voluntario);
      return response.data.dados;
    },
  
    async excluirVoluntario(id) {
      const response = await api.put(`/Voluntario/ExcluirVoluntario/${id}`);
      return response.data.dados;
    },

    async resetarSenha(resetarSenha) {
      const response = await api.post('/Voluntario/ResetarSenha', resetarSenha);
      return response.data.dados;
    },

    async buscarPerfilPorId(id) {
      const response = await api.get(`/Perfil/ObterPerfilPorId/${id}`);
      return response.data.dados;
    },

    async alterarSenha(id, alterarSenha) {
      const response = await api.put(`/Perfil/AlterarSenha/${id}`, alterarSenha);
      return response.data.dados;
    }
};