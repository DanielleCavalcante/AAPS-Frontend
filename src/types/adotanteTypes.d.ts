export interface Adotante {
    id: number;
    nome: string;
    rg: string;
    cpf: string;
    status: 1 | 0;

    email: string;

    celular: string;
    contato: string;
    responsavelContato: string;

    localTrabalho: string;
    facebook: string;
    instagram: string;
    bloqueio: 1 | 0;
    observacaoBloqueio: string;

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
    bloqueio?: 1 | 0;
}