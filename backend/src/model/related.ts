import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne
} from 'typeorm'

import { Gender } from './enum/gender'
import { Assisted } from './assisted'
import { Organization } from './organization'

@Entity({ name: 'relateds' })
export class Related {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    name: string

    @Column({ type: 'date' })
    birthday: string

    @Column('enum', { enum: Gender })
    gender: Gender

    @Column('text', { name: 'civil_status' })
    civilStatus: string

    @Column({ type: 'text' })
    identification: string

    @Column({ type: 'text' })
    relationship: string

    @Column('text', { name: 'general_registration' })
    generalRegistration: string

    @Column({ type: 'date' })
    issue: string

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

    @Column({ type: 'text' })
    scholarity: string

    @Column({ type: 'float' })
    revenue: number

    @Column('text', { name: 'national_identity' })
    nationalIdentity: string

    @Column({ type: 'boolean' })
    responsible: boolean

    @Column('int', { name: 'assisted_id', nullable: false })
    organizationId: number

    @JoinColumn({ name: 'assisted_id', referencedColumnName: 'id' })
    @ManyToOne(_ => Assisted, a => a.relateds, { onDelete: 'CASCADE' })
    assisted: Assisted

    @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
    @ManyToOne(_ => Organization, o => o.related)
    organization: Organization

}
