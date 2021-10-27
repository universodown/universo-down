import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
    OneToMany
} from 'typeorm'

import { Gender } from './enum/gender'
import { EvolutionRecord } from './evolution-record'
import { Organization } from './organization'
import { Related } from './related'
import { TransportRequest } from './transport_request'

@Entity({ name: 'assisteds' })
export class Assisted {

    @PrimaryGeneratedColumn()
    id: number

    @Column('text', { name: 'name' })
    name: string

    @Column('date', { name: 'birthday' })
    birthday: Date

    @Column('enum', { enum: Gender, name: 'gender' })
    gender: Gender

    @Column('text', { name: 'identification' })
    identification: string

    @Column('text', { name: 'general_registration' })
    generalRegistration: string

    @Column('date', { name: 'issue' })
    issue: Date

    @Column('text', { name: 'issuer' })
    issuer: string

    @Column('text', { name: 'zip_code' })
    zipCode: string

    @Column('text', { name: 'address' })
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

    @Column('boolean', { name: 'has_benefits' })
    hasBenefits: boolean

    @Column('text', { name: 'scholarity' })
    scholarity: string

    @Column('text', { name: 'naturalness' })
    naturalness: string

    @Column('text', { name: 'nationality' })
    nationality: string

    @Column('text', { name: 'occupation' })
    occupation: string

    @Column('text', { name: 'national_identity' })
    nationalIdentity: string

    @Column('boolean', { name: 'active' })
    active: boolean

    @Column('text', { name: 'additional_information' })
    additionalInformation: string

    @Column('text', { name: 'photo' })
    photo: string

    @Column('text', { name: 'benefits' })
    benefits: string

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

    @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
    @ManyToOne(_ => Organization, o => o.assited, { onDelete: 'RESTRICT' })
    organization: Organization

}
