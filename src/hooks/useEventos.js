import { useError } from './useError';
import { EventoService } from '../services/eventoService';

export const useEventos = () => {
  const { erro, tratarErro, limparErro } = useError();

  const criarEvento = async (evento) => {
    try {
      limparErro();
      return await EventoService.criarEvento(evento);
    } catch (error) {
        tratarErro(error);
        throw error;
    }
  };
  
  const listarEventos = async (filtro = {}) => {
    try {
      limparErro();
      return await EventoService.listarEventos(filtro);
    } catch (error) {
        tratarErro(error,);
        throw error;
    }
  };

  const buscarEventoPorId = async (id) => {
    try {
      limparErro();
      return await EventoService.buscarEventoPorId(id);
    } catch (error) {
        tratarErro(error);
        throw error;
    }
  };

  const atualizarEvento = async (id, evento) => {
    try {
      limparErro();
      return await EventoService.atualizarEvento(id, evento);
    } catch (error) {
        tratarErro(error);
        throw error;
    }
  };

  const excluirEvento = async (id) => {
    try {
      limparErro();
      await EventoService.excluirEvento(id);
    } catch (error) {
        tratarErro(error);
        throw error;
    }
  };

  return { criarEvento, listarEventos, buscarEventoPorId, atualizarEvento, excluirEvento, erro, limparErro };
};