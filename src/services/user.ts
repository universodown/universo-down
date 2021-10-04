import { Service } from 'typedi'
import { getManager } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import UserRepository from '../repositories/user'
import { cryptPassword } from '../fns/crypt-password'
import { UserCreate, UserUpdate } from '../api/dto/user'
import { User } from '../model/user'

@Service()
export default class UserService {

    @InjectRepository(UserRepository)
    private readonly repository: UserRepository

    async create(userInfo: UserCreate): Promise<User> {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(UserRepository)
            console.log(userInfo.plainPassword)
            const password = await cryptPassword(userInfo.plainPassword)
            console.log(`api pass ${password}`)
            return repository.save({
                ...userInfo,
                password
            })
        })
    }

    async update(userInfo: UserUpdate): Promise<User> {
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

    async findAll(): Promise<User[]> {
        return this.repository.findAll()
    }

}