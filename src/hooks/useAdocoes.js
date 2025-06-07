import { useError } from './useError';

import { AdocaoService } from '../services/adocaoService';

export const useAdocoes = () => {
    const { erro, tratarErro, limparErro } = useError();

    const criarAdocao = async (adocao) => {
        try {
          limparErro();
          return await AdocaoService.criarAdocao(adocao);
        } catch (error) {
            tratarErro(error);
            throw error;
        } 
    };
    
    const listarAdocoes = async (filtro = {}) => {
        try {
            limparErro();
            return await AdocaoService.listarAdocoes(filtro);
        } catch (error) {
            tratarErro(error);
            throw error;
        } 
    };

    const buscarAdocaoPorId = async (id) => {
        try {
          limparErro();
          return await AdocaoService.buscarAdocaoPorId(id);
        } catch (error) {
            tratarErro(error);
            throw error;
        } 
    };
    
    const atualizarAdocao = async (id, adocao) => {
        try {
            limparErro();
            return await AdocaoService.atualizarAdocao(id, adocao);
        } catch (error) {
            tratarErro(error);
            throw error;
        } 
    };

    const cancelarAdocao = async (id, acompanhamentoDevolvido) => {
        try {
            limparErro();
            return await AdocaoService.cancelarAdocao(id, acompanhamentoDevolvido);
        } catch (error) {
            tratarErro(error);
            throw error;
        } 
    };

    /* const excluirAdocao = async (id) => {
        try {
          limparErro();
          await AdocaoService.excluirAdocao(id);
        } catch (error) {
            tratarErro(error);
            throw error;
        } 
    }; */

    return {
        criarAdocao,
        listarAdocoes,
        buscarAdocaoPorId,
        atualizarAdocao,
        cancelarAdocao,
        erro, 
        limparErro,
        tratarErro
    }
};