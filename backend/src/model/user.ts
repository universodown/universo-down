import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
} from 'typeorm'

import { UserRole } from './enum/user-role'
import { Organization } from './organization'
import { Calendar } from './calendar'

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

    @Column('enum', { enum: UserRole, default: 'member' })
    role: UserRole

    @Column('int', { name: 'organization_id', nullable: false })
    organizationId: number

    @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
    @ManyToOne(_ => Organization, o => o.users, { onDelete: 'CASCADE' })
    organization: Organization

    @OneToMany(_ => Calendar, c => c.user, { cascade: true })
    calendars: Calendar[]

}
