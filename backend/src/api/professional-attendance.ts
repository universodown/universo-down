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

                    const professionalAttendaceService = Container.get(
                        ProfessionalAttendaceService
                    )
                    const users = await professionalAttendaceService
                        .findAll(context)
                    response.status(200).json(users)
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
                                + ' esta ação. { (Função: Secretária )}'
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
                        = await professionalAttendaceService.find(id)

                    response.status(200).json(professionalAttendace)
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
                                + ' esta ação. { (Função: Secretária )}'
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

                    if (context.user.adminRole === 'member') {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para esta'
                            + ' ação. { (Função: Membro) }'
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

                    if (context.user.userRole === UserRole.Secretary) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                                + ' esta ação. { (Função: Secretária )}'
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
                    const professionalAttendace = await
                    professionalAttendaceService.update(context, id, body)

                    response.status(200).json(professionalAttendace)
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
                                + ' esta ação. { (Função: Secretária )}'
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
                    const professionalAttendance = await
                    professionalAttendaceService.delete(id)

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
