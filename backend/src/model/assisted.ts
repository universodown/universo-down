import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne
} from 'typeorm'

import { EvolutionRecord } from './evolution-record'
import { Organization } from './organization'

@Entity({ name: 'assisteds' })
export class Assisted {

    @PrimaryGeneratedColumn()
    id: number

    @Column('text', { name: 'name' })
    name: string

    @Column('date')
    birthday: Date

    @Column('text')
    gender: Text

    @Column('text')
    identification: string

    @Column('text')
    generalRegistration: string

    @Column('date')
    issue: Date

    @Column('text')
    issuer: string

    @Column('text')
    zip_code: string

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

    @Column('boolean')
    hasBenefits: boolean

    @Column('blob')
    scholarity: Blob

    @Column('text')
    naturalness: string

    @Column('text')
    nationality: string

    @Column('text')
    occupation: string

    @Column('text')
    nationalIdentity: string

    @Column('boolean')
    active: boolean

    @Column('text')
    additionalInformation: string

    @Column('blob')
    photo: Blob

    @Column('blob')
    benefits: Blob

    @Column('text')
    socialIdentificationNumber: string
    evolutionRecord: EvolutionRecord[]

    @Column('int', { name: 'organization_id', nullable: false })
    organizationId: number

    @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
    @ManyToOne(_ => Organization, o => o.assited, { onDelete: 'RESTRICT' })
    organization: Organization

}
