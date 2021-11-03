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


    async create(schoolrequestInfo: SchoolRequestCreate): Promise<SchoolRequest> {
                 
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(SchoolRequest)

            const schoolrequest = await repository.save({
                ...schoolrequestInfo,
               schoolRequest: [{
                    id: `${schoolrequestInfo.domain}`,
                    assistedId: `${schoolrequestInfo.domain}`,
                    date: '',
                    responseDate: '',
                    status: 'status',
                    organizationId: `${schoolrequestInfo.domain}`
                }]
            })

            return schoolrequest
        })
    }

    async update(schoolrequestInfo: SchoolRequestUpdate): Promise<SchoolRequest> {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(SchoolRequestRepository)
            const organization = await repository
                .findById(schoolrequestInfo.id, db)

            return repository.save({
                ...schoolrequest,
                ...schoolrequestInfo
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

    async find(id: number): Promise<SchoolRequest | undefined> {
        return this.repository.findById(id)
    }

    async findByOrganizationId(organizationId: number): Promise<SchoolRequest | undefined> {
        return this.repository.findByOrganizationId(organizationId)
    }

    async findAll(context: Context): Promise<SchoolRequest[]> {
        return this.repository.findAll(context)
    }
