import { useState } from 'react';
import { EventoService } from '../services/eventoService';

export const useEventos = () => {
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const criarEvento = async (evento) => {
    try {
      setCarregando(true);
      return await EventoService.criarEvento(evento);
    } catch (error) {
      setErro(error.response?.data?.mensagem || 'Erro ao criar evento');
      throw error;
    } finally {
      setCarregando(false);
    }
  };

  const listarEventos = async (filtro = {}) => {
    try {
      setCarregando(true);
      return await EventoService.listarEventos(filtro);
    } catch (error) {
      setErro(error.response?.data?.mensagem || 'Erro ao carregar eventos');
      throw error;
    } finally {
      setCarregando(false);
    }
  };

  const buscarEventoPorId = async (id) => {
    try {
      setCarregando(true);
      return await EventoService.buscarEventoPorId(id);
    } catch (error) {
      setErro(error.response?.data?.mensagem || 'Erro ao buscar evento');
      throw error;
    } finally {
      setCarregando(false);
    }
  };

  const atualizarEvento = async (id, evento) => {
    try {
      setCarregando(true);
      return await EventoService.atualizarEvento(id, evento);
    } catch (error) {
      setErro(error.response?.data?.mensagem || 'Erro ao atualizar evento');
      throw error;
    } finally {
      setCarregando(false);
    }
  };

  const excluirEvento = async (id) => {
    try {
      setCarregando(true);
      await EventoService.excluirEvento(id);
    } catch (error) {
      setErro(error.response?.data?.mensagem || 'Erro ao excluir evento');
      throw error;
    } finally {
      setCarregando(false);
    }
  };

  return { criarEvento, listarEventos, buscarEventoPorId, atualizarEvento, excluirEvento, carregando, erro };
};