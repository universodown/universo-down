import * as bcrypt from 'bcrypt'

export async function cryptPassword(plainPassword: string): Promise<string> {
    const saltRounds = 10
    if (plainPassword === '') {
        // The password should not be empty
        throw new Error('A senha não pode ser vazia')
    }

    return bcrypt.hash(plainPassword, saltRounds)
}