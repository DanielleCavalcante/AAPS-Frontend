export function bloquearTeclas(e, valorAtual) {
  // Se tentar digitar "0" quando o campo estiver vazio ou for zero, bloqueia
  if (e.key === '0') {
    if (valorAtual === '' || valorAtual === '0') {
      e.preventDefault();
    }
  }
}