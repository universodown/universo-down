import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm'

import { SchoolRequest } from './school-request'
import { NeedSpeciality } from './need-speciality'
import { ProfessionalAttendance } from './professional-attendance'
import { TransportRequest } from './transport-request'
import { Assisted } from './assisted'
import { EvolutionRecord } from './evolution-record'
import { Specialities } from './specialities'
import { Speciality } from './speciality'
import { User } from './user'
import { Related } from './related'
import { Calendar } from './calendar'

@Entity({ name: 'organization' })
export class Organization {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    name: string

    @Column({ type: 'text' })
    description: string

    @Column({ type: 'text' })
    domain: string

    @OneToMany(_ => User, u => u.organization, { cascade: true })
    users: User[]

    @OneToMany(_ => SchoolRequest, s => s.organization, { onDelete: 'CASCADE' })
    schoolRequests: SchoolRequest[]

    @OneToMany(
        _ => NeedSpeciality,
        s => s.organization,
        { onDelete: 'CASCADE' }
    )
    needSpecialities: NeedSpeciality[]

    @OneToMany(
        _ => ProfessionalAttendance,
        p => p.organization,
        { onDelete: 'CASCADE' }
    )
    professionalAttendances: ProfessionalAttendance[]

    @OneToMany(
        _ => TransportRequest,
        t => t.organization,
        { onDelete: 'CASCADE' }
    )
    transportRequests: TransportRequest[]
    @OneToMany(_ => Related, r => r.organization, { cascade: true })
    related: Related[]

    @OneToMany(_ => Calendar, r => r.organization, { cascade: true })
    calendar: Calendar[]

    @OneToMany(_ => EvolutionRecord, e => e.organization, { cascade: true })
    evolutionRecord: EvolutionRecord[]

    @OneToMany(_ => Assisted, a => a.organization, { cascade: true })
    assited: Assisted[]

    @OneToMany(_ => Specialities, s => s.organization)
    specialities: Specialities[]

    @OneToMany(_ => Speciality, s => s.organization)
    speciality: Speciality[]

}
