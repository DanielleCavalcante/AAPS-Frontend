export interface Evento {
  id: number;
  descricao: string;
  status: 1 | 0;
}

export interface FiltroEvento {
  busca?: string;
  status?: 1 | 0;
}