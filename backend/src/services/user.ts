import { Service } from 'typedi'
import { getManager } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import UserRepository from '../repositories/user'
import { cryptPassword } from '../fns/crypt-password'
import { UserCreate, UserUpdate } from '../api/dto/user'
import { User } from '../model/user'
import { Context } from '../api/dto/context'
import { verifyPassword } from '../fns/verify-password'

@Service()
export default class UserService {

    @InjectRepository(UserRepository)
    private readonly repository: UserRepository

    async create(userInfo: UserCreate): Promise<User> {
        verifyPassword(
            userInfo.plainPassword,
            userInfo.plainPasswordConfirmation
        )
        const password = await cryptPassword(userInfo.plainPassword)

        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(UserRepository)

            return repository.save({
                ...userInfo,
                password
            })
        })
    }

    async update(userInfo: UserUpdate): Promise<User> {
        verifyPassword(
            userInfo.plainPassword,
            userInfo.plainPasswordConfirmation
        )

        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(UserRepository)
            const user = await repository.findById(userInfo.id, db)

            return repository.save({
                ...user,
                ...userInfo
            })
        })
    }

    async delete(id: number): Promise<User> {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(UserRepository)
            const user = await repository.findById(id, db)

            return repository.remove(user)
        })
    }

    async find(id: number): Promise<User | undefined> {
        return this.repository.findById(id)
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.repository.findByEmail(email)
    }

    async findAll(context: Context): Promise<User[]> {
        return this.repository.findAll(context)
    }

    async findByIdentification(
        identification: string
    ): Promise<User | undefined> {
        return this.repository.findByIdentification(
            identification
        )
    }

}
