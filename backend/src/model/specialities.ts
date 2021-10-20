import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm'

import { Organization } from './organization'
import { Speciality } from './speciality'
import { User } from './user'

@Entity({ name: 'specialities' })
export class Specialities {

    @PrimaryGeneratedColumn()
    id: number

    @Column('int', { name: 'user_id' })
    userId: number

    @Column('int', { name: 'speciality_id' })
    specialityId: number

    @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
    @ManyToOne(_ => Organization, o => o.specialities, { onDelete: 'CASCADE' })
    organization: Organization

    @JoinColumn({ name: 'speciality_id', referencedColumnName: 'id' })
    @ManyToOne(_ => Speciality, s => s.specialities)
    speciality: Speciality

    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    @ManyToOne(_ => User, s => s.specialities)
    user: User

}
