import { Response } from 'express'
import * as core from 'express-serve-static-core'
import Container from 'typedi'

import { verifyJWT } from '../fns/verify-jwt'
import { UserRole } from '../model/enum/user-role'
import EvolutionRecordService from '../services/evolution-record'

import {
    isEvolutionRecordCreate,
    isEvolutionRecordUpdate
} from './dto/evolution-record'
import { RequestWithUser } from './user'

export class EvolutionRecordRoutes {

    public static evolutionRecordRoutes(app: core.Express) {
        const baseUrl = '/api/v1/evolution-record'

        app.get(
            baseUrl,
            verifyJWT,
            async (request: RequestWithUser, response: Response) => {
                try {
                    const context = request.context

                    if (context.user.userRole !== UserRole.SocialAssistence) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                            + ' esta ação. { (Função: Assistente Social) }'
                        })

                        return
                    }

                    const evolutionRecordService = Container
                        .get(EvolutionRecordService)
                    const evolutionRecords = await evolutionRecordService
                        .findAll(context)

                    response.status(200).json(evolutionRecords)
                } catch (e) {
                    response.status(500).json({
                        error: 'O servidor encontrou uma situação com a qual'
                        + ` não sabe lidar. {${e}}`
                    })
                }
            }
        )

        app.get(
            `${baseUrl}/:id`,
            verifyJWT,
            async (request: RequestWithUser, response: Response) => {
                try {
                    const context = request.context

                    if (context.user.userRole !== UserRole.SocialAssistence) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                            + ' esta ação. { (Função: Assistente Social) }'
                        })

                        return
                    }

                    if (!('params' in request) || !('id' in request.params)) {
                        response.status(400).json({
                            error: 'Estrutura de requisição inválida.'
                            + ' { Necessário informar o ID }'
                        })

                        return
                    }

                    const id = Number(request.params.id)
                    const evolutionRecordService = Container
                        .get(EvolutionRecordService)
                    const evolutionRecord = await evolutionRecordService
                        .findById(id)

                    if (!evolutionRecord) {
                        response.status(404).json({
                            error: 'Evolução não encontrada.'
                        })

                        return
                    } else if (
                        evolutionRecord.organization
                            .id !== context.organization.id
                    ) {
                        response.status(404).json({
                            error: 'Evolução não encontrada.'
                        })

                        return
                    }

                    response.status(200).json(evolutionRecord)
                } catch (e) {
                    response.status(500).json({
                        error: 'O servidor encontrou uma situação com a qual'
                        + ` não sabe lidar. {${e}}`
                    })
                }
            }
        )

        app.get(
            `${baseUrl}/assisted/:id`,
            verifyJWT,
            async (request: RequestWithUser, response: Response) => {
                try {
                    const context = request.context

                    if (context.user.userRole !== UserRole.SocialAssistence) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                            + ' esta ação. { (Função: Assistente Social) }'
                        })

                        return
                    }

                    if (!('params' in request) || !('id' in request.params)) {
                        response.status(400).json({
                            error: 'Estrutura de requisição inválida.'
                            + ' { Necessário informar o ID }'
                        })

                        return
                    }

                    const id = Number(request.params.id)
                    const evolutionRecordService = Container
                        .get(EvolutionRecordService)
                    const evolutionRecord = await evolutionRecordService
                        .findByAssistedId(context, id)

                    response.status(200).json(evolutionRecord)
                } catch (e) {
                    response.status(500).json({
                        error: 'O servidor encontrou uma situação com a qual'
                        + ` não sabe lidar. {${e}}`
                    })
                }
            }
        )

        app.post(
            baseUrl,
            verifyJWT,
            async (request: RequestWithUser, response: Response) => {
                try {
                    const context = request.context

                    if (context.user.userRole !== UserRole.SocialAssistence) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                            + ' esta ação. {( Função: Assistente Social )}'
                        })

                        return
                    }

                    const body = request.body
                    if (!isEvolutionRecordCreate(body)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                            + ' { Corpo da Mensagem incorreto }'
                        })

                        return
                    }

                    const evolutionRecordService = Container
                        .get(EvolutionRecordService)
                    const evolutionRecords = await evolutionRecordService
                        .create(context, body)

                    response.status(201).json(evolutionRecords)
                } catch (e) {
                    response.status(500).json({
                        error: 'O servidor encontrou uma situação com a qual'
                        + ` não sabe lidar. {${e}}`
                    })
                }
            }
        )

        app.put(
            `${baseUrl}/:id`,
            verifyJWT,
            async (request: RequestWithUser, response: Response) => {
                try {
                    const context = request.context

                    if (context.user.userRole !== UserRole.SocialAssistence) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                            + ' esta ação. {( Função: Assistente Social )}'
                        })

                        return
                    }

                    const body = request.body
                    if (!isEvolutionRecordUpdate(body)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                            + ' { Corpo da Mensagem incorreto }'
                        })

                        return
                    }

                    if (!('params' in request) || !('id' in request.params)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                            + ' { Necessário informar o ID }'
                        })

                        return
                    }

                    const id = Number(request.params.id)
                    const evolutionRecordService = Container
                        .get(EvolutionRecordService)
                    const evolutionRecord = await evolutionRecordService
                        .findById(id)
                    if (!evolutionRecord) {
                        response.status(404).json({
                            error: 'Evolução não encontrada.'
                        })

                        return
                    } else if (
                        evolutionRecord.organization
                            .id !== context.organization.id
                    ) {
                        response.status(404).json({
                            error: 'Evolução não encontrada.'
                        })

                        return
                    }
                    const savedEvolutionRecord = await evolutionRecordService
                        .update(context, id, body)

                    response.status(201).json(savedEvolutionRecord)
                } catch (e) {
                    response.status(500).json({
                        error: 'O servidor encontrou uma situação com a qual'
                        + ` não sabe lidar. {${e}}`
                    })
                }
            }
        )

        app.delete(
            `${baseUrl}/:id`,
            verifyJWT,
            async (request: RequestWithUser, response: Response) => {
                try {
                    const context = request.context

                    if (context.user.userRole !== UserRole.SocialAssistence) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                                + ' esta ação. {( Função: Assistente Social )}'
                        })

                        return
                    }

                    if (!('params' in request) || !('id' in request.params)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                            + ' { Necessário informar o ID }'
                        })

                        return
                    }

                    const id = Number(request.params.id)
                    const evolutionRecordService = Container
                        .get(EvolutionRecordService)
                    const evolutionRecord = await evolutionRecordService
                        .findById(id)
                    if (!evolutionRecord) {
                        response.status(404).json({
                            error: 'Evolução não encontrada.'
                        })

                        return
                    } else if (
                        evolutionRecord.organization
                            .id !== context.organization.id
                    ) {
                        response.status(404).json({
                            error: 'Evolução não encontrada.'
                        })

                        return
                    }
                    await evolutionRecordService.delete(id)

                    response.status(200).json(evolutionRecord)
                } catch (e) {
                    response.status(500).json({
                        error: 'O servidor encontrou uma situação com a qual'
                        + ` não sabe lidar. {${e}}`
                    })
                }
            }
        )
    }

}
