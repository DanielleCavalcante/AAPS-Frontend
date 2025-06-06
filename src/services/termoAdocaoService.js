import api from '../apis/aapsApi';

export const TermoAdocaoService = {
  async enviarTermoAdocao(termoAdocao) {
    const response = await api.post('/TermoAdocao/EnviarTermoAdocao', termoAdocao);
    return response.data.dados;
  },

  async gerarTermoAdocao(id) {
    const response = await api.post(
      '/TermoAdocao/GerarPdf',
      id,
      { responseType: 'blob' }
    );
    return {
      data: response.data,
      headers: response.headers
    };
  },
};