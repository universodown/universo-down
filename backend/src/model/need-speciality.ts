import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
} from 'typeorm'

import { Speciality } from './speciality'
import { Organization  } from './organization'
import { ProfessionalAttendance } from './professional-attendance'

@Entity({ name: 'need_speciality' })
export class NeedSpeciality  {

    @PrimaryGeneratedColumn()
    id: number

    @Column('int', { name: 'attendance_id' })
    attendanceId: number

    @Column('int', { name: 'speciality_id' })
    specialityId: number

    @Column('int', { name: 'organization_id', nullable: false })
    organizationId: number

    @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
    @ManyToOne(_ => Organization, o => o.users, { onDelete: 'CASCADE' })
    organization: Organization

    @JoinColumn({ name: 'attendance_id', referencedColumnName: 'id' })
    @ManyToOne(
        _ => ProfessionalAttendance,
        p => p.needSpecialities,
        { onDelete: 'CASCADE' }
    )
    attendance: ProfessionalAttendance

    @JoinColumn({
        name: 'specialy_id',
        referencedColumnName: 'id'
    })
    @OneToMany(
        _ => Speciality,
        s => s.needSpecialities,
        { onDelete: 'CASCADE' }
    )
    speciality: Speciality

}
