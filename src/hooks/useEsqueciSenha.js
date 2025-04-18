import { useError } from './useError';
import { EsqueciSenhaService } from '../services/esqueciSenhaService';

export const useEsqueciSenha = () => {
  const { erro, tratarErro, limparErro } = useError();

  const solicitarResetSenha = async (resetSenha) => {
    try {
      limparErro();
      return await EsqueciSenhaService.solicitarResetSenha(resetSenha);
    } catch (error) {
      tratarErro(error);
      throw error;
    }
  };

  return { solicitarResetSenha, erro, limparErro };
}