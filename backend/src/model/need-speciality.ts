import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm'

import { Speciality } from './speciality'
import { Organization  } from './organization'
import { EvolutionRecord } from './evolution-record'

@Entity({ name: 'need_speciality' })
export class NeedSpeciality  {

    @PrimaryGeneratedColumn()
    id: number

    @Column('int', { name: 'evolution_record_id' })
    evolutionRecordId: number

    @Column('int', { name: 'speciality_id' })
    specialityId: number

    @Column('int', { name: 'organization_id', nullable: false })
    organizationId: number

    @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
    @ManyToOne(
        _ => Organization,
        o => o.needSpecialities,
        { onDelete: 'CASCADE' }
    )
    organization: Organization

    @JoinColumn({ name: 'evolution_record_id', referencedColumnName: 'id' })
    @ManyToOne(
        _ => EvolutionRecord,
        p => p.needSpecialities,
        { onDelete: 'CASCADE' }
    )
    evolutionRecord: EvolutionRecord

    @JoinColumn({
        name: 'speciality_id',
        referencedColumnName: 'id'
    })
    @ManyToOne(
        _ => Speciality,
        s => s.needSpecialities,
        { onDelete: 'CASCADE' }
    )
    speciality: Speciality

}
