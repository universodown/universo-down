import { Service } from "typedi";
import { getManager } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Context } from "../api/dto/context";
import { EvolutionRecordCreate, EvolutionRecordUpdate } from "../api/dto/evolution-record";
import { EvolutionRecord } from "../model/evolution-record";
import EvolutionRecordRepository from "../repositories/evolution-record";

@Service()
export default class EvolutionRecordService {

    @InjectRepository(EvolutionRecordRepository)
    private readonly repository: EvolutionRecordRepository

    async create(
        context: Context,
        evolutionRecordInfo: EvolutionRecordCreate
    ) {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(EvolutionRecordRepository)

            return repository.save({
                ...evolutionRecordInfo,
                organizationId: context.organization.id,
                userId: context.user.id
            })
        })
    }

    async update(
        context: Context,
        id: number,
        evolutionRecordInfo: EvolutionRecordUpdate
    ) {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(EvolutionRecordRepository)

            return repository.save({
                ...evolutionRecordInfo,
                id
            })
        })
    }

    async delete(
        id: number
    ) {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(EvolutionRecordRepository)
            const evolutionRecord = await repository.findById(id)
            return repository.remove(evolutionRecord)
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
