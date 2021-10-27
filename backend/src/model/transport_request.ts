import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm'

import { Organization } from './organization'
// Import { Assisted } from './assisted'

@Entity({ name: 'transport_requests' })
export class TransportRequest {

    @PrimaryGeneratedColumn()
    id: number

    @Column('int', { name: 'organization_id'})
    organizationId: number

    @Column('datetime')
    date: Date

    @Column('datetime', { name: 'response_date' })
    responseDate: Date

    @Column('text', { name: 'status' })
    status: string

    @Column('int', { name: 'assisted_id' })
    assistedId: number

    @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
    @ManyToOne(_ => Organization, o => o.transportRequests)
    organization: Organization

    // @JoinColumn({ name: 'assisted_id', referencedColumnName: 'id' })
    // @ManyToOne(_ => Assisted, a => a.transportRequests)
    // assisted: Assisted

}