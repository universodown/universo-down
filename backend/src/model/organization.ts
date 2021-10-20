import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

import { Specialities } from './specialities'
import { Speciality } from './speciality'
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

    @OneToMany(_ => Speciality, u => u.organization)
    speciality: Speciality[]

    @OneToMany(_ => Specialities, u => u.organization)
    specialities: Specialities[]

}
