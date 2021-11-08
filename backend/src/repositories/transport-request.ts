import { EntityManager, EntityRepository, Repository } from 'typeorm'

import { Context } from '../api/dto/context'
import { TransportRequest } from '../model/transport-request'

@EntityRepository(TransportRequest)
export default class TransportRequestRepository
    extends Repository<TransportRequest> {

    async findById(
        id: number,
        db?: EntityManager
    ): Promise<TransportRequest | undefined> {
        const repository = db
            ? db.getRepository(TransportRequest)
            : this

        return repository.findOne({
            where: { id },
            relations: ['organization']
        })
    }

    async findAll(
        context: Context,
        assistedId: number
    ): Promise<TransportRequest[]> {
        return this.find({
            where: {
                organizationId: context.organization.id,
                assistedId
            }
        })
    }

}
