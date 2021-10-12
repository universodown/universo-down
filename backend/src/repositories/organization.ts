import { EntityManager, EntityRepository, Repository } from 'typeorm'

import { Organization } from '../model/organization'

@EntityRepository(Organization)
export default class OrganizationRepository extends Repository<Organization> {

    async findById(
        id: number,
        db?: EntityManager
    ): Promise<Organization | undefined> {
        const repository = db
            ? db.getRepository(Organization)
            : this

        return repository.findOne({ where: { id } })
    }

    async findAll(): Promise<Organization[]> {
        return this.find()
    }

}
