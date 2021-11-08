import { Response } from 'express'
import * as core from 'express-serve-static-core'
import Container from 'typedi'

import { verifyJWT } from '../fns/verify-jwt'
import { UserRole } from '../model/enum/user-role'
import  TransportRequestService  from '../services/transport-request'

import {
    isTransportRequestCreate,
    isTransportRequestUpdate
} from './dto/transport-request'
import { RequestWithUser } from './user'

export class TransportRequestRoutes {

    public static transportRequestRoutes(app: core.Express) {
        const baseUrl = '/api/v1/transport-request'

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
                    const transportRequestService = Container
                        .get(TransportRequestService)
                    const transportRequest = await transportRequestService
                        .findAll(context, id)

                    response.status(200).json(transportRequest)
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
                    const transportRequestService = Container
                        .get(TransportRequestService)
                    const transportRequest = await transportRequestService
                        .findById(id)

                    if (!transportRequest) {
                        response.status(404).json({
                            error: 'Solicitação não encontrada.'
                        })

                        return
                    } else if (
                        transportRequest.organization
                            .id !== context.organization.id
                    ) {
                        response.status(404).json({
                            error: 'Solicitação não encontrada.'
                        })

                        return
                    }

                    response.status(200).json(transportRequest)
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
                    if (!isTransportRequestCreate(body)) {
                        response.status(400).json({
                            error: 'Estrutura da requisição inválida.'
                            + ' { Corpo da Mensagem incorreto }'
                        })

                        return
                    }

                    const transportRequestService = Container
                        .get(TransportRequestService)
                    const transportRequest = await transportRequestService
                        .create(context, body)

                    response.status(201).json(transportRequest)
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
                    if (!isTransportRequestUpdate(body)) {
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
                    const transportRequestService = Container
                        .get(TransportRequestService)
                    const transportRequest = await transportRequestService
                        .findById(id)

                    if (!transportRequest) {
                        response.status(404).json({
                            error: 'Solicitação não encontrada.'
                        })

                        return
                    } else if (
                        transportRequest.organization
                            .id !== context.organization.id
                    ) {
                        response.status(404).json({
                            error: 'Solicitação não encontrada.'
                        })

                        return
                    }

                    const savedTransportRequest = await transportRequestService
                        .update(context, id, body)

                    response.status(200).json(savedTransportRequest)
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
                    const transportRequestService = Container
                        .get(TransportRequestService)
                    const transportRequest = await transportRequestService
                        .findById(id)

                    if (!transportRequest) {
                        response.status(404).json({
                            error: 'Solicitação não encontrada.'
                        })

                        return
                    } else if (
                        transportRequest.organization
                            .id !== context.organization.id
                    ) {
                        response.status(404).json({
                            error: 'Solicitação não encontrada.'
                        })

                        return
                    }

                    await transportRequestService.delete(id)

                    response.status(200).json(transportRequest)
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
