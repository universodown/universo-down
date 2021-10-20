import { Service } from 'typedi'
import { getManager } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import SpecialityRepository from '../repositories/speciality'
import { SpecialityCreate, SpecialityUpdate } from '../api/dto/speciality'
import { Speciality } from '../model/speciality'
import { Context } from '../api/dto/context'

@Service()
export default class SpecialityService {

    @InjectRepository(SpecialityRepository)
    private readonly repository: SpecialityRepository

    async create(specialityInfo: SpecialityCreate): Promise<Speciality> {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(SpecialityRepository)

            return repository.save({
                ...specialityInfo
            })
        })
    }

    async update(specialityInfo: SpecialityUpdate): Promise<Speciality> {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(SpecialityRepository)
            const speciality = await repository
                .findById(specialityInfo.id, db)

            return repository.save({
                ...speciality,
                ...specialityInfo
            })
        })
    }

    async delete(id: number): Promise<Speciality> {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(SpecialityRepository)
            const speciality = await repository.findById(id, db)

            return repository.remove(speciality)
        })
    }

    async find(id: number): Promise<Speciality | undefined> {
        return this.repository.findById(id)
    }

    async findAll(context: Context): Promise<Speciality[]> {
        return this.repository.findAll(context)
    }

}
