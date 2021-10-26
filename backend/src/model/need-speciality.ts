import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm'

    //import C> { User } from './user'
    //import C> { Speciality } from './speciality'
    //import C> { EvolutionRecord } from './evolutionRecord'
    import { Organization  } from './organization'

@Entity({ name: 'need_speciality' })
export class NeedSpeciality  {

    @PrimaryGeneratedColumn()
    id: number

    @Column('int', { name: 'attendance_id' })
    attendanceId: number

    @Column('int', { name: 'speciality_id' })
    speciallyId: number

    @Column('int', { name: 'organization_id', nullable: false })
    organizationId: number

    // C> @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
    // C> @ManyToOne(_ => Organization, o => o.users, { onDelete: 'CASCADE' })
    // C> organization: Organization

    // C> @JoinColumn({ name: 'attendance_id', referencedColumnName: 'id' })
    // C> @OneToMany(_ => evolutionRecord, a => a.professionalAttendance, { onDelete: 'CASCADE' })
    // C> assisted: Assisted

    // C> @JoinColumn({ name: 'specialy_id', referencedColumnName: 'id' })
    // C> @OneToMany(_ => speciality, a => a.specialties, { onDelete: 'CASCADE' })
    // C> assisted: Assisted

    @ManyToOne(_ => Organization, o => o.needSpecialities, { onDelete: 'CASCADE' })
    organization: Organization

}
