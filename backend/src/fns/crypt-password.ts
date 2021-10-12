import * as bcrypt from 'bcrypt'

import { User } from '../model/user'

export async function cryptPassword(
    plainPassword: string
): Promise<string> {
    const saltRounds = 10
    if (plainPassword === '') {
        // The password should not be empty
        throw new Error('A senha não pode ser vazia')
    }

    return bcrypt.hash(plainPassword, saltRounds)
}

export async function verifyUser(
    user: User,
    password: string
): Promise<boolean> {
    return bcrypt.compare(password, user.password)
}
