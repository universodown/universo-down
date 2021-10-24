import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

//import { Assisted } from './assisted'

@Entity({ name: 'related' })
export class Related {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    name: string

    @Column({ type: 'date' })
    birthday: string

    @Column({ type: 'text' })
    gender: string

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

}
