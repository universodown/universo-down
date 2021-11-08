import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
    OneToMany
} from 'typeorm'

import { EvolutionRecord } from './evolution-record'
import { Organization } from './organization'
import { Related } from './related'
import { SchoolRequest } from './school-request'
import { TransportRequest } from './transport-request'
import { Gender } from './enum/gender'
import { Scholarity } from './enum/scholarity'

@Entity({ name: 'assisteds' })
export class Assisted {

    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    name: string

    @Column('date')
    birthday: Date

    @Column('enum', { enum: Gender, default: 'not-informed' })
    gender: Gender

    @Column('text')
    identification: string

    @Column('text', { name: 'general_registration' })
    generalRegistration: string

    @Column('date')
    issue: Date

    @Column('text')
    issuer: string

    @Column('text', { name: 'zip_code' })
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

    @Column('boolean', { name: 'has_benefits' })
    hasBenefits: boolean

    @Column('enum', { enum: Scholarity, default: 'elementary-school' })
    scholarity: Scholarity

    @Column('text')
    naturalness: string

    @Column('text')
    nationality: string

    @Column('text', { nullable: true })
    occupation?: string

    @Column('text', { name: 'national_identity' })
    nationalIdentity: string

    @Column('boolean')
    active: boolean

    @Column('text', { name: 'additional_information', nullable: true })
    additionalInformation?: string

    @Column('text', { nullable: true })
    photo?: string

    @Column('text', { nullable: true })
    benefits?: string

    @Column('text', { name: 'social_identification_number' })
    socialIdentificationNumber: string

    @Column('int', { name: 'organization_id', nullable: false })
    organizationId: number

    @OneToMany(_ => EvolutionRecord, e => e.assisted)
    evolutionRecord: EvolutionRecord[]

    @OneToMany(_ => TransportRequest, t => t.assisted)
    transportRequests: TransportRequest[]

    @OneToMany(_ => Related, t => t.assisted)
    relateds: Related[]

    @OneToMany(_ => SchoolRequest, s => s.assisted)
    schoolRequests: SchoolRequest[]

    @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
    @ManyToOne(_ => Organization, o => o.assited, { onDelete: 'RESTRICT' })
    organization: Organization

}
