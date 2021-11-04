import { Service } from 'typedi'
import { getManager } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { Context } from '../api/dto/context'
import { NeedSpecialityCreate,
    NeedSpecialityUpdate } from '../api/dto/need-speciality'
import { NeedSpeciality } from '../model/need-speciality'
import NeedSpecialtyRepository from '../repositories/need-specialty'

@Service()
export default class NeedSpecialityService {

    @InjectRepository(NeedSpecialtyRepository)
    private readonly repository: NeedSpecialtyRepository

    async create(
        context: Context,
        needSpecialityInfo: NeedSpecialityCreate
    ) {
        return getManager().transaction(async db => {
            const repository = db.getRepository(NeedSpeciality)

            return repository.save({
                ...needSpecialityInfo,
                organizationId: context.organization.id
            })
        })
    }

    async update(
        context: Context,
        id: number,
        needSpecialityInfo: NeedSpecialityUpdate
    ) {
        return getManager().transaction(async db => {
            const repository = db.getRepository(NeedSpeciality)

            return repository.save({
                ...needSpecialityInfo,
                id,
                organizationId: context.organization.id
            })
        })
    }

    async delete(
        id: number,
    ) {
        return getManager().transaction(async db => {
            const repository = db.getRepository(NeedSpeciality)

            return repository.delete(id)
        })
    }

    async findById(
        id: number
    ) {
        return this.repository.findById(id)
    }

    async findAll(
        context: Context
    ) {
        return this.repository.findAll(context)
    }

}
