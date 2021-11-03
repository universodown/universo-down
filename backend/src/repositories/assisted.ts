import { Db, EntityManager, EntityRepository, Repository } from 'typeorm'

import { Context } from '../api/dto/context'
import { Assisted } from '../model/assisted'

@EntityRepository(Assisted)
export default class AssistedRepository extends Repository<Assisted> {

    [x: string]: any;

    async findById(id: number, db?: EntityManager)
    : Promise<Assisted | undefined> {
        const repository = Db
            ? db.getRepository(Assisted)
            : this

        return repository.findOne({
            where: { id }
        })
    }

    async findByIdentification(
        identification: string,
        db?: EntityManager
    ): Promise<Assisted | undefined> {
        const repository = db
            ? db.getRepository(Assisted)
            : this

        return repository.findOne({ where: { identification } })
    }

    async findAll(context: Context): Promise<Assisted[]> {
        return this.find({ where: { organizationId: context.organization.id } })
    }

}
