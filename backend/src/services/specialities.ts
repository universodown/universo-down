import { Service } from 'typedi'
import { getManager } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { Context } from '../api/dto/context'
import { SpecialitiesCreate, SpecialitiesUpdate } from '../api/dto/specialities'
import { Specialities } from '../model/specialities'
import SpecialitiesRepository from '../repositories/specialities'


@Service()
export default class SpecialitiesService {

    @InjectRepository(SpecialitiesRepository)
    private readonly repository: SpecialitiesRepository

    async create(
        context: Context,
        specialitiesInfo: SpecialitiesCreate
        ) {
        return getManager().transaction(async db => {
            const repository = db.getRepository(Specialities)

            return repository.save({
                ...specialitiesInfo,
                organizationId: context.organization.id
            })
        })
    }

    async update(
        context : Context,
        id:number,
        specialitiesInfo: SpecialitiesUpdate
        ) {
        return getManager().transaction(async db => {
            const repository = db.getRepository(Specialities)
            
            return repository.save({
                ...specialitiesInfo,
                id,
                organizationId: context.organization.id
            })
        })
    }

    async delete(
        id: number
        ) {
        return getManager().transaction(async db => {
            const repository = db.getRepository(Specialities)

            return repository.delete(id)
        })
    }

    async findById(
        id: number
        ) {
        return this.repository.findById(id)
    }

    async findAll(
        context : Context
    ) {
        return this.repository.findAll(context)
    }
}
