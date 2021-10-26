import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    JoinColumn
} from 'typeorm'

    //import C> { User } from './user'
    //import C> { Speciality } from './speciality'
    //import C> { EvolutionRecord } from './evolutionRecord'

@Entity({ name: 'need_specialty' })
export class NeedSpecialty  {

    @PrimaryGeneratedColumn()
    id: number

    @Column('int', { name: 'attendance_id' })
    attendanceId: number

    @Column('int', { name: 'specially_id' })
    speciallyId: number

    @Column('int', { name: 'organization_id', nullable: false })
    organizationId: number

    // C> @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
    // C> @ManyToOne(_ => Organization, o => o.users, { onDelete: 'CASCADE' })
    // C> organization: Organization

    // C> @JoinColumn({ name: 'attendance_id', referencedColumnName: 'id' })
    // C> @OneToMany(_ => evolutionRecord, a => a.professionalAttendance, { onDelete: 'CASCADE' })
    // C> assisted: Assisted

    // C> @JoinColumn({ name: 'specially_id', referencedColumnName: 'id' })
    // C> @OneToMany(_ => speciality, a => a.specialties, { onDelete: 'CASCADE' })
    // C> assisted: Assisted

}
