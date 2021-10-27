import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm'

import { User } from './user'
import { EvolutionRecord } from './evolution-record'
import { Organization } from './organization'

@Entity({ name: 'professional_attendances' })
export class ProfessionalAttendance {

    @PrimaryGeneratedColumn()
    id: number

    @Column('int', { name: 'organization_id' })
    organizationId: number

    @Column('datetime')
    date: Date

    @Column('text')
    result: string

    @Column('int')
    quantify: number

    @Column('int', { name: 'user_id' })
    userId: number

    @Column('int', { name: 'evolution_record_id' })
    evolutionRecordId: number

    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    @ManyToOne(_ => User, u => u.professionalAttendances)
    user: User

    @JoinColumn({ name: 'evolution_record_id', referencedColumnName: 'id' })
    @ManyToOne(_ => EvolutionRecord, e => e.professionalAttendances)
    evolutionRecord: EvolutionRecord

    @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
    @ManyToOne(_ => Organization, o => o.professionalAttendances)
    organization: Organization

}
