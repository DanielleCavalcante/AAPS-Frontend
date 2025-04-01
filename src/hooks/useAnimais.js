import { useState } from 'react';
import { AnimalService } from '../services/animalService';

export const useAnimais = () => {
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  /**
   * @param {Omit<Animal, 'id'>} animalDto
   * @returns {Promise<Animal>}
   */
  const criarAnimal = async (animal) => {
    try {
      setCarregando(true);
      return await AnimalService.criarAnimal(animal);
    } catch (error) {
      setErro(error.response?.data?.mensagem || 'Erro ao criar animal');
      throw error;
    } finally {
      setCarregando(false);
    }
  };

  /**
   * @param {FiltroAnimal} [filtro]
   * @returns {Promise<Animal[]>}
   */
  const listarAnimais = async (filtro = {}) => {
    try {
      setCarregando(true);
      return await AnimalService.listarAnimais(filtro);
    } catch (error) {
      setErro(error.response?.data?.mensagem || 'Erro ao carregar animais');
      throw error;
    } finally {
      setCarregando(false);
    }
  };

  /**
   * @param {number} id
   * @returns {Promise<Animal>}
   */
  const buscarAnimalPorId = async (id) => {
    try {
      setCarregando(true);
      return await AnimalService.buscarAnimalPorId(id);
    } catch (error) {
      setErro(error.response?.data?.mensagem || 'Erro ao buscar animal');
      throw error;
    } finally {
      setCarregando(false);
    }
  };

  /**
   * @param {number} id
   * @param {Partial<Animal>} animal
   * @returns {Promise<Animal>}
   */
  const atualizarAnimal = async (id, animal) => {
    try {
      setCarregando(true);
      return await AnimalService.atualizarAnimal(id, animal);
    } catch (error) {
      setErro(error.response?.data?.mensagem || 'Erro ao atualizar animal');
      throw error;
    } finally {
      setCarregando(false);
    }
  };

  /**
   * @param {number} id
   * @returns {Promise<void>}
   */
  const excluirAnimal = async (id) => {
    try {
      setCarregando(true);
      await AnimalService.excluirAnimal(id);
    } catch (error) {
      setErro(error.response?.data?.mensagem || 'Erro ao excluir animal');
      throw error;
    } finally {
      setCarregando(false);
    }
  };

  return { listarAnimais, criarAnimal, atualizarAnimal, excluirAnimal, buscarAnimalPorId, carregando, erro };
};