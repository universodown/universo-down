// Table Speciality (especialidade)
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    JoinColumn
} from 'typeorm'

import { NeedSpeciality } from './need-speciality'
import { Organization } from './organization'
import { Specialities } from './specialities'

@Entity({ name: 'speciality' })
export class Speciality {

    @PrimaryGeneratedColumn()
    id: number

    @Column('int', { name: 'organization_id' })
    organizationId: number

    @Column('text')
    name: string

    @OneToMany(_ => Specialities, s => s.speciality, { onDelete: 'RESTRICT' })
    specialities: Specialities[]

    @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
    @ManyToOne(_ => Organization, s => s.speciality)
    organization: Organization

    @OneToMany(
        _ => NeedSpeciality,
        n => n.speciality,
        { onDelete: 'RESTRICT' }
    )
    needSpecialities: NeedSpeciality[]

}
