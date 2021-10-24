import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany } from 'typeorm'

import { User } from './user'

@Entity({ name: 'calendar' })
export class Calendar {

    @PrimaryGeneratedColumn()
    id: number

    @Column('text', { name: 'day_of_week' })
    dayOfWeek: string

    @Column('text', { name: 'start_hour' })
    startHour: string

    @Column('text', { name: 'end_hour' })
    endHour: string

    @Column('int', { name: 'user_id', nullable: false })
    userId: number

    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    @OneToMany(_ => User, u => u.calendars, { onDelete: 'CASCADE' })
    user: User
}