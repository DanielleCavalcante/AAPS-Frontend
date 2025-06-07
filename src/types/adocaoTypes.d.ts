export interface Animal {
    id: number;
    data: Date;
    adotanteId: number;
    animalId: number;
    voluntarioId: number;
    pontoAdocaoId: number;
    cancelada: boolean;
}

export interface FiltroAdocao{
    busca?: string;
}

export interface AcompanhamentoDevolvido {
    dataAcompanhamento?: Date;
    observacao: string;
    eventoId: number;
}