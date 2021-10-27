<<<<<<< HEAD
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany } from 'typeorm'

import { Assisted } from './assisted'
import { EvolutionRecord } from './evolution-record'
=======
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

import { Specialities } from './specialities'
import { Speciality } from './speciality'
>>>>>>> c3ca5515ea44447aa67591732c71a6eb3cd0a820
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

<<<<<<< HEAD
    @OneToMany(_ => EvolutionRecord, e => e.organization, { cascade: true })
    evolutionRecord: EvolutionRecord[]

    @OneToMany(_ => Assisted, a => a.organization, { cascade: true })
    assited: Assisted[]
=======
    @OneToMany(_ => Specialities, s => s.organization)
    specialities: Specialities[]

    @OneToMany(_ => Speciality, s => s.organization)
    speciality: Speciality[]
>>>>>>> c3ca5515ea44447aa67591732c71a6eb3cd0a820

}
