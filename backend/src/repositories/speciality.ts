import { EntityManager, EntityRepository, Repository } from 'typeorm'

import { Context } from '../api/dto/context'
import { Speciality } from '../model/speciality'

@EntityRepository(Speciality)
export default class SpecialityRepository
    extends Repository<Speciality> {

    // SELECT * FROM speciality LEFT JOIN specialities
    // ON specialities.speciality_id = speciality.id
    async findById(
        id: number,
        db?: EntityManager
    ): Promise<Speciality | undefined> {
        const repository = db
            ? db.getRepository(Speciality)
            : this

        return repository.findOne({
            where: { id },
            relations: ['specialities']
        })
    }

    // SELECT * FROM sepeciality WHERE organization_id = ?
    async findAll(context: Context): Promise<Speciality[]> {
        return this.find({
            where: { organizationId: context.organization.id }
        })
    }

}
