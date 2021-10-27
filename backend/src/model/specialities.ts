// Table specialties (especialidades do usuário)
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm'

import { Organization } from './organization'
import { Speciality } from './speciality'

@Entity({ name: 'specialties' })
export class Specialities {

    @PrimaryGeneratedColumn()
    id: number

    @Column('int', { name: 'organization_id' })
    organizationId: number

    @Column('int', { name: 'user_id' })
    userId: number

    @Column('int', { name: 'speciality_id' })
    specialityId: number

    @JoinColumn({ name: 'speciality_id', referencedColumnName: 'id' })
    @ManyToOne(_ => Speciality, s => s.specialities)
    speciality: Speciality

    @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
    @ManyToOne(_ => Organization, s => s.specialities)
    organization: Organization

}
