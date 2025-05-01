import { useError } from "./useError";
import { VoluntarioService } from "../services/voluntarioService";

export const useVoluntarios = () => {
    const { erro, tratarErro, limparErro } = useError();

    const criarVoluntario = async (voluntario) => {
        try {
            limparErro();
            return await VoluntarioService.criarVoluntario(voluntario);
        } catch (error) {
            tratarErro(error);
            throw error;
        }
    };

    const listarVoluntarios = async (filtro = {}) => {
        try {
            limparErro();
            return await VoluntarioService.listarVoluntarios(filtro);
        } catch (error) {
            tratarErro(error);
            throw error;
        }
    };

    const listarVoluntariosAtivos = async () => {
        try {
            limparErro();
            return await VoluntarioService.listarVoluntariosAtivos();
        } catch (error) {
            tratarErro(error);
            throw error;
        }
    };

    const buscarVoluntarioPorId = async (id) => {
        try {
            limparErro();
            return await VoluntarioService.buscarVoluntarioPorId(id);
        } catch (error) {
            tratarErro(error);
            throw error;
        }
    };

    const atualizarVoluntario = async (id, voluntario) => {
        try {
            limparErro();
            return await VoluntarioService.atualizarVoluntario(id, voluntario);
        } catch (error) {
            tratarErro(error);
            throw error;
        }
    };

    const excluirVoluntario = async (id) => {
        try {
            limparErro();
            await VoluntarioService.excluirVoluntario(id);
        } catch (error) {
            tratarErro(error);
            throw error;
        }
    };

    const resetarSenha = async (resetarSenha) => {
        try {
            limparErro();
            return await VoluntarioService.resetarSenha(resetarSenha);
        } catch (error) {
            tratarErro(error);
            throw error;
        }
    };

    return {
        criarVoluntario, 
        listarVoluntarios, 
        listarVoluntariosAtivos,
        buscarVoluntarioPorId,
        atualizarVoluntario,
        excluirVoluntario,
        resetarSenha,
        erro,
        tratarErro,
        limparErro
    };
}