import { useError } from './useError';
import { AnimalService } from '../services/animalService';

export const useAnimais = () => {
  const { erro, tratarErro, limparErro } = useError();

  const criarAnimal = async (animal) => {
    try {
      limparErro();
      return await AnimalService.criarAnimal(animal);
    } catch (error) {
        tratarErro(error);
        throw error;
    } 
  };

  const listarAnimais = async (filtro = {}) => {
    try {
      limparErro();
      return await AnimalService.listarAnimais(filtro);
    } catch (error) {
        tratarErro(error);
        throw error;
    } 
  };

  const listarAnimaisAtivos = async () => {
    try {
      limparErro();
      return await AnimalService.listarAnimaisAtivos();
    } catch (error) {
        tratarErro(error);
        throw error;
    } 
  }

  const buscarAnimalPorId = async (id) => {
    try {
      limparErro();
      return await AnimalService.buscarAnimalPorId(id);
    } catch (error) {
        tratarErro(error);
        throw error;
    } 
  };

  const atualizarAnimal = async (id, animal) => {
    try {
      limparErro();
      return await AnimalService.atualizarAnimal(id, animal);
    } catch (error) {
        tratarErro(error);
        throw error;
    } 
  };

  const excluirAnimal = async (id) => {
    try {
      limparErro();
      await AnimalService.excluirAnimal(id);
    } catch (error) {
        tratarErro(error);
        throw error;
    } 
  };

  return { 
    criarAnimal, 
    listarAnimais, 
    listarAnimaisAtivos,
    buscarAnimalPorId, 
    atualizarAnimal, 
    excluirAnimal, 
    erro, 
    limparErro 
  };
};