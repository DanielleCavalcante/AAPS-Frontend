export function validarNome(char) {
  const validChars = /^[A-Za-zÀ-ÿ\s]$/;
  return validChars.test(char);
}