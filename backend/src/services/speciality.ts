import { Service } from "typedi";
import { getManager } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Context } from "../api/dto/context";
import { SpecialityCreate, SpecialityUpdate } from "../api/dto/speciality";
import { Speciality } from "../model/speciality";
import SpecialityRepository from "../repositories/speciality";

@Service()
export default class SpecialityService {

    @InjectRepository(SpecialityRepository)
    private readonly repository: SpecialityRepository

    async create(
        context: Context,
        specialityInfo: SpecialityCreate
    ) {
        return getManager().transaction(async db=> {
            const repository = db.getRepository(Speciality)

            return repository.save({
                ...specialityInfo,
                organizationId: context.organization.id
            })
        })
    }

    async update(
        context: Context,
        id: number,
        specialityInfo: SpecialityUpdate
    ) {
        return getManager().transaction(async db=> {
            const repository = db.getRepository(Speciality)

            return repository.save({
                ...specialityInfo,
                id,
                organizatioId: context.organization.id
            })
        })
    }

    async delete(
        id: number,
    ) {
        return getManager().transaction(async db=> {
            const repository = db.getRepository(Speciality)

            return repository.delete(id)
        })
    
    }

    async findById(
        id: number
    ) {
        return this.repository.findById(id)
    }

    async findAll(
        context: Context
    ) {
        return this.repository.findAll(context)
    }
}