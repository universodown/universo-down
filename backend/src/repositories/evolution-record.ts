import { EntityManager, EntityRepository, Repository } from 'typeorm'

import { Context } from '../api/dto/context'
import { EvolutionRecord } from '../model/evolution-record'

@EntityRepository(EvolutionRecord)
export default class EvolutionRecordRepository
    extends Repository<EvolutionRecord> {

    async findById(
        id: number,
        db?: EntityManager
    ): Promise<EvolutionRecord | undefined> {
        const repository = db
            ? db.getRepository(EvolutionRecord)
            : this

        return repository.findOne({
            where: { id },
            relations: ['organization']
        })
    }

    async findByAssistedId(
        context: Context,
        assistedId: number
    ): Promise<EvolutionRecord[]> {
        return this.find({ where: {
            organizationId: context.organization.id,
            assistedId
        } })
    }

    async findAll(context: Context): Promise<EvolutionRecord[]> {
        return this.find({
            where: {
                organizationId: context.organization.id,
                userId: context.user.id
            }
        })
    }

}
