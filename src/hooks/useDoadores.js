import { useState } from 'react';
import { DoadorService } from '../services/doadorService';

export const useDoadores = () => {
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const criarDoador = async (doador) => {
    try {
      setCarregando(true);
      return await DoadorService.criarDoador(doador);
    } catch (error) {
      setErro(error.response?.data?.mensagem || 'Erro ao criar doador');
      throw error;
    } finally {
      setCarregando(false);
    }
  };

  const listarDoadores = async (filtro = {}) => {
    try {
      setCarregando(true);
      return await DoadorService.listarDoadores(filtro);
    } catch (error) {
      setErro(error.response?.data?.mensagem || 'Erro ao carregar doadores');
      throw error;
    } finally {
      setCarregando(false);
    }
  };

  const listarDoadoresAtivos = async () => {
    try {
      setCarregando(true);
      return await DoadorService.listarDoadoresAtivos();
    } catch (error) {
      setErro(error.response?.data?.mensagem || 'Erro ao carregar doadores ativos');
      throw error;
    } finally {
      setCarregando(false);
    }
  }

  const buscarDoadorPorId = async (id) => {
    try {
      setCarregando(true);
      return await DoadorService.buscarDoadorPorId(id);
    } catch (error) {
      setErro(error.response?.data?.mensagem || 'Erro ao buscar doador');
      throw error;
    } finally {
      setCarregando(false);
    }
  };

  const atualizarDoador = async (id, doador) => {
    try {
      setCarregando(true);
      return await DoadorService.atualizarDoador(id, doador);
    } catch (error) {
      setErro(error.response?.data?.mensagem || 'Erro ao atualizar doador');
      throw error;
    } finally {
      setCarregando(false);
    }
  };

  const excluirDoador = async (id) => {
    try {
      setCarregando(true);
      await DoadorService.excluirDoador(id);
    } catch (error) {
      setErro(error.response?.data?.mensagem || 'Erro ao excluir doador');
      throw error;
    } finally {
      setCarregando(false);
    }
  };

  return { criarDoador, listarDoadores, listarDoadoresAtivos, buscarDoadorPorId, atualizarDoador, excluirDoador, carregando, erro };
};