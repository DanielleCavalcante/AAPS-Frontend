export interface Evento {
    id: number;
    nome: string;
    cpf: string;
    status: 1 | 0 ;
    userName: string;
    email: string;
    phoneNumber: string;
    acesso: string;
}
  
export interface FiltroVoluntario {
    busca?: string;
    status?: 1 | 0;
}

export interface ResetarSenha{
    voluntarioId: number;
}