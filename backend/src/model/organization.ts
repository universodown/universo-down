import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

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

    @OneToMany(_ => Related, r => r.organization, { cascade: true })
    related: Related[]

    @OneToMany(_ => Calendar, r => r.organization, { cascade: true })
    calendar: Calendar[]

}
