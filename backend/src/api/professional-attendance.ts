import { Request, Response } from 'express'
import * as core from 'express-serve-static-core'
import Container from 'typedi'

import { verifyJWT } from '../fns/verify-jwt'
import ProfessionalAttendaceService from '../services/professional-attendance'
import { UserRole } from '../model/enum/user-role'

import { Context } from './dto/context'
import {
    isProfessionalAttendanceCreate,
    isProfessionalAttendanceUpdate
} from './dto/professional-attendance'

export type RequestWithUser = Request & { context: Context }

export class ProfessionalAttendaceRoutes {

    public static professionalAttendaceRoutes(app: core.Express): void {
        const baseUrl = '/api/v1/professionalAttendance'

        app.get(
            `${baseUrl}/:id`,
            verifyJWT,
            async (request: RequestWithUser, response: Response) => {
                try {
                    const context = request.context
                    if (context.user.userRole !== UserRole.Secretary) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                            + ' esta ação. { (Função: Secretária) }'
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
                    const professionalAttendaceService = Container
                        .get(ProfessionalAttendaceService)
                    const professionalAttendace
                        = await professionalAttendaceService.findById(id)

                    response.status(200).json(professionalAttendace)
                } catch (e) {
                    response.status(500).json({
                        error: 'O servidor encontrou uma situação com a qual'
                        + ` não sabe lidar. {${e}}`
                    })
                }
            }
        )

        app.get(
            `${baseUrl}/evolutionRecord/:id`,
            verifyJWT,
            async (request: RequestWithUser, response: Response) => {
                try {
                    const context = request.context
                    if (context.user.userRole !== UserRole.Secretary) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                            + ' esta ação. { (Função: Profissional ou'
                            + ' Assistente Social) }'
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
                    const evolutionRecordId = Number(request.params.id)
                    const professionalAttendaceService = Container
                        .get(ProfessionalAttendaceService)
                    const professionalAttendaces
                    = await professionalAttendaceService
                        .findAll(context, evolutionRecordId)
                    response.status(200).json(professionalAttendaces)
                } catch (e) {
                    response.status(500).json({
                        error: 'O servidor encontrou uma situação com a qual'
                        + ` não sabe lidar. {${e}}`
                    })
                }
            }
        )

        app.get(
            `${baseUrl}/allInAttendance/:id`,
            verifyJWT,
            async (request: RequestWithUser, response: Response) => {
                try {
                    const context = request.context
                    if (context.user.userRole !== UserRole.Secretary) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                            + ' esta ação. { (Função: Secretária) }'
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
                    const attendanceId = Number(request.params.id)
                    const professionalAttendaceService = Container.get(
                        ProfessionalAttendaceService
                    )
                    const professionalAttendaces
                    = await professionalAttendaceService
                        .findAllByAttendance(attendanceId)
                    response.status(200).json(professionalAttendaces)
                } catch (e) {
                    response.status(500).json({
                        error: 'O servidor encontrou uma situação com a qual'
                        + ` não sabe lidar. {${e}}`
                    })
                }
            }
        )
        app.get(
            `${baseUrl}/findAllProfessionalAttendance/:id`,
            verifyJWT,
            async (request: RequestWithUser, response: Response) => {
                try {
                    const context = request.context

                    if (context.user.userRole !== UserRole.Profissional) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                                + ' esta ação. { (Função: Profissional )}'
                        })

                        return
                    }

                    const id = Number(request.params.id)
                    if (!('params' in request) || !('id' in request.params)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                            + ' { Necessário informar o ID }'
                        })

                        return
                    }

                    const  professionalAttendaceService = Container.get(
                        ProfessionalAttendaceService
                    )
                    const professionalAttendace = await
                    professionalAttendaceService.findAllAttendance(context, id)

                    response.status(201).json(professionalAttendace)
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

                    if (context.user.userRole !== UserRole.Profissional) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                                + ' esta ação. { (Função: Profissional )}'
                        })

                        return
                    }

                    const body = request.body
                    if (!isProfessionalAttendanceCreate(body)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                            + ' { Corpo da Mensagem incorreto }'
                        })

                        return
                    }

                    const  professionalAttendaceService = Container.get(
                        ProfessionalAttendaceService
                    )
                    const professionalAttendace = await
                    professionalAttendaceService.create(context, body)

                    response.status(201).json(professionalAttendace)
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

                    if (context.user.userRole !== UserRole.Profissional) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                                + ' esta ação. { (Função: Profissional )}'
                        })

                        return
                    }

                    const body = request.body
                    if (!isProfessionalAttendanceUpdate(body)) {
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
                    const professionalAttendaceService = Container
                        .get(ProfessionalAttendaceService)
                    const professionalAttendace
                        = await professionalAttendaceService.findById(id)

                    if (!professionalAttendace) {
                        response.status(404).json({
                            error: 'Atendimento profissional não encontrado.'
                        })

                        return
                    }

                    if (
                        professionalAttendace
                            .organizationId !== context.organization.id
                        || professionalAttendace.userId !== context.user.id
                    ) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                                + ' esta ação. { (Atendimento não realizado'
                                + ' por este profissional)}'
                        })

                        return
                    }

                    const savedProfessionalAttendace
                        = await professionalAttendaceService
                            .update(context, id, body)

                    response.status(200).json(savedProfessionalAttendace)
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

                    if (context.user.userRole !== UserRole.Profissional) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                                + ' esta ação. { (Função: Profissional )}'
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
                    const professionalAttendaceService = Container
                        .get(ProfessionalAttendaceService)
                    const professionalAttendace
                        = await professionalAttendaceService.findById(id)

                    if (!professionalAttendace) {
                        response.status(404).json({
                            error: 'Atendimento profissional não encontrado.'
                        })

                        return
                    }

                    if (
                        professionalAttendace
                            .organizationId !== context.organization.id
                        || professionalAttendace.userId !== context.user.id
                    ) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                                + ' esta ação. { (Atendimento não realizado'
                                + ' por este profissional)}'
                        })

                        return
                    }
                    const professionalAttendance
                        = await professionalAttendaceService.delete(id)

                    response.status(200).json(professionalAttendance)
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
