import { useState } from 'react';

export const useLoading = () => {
  const [carregando, setCarregando] = useState(false);

  const iniciarCarregamento = () => setCarregando(true);
  const finalizarCarregamento = () => setCarregando(false);

  return { carregando, iniciarCarregamento, finalizarCarregamento };
};