import { useState } from 'react';
import { AnimalService } from '../services/animalService';

export const useAnimal = () => {
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const listarAnimais = async () => {
    try {
      setCarregando(true);
      return await AnimalService.listarAnimais();
    } catch (error) {
      setErro(error.response?.data?.mensagem || 'Erro ao carregar animais');
      throw error;
    } finally {
      setCarregando(false);
    }
  };

  const criarAnimal = async (animalDto) => {
    try {
      setCarregando(true);
      return await AnimalService.criarAnimal(animalDto);
    } catch (error) {
      setErro(error.response?.data?.mensagem || 'Erro ao criar animal');
      throw error;
    } finally {
      setCarregando(false);
    }
  };

  const atualizarAnimal = async (id, animalDto) => {
    try {
      setCarregando(true);
      return await AnimalService.atualizarAnimal(id, animalDto);
    } catch (error) {
      setErro(error.response?.data?.mensagem || 'Erro ao atualizar animal');
      throw error;
    } finally {
      setCarregando(false);
    }
  };

  const excluirAnimal = async (id) => {
    try {
      setCarregando(true);
      return await AnimalService.excluirAnimal(id);
    } catch (error) {
      setErro(error.response?.data?.mensagem || 'Erro ao excluir animal');
      throw error;
    } finally {
      setCarregando(false);
    }
  };

  return {
    listarAnimais,
    criarAnimal,
    atualizarAnimal,
    excluirAnimal,
    carregando,
    erro
  };
};