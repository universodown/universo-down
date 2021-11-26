import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne
} from 'typeorm'

import { User } from './user'
import { Organization } from './organization'
import { Weekday } from './enum/weekday'

@Entity({ name: 'calendar' })
export class Calendar {

    @PrimaryGeneratedColumn()
    id: number

    @Column('enum', { enum: Weekday, default: 'monday' })
    dayOfWeek: Weekday

    @Column('text', { name: 'start_hour' })
    startHour: string

    @Column('text', { name: 'end_hour' })
    endHour: string

    @Column('int', { name: 'user_id' })
    userId: number

    @Column('int', { name: 'organization_id' })
    organizationId: number

    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    @ManyToOne(_ => User, u => u.calendars, { onDelete: 'CASCADE' })
    user: User

    @JoinColumn({ name: 'organization_id', referencedColumnName: 'id' })
    @ManyToOne(_ => Organization, o => o.related, { onDelete: 'CASCADE' })
    organization: Organization

}
