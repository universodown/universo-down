import { Service } from 'typedi'
import { getManager } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { Context } from '../api/dto/context'
import ProfessionalAttendanceRepository
    from '../repositories/professional-attendance'
import {
    ProfessionalAttendanceCreate,
    ProfessionalAttendanceUpdate
} from '../api/dto/professional-attendance'
import { ProfessionalAttendance } from '../model/professional-attendance'

@Service()
export default class ProfessionalAttendanceService {

    @InjectRepository(ProfessionalAttendanceRepository)
    private readonly repository: ProfessionalAttendanceRepository

    async create(
        context: Context,
        professionalAttendanceInfo: ProfessionalAttendanceCreate
    ): Promise<ProfessionalAttendance> {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(
                ProfessionalAttendanceRepository
            )
            const ProfessionalAttendance = await repository.save({
                ...professionalAttendanceInfo,
                organizationId: context.organization.id
            })

            return ProfessionalAttendance
        })
    }

    async update(
        context: Context,
        id: number,
        professionalAttendanceInfo: ProfessionalAttendanceUpdate
    ): Promise<ProfessionalAttendance> {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(
                ProfessionalAttendanceRepository
            )
            const ProfessionalAttendance = await repository
                .findById(professionalAttendanceInfo.id, db)

            return repository.save({
                ...ProfessionalAttendance,
                ...professionalAttendanceInfo,
                id,
                organizationId: context.organization.id
            })
        })
    }

    async delete(id: number): Promise<ProfessionalAttendance> {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(
                ProfessionalAttendanceRepository
            )
            const ProfessionalAttendance = await repository.findById(id, db)

            return repository.remove(ProfessionalAttendance)
        })
    }

    async find(id: number): Promise<ProfessionalAttendance | undefined> {
        return this.repository.findById(id)
    }
    async findSpecialities(id: number)
    : Promise<ProfessionalAttendance | undefined> {
        return this.repository.findSpecialities(id)
    }
    async findAll(context: Context): Promise<ProfessionalAttendance[]> {
        return this.repository.findAll(context)
    }

}
