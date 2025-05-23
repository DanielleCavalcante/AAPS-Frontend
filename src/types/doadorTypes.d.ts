export interface Doador {
    id: number;
    nome: string;
    rg: string;
    cpf: string;
    celular: string;
    contato: string;
    responsavelContato: string;
    logradouro: string;
    numero: number;
    complemento?: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;    
    status: 1 | 0 ;
}

export interface FiltroDoador{
    busca?: string;
    status?: 1 | 0;
}