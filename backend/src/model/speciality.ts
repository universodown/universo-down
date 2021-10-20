import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    JoinColumn,
    ManyToOne
} from 'typeorm'

import { Organization } from './organization'
import { Specialities } from './specialities'

@Entity({ name: 'speciality' })
export class Speciality {

    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    description: string

    @Column('int', { name: 'organization_id', nullable: false })
    organizationId: number

    @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
    @ManyToOne(_ => Organization, o => o.speciality, { onDelete: 'CASCADE' })
    organization: Organization

    @OneToMany(_ => Specialities, s => s.speciality, { onDelete: 'RESTRICT' })
    specialities: Specialities[]

}
