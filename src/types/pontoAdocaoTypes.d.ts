export interface Adotante {
    id: number;
    nomeFantasia: string;
    responsavel: string;
    cnpj: string;
    status: 1 | 0;

    celular: string;
    contato: string;
    responsavelContato: string;

    logradouro: string;
    numero: number;
    complemento?: string;
    bairro: string;
    uf: string;
    cidade: string;
    cep: string;
    situacaoEndereco: string;
}

export interface FiltroAdotante {
    busca?: string;
    status?: 1 | 0;
}