import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'

import { User } from './user'

@Entity({ name: 'restriction' })
export class Restriction {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'date' })
    date: Date

    @Column({ type: 'date' })
    start_hour: string

    @Column({ type: 'date' })
    end_hour: string

    @Column('int', { name: 'user_id', nullable: false })
    user_id: number

    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    @ManyToOne(_ => User, user => user.restriction)
    user: User

}
