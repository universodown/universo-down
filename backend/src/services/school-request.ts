import { Service } from 'typedi'
import { getManager } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { Context } from '../api/dto/context'
import {
    SchoolRequestCreate,
    SchoolRequestUpdate
} from '../api/dto/school-request'
import SchoolRequestRepository from '../repositories/school-request'

@Service()
export default class SchoolRequestService {

    @InjectRepository(SchoolRequestRepository)
    private readonly repository: SchoolRequestRepository

    async create(
        context: Context,
        schoolRequest: SchoolRequestCreate
    ) {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(SchoolRequestRepository)

            return repository.save({
                ...schoolRequest,
                organizationId: context.organization.id
            })
        })
    }

    async update(
        context: Context,
        id: number,
        schoolRequestInfo: SchoolRequestUpdate
    ) {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(SchoolRequestRepository)
            const schoolRequest = await repository.findById(id)

            return repository.save({
                ...schoolRequest,
                ...schoolRequestInfo,
                id,
                organizationId: context.organization.id
            })
        })
    }

    async delete(
        id: number
    ) {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(SchoolRequestRepository)
            const schoolRequest = await repository.findById(id)

            return repository.delete(schoolRequest)
        })
    }

    async findById(
        id: number
    ) {
        return this.repository.findById(id)
    }

    async findAll(
        context : Context,
        assistedId: number
    ) {
        return this.repository.findAll(
            context,
            assistedId
        )
    }

}
