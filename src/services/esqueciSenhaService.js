import api from '../apis/aapsApi';

export const EsqueciSenhaService = {
  async solicitarResetSenha(resetSenha) {
    const response = await api.post('/Autenticacao/SolicitarResetSenha', resetSenha);
    return response.data.dados;
  },

  /* async enviarCodigoCelular(celular) {
    const response = await api.post('/Usuario/EnviarCodigoCelular', { celular });
    return response.data.dados;
  },

  async redefinirSenha(codigo, novaSenha) {
    const response = await api.post('/Usuario/RedefinirSenha', { codigo, novaSenha });
    return response.data.dados;
  } */
};