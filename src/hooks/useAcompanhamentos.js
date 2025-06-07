import { useError } from './useError';

import { AcompanhamentoService } from '../services/acompanhamentoService';

export const useAcompanhamentos = () => {
    const { erro, tratarErro, limparErro } = useError();

    const criarAcompanhamento = async (acompanhamento) => {
        try {
            limparErro();
            return await AcompanhamentoService.criarAcompanhamento(acompanhamento);
        } catch (error) {
            tratarErro(error);
            throw error;
        }
    };

    const listarAcompanhamentos = async () => {
        try {
            limparErro();
            return await AcompanhamentoService.listarAcompanhamentos();
        } catch (error) {
            tratarErro(error);
            throw error;
        }
    };

    const buscarAcompanhamentoPorId = async (id) => {
        try {
            limparErro();
            return await AcompanhamentoService.buscarAcompanhamentoPorId(id);
        } catch (error) {
            tratarErro(error);
            throw error;
        }
    };

    const listarAcompanhamentosPorAnimalId = async (id) => {
        try {
            limparErro();
            return await AcompanhamentoService.buscarAcompanhamentosPorAnimalId(id);
        } catch (error) {
            tratarErro(error);
            throw error;
        }
    };

    const excluirAcompanhamento = async (id) => {
        try {
            limparErro();
            await AcompanhamentoService.excluirAcompanhamento(id);
        } catch (error) {
            tratarErro(error);
            throw error;
        }
    };

    return {
        criarAcompanhamento,
        listarAcompanhamentos,
        buscarAcompanhamentoPorId,
        listarAcompanhamentosPorAnimalId,
        excluirAcompanhamento,
        erro
    };
}