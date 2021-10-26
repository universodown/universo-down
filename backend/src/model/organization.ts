import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { SchoolRequest } from './school-request'
import { NeedSpeciality } from './need-speciality'

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

    @OneToMany(_ => SchoolRequest, s => s.organization, { onDelete: 'CASCADE' })
    schoolRequests: SchoolRequest[]

    @OneToMany(_ => NeedSpeciality, s => s.organization, { onDelete: 'CASCADE' })
    needSpecialities: NeedSpeciality[]

}
