import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

import { ProfessionalAttendance } from './professional_attendance'
import { TransportRequest } from './transport_request'

import { User } from './user'

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

    @OneToMany(_ => ProfessionalAttendance, p => p.organization, { onDelete: 'RESTRICT' })
    professionalAttendances: ProfessionalAttendance[]

    @OneToMany(_ => TransportRequest, t => t.organization, { onDelete: 'RESTRICT' })
    transportRequests: TransportRequest[]

}
