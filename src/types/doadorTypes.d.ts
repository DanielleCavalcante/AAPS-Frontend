export interface Doador {
    id: number;
    nome: string;
    rg: string;
    cpf: string;
<<<<<<< HEAD
=======
    status: 1 | 0 ;

    telefones: string[];

>>>>>>> 4c8121d70a0682d3480368506f449e6b4a81ae70
    logradouro: string;
    numero: number;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;    
<<<<<<< HEAD
    status: 1 | 0 ;
=======
>>>>>>> 4c8121d70a0682d3480368506f449e6b4a81ae70
}

export interface FiltroDoador{
    busca?: string;
    status?: 1 | 0;
}