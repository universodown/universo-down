import { EntityManager, EntityRepository, Repository } from 'typeorm'

import { Context } from '../api/dto/context'
import { ProfessionalAttendance } from '../model/professional-attendance'
import { NeedSpeciality } from '../model/need-speciality'

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

        return repository.findOne({ where: { id } })
    }

    /* Work findAll especialidade Especifica relations: ['???'] ???
    : Promise<User & { organization: Organization | undefined}>
    */
    async findSpecialities(
        id: number,
        db?: EntityManager
    ): Promise<ProfessionalAttendance | undefined> {
        const repository = db
            ? db.getRepository(ProfessionalAttendance)
            : this
        const needSpeciality = db.getRepository(NeedSpeciality)

        // eslint-disable-next-line object-curly-spacing
        // eslint-disable-next-line max-len
        return repository.findOne({ where: { id: needSpeciality.find({ where: { attendanceId: id } }) }
        })
    }

    /* To do
        findAll conforme um Id de especialidade especifica
        findaAll para todos conforme usuario logado

    async findAll(): Promise<ProfessionalAttendance[]> {
        return this.find()
    }
    */

    async findAll(context: Context): Promise<ProfessionalAttendance[]> {
        return this.find({ where: { organizationId: context.organization.id } })
    }

}
