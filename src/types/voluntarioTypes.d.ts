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
  
<<<<<<< HEAD
export interface FiltroEvento {
=======
export interface FiltroVoluntario {
>>>>>>> 4c8121d70a0682d3480368506f449e6b4a81ae70
    busca?: string;
    status?: 1 | 0;
}

export interface ResetarSenha{
    voluntarioId: number;
}