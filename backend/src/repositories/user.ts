import { EntityManager, EntityRepository, Repository } from 'typeorm'

import { Context } from '../api/dto/context'
import { User } from '../model/user'

@EntityRepository(User)
export default class UserRepository extends Repository<User> {

    async findById(id: number, db?: EntityManager): Promise<User | undefined> {
        const repository = db
            ? db.getRepository(User)
            : this

        return repository.findOne({
            where: { id },
            relations: ['organization']
        })
    }

    async findByEmail(
        email: string,
        db?: EntityManager
    ): Promise<User | undefined> {
        const repository = db
            ? db.getRepository(User)
            : this

        return repository.findOne({ where: { email } })
    }

    async findAll(context: Context): Promise<User[]> {
        return this.find({ where: { organizationId: context.organization.id } })
    }

    async findByIdentification(
        identification: string,
        db?: EntityManager
    ): Promise<User | undefined> {
        const repository = db
            ? db.getRepository(User)
            : this

        return repository.findOne({ where: { identification } })
    }

}
