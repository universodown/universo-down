import { Service } from 'typedi'
import { getManager } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { Context } from '../api/dto/context'
import {
    TransportRequestCreate,
    TransportRequestUpdate
} from '../api/dto/transport-request'
import TransportRequestRepository from '../repositories/transport-request'

@Service()
export default class TransportRequestService {

    @InjectRepository(TransportRequestRepository)
    private readonly repository: TransportRequestRepository

    async create(
        context: Context,
        transportRequest: TransportRequestCreate
    ) {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(
                TransportRequestRepository
            )

            return repository.save({
                ...transportRequest,
                organizationId: context.organization.id
            })
        })
    }

    async update(
        context: Context,
        id: number,
        transportRequestInfo: TransportRequestUpdate
    ) {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(
                TransportRequestRepository
            )
            const transportRequest = await repository.findById(id)

            return repository.save({
                ...transportRequest,
                ...transportRequestInfo,
                id,
                organizationId: context.organization.id
            })
        })
    }

    async delete(
        id: number
    ) {
        return getManager().transaction(async db => {
            const repository = db.getCustomRepository(
                TransportRequestRepository
            )
            const transportRequest = await repository.findById(id)

            return repository.delete(transportRequest)
        })
    }

    async findById(
        id: number
    ) {
        return this.repository.findById(id)
    }

    async findAll(
        context : Context,
        userId: number
    ) {
        return this.repository.findAll(
            context,
            userId
        )
    }

}
