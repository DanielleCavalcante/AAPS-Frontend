export function validarTelefone(phone) {
    // Remove tudo que não for número
    const phoneLimpo = phone.replace(/\D/g, '');

    // Verifica se a quantidade de dígitos é válida (10 ou 11 no Brasil)
    if (phoneLimpo.length < 10 || phoneLimpo.length > 11) {
        return false;
    }

    // Verifica se todos os dígitos são iguais
    const todosIguais = phoneLimpo.split('').every(char => char === phoneLimpo[0]);
    if (todosIguais) {
        return false;
    }

    return true;
}