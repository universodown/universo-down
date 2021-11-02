import { Response } from 'express'
import * as core from 'express-serve-static-core'
import Container from 'typedi'

import { verifyJWT } from '../fns/verify-jwt'
import { UserRole } from '../model/enum/user-role'
import EvolutionRecordService from '../services/evolution-record'

import { isEvolutionRecordCreate, isEvolutionRecordUpdate } from './dto/evolution-record'
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

                    if (context.user.userRole === UserRole.Secretary) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                            + ' esta ação. { (Função: Membro) }'
                        })

                        return 
                    }

                    const evolutionRecordService = Container.get(EvolutionRecordService)
                    const evolutionRecords = await evolutionRecordService.findAll(context)
                    
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

                    if (context.user.userRole === UserRole.Secretary) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                            + ' esta ação. { (Função: Membro) }'
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
                    const evolutionRecordService = Container.get(EvolutionRecordService)
                    const evolutionRecords = await evolutionRecordService.findById(id)

                    response.status(200).json(evolutionRecords)
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

                    if (context.user.userRole === UserRole.Secretary) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                            + ' esta ação. {( Função: Secretária )}'
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

                    const evolutionRecordService = Container.get(EvolutionRecordService)
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

                    if (context.user.userRole === UserRole.Secretary) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                            + ' esta ação. {( Função: Secretária )}'
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
                    const evolutionRecordService = Container.get(EvolutionRecordService)
                    const evolutionRecords = await evolutionRecordService
                        .update(context, id, body)
                    
                    response.status(201).json(evolutionRecords)
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

                    if (context.user.userRole === UserRole.Secretary) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                                + ' esta ação. {( Função: Secretária )}'
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
                    const evolutionRecordService = Container.get(EvolutionRecordService)
                    const evolutionRecords = await evolutionRecordService
                        .delete(id)
                    
                    response.status(200).json(evolutionRecords)
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
