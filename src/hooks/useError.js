import { useState } from 'react';

export const useError = () => {
  const [erro, setErro] = useState('');

  const tratarErro = (error, mensagemPadrao = 'Erro inesperado') => {
    const mensagem =
      error?.response?.data?.erros || 
      error?.response?.data?.mensagem ||
      mensagemPadrao;
    setErro(mensagem);
    console.error('Erro da API:', error);
  };

  const limparErro = () => setErro('');

  return { erro, tratarErro, limparErro };
};