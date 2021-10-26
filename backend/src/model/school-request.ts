import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne
    // C> OneToMany,
    // C> JoinColumn
} from 'typeorm'

import { Status } from './enum/status'
import { Organization } from './organization'

// C> import { Assisted } from './assisted'

@Entity({ name: 'school_request' })
export class SchoolRequest {

    @PrimaryGeneratedColumn()
    id: number

    @Column('int', { name: 'organization_id' })
    organizationId: number

    @Column('int', { name: 'assisted_id' })
    assistedId: number

    @Column('date', { name: 'date' })
    date: string

    @Column('date', { name: 'response_date' })
    responseDate: string

    @Column('enum', { enum: Status, name: 'status' })
    status: Status

    // C> @JoinColumn({ name: 'assisted_id', referencedColumnName: 'id' })
    // C> @ManyToOne(_ => Assisted, a => a.schoolRequests)
    // C> assisted: Assisted

    @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
    @ManyToOne(_ => Organization, o => o.schoolRequests)
    organization: Organization

}
