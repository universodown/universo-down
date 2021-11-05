import { Service } from 'typedi'
import { getManager } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import SchoolRequestRepository from '../repositories/school_request'
import { Context } from '../api/dto/context'
import { SchoolRequest } from '../model/school-request'
import { SchoolRequestCreate, SchoolRequestUpdate } from '../api/dto/school_request'

@Service()
export default class SchoolRequestService {

    @InjectRepository(SchoolRequestRepository)
    private readonly repository: SchoolRequestRepository


    async create(
        context: Context, 
        schoolrequestInfo: SchoolRequestCreate
        ) {
                 
        return getManager().transaction(async db => {
            const repository = db.getRepository(SchoolRequestRepository)

            return repository.save({
                ...schoolrequestInfo,
                organizationId: context.organization.id
            })
        })
    }

    async update(
        context: Context, 
        id: number,
        schoolrequestInfo: SchoolRequestUpdate
        ) {
        return getManager().transaction(async db => {
            const repository = db.getRepository(SchoolRequestRepository)
        
                return repository.save({
                ...schoolrequestInfo,
                id,
                organizationId: context.organization.id
            })
        })
    }

    async delete(id: number): Promise<SchoolRequest> {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(SchoolRequestRepository)
            const user = await repository.findById(id, db)

            return repository.remove(user)
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
