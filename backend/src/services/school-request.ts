import { Service } from 'typedi'
import { getManager,  EntityManager } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import SchoolRequestRepository from '../repositories/school_request'
import { Context } from '../api/dto/context'
import { SchoolRequest } from '../model/school-request'
import { SchoolRequestCreate, SchoolRequestUpdate } from '../api/dto/school-request'

@Service()
export default class SchoolRequestService {

    @InjectRepository(SchoolRequestRepository)
    private readonly repository: SchoolRequestRepository
    
    validateDates(date: Date, responseDate?: Date): void {
        if (responseDate && date > responseDate) {
            throw new Error('A data de solicitação não pode ser maior que a data de resposta')
        }
    }

    async create(
        context: Context, 
        schoolRequestInfo: SchoolRequestCreate
        ) {
                 
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(SchoolRequestRepository)

             return repository.save({
                ...schoolRequestInfo,
                date: new Date(),
                organizationId: context.organization.id
            })
        })
    }

    async update(
        _: Context, 
        id: number,
        schoolRequestInfo: SchoolRequestUpdate
    ){
        const schoolRequest = await this.findById(id)
        this.validateDates(schoolRequest.date, schoolRequestInfo.responseDate)    
            
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(SchoolRequestRepository)
        
                return repository.save({
                ...schoolRequestInfo,
                id,
            })
        })
    }

    async delete(
        id: number
    ){
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(SchoolRequestRepository)
            const schoolRequest = await repository.findById(id, db)
            return repository.remove(schoolRequest)
        })
    }

    async findById(
        id: number,
        db?: EntityManager
    ){
        return this.repository.findById(id, db)
    }

    async findAll(
        context: Context,
        assistedId: number
    ){
        return this.repository.findAll(context),(assistedId)
    }
}