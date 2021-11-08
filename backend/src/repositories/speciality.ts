import { EntityManager, EntityRepository, Like, Repository } from 'typeorm'

import { Context } from '../api/dto/context'
import { Speciality } from '../model/speciality'

@EntityRepository(Speciality)
export default class SpecialityRepository extends Repository<Speciality> {

    async findById(
        id: number,
        db?: EntityManager
    ): Promise<Speciality | undefined> {
        const repository = db
            ? db.getRepository(Speciality)
            : this

        return repository.findOne({
            where: { id },
            relations: ['specialities', 'organization']
        })
    }

    async findByName(
        context: Context,
        name: string
    ): Promise<Speciality[]> {
        return this.find({
            where: {
                organizationId: context.organization.id,
                name: Like(`%${name}%`)
            },
            relations: ['specialities', 'organization']
        })
    }

    async findAll(context: Context): Promise<Speciality[]> {
        return this.find({ where: { organizationId: context.organization.id } })
    }

}
