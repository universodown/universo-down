import { Service } from 'typedi'
import { getManager } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { Related } from '../model/related'
import { Context } from '../api/dto/context'
import { RelatedCreate, RelatedUpdate } from '../api/dto/related'
import RelatedRepository from '../repositories/related'

@Service()
export default class RelatedService {

    @InjectRepository(RelatedRepository)
    private readonly repository: RelatedRepository

    async create(
        context: Context,
        relatedInfo: RelatedCreate
    ) {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(RelatedRepository)

            return repository.save({
                ...relatedInfo,
                organizationId: context.organization.id
            })
        })
    }

    async update(
        context: Context,
        id: number,
        relatedInfo: RelatedUpdate
    ) {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(RelatedRepository)
            const related = repository.findById(id)

            return repository.save({
                ...related,
                ...relatedInfo,
                id,
                organizationId: context.organization.id
            })
        })
    }

    async delete(
        id: number
    ) {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(RelatedRepository)
            const related = await repository.findById(id)

            return repository.remove(related)
        })
    }

    async findById(
        id: number
    ) {
        return this.repository.findById(id)
    }

    async findAll(
        context: Context,
        assistedId: number
    ) {
        return this.repository.findAll(context, assistedId)
    }

    async findByIdentification(
        context: Context,
        identification: string
    ): Promise<Related | undefined> {
        return this.repository.findByIdentification(
            context,
            identification
        )
    }

}
