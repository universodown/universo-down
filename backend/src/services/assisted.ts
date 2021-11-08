import { Service } from 'typedi'
import { getManager } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { Context } from '../api/dto/context'
import { AssistedCreate, AssistedUpdate } from '../api/dto/assisted'
import { Assisted } from '../model/assisted'
import AssistedRepository from '../repositories/assisted'

@Service()
export default class AssistedService {

    @InjectRepository(AssistedRepository)
    private readonly repository: AssistedRepository

    async create(
        context: Context,
        assistedInfo: AssistedCreate
    ) {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(AssistedRepository)

            return repository.save({
                ...assistedInfo,
                organizationId: context.organization.id
            })
        })
    }

    async update(
        _: Context,
        id: number,
        assistedInfo: AssistedUpdate
    ) {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(AssistedRepository)
            const assisted = await repository.findById(id)

            return repository.save({
                ...assisted,
                ...assistedInfo
            })
        })
    }

    async delete(
        id: number
    ) {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(AssistedRepository)
            const assisted = await repository.findById(id, db)

            return repository.remove(assisted)
        })
    }

    async findById(
        id: number
    ) {
        return this.repository.findById(id)
    }

    async findAll(context: Context): Promise<Assisted[]> {
        return this.repository.findAll(context)
    }

    async findByIdentification(
        identification: string
    ): Promise<Assisted | undefined> {
        return this.repository.findByIdentification(
            identification
        )
    }

}
