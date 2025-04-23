export interface Animal {
    id: number;
    data: Date;
    adotanteId: number;
    animalId: number;
    voluntarioId: number;
    pontoAdocaoId: number;
}

export interface FiltroAdocao{
    busca?: string;
}