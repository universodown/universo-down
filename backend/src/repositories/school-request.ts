import { EntityManager, EntityRepository, Repository } from 'typeorm'

import { Context } from '../api/dto/context'
import { Status } from '../model/enum/status'
import { SchoolRequest } from '../model/school-request'

@EntityRepository(SchoolRequest)
export default class SchoolRequestRepository 
                extends Repository<SchoolRequest>{

    async findById(
        id: number, 
        db?: EntityManager
        ): Promise<SchoolRequest | undefined> {
            const repository = db
                ? db.getRepository(SchoolRequest)
                : this

        return repository.findOne({
            where: { id },
            relations: ['assisted']
        })
    }

    async findByAssistedId(
        assistedId : number,
        db?: EntityManager
     ): Promise<SchoolRequest | undefined> {
         const repository = db
             ? db.getRepository(SchoolRequest)
             : this
 
         return repository.findOne({ where: { assistedId } })
     }

     async findByDate(
        date : Date,
        db?: EntityManager
     ): Promise<SchoolRequest | undefined> {
         const repository = db
             ? db.getRepository(SchoolRequest)
             : this
 
         return repository.findOne({ where: { date } })
     }

     async findByStatus(
        status: Status,
        db?: EntityManager
     ): Promise<SchoolRequest | undefined> {
         const repository = db
             ? db.getRepository(SchoolRequest)
             : this
 
         return repository.findOne({ where: { status } })
     }

    async findAll(
        context: Context
    ): Promise<SchoolRequest[]> {
        return this.find({ 
            where: { organizationId: context.organization.id }
        })
    }

}