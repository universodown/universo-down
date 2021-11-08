import { Response } from 'express'
import * as core from 'express-serve-static-core'
import Container from 'typedi'

import { verifyJWT } from '../fns/verify-jwt'
import { UserRole } from '../model/enum/user-role'
import  SchoolRequestService  from '../services/school-request'

import {
    isSchoolRequestCreate,
    isSchoolRequestUpdate
} from './dto/school-request'
import { RequestWithUser } from './user'

export class SchoolRequestRoutes {

    public static schoolRequestRoutes(app: core.Express) {
        const baseUrl = '/api/v1/school-request'

        app.get(
            `${baseUrl}/assisted/:id`, // BaseUrl + '/:id'
            verifyJWT,
            async (request: RequestWithUser, response: Response) => {
                try {
                    const context = request.context

                    if (context.user.userRole === UserRole.Profissional) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                            + 'esta ação. { (Função: Secretária)}'
                        })

                        return
                    }
                    if (!('params' in request) || !('id' in request.params)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida'
                                + ' { Necessátio informar o ID }'
                        })

                        return
                    }

                    const id = Number(request.params.id)
                    const schoolRequestService = Container
                        .get(SchoolRequestService)
                    const schoolRequest = await schoolRequestService
                        .findAll(context, id)

                    response.status(200).json(schoolRequest)
                } catch (e) {
                    response.status(500).json({
                        error: 'O servidor encontrou uma situação com a qual'
                        + ` não sabe lidar. {${e}} `
                    })
                }
            }
        )

        app.get(
            `${baseUrl}/:id`, // BaseUrl + '/:id'
            verifyJWT,
            async (request: RequestWithUser, response: Response) => {
                try {
                    const context = request.context
                    if (context.user.userRole === UserRole.Profissional) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                            + 'esta ação. { (Função: Secretária)}'
                        })

                        return
                    }

                    if (!('params' in request) || !('id' in request.params)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida'
                                + ' { Necessátio informar o ID }'
                        })

                        return
                    }

                    const id = Number(request.params.id)
                    const schoolRequestService = Container
                        .get(SchoolRequestService)
                    const schoolRequest = await schoolRequestService
                        .findById(id)

                    if (!schoolRequest) {
                        response.status(404).json({
                            error: 'Solicitação não encontrada.'
                        })

                        return
                    } else if (
                        schoolRequest.organization
                            .id !== context.organization.id
                    ) {
                        response.status(404).json({
                            error: 'Solicitação não encontrada.'
                        })

                        return
                    }

                    response.status(200).json(schoolRequest)
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

                    if (context.user.userRole === UserRole.Profissional) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                                + ' esta ação. { (Função: Secretária )}'
                        })

                        return
                    }

                    const body = request.body
                    if (!isSchoolRequestCreate(body)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                            + ' { Corpo da Mensagem incorreto }'
                        })

                        return
                    }

                    const schoolRequestService = Container
                        .get(SchoolRequestService)
                    const schoolRequest = await schoolRequestService
                        .create(context, body)

                    response.status(201).json(schoolRequest)
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

                    if (context.user.userRole === UserRole.Profissional) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                                + ' esta ação. { (Função: Secretária )}'
                        })

                        return
                    }

                    const body = request.body
                    if (!isSchoolRequestUpdate(body)) {
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
                    const schoolRequestService = Container
                        .get(SchoolRequestService)
                    const schoolRequest = await schoolRequestService
                        .findById(id)

                    if (!schoolRequest) {
                        response.status(404).json({
                            error: 'Solicitação não encontrada.'
                        })

                        return
                    } else if (
                        schoolRequest.organization
                            .id !== context.organization.id
                    ) {
                        response.status(404).json({
                            error: 'Solicitação não encontrada.'
                        })

                        return
                    }

                    const savedSchoolRequest = await schoolRequestService
                        .update(context, id, body)

                    response.status(200).json(savedSchoolRequest)
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

                    if (context.user.userRole === UserRole.Profissional) {
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
                    const schoolRequestService = Container
                        .get(SchoolRequestService)
                    const schoolRequest = await schoolRequestService
                        .findById(id)

                    if (!schoolRequest) {
                        response.status(404).json({
                            error: 'Solicitação não encontrada.'
                        })

                        return
                    } else if (
                        schoolRequest.organization
                            .id !== context.organization.id
                    ) {
                        response.status(404).json({
                            error: 'Solicitação não encontrada.'
                        })

                        return
                    }

                    await schoolRequestService.delete(id)

                    response.status(200).json(schoolRequest)
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
