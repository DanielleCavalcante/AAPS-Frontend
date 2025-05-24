import { useError } from './useError';
import viaCepApi from '../apis/viaCepApi';

export const useBuscarCep = () => {
  const { erro, tratarErro, limparErro } = useError();

  const buscarCep = async (cep) => {
    try {
      limparErro();
      const response = await viaCepApi.get(`${cep}/json/`);

      console.log('Resposta da API:', response.data);
      return response.data;
    } catch (error) {
      tratarErro(error);
      throw error;
    }
  };

  return {
    buscarCep,
    erro,
    limparErro
  };
};