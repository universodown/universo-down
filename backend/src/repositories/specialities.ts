import { EntityManager, EntityRepository, Repository } from 'typeorm'

import { Context } from '../api/dto/context'
import { Specialities } from '../model/specialities'

@EntityRepository(Specialities)
export default class SpecialitiesRepository extends Repository<Specialities> {

    async findById(
        id: number,
        db?: EntityManager
    ): Promise<Specialities | undefined> {
        const repository = db
            ? db.getRepository(Specialities)
            : this

        return repository.findOne({
            where: { id },
            relations: ['user','speciality','organization']
        })
    }

    async findAll(
        context: Context,
        userId: number
    ): Promise<Specialities[]> {
        return this.find({
            where: {
                organizationId: context.organization.id,
                userId
            }
        })
    }

}
