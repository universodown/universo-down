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
            relations: ['assisted']
        })
    }

    async findByNationalIdentity(
        nationalIdentity: string,
        db?: EntityManager
    ): Promise<Related | undefined> {
        const repository = db
            ? db.getRepository(Related)
            : this

        return repository.findOne({
            where: { nationalIdentity }
        })
    }

    async findAll(context: Context): Promise<Related[]> {
        return this.find({
            where: { organizationId: context.organization.id }
        })
    }

}
