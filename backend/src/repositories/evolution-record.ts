import { EntityManager, EntityRepository, Repository } from "typeorm";

import { Context } from "../api/dto/context";
import { EvolutionRecord } from "../model/evolution-record";

@EntityRepository(EvolutionRecord)
export default class EvolutionRecordRepository
    extends Repository<EvolutionRecord> {

    async findById(
        id: number,
        db?: EntityManager
    ): Promise<EvolutionRecord | undefined> {
        const repository = db 
            ? db.getRepository(EvolutionRecord)
            : this
            
        return this.findOne({ where: { id } })
    }

    async findAll(context: Context): Promise<EvolutionRecord[]> {
        return this.find({
            where: { 
                organizationId: context.organization.id,
                userId: context.user.id
            }
        })
    }

}
