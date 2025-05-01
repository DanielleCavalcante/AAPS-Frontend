import { useState } from 'react';

export const useError = () => {
  const [erro, setErro] = useState('');

  const tratarErro = (error, mensagemPadrao = 'Erro inesperado') => {
    let mensagem;

    if (error?.response?.data?.erros) {
      mensagem = error?.response?.data?.erros;
    } else if (error?.response?.data?.mensagem) {
      mensagem = error?.response?.data?.mensagem;
    } else {
      mensagem = mensagemPadrao;
    }

    setErro(mensagem);
    console.error('Erro da API:', error);
  };

  const limparErro = () => setErro('');

  return { erro, tratarErro, limparErro };
};