import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

import { User } from "./user";

@Entity({ name: 'restriction' })
export class Restriction {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    date: Date

    @Column({ type: 'text' })
    startHour: string

    @Column({ type: 'text' })
    endHour: string

    @ManyToOne(_ => User, user => user.restriction)
    user: User

}
