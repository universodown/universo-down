import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Double,
  JoinColumn,
  OneToMany,
  ManyToOne
} from 'typeorm'

import { Assisted } from './assisted'
import { User } from './user'

@Entity({ name: 'evolution_records' })
export class EvolutionRecord {

  @PrimaryGeneratedColumn()
  id: number

  @Column('date')
  date: Date

  @Column('text')
  status: string

  @Column('double')
  wight: Double

  @Column('double')
  height: Double

  @Column('text')
  report: string

  @Column('int', { name: 'user_id', nullable: false })
  user_id: number

  @JoinColumn({ name:'user_id', referencedColumnName: 'id' })
  @ManyToOne(_=> User, u => u.evolution_records, { onDelete: 'CASCADE' })
  user: User

  @Column('int', { name: 'assisted_id', nullable: false })
  assisted_id: number

  @JoinColumn({ name: 'assisted_id', referencedColumnName: 'id' })
  @OneToMany(_=> Assisted, a => a.evolution_records, { onDelete: 'CASCADE' })
  assisted: Assisted
}