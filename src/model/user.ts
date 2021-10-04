import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'first_name', type: 'text' })
    firstName: string

    @Column({ name: 'last_name', type: 'text' })
    lastName: string

    @Column({ type: 'text' })
    email: string

    @Column({ type: 'text' })
    password: string

}