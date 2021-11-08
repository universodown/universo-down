import { EntityManager, EntityRepository, Repository } from 'typeorm'

import { Context } from '../api/dto/context'
import { NeedSpeciality } from '../model/need-speciality'

@EntityRepository(NeedSpeciality)
export default class NeedSpecialtyRepository
    extends Repository<NeedSpeciality> {

    async findById(
        id: number,
        db?: EntityManager
    ): Promise<NeedSpeciality | undefined> {
        const repository = db
            ? db.getRepository(NeedSpeciality)
            : this

        return repository.findOne({
            where: { id },
            relations: [
                'evolutionRecord',
                'speciality',
                'organization'
            ]
        })
    }

    async findAll(
        context: Context,
        evolutionRecordId: number
    ): Promise<NeedSpeciality[]> {
        return this.find({
            where: {
                organizationId: context.organization.id,
                evolutionRecordId
            }
        })
    }

}
