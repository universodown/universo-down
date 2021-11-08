import { EntityManager, EntityRepository, Repository } from 'typeorm'

import { Context } from '../api/dto/context'
import { SchoolRequest } from '../model/school-request'

@EntityRepository(SchoolRequest)
export default class SchoolRequestRepository extends Repository<SchoolRequest> {

    async findById(
        id: number,
        db?: EntityManager
    ): Promise<SchoolRequest | undefined> {
        const repository = db
            ? db.getRepository(SchoolRequest)
            : this

        return repository.findOne({
            where: { id },
            relations: ['organization']
        })
    }

    async findAll(
        context: Context,
        assistedId: number
    ): Promise<SchoolRequest[]> {
        return this.find({
            where: {
                organizationId: context.organization.id,
                assistedId
            }
        })
    }

}
