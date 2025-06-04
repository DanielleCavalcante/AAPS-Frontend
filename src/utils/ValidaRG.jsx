export function validarRG(rg) {
    // Remove pontos e traços
    const rgLimpo = rg.replace(/[^0-9Xx]/g, '');

    // Verifica se tem entre 8 e 9 caracteres
    if (rgLimpo.length < 8 || rgLimpo.length > 9) {
        return false;
    }

    // Verifica se todos são números, exceto possível 'X' no final
    const rgSemUltimo = rgLimpo.slice(0, -1);
    const ultimoChar = rgLimpo.slice(-1).toUpperCase();

    const numerosValidos = /^[0-9]+$/.test(rgSemUltimo);
    const ultimoValido = /^[0-9X]$/.test(ultimoChar);

    if (!(numerosValidos && ultimoValido)) {
        return false;
    }

    // Verifica se todos os dígitos são iguais (ignorando o 'X' se houver)
    const numerosParaVerificar = rgLimpo.replace(/X/i, '');
    const todosIguais = numerosParaVerificar
        .split('')
        .every(char => char === numerosParaVerificar[0]);

    if (todosIguais) {
        return false;
    }

    return true;
}