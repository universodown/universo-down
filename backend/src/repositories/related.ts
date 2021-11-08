import { EntityManager, EntityRepository, Repository } from 'typeorm'

import { Context } from '../api/dto/context'
import { Related } from '../model/related'

@EntityRepository(Related)
export default class RelatedRepository extends Repository<Related> {

    async findById(
        id: number,
        db?: EntityManager
    ): Promise<Related | undefined> {
        const repository = db
            ? db.getRepository(Related)
            : this

        return repository.findOne({
            where: { id },
            relations: ['assisted', 'organization']
        })
    }

    async findByIdentification(
        context: Context,
        identification: string,
        db?: EntityManager
    ): Promise<Related | undefined> {
        const repository = db
            ? db.getRepository(Related)
            : this

        return repository.findOne({
            where: {
                organizationId: context.organization.id,
                identification
            },
            relations: ['organization']
        })
    }

    async findAll(
        context: Context,
        assistedId: number
    ): Promise<Related[]> {
        return this.find({
            where: {
                organizationId: context.organization.id,
                assistedId
            }
        })
    }

}
