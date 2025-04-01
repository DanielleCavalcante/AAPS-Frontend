export interface Animal {
    id: number;
    nome: string;
    especie: string;
    raca: string;
    pelagem: string;
    sexo: string;
    dataNascimento?: Date;
    status: 1 | 0 ;
    doadorId: number;
    disponibilidade: 1 | 0;
  }
  
  export interface FiltroAnimal {
    busca?: string;
    especie?: string;
    sexo?: string;
    status?: 1 | 0;
    disponibilidade?: 1 | 0;
  }  