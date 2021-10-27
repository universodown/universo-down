import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Double,
    JoinColumn,
    OneToMany,
    ManyToOne
} from 'typeorm'

import { Assisted } from './assisted'
import { Organization } from './organization'
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

    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    @ManyToOne(_=> User, u => u.evolutionRecord, { onDelete: 'RESTRICT' })
    user: User

    @Column('int', { name: 'assisted_id', nullable: false })
    assistedId: number

    @JoinColumn({ name: 'assisted_id', referencedColumnName: 'id' })
    @OneToMany(_=> Assisted, a => a.evolutionRecord, { onDelete: 'RESTRICT' })
    assisted: Assisted

    @Column('int', { name: 'organization_id', nullable: false })
    organizationId: number

    @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
    @ManyToOne(
        _ => Organization,
        o => o.evolutionRecord,
        { onDelete: 'RESTRICT' }
    )
    organization: Organization

}
