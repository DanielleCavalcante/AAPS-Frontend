import { useError } from './useError';
import { RelatorioService } from '../services/RelatorioService';

export const useRelatorios = () => {
    const { erro, tratarErro, limparErro } = useError();

    const getFileName = (headers) => {
        const contentDisposition = headers['content-disposition'] || '';
        
        const utf8FilenameMatch = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
        if (utf8FilenameMatch && utf8FilenameMatch[1]) {
            try {
                return decodeURIComponent(utf8FilenameMatch[1]);
            } catch {
                return 'relatorio';
            }
        }
        
        const filenameMatch = contentDisposition.match(/filename="([^"]+)"/i);
        if (filenameMatch && filenameMatch[1]) {
            return filenameMatch[1];
        }
        
        return 'relatorio';
    };

    const downloadFile = (response, defaultExtension) => {
        const fileName = getFileName(response.headers);
        const contentType = response.headers['content-type'] || 
                           (defaultExtension === 'pdf' 
                               ? 'application/pdf' 
                               : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        
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

    const gerarRelatorioExcel = async (relatorio) => {
        try {
            limparErro();
            const response = await RelatorioService.gerarRelatorioExcel(relatorio);
            downloadFile(response, 'xlsx');
        } catch (error) {
            tratarErro(error);
            throw error;
        } 
    };

    const gerarRelatorioPdf = async (relatorio) => {
        try {
            limparErro();
            const response = await RelatorioService.gerarRelatorioPdf(relatorio);
            downloadFile(response, 'pdf');
        } catch (error) {
            tratarErro(error);
            throw error;
        } 
    };

    return {
        gerarRelatorioExcel,
        gerarRelatorioPdf,
        erro, 
        limparErro,
        tratarErro
    }
};