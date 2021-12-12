/* eslint-disable max-len */
import { EntityManager, EntityRepository, Repository } from 'typeorm'

import { Context } from '../api/dto/context'
import { ProfessionalAttendance } from '../model/professional-attendance'

@EntityRepository(ProfessionalAttendance)
export default class ProfessionalAttendanceRepository
    extends Repository<ProfessionalAttendance> {

    async findById(
        id: number,
        db?: EntityManager
    ): Promise<ProfessionalAttendance | undefined> {
        const repository = db
            ? db.getRepository(ProfessionalAttendance)
            : this

        return repository.findOne({
            where: { id },
            relations: ['organization']
        })
    }

    async findAll(
        context: Context,
        evolutionRecordId
    ): Promise<ProfessionalAttendance[]> {
        return this.find({
            where: {
                organizationId: context.organization.id,
                evolutionRecordId
            }
        })
    }

    async findAllByAttendance(
        id: number,
        db?: EntityManager
    ): Promise<ProfessionalAttendance[] | undefined> {
        const repository = db
            ? db.getRepository(ProfessionalAttendance)
            : this

        return repository.find({
            where: { id },
            relations: ['evolutionRecord', 'evolutionRecord.assisted', 'user']
        })
    }

    async findAllAttendanceByProfessional(
        context: Context,
        userId: number
    ): Promise<ProfessionalAttendance[]> {
        return this.find({
            where: {
                organizationId: context.organization.id,
                userId
            }
        })
    }
    async findAllByUserId(context: Context): Promise<ProfessionalAttendance[]> {
        return this.find({
            where: {
                organizationId: context.organization.id,
                userId: context.user.id
            },
            relations: ['evolutionRecord', 'evolutionRecord.assisted' ,'user']
        })
    }

}
