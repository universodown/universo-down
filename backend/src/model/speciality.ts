// Table Speciality (especialidade)
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    JoinColumn
} from 'typeorm'

import { Organization } from './organization'
import { Specialities } from './specialities'

@Entity({ name: 'speciality' })
export class Speciality {

    @PrimaryGeneratedColumn()
    id: number

    @Column('int', { name: 'organization_id' })
    organizationId: number

    @Column({ type: 'text' })
    name_speciality: string

    @OneToMany(_ => Specialities, s => s.speciality, { onDelete: 'RESTRICT' })
    specialities: Specialities[]

    @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
    @ManyToOne(_ => Organization, s => s.specialities)
    organization: Organization

}
