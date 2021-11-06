import { Response } from 'express'
import * as core from 'express-serve-static-core'
import Container from 'typedi'

import { verifyJWT } from '../fns/verify-jwt'
import { UserRole } from '../model/enum/user-role'
import SchoolRequestService from '../services/school_resquest'

import { isSchoolRequestCreate, isSchoolRequestUpdate } from '../api/dto/school_request'
import { RequestWithUser } from './user'
import { AdminRole } from '../model/enum/admin-role'

export class SchoolRequestRoutes {

    public static SchoolRequestRoutes(app: core.Express) {
        const baseUrl = '/api/v1/schoolrequest'

        app.get(
            baseUrl,
            verifyJWT,
            async (request: RequestWithUser, response: Response) => {
                try {
                    const context = request.context

                    if (context.user.userRole === UserRole.Profissional) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                                + ' esta ação. { (Função: Profissional )}'
                        })

                        return
                    }

                    const schoolrequestService = Container.get(SchoolRequestService)
                    const schoolrequest = await schoolrequestService.findAll(context)

                    response.status(200).json(schoolrequest)
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

                    if (context.user.userRole === UserRole.Profissional) {
                        response.status(401).json({
                            error: 'Usuário não possui permissão para'
                            + ' está ação. { (Função: Profissional) }'
                        })

                        return
                    }

                    if (!('params' in request) || !('id' in request.params)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                            + ' { Necessário informar o ID } '
                        })

                        return
                    }

                    const id = Number(request.params.id)
                    const schoolrequestService = Container.get(SchoolRequestService)
                    const schoolrequest = await schoolrequestService.findById(id)

                    if (!schoolrequest) {
                        response.status(404).json({
                            error: 'Atendido não encontrado.'
                        })

                        return
                    } else if (
                        schoolrequest.organization.id !== context.organization.id
                    ) {
                        response.status(404).json({
                            error: 'Atendido não encontrado.'
                        })

                        return
                    } else if (
                        context.user.adminRole === AdminRole.Member
                        && context.user.id !== schoolrequest.id
                    ) {
                        response.status(404).json({
                            error: 'Atendido não encontrado.'
                        })

                        return
                    }

                    response.status(200).json(schoolrequest)
                } catch (e) {
                    response.status(500).json({
                        error: 'O Servidor encontrou uma situação com a qual'
                        + ` não sabe lidar. {${e}} `
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
                                + ' esta ação. { (Função: Profissional )}'
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

                    const schoolrequestService = Container.get(SchoolRequestService)
                    const schoolrequest = await schoolrequestService
                        .create(context, body)

                    response.status(201).json(schoolrequest)
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
                                + ' esta ação. { (Função: Profissional )}'
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
                    const schoolrequestService = Container.get(SchoolRequestService)
                    const schoolrequest = await schoolrequestService
                        .update(context, id, body)

                    response.status(200).json(schoolrequest)
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
                    const schoolrequestService = Container.get(SchoolRequestService)
                    const schoolrequest = await schoolrequestService
                        .delete(id)

                    response.status(200).json(schoolrequest)
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
