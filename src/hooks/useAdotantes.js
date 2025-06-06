import { useError } from './useError';
import { AdotanteService } from '../services/adotanteService'; 

export const useAdotantes = () => {
    const { erro, tratarErro, limparErro } = useError();

    const criarAdotante = async (adotante) => {
        try {
          limparErro();
          return await AdotanteService.criarAdotante(adotante);
        } catch (error) {
            tratarErro(error);
            throw error;
        } 
      };
    
    const listarAdotantes = async (filtro = {}) => {
        try {
            limparErro();
            return await AdotanteService.listarAdotantes(filtro);
        } catch (error) {
            tratarErro(error);
            throw error;
        }
    };

    const listarAdotantesAtivos = async () => {
        try {
          limparErro();
          return await AdotanteService.listarAdotantesAtivos();
        } catch (error) {
            tratarErro(error);
            throw error;
        } 
    }
    
    const buscarAdotantePorId = async (id) => {
        try {
            limparErro();
            return await AdotanteService.buscarAdotantePorId(id);
        } catch (error) {
            tratarErro(error,);
            throw error;
        } 
    };

    const atualizarAdotante = async (id, adotante) => {
        try {
            limparErro();
            return await AdotanteService.atualizarAdotante(id, adotante);
        } catch (error) {
            tratarErro(error);
            throw error;
        }
    };

    const excluirAdotante = async (id) => {
        try {
        limparErro();
        await AdotanteService.excluirAdotante(id);
        } catch (error) {
            tratarErro(error);
            throw error;
        }
    };

    return {
        criarAdotante,
        listarAdotantes,
        listarAdotantesAtivos,
        buscarAdotantePorId,
        atualizarAdotante,
        excluirAdotante,
        erro,
        limparErro,
        tratarErro
    }
};