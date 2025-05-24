import { useError } from './useError';
import { PontoAdocaoService } from '../services/pontoAdocaoService'; 

export const usePontosAdocao = () => {
    const { erro, tratarErro, limparErro } = useError();

    const criarPontoAdocao = async (pontoAdocao) => {
        try {
          limparErro();
          return await PontoAdocaoService.criarPontoAdocao(pontoAdocao);
        } catch (error) {
            tratarErro(error);
            throw error;
        } 
    };

    const listarPontosAdocao = async (filtro = {}) => {
        try {
          limparErro();
          return await PontoAdocaoService.listarPontosAdocao(filtro);
        } catch (error) {
            tratarErro(error);
            throw error;
        }
    };
    
    const listarPontosAdocaoAtivos = async () => {
        try {
            limparErro();
            return await PontoAdocaoService.listarPontosAdocaoAtivos();
        } catch (error) {
            tratarErro(error);
            throw error;
        } 
    };
    
    const buscarPontoAdocaoPorId = async (id) => {
        try {
            limparErro();
            return await PontoAdocaoService.buscarPontoAdocaoPorId(id);
        } catch (error) {
            tratarErro(error,);
            throw error;
        } 
    };

    const atualizarPontoAdocao = async (id, doador) => {
        try {
          limparErro();
          return await PontoAdocaoService.atualizarPontoAdocao(id, doador);
        } catch (error) {
            tratarErro(error);
            throw error;
        }
    };
    
    const excluirPontoAdocao = async (id) => {
        try {
            limparErro();
            await PontoAdocaoService.excluirPontoAdocao(id);
        } catch (error) {
            tratarErro(error);
            throw error;
        }
    };

    return{
        criarPontoAdocao,
        listarPontosAdocao,
        listarPontosAdocaoAtivos,
        buscarPontoAdocaoPorId,
        atualizarPontoAdocao,
        excluirPontoAdocao,
        erro,
        limparErro
    }
};