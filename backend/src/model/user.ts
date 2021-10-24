import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm'

import { AdminRole } from './enum/admin-role'
import { UserRole } from './enum/user-role'
import { EvolutionRecord } from './evolution-record'
import { Organization } from './organization'

@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column('text', { name: 'first_name' })
    firstName: string

    @Column('text', { name: 'last_name' })
    lastName: string

    @Column('text')
    email: string

    @Column('text')
    password: string

    @Column('enum', { enum: AdminRole, default: 'member' })
    adminRole: AdminRole

    @Column('enum', { enum: UserRole, default: 'member' })
    userRole: UserRole

    @Column('date')
    birthday: Date

    @Column('text')
    gender: string

    @Column('text')
    identification: string

    @Column('text')
    generalRegistration: string

    @Column('date')
    issue: Date

    @Column('text')
    issuer: string

    @Column('text')
    zipCode: string

    @Column('text')
    address: string

    @Column('text')
    number: string

    @Column('text')
    neighborhood: string

    @Column('text')
    city: string

    @Column('text')
    state: string

    @Column('text')
    phone: string

    @Column('text')
    nationalIdentity: string

    @Column('int', { name: 'organization_id', nullable: false })
    organizationId: number

    @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
    @ManyToOne(_ => Organization, o => o.users, { onDelete: 'CASCADE' })
    organization: Organization
    evolutionRecord: EvolutionRecord

}
