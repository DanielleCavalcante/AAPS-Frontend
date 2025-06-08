// services/RelatorioService.js
import api from '../apis/aapsApi';

export const RelatorioService = {
    async gerarRelatorioExcel(relatorio) {
        const response = await api.get('/Relatorio/GerarRelatorio', {
            params: relatorio,
            responseType: 'blob'
        });
        
        // Retornar headers e dados separadamente
        return {
            data: response.data,
            headers: response.headers // Garantir que headers estão incluídos
        };
    },

    async gerarRelatorioPdf(relatorio) {
        const response = await api.get('/Relatorio/GerarRelatorioPdf', {
            params: relatorio,
            responseType: 'blob'
        });
        
        // Retornar headers e dados separadamente
        return {
            data: response.data,
            headers: response.headers // Garantir que headers estão incluídos
        };
    },

    async ObterDadosRelatorio(relatorio) {
        const response = await api.get('/Relatorio/VisualizarRelatorio', { params: relatorio });
        return response.data.dados;
    },
}