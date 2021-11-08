import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
    OneToMany
} from 'typeorm'

import { User } from './user'
import { Assisted } from './assisted'
import { Organization } from './organization'
import { ProfessionalAttendance } from './professional-attendance'
import { Status } from './enum/status'

@Entity({ name: 'evolution_records' })
export class EvolutionRecord {

    @PrimaryGeneratedColumn()
    id: number

    @Column('date')
    date: Date

    @Column('enum', { enum: Status, default: 'pending' })
    status: Status

    @Column('double')
    weight: number

    @Column('double')
    height: number

    @Column('text')
    report: string

    @Column('int', { name: 'user_id', nullable: false })
    userId: number

    @Column('int', { name: 'assisted_id', nullable: false })
    assistedId: number

    @Column('int', { name: 'organization_id', nullable: false })
    organizationId: number

    @OneToMany(_ => ProfessionalAttendance, p => p.evolutionRecord)
    professionalAttendances: ProfessionalAttendance[]

    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    @ManyToOne(_=> User, u => u.evolutionRecord, { onDelete: 'RESTRICT' })
    user: User

    @JoinColumn({ name: 'assisted_id', referencedColumnName: 'id' })
    @ManyToOne(_=> Assisted, a => a.evolutionRecord, { onDelete: 'RESTRICT' })
    assisted: Assisted

    @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
    @ManyToOne(
        _ => Organization,
        o => o.evolutionRecord,
        { onDelete: 'RESTRICT' }
    )
    organization: Organization

}
