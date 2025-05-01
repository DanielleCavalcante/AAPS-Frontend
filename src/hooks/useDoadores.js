import { useError } from './useError';
import { DoadorService } from '../services/doadorService';

export const useDoadores = () => {
  const { erro, tratarErro, limparErro } = useError();

  const criarDoador = async (doador) => {
    try {
      limparErro();
      return await DoadorService.criarDoador(doador);
    } catch (error) {
        tratarErro(error);
        throw error;
    } 
  };

  const listarDoadores = async (filtro = {}) => {
    try {
      limparErro();
      return await DoadorService.listarDoadores(filtro);
    } catch (error) {
        tratarErro(error);
        throw error;
    }
  };

  const listarDoadoresAtivos = async () => {
    try {
      limparErro();
      return await DoadorService.listarDoadoresAtivos();
    } catch (error) {
        tratarErro(error);
        throw error;
    } 
  };

  const buscarDoadorPorId = async (id) => {
    try {
      limparErro();
      return await DoadorService.buscarDoadorPorId(id);
    } catch (error) {
        tratarErro(error,);
        throw error;
    } 
  };

  const atualizarDoador = async (id, doador) => {
    try {
      limparErro();
      return await DoadorService.atualizarDoador(id, doador);
    } catch (error) {
        tratarErro(error);
        throw error;
    }
  };

  const excluirDoador = async (id) => {
    try {
      limparErro();
      await DoadorService.excluirDoador(id);
    } catch (error) {
        tratarErro(error);
        throw error;
    }
  };

  return { 
    criarDoador, 
    listarDoadores, 
    listarDoadoresAtivos, 
    buscarDoadorPorId, 
    atualizarDoador, 
    excluirDoador, 
    erro, 
    limparErro 
  };
};