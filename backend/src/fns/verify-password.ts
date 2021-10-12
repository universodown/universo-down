export function verifyPassword(
    password?: string,
    confirmPassword?: string
): void {
    if (
        (!!password && !confirmPassword)
        || (!password && !!confirmPassword)
    ) {
        throw Error(
            'Para criação de uma senha é necessário informar sua confirmação.'
        )
    }

    if (password !== confirmPassword) {
        throw Error('As senhas não são iguais.')
    }
}
