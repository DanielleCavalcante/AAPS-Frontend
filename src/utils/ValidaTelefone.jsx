export function validarTelefone(phone) {
    // Remove tudo que não for número
    const phoneLimpo = phone.replace(/\D/g, '');

    //phoneLimpo.length < 10 || phoneLimpo.length > 11
    if (phoneLimpo.length !== 11) {
        return false;
    }

    // Verifica se todos os dígitos são iguais
    const todosIguais = phoneLimpo.split('').every(char => char === phoneLimpo[0]);
    if (todosIguais) {
        return false;
    }

    return true;
}