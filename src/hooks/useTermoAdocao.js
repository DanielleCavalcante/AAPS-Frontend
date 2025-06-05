import { useError } from './useError';
import { TermoAdocaoService } from '../services/termoAdocaoService';

export const useTermoAdocao = () => {
    const { erro, tratarErro, limparErro } = useError();

    const getFileName = (headers) => {
        const contentDisposition = headers['content-disposition'] || '';
        const utf8FilenameMatch = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
        if (utf8FilenameMatch && utf8FilenameMatch[1]) {
            try {
                return decodeURIComponent(utf8FilenameMatch[1]);
            } catch {
                return 'termo-adocao.pdf';
            }
        }
        const filenameMatch = contentDisposition.match(/filename="([^"]+)"/i);
        if (filenameMatch && filenameMatch[1]) {
            return filenameMatch[1];
        }
        return 'termo-adocao.pdf';
    };

    const downloadFile = (response, defaultExtension = 'pdf') => {
        const fileName = getFileName(response.headers);
        const contentType = response.headers['content-type'] || 'application/pdf';
        const blob = new Blob([response.data], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    };

    const enviarTermoAdocao = async (enviarTermo) => {
        try {
          limparErro();
          return await TermoAdocaoService.enviarTermoAdocao(enviarTermo);
        } catch (error) {
            tratarErro(error);
            throw error;
        }
    };

    const gerarTermoAdocao = async (id) => {
        try {
            limparErro();
            const response = await TermoAdocaoService.gerarTermoAdocao(id);
            downloadFile(response, 'pdf');
        } catch (error) {
            tratarErro(error);
            throw error;
        } 
    };
    
    return { enviarTermoAdocao, gerarTermoAdocao, erro, limparErro };
}