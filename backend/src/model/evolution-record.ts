import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Double,
    JoinColumn,
    ManyToOne,
    OneToMany
} from 'typeorm'

import { Assisted } from './assisted'
import { Organization } from './organization'
import { ProfessionalAttendance } from './professional-attendance'
import { User } from './user'

@Entity({ name: 'evolution_records' })
export class EvolutionRecord {

    @PrimaryGeneratedColumn()
    id: number

    @Column('date', { name: 'date' })
    date: Date

    @Column('text', { name: 'status' })
    status: string

    @Column('double', { name: 'wight' })
    wight: Double

    @Column('double', { name: 'height' })
    height: Double

    @Column('text', { name: 'report' })
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
