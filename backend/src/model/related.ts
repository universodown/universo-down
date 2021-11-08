import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne
} from 'typeorm'

import { Gender } from './enum/gender'
import { CivilStatus } from './enum/civil-status'
import { Relationship } from './enum/relationship'
import { Assisted } from './assisted'
import { Organization } from './organization'
import { Scholarity } from './enum/scholarity'

@Entity({ name: 'relateds' })
export class Related {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    name: string

    @Column({ type: 'date' })
    birthday: Date

    @Column('enum', { enum: Gender, default: 'not-informed' })
    gender: Gender

    @Column(
        'enum',
        { name: 'civil_status', enum: CivilStatus, default: 'single' }
    )
    civilStatus: CivilStatus

    @Column({ type: 'text' })
    identification: string

    @Column('enum', { enum: Relationship, default: 'mother' })
    relationship: Relationship

    @Column('text', { name: 'general_registration' })
    generalRegistration: string

    @Column({ type: 'date' })
    issue: Date

    @Column({ type: 'text' })
    issuer: string

    @Column('text', { name: 'zip_code' })
    zipCode: string

    @Column({ type: 'text' })
    address: string

    @Column({ type: 'text' })
    number: string

    @Column({ type: 'text' })
    neighborhood: string

    @Column({ type: 'text' })
    city: string

    @Column({ type: 'text' })
    state: string

    @Column({ type: 'text' })
    phone: string

    @Column({ type: 'text' })
    naturalness: string

    @Column({ type: 'text' })
    nationality: string

    @Column('enum', { enum: Scholarity, default: 'elementary-school' })
    scholarity: Scholarity

    @Column({ type: 'float' })
    revenue: number

    @Column('text', { name: 'national_identity' })
    nationalIdentity: string

    @Column({ type: 'boolean' })
    responsible: boolean

    @Column('int', { name: 'assisted_id', nullable: false })
    assistedId: number

    @Column('int', { name: 'organization_id', nullable: false })
    organizationId: number

    @JoinColumn({ name: 'assisted_id', referencedColumnName: 'id' })
    @ManyToOne(_ => Assisted, a => a.relateds, { onDelete: 'CASCADE' })
    assisted: Assisted

    @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
    @ManyToOne(_ => Organization, o => o.related)
    organization: Organization

}
