import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
} from 'typeorm'

import { Calendar } from './calendar'
import { EvolutionRecord } from './evolution-record'
import { Organization } from './organization'
import { ProfessionalAttendance } from './professional-attendance'
import { AdminRole } from './enum/admin-role'
import { Gender } from './enum/gender'
import { UserRole } from './enum/user-role'
import { Specialities } from './specialities'

@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column('text', { name: 'first_name' })
    firstName: string

    @Column('text', { name: 'last_name' })
    lastName: string

    @Column('text')
    email: string

    @Column('text')
    password: string

    @Column('enum', { name: 'admin_role', enum: AdminRole, default: 'member' })
    adminRole: AdminRole

    @Column(
        'enum',
        { name: 'user_role', enum: UserRole, default: 'profissional' }
    )
    userRole: UserRole

    @Column('date')
    birthday: Date

    @Column('enum', { enum: Gender, default: 'not-informed' })
    gender: Gender

    @Column('text')
    identification: string

    @Column('text', { name: 'general_registration' })
    generalRegistration: string

    @Column('date')
    issue: Date

    @Column('text')
    issuer: string

    @Column('text', { name: 'zip_code' })
    zipCode: string

    @Column('text')
    address: string

    @Column('text')
    number: string

    @Column('text')
    neighborhood: string

    @Column('text')
    city: string

    @Column('text')
    state: string

    @Column('text')
    phone: string

    @Column('text', { name: 'national_indentity' })
    nationalIdentity: string

    @Column('int', { name: 'organization_id', nullable: false })
    organizationId: number

    @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
    @ManyToOne(_ => Organization, o => o.users, { onDelete: 'CASCADE' })
    organization: Organization

    @OneToMany(
        _ => ProfessionalAttendance,
        p => p.user,
        { onDelete: 'RESTRICT' }
    )
    professionalAttendances: ProfessionalAttendance[]

    @OneToMany(_ => Calendar, c => c.user)
    calendars: Calendar[]

    @OneToMany(_ => Specialities, c => c.user)
    specialities: Specialities[]

    @OneToMany(_ => EvolutionRecord, e => e.user, { onDelete: 'CASCADE' })
    evolutionRecord: EvolutionRecord

}
