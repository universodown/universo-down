import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne
} from 'typeorm'

import { Status } from './enum/status'
import { Organization } from './organization'
import { Assisted } from './assisted'

@Entity({ name: 'school_request' })
export class SchoolRequest {

    @PrimaryGeneratedColumn()
    id: number

    @Column('int', { name: 'organization_id' })
    organizationId: number

    @Column('int', { name: 'assisted_id' })
    assistedId: number

    @Column('date')
    date: Date

    @Column('date', { name: 'response_date' })
    responseDate: Date

    @Column('text', { nullable: true })
    observation?: string

    @Column('enum', { enum: Status, default: 'pending' })
    status: Status

    @JoinColumn({ name: 'assisted_id', referencedColumnName: 'id' })
    @ManyToOne(_ => Assisted, a => a.schoolRequests)
    assisted: Assisted

    @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
    @ManyToOne(_ => Organization, o => o.schoolRequests)
    organization: Organization

}
