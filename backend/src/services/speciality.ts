import { Service } from 'typedi'
import { getManager } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { Context } from '../api/dto/context'
import { SpecialityCreate, SpecialityUpdate } from '../api/dto/speciality'
import SpecialityRepository from '../repositories/speciality'

@Service()
export default class SpecialityService {

    @InjectRepository(SpecialityRepository)
    private readonly repository: SpecialityRepository

    async create(
        context: Context,
        specialityInfo: SpecialityCreate
    ) {
        return getManager().transaction(async db=> {
            const repository = db.getCustomRepository(SpecialityRepository)

            return repository.save({
                ...specialityInfo,
                organizationId: context.organization.id
            })
        })
    }

    async update(
        context: Context,
        id: number,
        specialityInfo: SpecialityUpdate
    ) {
        return getManager().transaction(async db=> {
            const repository = db.getCustomRepository(SpecialityRepository)
            const speciality = repository.findById(id, db)

            return repository.save({
                ...speciality,
                ...specialityInfo,
                id,
                organizatioId: context.organization.id
            })
        })
    }

    async delete(
        id: number,
    ) {
        return getManager().transaction(async db=> {
            const repository = db.getCustomRepository(SpecialityRepository)
            const speciality = await repository.findById(id, db)

            return repository.save(speciality)
        })
    }

    async findById(
        id: number
    ) {
        return this.repository.findById(id)
    }

    async findByName(
        context: Context,
        name: string
    ) {
        return this.repository.findByName(context, name)
    }

    async findAll(
        context: Context
    ) {
        return this.repository.findAll(context)
    }

}
