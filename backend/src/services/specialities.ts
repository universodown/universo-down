import { Service } from 'typedi'
import { getManager } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import SpecialitiesRepository from '../repositories/specialities'
import { SpecialitiesCreate, SpecialitiesUpdate } from '../api/dto/specialities'
import { Specialities } from '../model/specialities'
import { Context } from '../api/dto/context'

@Service()
export default class SpecialitiesService {

    @InjectRepository(SpecialitiesRepository)
    private readonly repository: SpecialitiesRepository

    async create(specialitiesInfo: SpecialitiesCreate): Promise<Specialities> {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(SpecialitiesRepository)

            const specialities = await repository.save({
                ...specialitiesInfo
            })

            return specialities
        })
    }

    async update(specialitiesInfo: SpecialitiesUpdate): Promise<Specialities> {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(SpecialitiesRepository)
            const specialities = await repository
                .findById(specialitiesInfo.id, db)

            return repository.save({
                ...specialities,
                ...specialitiesInfo
            })
        })
    }

    async delete(id: number): Promise<Specialities> {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(SpecialitiesRepository)
            const specialities = await repository.findById(id, db)

            return repository.remove(specialities)
        })
    }

    async find(id: number): Promise<Specialities | undefined> {
        return this.repository.findById(id)
    }

    async findAll(context: Context): Promise<Specialities[]> {
        return this.repository.findAll(context)
    }

}
