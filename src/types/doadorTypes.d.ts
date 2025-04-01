export interface Doador{
    id: number;
    nome: string;
    rg: string;
    cpf: string;
    logradouro: string;
    numero: number;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;    
    status: 1 | 0 ;
}

export interface FiltroDoador{
    busca?: string;
    status?: 1 | 0;
}