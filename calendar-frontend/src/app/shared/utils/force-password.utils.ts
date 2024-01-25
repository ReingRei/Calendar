/* eslint-disable @typescript-eslint/naming-convention */
export class SenhaUtils {
    /**
     * Método que retorna a força da senha, a força mínima aceita é 3
     * @param password String contendo o conteúdo da senha em text/plain
     * @returns inteiro de 0 até 3
     */
    static getItForcaSenha(password: string): any {
        const is_contem_maiuscula = /[A-Z]/g.test(password);
        const is_contem_minuscula = /[a-z]/g.test(password);
        const is_contem_numero = /[0-9]/gi.test(password);
        const length = password.length;

        const map_caracter = [
            '\\[',
            '|',
            ']',
            '!',
            ',',
            '.',
            '#',
            '@',
            '&',
            '%',
            '^',
            '~',
            '$',
            '*',
            '(',
            ')',
            '+',
            '-',
            '=',
            '\\',
            '_',
            '?',
            ';',
            ':',
            '>',
            '<',
        ];
        const regex_str = `[${map_caracter.join('\\')}]`;
        const regex = new RegExp(regex_str, 'g');
        const is_contem_caracter_especial = regex.test(password);

        let it_diversidade = 0;
        if (is_contem_maiuscula) {
            it_diversidade += 1;
        }
        if (is_contem_minuscula) {
            it_diversidade += 1;
        }
        if (is_contem_numero) {
            it_diversidade += 1;
        }
        if (is_contem_caracter_especial) {
            it_diversidade += 1;
        }

        let it_forca;

        if (it_diversidade === 4 && length >= 10) {
            it_forca = 3;
        } else if (it_diversidade === 4 && length >= 8) {
            it_forca = 2;
        } else if (it_diversidade > 1 && length > 6) {
            it_forca = 1;
        } else {
            it_forca = 0;
        }

        return it_forca;
    }
}
