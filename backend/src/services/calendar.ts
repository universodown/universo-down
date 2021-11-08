import { Service } from 'typedi'
import { getManager } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import CalendarRepository from '../repositories/calendar'
import { CalendarCreate, CalendarUpdate } from '../api/dto/calendar'
import { Calendar } from '../model/calendar'
import { Context } from '../api/dto/context'

@Service()
export default class CalendarService {

    @InjectRepository(CalendarRepository)
    private readonly repository: CalendarRepository

    async create(
        context: Context,
        calendarInfo: CalendarCreate
    ): Promise<Calendar> {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(CalendarRepository)

            return repository.save({
                ...calendarInfo,
                organizationId: context.organization.id
            })
        })
    }

    async update(
        context: Context,
        id: number,
        calendarInfo: CalendarUpdate
    ): Promise<Calendar> {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(CalendarRepository)
            const calendar = await repository.findById(id, db)

            return repository.save({
                ...calendar,
                ...calendarInfo,
                organizationId: context.organization.id
            })
        })
    }

    async delete(id: number): Promise<Calendar> {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(CalendarRepository)
            const calendar = await repository.findById(id, db)

            return repository.remove(calendar)
        })
    }

    async find(id: number): Promise<Calendar | undefined> {
        return this.repository.findById(id)
    }

    async findByUser(
        context: Context,
        userId: number
    ): Promise<Calendar[]> {
        return this.repository.findByUser(context, userId)
    }

    async findAll(context: Context): Promise<Calendar[]> {
        return this.repository.findAll(context)
    }

}
