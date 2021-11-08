import { Service } from 'typedi'
import { getManager } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { Context } from '../api/dto/context'
import { NeedSpecialityCreate } from '../api/dto/need-speciality'
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
            const repository = db.getCustomRepository(NeedSpecialtyRepository)

            return repository.save({
                ...needSpecialityInfo,
                organizationId: context.organization.id
            })
        })
    }

    async delete(
        id: number,
    ) {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(NeedSpecialtyRepository)
            const needSpeciality = await repository.findById(id)

            return repository.delete(needSpeciality)
        })
    }

    async findById(
        id: number
    ) {
        return this.repository.findById(id)
    }

    async findAll(
        context: Context,
        evolutionRecordId: number
    ) {
        return this.repository.findAll(context, evolutionRecordId)
    }

}
