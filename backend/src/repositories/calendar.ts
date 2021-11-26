import { EntityManager, EntityRepository, Repository } from 'typeorm'

import { Context } from '../api/dto/context'
import { Calendar } from '../model/calendar'

@EntityRepository(Calendar)
export default class CalendarRepository extends Repository<Calendar> {

    async findById(
        id: number,
        db?: EntityManager
    ): Promise<Calendar | undefined> {
        const repository = db
            ? db.getRepository(Calendar)
            : this

        return repository.findOne({
            where: { id },
            relations: ['organization']
        })
    }

    async findByUser(
        context: Context,
        userId: number,
        db?: EntityManager
    ): Promise<Calendar[]> {
        const repository = db
            ? db.getRepository(Calendar)
            : this

        return repository.find({ where: {
            organizationId: context.organization.id,
            userId
        } })
    }

    async findAll(context: Context): Promise<Calendar[]> {
        return this.find({ where: {
            userId: context.user.id
        } })
    }

}
