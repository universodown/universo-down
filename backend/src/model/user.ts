import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
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

    @Column('text', { name: 'email' })
    email: string

    @Column('text', { name: 'password' })
    password: string

    @Column('enum', { name: 'admin_role' ,enum: AdminRole, default: 'member' })
    adminRole: AdminRole

    @Column('enum', { name: 'user_role', enum: UserRole, default: 'member' })
    userRole: UserRole

    @Column('date', { name: 'birthday' })
    birthday: Date

    @Column('text', { name: 'gender' })
    gender: string

    @Column('text', { name: 'indentification' })
    identification: string

    @Column('text', { name: 'general_registration' })
    generalRegistration: string

    @Column('date', { name: 'issue' })
    issue: Date

    @Column('text', { name: 'issuer' })
    issuer: string

    @Column('text', { name: 'zip_code' })
    zipCode: string

    @Column('text', { name: 'adress' })
    address: string

    @Column('text', { name: 'number' })
    number: string

    @Column('text', { name: 'neighborhood' })
    neighborhood: string

    @Column('text', { name: 'city' })
    city: string

    @Column('text', { name: 'state' })
    state: string

    @Column('text', { name: 'phone' })
    phone: string

    @Column('text', { name: 'national_indentity' })
    nationalIdentity: string

    @Column('int', { name: 'organization_id', nullable: false })
    organizationId: number

    @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
    @ManyToOne(_ => Organization, o => o.users, { onDelete: 'CASCADE' })
    organization: Organization

    @OneToMany(_ => EvolutionRecord, e => e.user, { onDelete: 'CASCADE' })
    evolutionRecord: EvolutionRecord
    role: AdminRole

}
